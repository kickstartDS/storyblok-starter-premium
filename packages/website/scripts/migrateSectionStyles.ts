#!/usr/bin/env node
/**
 * migrateSectionStyles.ts
 *
 * One-off content migration for the section component's `style` field.
 *
 * The pre-monorepo site had two combined background styles, "accentTransition"
 * and "boldTransition", that started from the section's normal (white/default)
 * background and faded into an accent or bold color band. Upstream split this
 * into two independent fields — `backgroundColor` (default/accent/bold) and
 * `transition` (none/to-default/to-accent/to-bold/to-inverted) — so the same
 * effect is now produced by leaving `backgroundColor` at its default and
 * setting `transition` to "to-accent" or "to-bold" instead.
 *
 * Existing stories still carry the old combined values in `style`, which no
 * longer appear in the schema's enum, so the background silently stopped
 * rendering. This script rewrites them in place:
 *
 *   style: "accentTransition"  ->  transition: "to-accent"  (style removed)
 *   style: "boldTransition"    ->  transition: "to-bold"    (style removed)
 *
 * `backgroundColor` is intentionally left untouched — the old effect always
 * transitioned in from the default background, not from accent or bold.
 *
 * All other old `style` values (colorful, stagelights, anchorGlow,
 * symmetricGlow, horizontalGradient, verticalGradient) are unaffected: they
 * were re-added to the schema/CSS under their original names and need no
 * content changes.
 *
 * Usage:
 *   npm run migrate-section-styles              # dry run, writes nothing
 *   npm run migrate-section-styles -- --apply   # actually rewrite content
 *
 * Push the component schema first (`npm run update-storyblok-config`), or the
 * restored `style` options (colorful, stagelights, ...) won't show up as
 * choices in the Storyblok editor yet — though this script does not depend on
 * that; it only touches the two removed combined values.
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

/**
 * Old combined `style` values that upstream replaced with a dedicated
 * `transition` value. Both started from the default background, so only
 * `transition` is set here — `backgroundColor` is left as-is.
 */
const TRANSITION_STYLE_MAP: Record<string, string> = {
  accentTransition: "to-accent",
  boldTransition: "to-bold",
};

interface Report {
  /** Count of migrated occurrences, keyed by the old `style` value. */
  migrated: Record<string, number>;
  /**
   * Sections that already had a non-default `transition` set alongside one of
   * the old combined `style` values — `style` is still dropped (it's invalid
   * either way), but the existing `transition` wins rather than being
   * overwritten.
   */
  transitionKept: string[];
}

/**
 * Rewrites every `section` blok in `node` in place. Returns true if anything
 * changed.
 */
function migrateSectionStyles(
  node: unknown,
  report: Report,
  slug: string
): boolean {
  if (Array.isArray(node)) {
    let changed = false;
    for (const child of node) {
      if (migrateSectionStyles(child, report, slug)) changed = true;
    }
    return changed;
  }

  if (!node || typeof node !== "object") return false;
  const blok = node as Record<string, any>;
  let changed = false;

  if (blok.component === "section" && typeof blok.style === "string") {
    const oldStyle = blok.style;
    const newTransition = TRANSITION_STYLE_MAP[oldStyle];

    if (newTransition) {
      if (!blok.transition || blok.transition === "none") {
        blok.transition = newTransition;
      } else {
        report.transitionKept.push(
          `${slug} (kept "${blok.transition}", dropped "${oldStyle}")`
        );
      }

      delete blok.style;
      report.migrated[oldStyle] = (report.migrated[oldStyle] || 0) + 1;
      changed = true;
    }
  }

  for (const value of Object.values(blok)) {
    if (value && typeof value === "object") {
      if (migrateSectionStyles(value, report, slug)) changed = true;
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

  const report: Report = { migrated: {}, transitionKept: [] };
  const touched: string[] = [];

  for (const id of ids) {
    const { data } = await client.get(`spaces/${spaceId}/stories/${id}`);
    const story = data.story;

    const changed = migrateSectionStyles(
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
      "  none — no section uses the old accentTransition/boldTransition values"
    );
  }
  for (const slug of touched) console.log(`  ${slug}`);

  console.log("\nstyle values migrated:");
  const entries = Object.entries(report.migrated).sort((a, b) => b[1] - a[1]);
  if (entries.length === 0) console.log("  none");
  for (const [style, n] of entries) {
    console.log(
      `  ${String(n).padStart(5)} × style: "${style}" -> transition: "${
        TRANSITION_STYLE_MAP[style]
      }"`
    );
  }

  if (report.transitionKept.length > 0) {
    console.log(
      `\n${report.transitionKept.length} section(s) already had an explicit transition — kept it, only removed the stale style value:`
    );
    for (const entry of report.transitionKept) console.log(`  ${entry}`);
  }

  if (!apply && touched.length > 0) {
    console.log("\nre-run with --apply to write these changes");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
