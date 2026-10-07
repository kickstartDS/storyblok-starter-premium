#!/usr/bin/env node
/**
 * migrateProductHeroOffset.ts
 *
 * One-off content migration: on every product page (`produkte/*` and its
 * `en/products/*` translation), the first `hero` component found inside the
 * page's first `section` must use `textPosition: "offset"` (Storyblok field
 * label "Module alignment").
 *
 * Usage:
 *   npm run migrate-product-hero-offset              # dry run, writes nothing
 *   npm run migrate-product-hero-offset -- --apply   # actually rewrite content
 *
 * Environment variables (via .env.local):
 *   NEXT_STORYBLOK_OAUTH_TOKEN - Management API OAuth token (required)
 *   NEXT_STORYBLOK_SPACE_ID    - Storyblok space ID (required)
 *
 * Stories that were published are re-published after the update; drafts stay
 * drafts. Run the dry run first and read the report.
 */

import StoryblokClient from "storyblok-js-client";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const SLUG_PREFIXES = ["produkte/", "en/products/"];

interface StoryListItem {
  id: number;
  full_slug: string;
  is_folder: boolean;
}

/**
 * Finds the first `hero` component inside the first `section` blok of the
 * page's `section` root array, and sets its `textPosition` to `"offset"` if
 * it isn't already. Returns true if a change was made.
 */
function setFirstHeroOffset(content: Record<string, any>): {
  changed: boolean;
  reason: string;
} {
  const sections = content.section;
  if (!Array.isArray(sections) || sections.length === 0) {
    return { changed: false, reason: "no section array / empty" };
  }

  const firstSection = sections[0];
  if (!firstSection || firstSection.component !== "section") {
    return { changed: false, reason: "first entry is not a section" };
  }

  const components = firstSection.components;
  if (!Array.isArray(components)) {
    return { changed: false, reason: "first section has no components" };
  }

  const hero = components.find((c) => c && c.component === "hero");
  if (!hero) {
    return { changed: false, reason: "first section has no hero component" };
  }

  if (hero.textPosition === "offset") {
    return { changed: false, reason: "already offset" };
  }

  const previous = hero.textPosition;
  hero.textPosition = "offset";
  return { changed: true, reason: `textPosition "${previous}" -> "offset"` };
}

async function main(): Promise<void> {
  const oauthToken = process.env.NEXT_STORYBLOK_OAUTH_TOKEN;
  const spaceId = process.env.NEXT_STORYBLOK_SPACE_ID;

  if (!oauthToken || !spaceId) {
    console.error(
      "✖ missing NEXT_STORYBLOK_OAUTH_TOKEN or NEXT_STORYBLOK_SPACE_ID"
    );
    process.exit(1);
  }

  const apply = process.argv.includes("--apply");
  console.log(
    apply
      ? "▶ APPLY — content will be rewritten\n"
      : "▶ DRY RUN — nothing will be written (pass --apply to commit)\n"
  );

  const client = new StoryblokClient({ oauthToken });

  const stories: StoryListItem[] = [];
  for (const prefix of SLUG_PREFIXES) {
    for (let page = 1; ; page++) {
      const res = await client.get(`spaces/${spaceId}/stories`, {
        starts_with: prefix,
        page,
        per_page: 100,
      });
      const batch = res.data.stories as StoryListItem[];
      stories.push(...batch.filter((s) => !s.is_folder));
      if (batch.length < 100) break;
      await sleep(200);
    }
  }
  console.log(`found ${stories.length} product page(s)\n`);

  const changedSlugs: string[] = [];
  const skipped: { slug: string; reason: string }[] = [];

  for (const { id, full_slug } of stories) {
    const { data } = await client.get(`spaces/${spaceId}/stories/${id}`);
    const story = data.story;

    const { changed, reason } = setFirstHeroOffset(story.content);

    if (!changed) {
      skipped.push({ slug: full_slug, reason });
      await sleep(150);
      continue;
    }

    changedSlugs.push(`${full_slug} (${reason})`);

    if (apply) {
      const wasPublished = story.published === true;
      await client.put(`spaces/${spaceId}/stories/${id}`, {
        story: { content: story.content },
        ...(wasPublished ? { publish: 1 } : {}),
      });
    }
    await sleep(250);
  }

  console.log(
    `stories ${apply ? "updated" : "that would change"}: ${changedSlugs.length}`
  );
  if (changedSlugs.length === 0) {
    console.log("  none — every first-section hero is already offset");
  }
  for (const entry of changedSlugs) console.log(`  ${entry}`);

  console.log(`\nunchanged: ${skipped.length}`);
  for (const { slug, reason } of skipped) console.log(`  ${slug} — ${reason}`);

  if (!apply && changedSlugs.length > 0) {
    console.log("\nre-run with --apply to write these changes");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
