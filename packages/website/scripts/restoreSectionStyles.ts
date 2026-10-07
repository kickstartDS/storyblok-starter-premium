#!/usr/bin/env node
/**
 * restoreSectionStyles.ts
 *
 * One-off content repair for the section component's `style` field.
 *
 * While `style` was restricted upstream to `["default", "framed", "deko"]`
 * (see migrateSectionStyles.ts for the full history), any section still
 * carrying one of the six other historic values —
 * "colorful", "stagelights", "anchorGlow", "symmetricGlow",
 * "horizontalGradient", "verticalGradient" — no longer matched an option in
 * the schema. Storyblok's option field renders that as a blank dropdown in
 * the Visual Editor; if an editor opened and saved a section like that in the
 * meantime (even without touching the style dropdown themselves), Storyblok
 * writes back an empty value, silently wiping the field in the *live* story
 * while a `packages/website/backup/` snapshot taken around the same time may
 * still have the original value on the same blok (bloks keep a stable `_uid`
 * across snapshots of the same space).
 *
 * This script rebuilds a `_uid -> old style value` map from a local backup
 * snapshot, then walks every live story: any `section` blok with no
 * meaningful `style` *and* no `transition` set is looked up by `_uid` in that
 * map and repaired —
 *
 *   backup style in {colorful, stagelights, anchorGlow, symmetricGlow,
 *   horizontalGradient, verticalGradient}  ->  style: <same value>
 *
 *   backup style "accentTransition" / "boldTransition"  ->  transition:
 *   "to-accent" / "to-bold"  (see migrateSectionStyles.ts — same mapping,
 *   applied here too since a wiped field means that script had nothing to
 *   rewrite)
 *
 * A section with *any* current `style` or `transition` value is left alone —
 * this only restores fields that are empty now, it never overwrites a
 * deliberate edit.
 *
 * Usage:
 *   npm run restore-section-styles                       # dry run
 *   npm run restore-section-styles -- --apply             # write changes
 *   npm run restore-section-styles -- --backup <path>      # use a specific
 *                                                           # backup folder
 *                                                           # instead of the
 *                                                           # most recent one
 *                                                           # under
 *                                                           # packages/website/backup/
 *
 * Environment variables (via .env.local):
 *   NEXT_STORYBLOK_OAUTH_TOKEN - Management API OAuth token (required)
 *   NEXT_STORYBLOK_SPACE_ID    - Storyblok space ID (required)
 *
 * Stories that were published are re-published after the update; drafts stay
 * drafts. Run the dry run first and read the report — a section with `style`
 * deliberately reset to "default" by an editor looks identical to one that
 * was silently wiped, so review the slug list before applying.
 */

import * as fs from "fs";
import * as path from "path";
import StoryblokClient from "storyblok-js-client";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Old combined styles that map to the new `transition` field instead of `style`. */
const TRANSITION_STYLE_MAP: Record<string, string> = {
  accentTransition: "to-accent",
  boldTransition: "to-bold",
};

/** Old styles that are still valid `style` values today — just restored verbatim. */
const RESTORABLE_STYLES = new Set([
  "colorful",
  "stagelights",
  "anchorGlow",
  "symmetricGlow",
  "horizontalGradient",
  "verticalGradient",
]);

interface BackupEntry {
  storyUuid: string;
  storySlug: string;
  style: string;
}

/** Finds the most recently timestamped folder under packages/website/backup/. */
function findLatestBackup(backupRoot: string): string {
  const entries = fs
    .readdirSync(backupRoot, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();

  if (entries.length === 0) {
    throw new Error(`no backup snapshots found under ${backupRoot}`);
  }
  return path.join(backupRoot, entries[entries.length - 1]);
}

/** Walks a backup content tree, recording every `section` blok with a non-default `style`. */
function collectBackupStyles(
  node: unknown,
  storyUuid: string,
  storySlug: string,
  out: Map<string, BackupEntry>
): void {
  if (Array.isArray(node)) {
    for (const child of node)
      collectBackupStyles(child, storyUuid, storySlug, out);
    return;
  }
  if (!node || typeof node !== "object") return;
  const blok = node as Record<string, any>;

  if (
    blok.component === "section" &&
    typeof blok._uid === "string" &&
    typeof blok.style === "string" &&
    blok.style !== "" &&
    blok.style !== "default"
  ) {
    out.set(blok._uid, { storyUuid, storySlug, style: blok.style });
  }

  for (const value of Object.values(blok)) {
    if (value && typeof value === "object") {
      collectBackupStyles(value, storyUuid, storySlug, out);
    }
  }
}

/** Reads every story JSON file in a `scripts/backupSpace.sh` snapshot and indexes section styles by blok `_uid`. */
function loadBackupStyles(backupDir: string): Map<string, BackupEntry> {
  const out = new Map<string, BackupEntry>();
  const storiesRoot = path.join(backupDir, "stories", "stories");
  if (!fs.existsSync(storiesRoot)) {
    throw new Error(`backup stories directory not found: ${storiesRoot}`);
  }

  for (const spaceDir of fs.readdirSync(storiesRoot)) {
    const spacePath = path.join(storiesRoot, spaceDir);
    if (!fs.statSync(spacePath).isDirectory()) continue;

    for (const file of fs.readdirSync(spacePath)) {
      if (!file.endsWith(".json")) continue;
      const story = JSON.parse(
        fs.readFileSync(path.join(spacePath, file), "utf-8")
      );
      if (!story?.content) continue;
      collectBackupStyles(
        story.content,
        story.uuid,
        story.full_slug ?? story.slug,
        out
      );
    }
  }

  return out;
}

interface Report {
  restored: Array<{ slug: string; uid: string; field: string; value: string }>;
  ambiguous: string[];
}

/**
 * Rewrites every empty `section.style`/`transition` in `node` in place, using
 * `backupStyles` (keyed by blok `_uid`) as the source of truth. Returns true
 * if anything changed.
 */
function restoreSectionStyles(
  node: unknown,
  backupStyles: Map<string, BackupEntry>,
  slug: string,
  report: Report
): boolean {
  if (Array.isArray(node)) {
    let changed = false;
    for (const child of node) {
      if (restoreSectionStyles(child, backupStyles, slug, report))
        changed = true;
    }
    return changed;
  }

  if (!node || typeof node !== "object") return false;
  const blok = node as Record<string, any>;
  let changed = false;

  if (blok.component === "section" && typeof blok._uid === "string") {
    const hasStyle =
      typeof blok.style === "string" &&
      blok.style !== "" &&
      blok.style !== "default";
    const hasTransition =
      typeof blok.transition === "string" &&
      blok.transition !== "" &&
      blok.transition !== "none";

    if (!hasStyle && !hasTransition) {
      const backup = backupStyles.get(blok._uid);
      if (backup) {
        const mappedTransition = TRANSITION_STYLE_MAP[backup.style];
        if (mappedTransition) {
          blok.transition = mappedTransition;
          report.restored.push({
            slug,
            uid: blok._uid,
            field: "transition",
            value: mappedTransition,
          });
          changed = true;
        } else if (RESTORABLE_STYLES.has(backup.style)) {
          blok.style = backup.style;
          report.restored.push({
            slug,
            uid: blok._uid,
            field: "style",
            value: backup.style,
          });
          changed = true;
        }
      }
    }
  }

  for (const value of Object.values(blok)) {
    if (value && typeof value === "object") {
      if (restoreSectionStyles(value, backupStyles, slug, report))
        changed = true;
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
  const backupFlagIndex = process.argv.indexOf("--backup");
  const backupRoot = path.join(__dirname, "..", "backup");
  const backupDir =
    backupFlagIndex !== -1
      ? process.argv[backupFlagIndex + 1]
      : findLatestBackup(backupRoot);

  console.log(
    apply
      ? "▶ APPLY — content will be rewritten\n"
      : "▶ DRY RUN — nothing will be written (pass --apply to commit)\n"
  );
  console.log(`using backup snapshot: ${backupDir}\n`);

  const backupStyles = loadBackupStyles(backupDir);
  console.log(
    `loaded ${backupStyles.size} section style value(s) from the backup\n`
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

  const report: Report = { restored: [], ambiguous: [] };
  const touched: string[] = [];

  for (const id of ids) {
    const { data } = await client.get(`spaces/${spaceId}/stories/${id}`);
    const story = data.story;

    const changed = restoreSectionStyles(
      story.content,
      backupStyles,
      story.full_slug,
      report
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
      "  none — no empty section style/transition matched a backed-up value"
    );
  }

  console.log("\nvalues restored:");
  if (report.restored.length === 0) console.log("  none");
  for (const entry of report.restored) {
    console.log(
      `  ${entry.slug}  [${entry.uid}]  ${entry.field}: "${entry.value}"`
    );
  }

  if (!apply && report.restored.length > 0) {
    console.log("\nre-run with --apply to write these changes");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
