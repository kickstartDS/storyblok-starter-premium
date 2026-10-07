#!/usr/bin/env node
/**
 * migrateGalleryAspectRatio.ts
 *
 * One-off content migration for the gallery component's `aspectRatio` field on
 * product pages.
 *
 * Product-shot galleries were created from the "SmallSquaresWithLightbox"
 * preset, which sets `aspectRatio: "square"`. That forces every preview
 * thumbnail into a 1:1 box with `object-fit: cover`, so product shots whose
 * natural ratio is not square are cropped and part of the product is not
 * visible.
 *
 * The `gallery` schema (and the generated Storyblok field) already default
 * `aspectRatio` to `"unset"`, but the React component's own default is
 * `"square"`, so a gallery that omits the field is cropped too. The stored
 * value therefore has to be set explicitly.
 *
 * This script walks every product page (`produkte/*` and its `en/products/*`
 * translation), finds every `gallery` blok and sets `aspectRatio: "unset"` —
 * which removes the CSS modifier class and the website's `Picture` ratio
 * override, so each tile renders at its image's natural ratio. The lightbox
 * enlargement is driven by the original image source and is unaffected.
 *
 * Only galleries whose `aspectRatio` is not already `"unset"` are touched, and
 * no other image-bearing component (`images`, `mosaic`, `image-story`, `hero`)
 * is changed. Galleries that intentionally keep a forced ratio elsewhere are
 * left alone.
 *
 * Usage:
 *   npm run migrate-gallery-aspect-ratio              # dry run, writes nothing
 *   npm run migrate-gallery-aspect-ratio -- --apply   # actually rewrite content
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

export interface Report {
  /** Count of migrated galleries, keyed by the previous `aspectRatio`. */
  migrated: Record<string, number>;
  /** Per-story detail: previous ratio per migrated gallery, keyed by slug. */
  details: Record<string, string[]>;
}

/**
 * Rewrites the `aspectRatio` of every `gallery` blok in `node` to `"unset"`
 * (including galleries that omit the field, whose component default would
 * otherwise crop). Returns true if anything changed.
 */
export function migrateGalleryAspectRatio(
  node: unknown,
  report: Report,
  slug: string
): boolean {
  if (Array.isArray(node)) {
    let changed = false;
    for (const child of node) {
      if (migrateGalleryAspectRatio(child, report, slug)) changed = true;
    }
    return changed;
  }

  if (!node || typeof node !== "object") return false;
  const blok = node as Record<string, any>;
  let changed = false;

  if (blok.component === "gallery" && blok.aspectRatio !== "unset") {
    const previous = blok.aspectRatio ?? "(absent)";
    blok.aspectRatio = "unset";
    report.migrated[previous] = (report.migrated[previous] || 0) + 1;
    (report.details[slug] ??= []).push(`"${previous}" -> "unset"`);
    changed = true;
  }

  for (const value of Object.values(blok)) {
    if (value && typeof value === "object") {
      if (migrateGalleryAspectRatio(value, report, slug)) changed = true;
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

  const report: Report = { migrated: {}, details: {} };
  const touched: string[] = [];

  for (const { id, full_slug } of stories) {
    const { data } = await client.get(`spaces/${spaceId}/stories/${id}`);
    const story = data.story;

    const changed = migrateGalleryAspectRatio(
      story.content,
      report,
      full_slug
    );
    if (!changed) {
      await sleep(150);
      continue;
    }

    touched.push(full_slug);

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
    console.log("  none — every product-page gallery is already unset");
  }
  for (const slug of touched) {
    const details = report.details[slug] ?? [];
    console.log(`  ${slug} — ${details.join(", ")}`);
  }

  console.log("\naspectRatio values migrated:");
  const entries = Object.entries(report.migrated).sort((a, b) => b[1] - a[1]);
  if (entries.length === 0) console.log("  none");
  for (const [ratio, n] of entries) {
    console.log(
      `  ${String(n).padStart(5)} × aspectRatio: "${ratio}" -> "unset"`
    );
  }

  if (!apply && touched.length > 0) {
    console.log("\nre-run with --apply to write these changes");
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
