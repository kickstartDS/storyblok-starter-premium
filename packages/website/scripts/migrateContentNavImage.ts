#!/usr/bin/env node
/**
 * migrateContentNavImage.ts
 *
 * One-off content migration for the content-nav component's `image_src` field.
 *
 * The design-system schema declared `image.src` with `format: "uri"`, so the
 * Storyblok config generator emitted `image_src` as a `multilink` field. The
 * schema now declares `format: "image"`, which makes the generator emit an
 * `asset` field — but flipping the field type does not migrate stored content.
 * A value stored while the field was a multilink (`{ fieldtype: "multilink",
 * linktype: ... }`) is not a shape an asset field can display, so the editor
 * shows the control empty even though the website keeps rendering it (the
 * frontend collapses link objects to a URL string before rendering).
 *
 * This script walks every story, finds every `content-nav` blok and rewrites an
 * `image_src` that is still a multilink object to the URL string the asset
 * field expects. Values that are already asset-shaped (an asset object, or a
 * bare CDN URL string — the shape every other asset field's content is in) are
 * left untouched, and so are multilinks that carry no usable URL (a story or
 * email link, or an empty pick), which are reported for the editor to re-pick.
 *
 * Push the merged component schema first (`npm run update-storyblok-config`),
 * or the editor still shows the old multilink control.
 *
 * Usage:
 *   npm run migrate-content-nav-image              # dry run, writes nothing
 *   npm run migrate-content-nav-image -- --apply   # actually rewrite content
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

interface Report {
  /** Count of multilink values rewritten to their URL string. */
  converted: number;
  /**
   * Multilinks with no usable URL (story/email link, or an empty pick) —
   * nothing to convert to, so the editor has to re-pick the asset.
   */
  needsRepick: string[];
}

/** A value the old `multilink` field stored: `{ fieldtype, linktype, ... }`. */
function isMultilink(value: unknown): value is Record<string, any> {
  return (
    !!value &&
    typeof value === "object" &&
    (value as Record<string, any>).fieldtype === "multilink"
  );
}

/**
 * Rewrites every multilink-shaped `image_src` on every `content-nav` blok in
 * `node`. A multilink whose linktype is asset or url becomes its URL string —
 * the shape an asset field (and the website) expects; anything else is reported
 * for a re-pick. Returns true if anything changed.
 */
function migrateContentNavImage(
  node: unknown,
  report: Report,
  slug: string
): boolean {
  if (Array.isArray(node)) {
    let changed = false;
    for (const child of node) {
      if (migrateContentNavImage(child, report, slug)) changed = true;
    }
    return changed;
  }

  if (!node || typeof node !== "object") return false;
  const blok = node as Record<string, any>;
  let changed = false;

  if (blok.component === "content-nav" && isMultilink(blok.image_src)) {
    const link = blok.image_src;
    const url =
      (link.linktype === "asset" || link.linktype === "url") && link.url
        ? (link.url as string)
        : null;

    if (url) {
      blok.image_src = url;
      report.converted += 1;
      changed = true;
    } else {
      report.needsRepick.push(`${slug} — linktype "${link.linktype}"`);
    }
  }

  for (const value of Object.values(blok)) {
    if (value && typeof value === "object") {
      if (migrateContentNavImage(value, report, slug)) changed = true;
    }
  }

  return changed;
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

  const ids: number[] = [];
  for (let page = 1; ; page++) {
    const res = await client.get(`spaces/${spaceId}/stories`, {
      page,
      per_page: 100,
    });
    const batch = res.data.stories as Array<{ id: number; is_folder: boolean }>;
    ids.push(...batch.filter((s) => !s.is_folder).map((s) => s.id));
    if (batch.length < 100) break;
    await sleep(200);
  }
  console.log(`found ${ids.length} stories\n`);

  const report: Report = { converted: 0, needsRepick: [] };
  const touched: string[] = [];

  for (const id of ids) {
    const { data } = await client.get(`spaces/${spaceId}/stories/${id}`);
    const story = data.story;

    const changed = migrateContentNavImage(
      story.content,
      report,
      story.full_slug
    );
    if (!changed) {
      await sleep(150);
      continue;
    }

    touched.push(story.full_slug);

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
    `stories ${apply ? "updated" : "that would change"}: ${touched.length}`
  );
  if (touched.length === 0) {
    console.log(
      "  none — no content-nav image_src is still stored as a multilink"
    );
  }
  for (const slug of touched) console.log(`  ${slug}`);

  console.log(`\nimage_src values converted: ${report.converted}`);

  if (report.needsRepick.length > 0) {
    console.log(
      `\n${report.needsRepick.length} content-nav image_src value(s) carry no URL and need a re-pick in the editor:`
    );
    for (const entry of report.needsRepick) console.log(`  ${entry}`);
  }

  if (!apply && touched.length > 0) {
    console.log("\nre-run with --apply to write these changes");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
