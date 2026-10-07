/**
 * syncPresetImages.js
 *
 * Syncs preset screenshot images to Storyblok:
 *   1. Reads merged presets (which have local image paths like "img/screenshots/...")
 *   2. Verifies every referenced screenshot exists in the built design system
 *   3. Fetches existing presets from the Storyblok space
 *   4. Uploads changed screenshots to a "Component Screenshots" asset folder
 *   5. Updates each preset's `image` field via the Management API
 *   6. Points each component's preview image at the screenshot this run
 *      uploaded, falling back to its live preset's image when nothing changed
 *      — so one run leaves the component preview and the preset preview agreeing
 *
 * Exits non-zero when a referenced screenshot is missing from the built design
 * system (before any Storyblok call) or when a preset that needs a preview ends
 * the run without a CDN image — a preset without a thumbnail is a failure, not
 * a warning.
 *
 * Also uploads any content images (img/*, /logo.svg) referenced inside preset
 * args to a "Demo Content" asset folder — so preset previews render correctly.
 *
 * Usage:
 *   dotenvx run -f .env.local -- node scripts/syncPresetImages.js
 *
 * Requires: NEXT_STORYBLOK_SPACE_ID, NEXT_STORYBLOK_OAUTH_TOKEN
 */

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const StoryblokClient = require("storyblok-js-client");
const PromiseThrottle = require("promise-throttle");
const { traverse } = require("object-traversal");
const { signedUpload, getOrCreateAssetFolder } = require("./storyblokAssets");

require("@dotenvx/dotenvx").config({ path: ".env.local" });

if (!process.env.NEXT_STORYBLOK_SPACE_ID)
  throw new Error("Missing NEXT_STORYBLOK_SPACE_ID env variable");
if (!process.env.NEXT_STORYBLOK_OAUTH_TOKEN)
  throw new Error("Missing NEXT_STORYBLOK_OAUTH_TOKEN env variable");

const SPACE_ID = process.env.NEXT_STORYBLOK_SPACE_ID;
const SCREENSHOT_FOLDER_NAME = "Component Screenshots";
const DEMO_CONTENT_FOLDER_NAME = "Demo Content";

const Storyblok = new StoryblokClient({
  oauthToken: process.env.NEXT_STORYBLOK_OAUTH_TOKEN,
});

const promiseThrottle = new PromiseThrottle({
  requestsPerSecond: 2,
  promiseImplementation: Promise,
});

// ---------------------------------------------------------------------------
// Storyblok API helpers
//
// Every helper takes the client explicitly so `sync()` can run against a stub;
// the CLI entry point uses the module's client.
// ---------------------------------------------------------------------------

const fetchAllPresets = async (client) => {
  const res = await client.get(`spaces/${SPACE_ID}/presets`);
  return res.data?.presets || [];
};

const fetchAllComponents = async (client) => {
  const res = await client.get(`spaces/${SPACE_ID}/components`);
  return res.data?.components || [];
};

const updatePreset = async (client, presetId, fields) =>
  client.put(`spaces/${SPACE_ID}/presets/${presetId}`, {
    preset: fields,
  });

const updateComponent = async (client, componentId, fields) =>
  client.put(`spaces/${SPACE_ID}/components/${componentId}`, {
    component: fields,
  });

const getOrCreateFolder = async (client, folderName) =>
  getOrCreateAssetFolder(client, SPACE_ID, folderName);

// ---------------------------------------------------------------------------
// Screenshot change detection
// ---------------------------------------------------------------------------

const SCREENSHOT_ROOT = path.join(
  "node_modules",
  "@kickstartds",
  "design-system",
  "dist",
  "static",
);

/** A preset image is local when it is neither a CDN URL nor protocol-relative. */
const isLocalPath = (image) =>
  Boolean(image) && !image.startsWith("http") && !image.startsWith("//");

const hashFile = (filePath) =>
  fs.existsSync(filePath)
    ? crypto.createHash("sha1").update(fs.readFileSync(filePath)).digest("hex")
    : null;

const hashRemote = async (url, fetchImpl) => {
  try {
    const response = await fetchImpl(
      url.startsWith("//") ? `https:${url}` : url,
    );
    if (!response.ok) return null;
    const buffer = Buffer.from(await response.arrayBuffer());
    return crypto.createHash("sha1").update(buffer).digest("hex");
  } catch {
    return null;
  }
};

/**
 * A preset screenshot needs uploading when the live preset has no image yet or
 * when the live image no longer matches the local screenshot. Comparing hashes
 * keeps re-runs (and unrelated updates) from re-uploading unchanged images.
 */
const screenshotChanged = async (localImage, liveImage, fetchImpl) => {
  const isRemote =
    liveImage && (liveImage.startsWith("http") || liveImage.startsWith("//"));
  if (!isRemote) return true;

  const localHash = hashFile(path.join(SCREENSHOT_ROOT, localImage));
  if (!localHash) {
    console.log(`  ${localImage}: local screenshot not found, skipping`);
    return false;
  }

  const remoteHash = await hashRemote(liveImage, fetchImpl);
  return remoteHash !== localHash;
};

// ---------------------------------------------------------------------------
// Main sync logic
// ---------------------------------------------------------------------------

const sync = async ({
  client = Storyblok,
  uploadScreenshot = signedUpload,
  fetchImpl = fetch,
} = {}) => {
  // 1. Read merged presets
  const mergedDir = path.join("cms", "merged", "components", SPACE_ID);
  const presetsPath = path.join(mergedDir, "presets.json");
  if (!fs.existsSync(presetsPath)) {
    console.error(
      `No merged presets found at ${presetsPath}. Run update-storyblok-config first.`,
    );
    process.exit(1);
  }
  const localPresets = JSON.parse(fs.readFileSync(presetsPath, "utf-8"));
  console.log(
    `Loaded ${localPresets.length} local presets from ${presetsPath}`,
  );

  // The merge keeps the live CDN URL in a preset's `image`, so the local
  // screenshot path only survives in the generated config —
  // `update-storyblok-config` renames it to `presets.generated.json`.
  const generatedPath = [
    path.join("cms", "presets.generated.json"),
    path.join("cms", "presets.123456.json"),
  ].find((candidate) => fs.existsSync(candidate));

  const generatedScreenshots = new Map();
  if (generatedPath) {
    const generated = JSON.parse(fs.readFileSync(generatedPath, "utf-8"));
    for (const preset of generated.presets || generated) {
      const componentName = preset.preset?.component;
      generatedScreenshots.set(
        `${componentName}:${preset.name}`,
        preset.image || "",
      );
    }
    console.log(`Loaded screenshot paths from ${generatedPath}`);
  }

  // 2. Preflight: every referenced screenshot must exist in the built design
  // system, before any Storyblok call — `signedUpload()` tolerates an absent
  // file (it returns an empty URL), so without this guard a capture that was
  // never produced only surfaces as a preset without a thumbnail in the editor.
  const referencedScreenshots = new Set(
    [
      ...generatedScreenshots.values(),
      ...localPresets.map((preset) => preset.image),
    ].filter(isLocalPath),
  );
  const missingScreenshots = [...referencedScreenshots].filter(
    (image) => !fs.existsSync(path.join(SCREENSHOT_ROOT, image)),
  );
  if (missingScreenshots.length > 0) {
    console.error(
      `\n${missingScreenshots.length} preset screenshot(s) missing under ${SCREENSHOT_ROOT}:`,
    );
    for (const image of missingScreenshots) console.error(`  ${image}`);
    console.error(
      "\nBuild the design system and refresh the Storybook previews first:\n" +
        "  pnpm --filter @kickstartds/design-system capture-previews\n" +
        "  pnpm --filter @kickstartds/design-system build",
    );
    process.exit(1);
  }
  console.log(
    `Verified ${referencedScreenshots.size} local screenshots in ${SCREENSHOT_ROOT}`,
  );

  // 3. Fetch live presets and components from Storyblok
  console.log("Fetching live presets from Storyblok...");
  const livePresets = await fetchAllPresets(client);
  console.log(`  Found ${livePresets.length} live presets`);

  console.log("Fetching live components from Storyblok...");
  const liveComponents = await fetchAllComponents(client);
  console.log(`  Found ${liveComponents.length} live components`);

  // Build live preset lookup by name+component
  const liveByKey = new Map();
  for (const lp of livePresets) {
    const componentName =
      lp.preset && typeof lp.preset === "object"
        ? lp.preset.component
        : undefined;
    const key = `${componentName}:${lp.name}`;
    liveByKey.set(key, lp);
  }

  // 4. Determine which presets need image uploads
  const imageCache = new Map(); // local path → Storyblok CDN URL
  let screenshotFolderId = null;
  let demoContentFolderId = null;

  const needsUpload = [];
  for (const local of localPresets) {
    const componentName =
      local.preset && typeof local.preset === "object"
        ? local.preset.component
        : undefined;
    const key = `${componentName}:${local.name}`;
    const live = liveByKey.get(key);

    if (!live) continue; // preset not in Storyblok yet (will be pushed next time)

    // Check if the screenshot image needs uploading
    const localImage = generatedScreenshots.get(key) ?? local.image ?? "";
    if (
      isLocalPath(localImage) &&
      (await screenshotChanged(localImage, live.image, fetchImpl))
    ) {
      needsUpload.push({ local, live, localImage });
    }
  }

  console.log(
    `\n${needsUpload.length} presets need screenshot uploads (${localPresets.length - needsUpload.length} already have images or are not live yet)`,
  );

  // 5. Ensure asset folders exist
  if (needsUpload.length > 0) {
    console.log("\nEnsuring asset folders...");
    screenshotFolderId = await getOrCreateFolder(
      client,
      SCREENSHOT_FOLDER_NAME,
    );
    console.log(`  ${SCREENSHOT_FOLDER_NAME}: folder ${screenshotFolderId}`);
  }

  // 6. Upload screenshots and update presets
  let uploaded = 0;
  const skipped = [];

  for (let i = 0; i < needsUpload.length; i++) {
    const { local, live, localImage } = needsUpload[i];
    const label = `${local.name} (${local.preset?.component})`;

    process.stdout.write(`  [${i + 1}/${needsUpload.length}] ${label}...`);

    // Upload (or reuse cached URL)
    if (!imageCache.has(localImage)) {
      const result = await promiseThrottle.add(
        uploadScreenshot.bind(
          null,
          client,
          SPACE_ID,
          localImage,
          screenshotFolderId,
        ),
      );
      imageCache.set(localImage, result.url);
    }

    const cdnUrl = imageCache.get(localImage);
    if (!cdnUrl) {
      console.log(" upload failed");
      skipped.push(`${label} → ${localImage}`);
      continue;
    }

    // Update the preset's image in Storyblok
    await promiseThrottle.add(
      updatePreset.bind(null, client, live.id, { image: cdnUrl }),
    );
    uploaded++;
    console.log(" ✓");
  }

  // 7. Sync content images inside preset args
  //    Find all local image paths in preset data and upload them
  const contentImages = [];
  for (const local of localPresets) {
    traverse(local.preset, ({ parent, key, value, meta }) => {
      if (
        value &&
        typeof value === "string" &&
        (value.startsWith("img/") || value === "/logo.svg") &&
        !value.startsWith("http")
      ) {
        contentImages.push({ parent, key, value, presetName: local.name });
      }
    });
  }

  if (contentImages.length > 0) {
    if (!demoContentFolderId) {
      demoContentFolderId = await getOrCreateFolder(
        client,
        DEMO_CONTENT_FOLDER_NAME,
      );
    }

    const uniqueContentImages = [
      ...new Set(contentImages.map((ci) => ci.value)),
    ];
    console.log(
      `\nUploading ${uniqueContentImages.length} unique content images...`,
    );

    for (let i = 0; i < uniqueContentImages.length; i++) {
      const imagePath = uniqueContentImages[i];
      process.stdout.write(
        `  [${i + 1}/${uniqueContentImages.length}] ${imagePath}...`,
      );
      if (!imageCache.has(imagePath)) {
        const result = await promiseThrottle.add(
          uploadScreenshot.bind(
            null,
            client,
            SPACE_ID,
            imagePath,
            demoContentFolderId,
          ),
        );
        imageCache.set(imagePath, result.url);
        console.log(result.url ? " ✓" : " skipped");
      } else {
        console.log(" cached");
      }
    }

    // Now update preset args in live presets with the CDN URLs
    let contentUpdated = 0;
    for (const local of localPresets) {
      const componentName = local.preset?.component;
      const key = `${componentName}:${local.name}`;
      const live = liveByKey.get(key);
      if (!live) continue;

      // Check if any content image paths exist in this preset's live data
      let hasLocalImages = false;
      traverse(live.preset, ({ value }) => {
        if (
          value &&
          typeof value === "string" &&
          (value.startsWith("img/") || value === "/logo.svg")
        ) {
          hasLocalImages = true;
        }
      });

      if (!hasLocalImages) continue;

      // Replace local paths with CDN URLs in a copy of the live preset data
      const updatedPreset = JSON.parse(JSON.stringify(live.preset));
      traverse(updatedPreset, ({ parent, key: propKey, value }) => {
        if (value && typeof value === "string" && imageCache.has(value)) {
          parent[propKey] = imageCache.get(value);
        }
      });

      await promiseThrottle.add(
        updatePreset.bind(null, client, live.id, { preset: updatedPreset }),
      );
      contentUpdated++;
    }

    if (contentUpdated > 0) {
      console.log(`  Updated content images in ${contentUpdated} presets`);
    }
  }

  // 8. Sync component images (set each component's image to its preset screenshot)
  console.log("\nSyncing component preview images...");
  const liveComponentsByName = new Map();
  for (const comp of liveComponents) {
    liveComponentsByName.set(comp.name, comp);
  }

  // Build a map: componentName → preset screenshot CDN URL.
  //
  // This run's uploads come first: `livePresets` is the snapshot fetched before
  // any upload, so a component whose screenshot changed in this run would
  // otherwise be claimed with the preset's *previous* CDN URL — and the write
  // below would then skip it as already current, leaving the component preview
  // one run behind the preset preview.
  const componentImageMap = new Map();
  for (const { local, localImage } of needsUpload) {
    const componentName = local.preset?.component;
    if (!componentName || componentImageMap.has(componentName)) continue;
    // `localImage` is the key the upload stored the URL under (step 6).
    const cdnUrl = imageCache.get(localImage);
    if (cdnUrl) componentImageMap.set(componentName, cdnUrl);
  }
  // Components whose screenshots did not change this run keep their live
  // preset's image. The Management API returns those URLs protocol-relative
  // (`//a.storyblok.com/…`) as well as absolute, so accept both and reject a
  // local screenshot path — the `lp.image &&` guard stays, because an empty
  // image is not a local path either.
  for (const lp of livePresets) {
    const componentName = lp.preset?.component;
    if (!componentName || componentImageMap.has(componentName)) continue;
    if (lp.image && !isLocalPath(lp.image)) {
      componentImageMap.set(componentName, lp.image);
    }
  }

  let componentImagesUpdated = 0;
  const componentEntries = [...componentImageMap.entries()];
  for (let i = 0; i < componentEntries.length; i++) {
    const [componentName, imageUrl] = componentEntries[i];
    const comp = liveComponentsByName.get(componentName);
    if (!comp) continue;

    // Skip if the component already has this image
    if (comp.image === imageUrl) continue;

    process.stdout.write(
      `  [${i + 1}/${componentEntries.length}] ${componentName}...`,
    );
    await promiseThrottle.add(
      updateComponent.bind(null, client, comp.id, { image: imageUrl }),
    );
    componentImagesUpdated++;
    console.log(" ✓");
  }
  console.log(`  Updated ${componentImagesUpdated} component images`);

  // Summary
  console.log("\n--- Summary ---");
  console.log(`  Screenshots uploaded: ${uploaded}`);
  console.log(`  Screenshots skipped:  ${skipped.length}`);
  console.log(`  Content images:       ${imageCache.size}`);
  console.log(`  Component images:     ${componentImagesUpdated}`);

  if (skipped.length > 0) {
    console.error(
      `\n${skipped.length} preset(s) ended the run without a screenshot:`,
    );
    for (const entry of skipped) console.error(`  ${entry}`);
    console.error(
      "\nFix the missing uploads and re-run the sync; see the preset image" +
        " section of the README.",
    );
    process.exit(1);
  }

  console.log("Done!");
};

if (require.main === module) {
  sync()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Sync failed:", err);
      process.exit(1);
    });
}

module.exports = { sync };
