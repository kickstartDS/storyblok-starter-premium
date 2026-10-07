#!/usr/bin/env node
/**
 * pruneStaleComponents.ts
 *
 * Deletes the `tab-<uuid>` components the Storyblok config generator used to
 * emit. `button` was missing from the `--components` list of
 * `create-storyblok-config`, so the generator classified the schema as a plain
 * object and emitted one throwaway clone per whitelist position instead of the
 * canonical `button` component. `mergeStoryblokConfig.ts` now prunes the dead
 * whitelist entries and never pushes a clone again, but the Storyblok CLI has
 * no delete command — the components themselves have to go through the
 * Management API.
 *
 * Order matters: a clone may only be deleted once nothing points at it.
 *   1. npm run update-storyblok-config       (creates `button`, prunes the whitelists)
 *   2. npm run migrate-content-fields -- --apply
 *   3. npm run prune-stale-components -- --apply
 *   4. npm run generate-content-types
 * Run `npm run backup-space` first: deletion cannot be undone.
 *
 * The clones are read from the pulled snapshot (`types/components-schema.json`,
 * refreshed by `pull-content-schema`), so no uuid is hardcoded.
 *
 * Usage:
 *   npm run prune-stale-components              # dry run, deletes nothing
 *   npm run prune-stale-components -- --apply   # actually delete
 *
 * Environment variables (via .env.local):
 *   NEXT_STORYBLOK_OAUTH_TOKEN — Management API OAuth token (required)
 *   NEXT_STORYBLOK_SPACE_ID    — Storyblok space ID (required)
 */

import * as fs from "fs";
import { setTimeout as delay } from "node:timers/promises";
import StoryblokClient from "storyblok-js-client";

/** The generator names a clone `tab-` plus the uuid it minted for the blok. */
const CLONE_NAME = /^tab-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const COMPONENTS_SNAPSHOT = "types/components-schema.json";

interface SnapshotComponent {
  id?: number;
  name?: string;
  display_name?: string;
}

async function main(): Promise<void> {
  const oauthToken = process.env.NEXT_STORYBLOK_OAUTH_TOKEN;
  const spaceId = process.env.NEXT_STORYBLOK_SPACE_ID;

  if (!oauthToken || !spaceId) {
    console.error("✖ missing NEXT_STORYBLOK_OAUTH_TOKEN or NEXT_STORYBLOK_SPACE_ID");
    process.exit(1);
  }

  const apply = process.argv.includes("--apply");
  console.log(apply ? "▶ APPLY — components will be deleted\n" : "▶ DRY RUN — nothing will be deleted (pass --apply to commit)\n");

  const raw = JSON.parse(fs.readFileSync(COMPONENTS_SNAPSHOT, "utf-8"));
  const components: SnapshotComponent[] = Array.isArray(raw) ? raw : (raw.components ?? []);
  const clones = components.filter(
    (component) =>
      typeof component.name === "string" && CLONE_NAME.test(component.name) && component.id,
  );
  console.log(`found ${clones.length} tab-<uuid> components in ${COMPONENTS_SNAPSHOT}\n`);
  if (clones.length === 0) return;

  const client = new StoryblokClient({ oauthToken });

  // A clone a preset still points at must survive: the preset would insert
  // nothing. `update-storyblok-config` re-points the button presets at the
  // canonical component, so this only fires when that push was skipped.
  const presetComponentIds = new Set<number>();
  // The Management API returns every preset from this endpoint and ignores `page`/`per_page`, so
  // paging it loops for ever on the same batch. syncPresetImages.js reads it the same way.
  const presetsRes = await client.get(`spaces/${spaceId}/presets`);
  const livePresets = (presetsRes.data?.presets || []) as Array<{ component_id?: number }>;
  // Printed so a truncated read is visible rather than silently narrowing what may be deleted.
  console.log(`  the space has ${livePresets.length} presets\n`);
  for (const preset of livePresets) {
    if (preset.component_id) presetComponentIds.add(preset.component_id);
  }

  const deletable = clones.filter((component) => !presetComponentIds.has(component.id!));
  const skipped = clones.length - deletable.length;

  for (const component of deletable) {
    console.log(
      `  ${apply ? "deleting" : "would delete"} ${component.name} (id ${component.id}, "${component.display_name}")`,
    );
    if (apply) await client.delete(`spaces/${spaceId}/components/${component.id}`, {});
    await delay(200);
  }

  if (skipped > 0) {
    console.log(`\n  kept ${skipped}: still referenced by a preset — run update-storyblok-config first`);
  }

  console.log(`\ncomponents ${apply ? "deleted" : "that would be deleted"}: ${deletable.length}`);
  if (!apply && deletable.length > 0) console.log("Re-run with --apply to commit these changes.");
}

main()
  // The Storyblok client keeps its socket open, so without an explicit exit the process
  // outlives the work and the command looks like it hangs. Same reason
  // syncPresetImages.js ends with `.then(() => process.exit(0))`.
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
