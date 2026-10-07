/**
 * syncPresetImages.test.js
 *
 * Stubbed-client check for the component preview sync (step 8): a run that
 * uploads a changed screenshot must point the owning component at the URL it
 * just uploaded — not at the preset's previous CDN URL — so one run leaves the
 * component preview and the preset preview agreeing, and a second run over the
 * updated space writes nothing. A run with nothing to upload must still repoint
 * every component that trails its first live preset's image.
 *
 * The fixtures live in a temp directory the test chdirs into, because the
 * script reads its config and its screenshots relative to the working
 * directory. Client, asset upload and `fetch` are injected, so nothing leaves
 * the machine.
 */

const { after, test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const SPACE_ID = "123456";
const SCREENSHOTS = "img/screenshots";
// The Management API returns preset image URLs protocol-relative, which is the
// shape the component-image fallback has to accept.
const CDN = "//a.storyblok.com/f/1";

// The header preset whose screenshot changed: the live preset and the component
// both still carry the previous CDN URL, which is the state the reported run
// observed as `Updated 0 component images`.
const HEADER_STALE_IMAGE = `${CDN}/layout-header--header-old.png`;
const HEADER_UPLOADED_IMAGE = `${CDN}/layout-header--header.png`;
// The header's other preset and the footer's preset did not change.
const HEADER_MINIMAL_IMAGE = `${CDN}/layout-header--minimal.png`;
const FOOTER_IMAGE = `${CDN}/layout-footer--footer.png`;
// An older image a component may still be carrying, never fetched.
const FOOTER_STALE_IMAGE = `${CDN}/layout-footer--footer-old.png`;

// `hashRemote()` fetches a protocol-relative URL as `https:…`.
const fetchUrl = (image) =>
  image.startsWith("//") ? `https:${image}` : image;

const localScreenshots = {
  "layout-header--header.png": Buffer.from("header screenshot with the new nav"),
  "layout-header--minimal.png": Buffer.from("header screenshot, minimal"),
  "layout-footer--footer.png": Buffer.from("footer screenshot"),
};

const remoteScreenshots = {
  [fetchUrl(HEADER_STALE_IMAGE)]: Buffer.from(
    "header screenshot before the nav change",
  ),
  [fetchUrl(HEADER_MINIMAL_IMAGE)]:
    localScreenshots["layout-header--minimal.png"],
  [fetchUrl(FOOTER_IMAGE)]: localScreenshots["layout-footer--footer.png"],
  // What run 1 uploads is served at the URL it wrote, so run 2 sees no change.
  [fetchUrl(HEADER_UPLOADED_IMAGE)]:
    localScreenshots["layout-header--header.png"],
};

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const originalCwd = process.cwd();
const root = fs.mkdtempSync(path.join(os.tmpdir(), "sync-preset-images-"));

const writeFile = (relativePath, content) => {
  const file = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};

for (const [name, bytes] of Object.entries(localScreenshots)) {
  writeFile(
    path.join(
      "node_modules",
      "@kickstartds",
      "design-system",
      "dist",
      "static",
      SCREENSHOTS,
      name,
    ),
    bytes,
  );
}

const preset = (id, name, component, image) => ({
  id,
  name,
  preset: { _uid: `uid-${id}`, component },
  image,
});

// The live space. Mutated between the runs the way Storyblok would after run 1.
const space = {
  headerPresetImage: HEADER_STALE_IMAGE,
  headerComponentImage: HEADER_STALE_IMAGE,
  footerComponentImage: "",
};

const mergedPresets = () => [
  preset(11, "Default", "header", space.headerPresetImage),
  preset(12, "Minimal", "header", HEADER_MINIMAL_IMAGE),
  preset(13, "Default", "footer", FOOTER_IMAGE),
];

// The generated config keeps the local screenshot paths; the merged config keeps
// the live CDN URLs (see mergeStoryblokConfig.ts).
const screenshotPath = (name) => `${SCREENSHOTS}/${name}.png`;

const writeConfig = () => {
  writeFile(
    path.join("cms", "presets.generated.json"),
    JSON.stringify({
      presets: [
        preset(1, "Default", "header", screenshotPath("layout-header--header")),
        preset(2, "Minimal", "header", screenshotPath("layout-header--minimal")),
        preset(3, "Default", "footer", screenshotPath("layout-footer--footer")),
      ],
    }),
  );
  writeFile(
    path.join("cms", "merged", "components", SPACE_ID, "presets.json"),
    JSON.stringify(mergedPresets()),
  );
};

writeConfig();

process.env.NEXT_STORYBLOK_SPACE_ID = SPACE_ID;
process.env.NEXT_STORYBLOK_OAUTH_TOKEN = "test-token";
process.chdir(root);

const { sync } = require("./syncPresetImages");

after(() => {
  process.chdir(originalCwd);
  fs.rmSync(root, { recursive: true, force: true });
});

// ---------------------------------------------------------------------------
// Stubs
// ---------------------------------------------------------------------------

const createClient = () => {
  const calls = [];
  return {
    calls,
    async get(url) {
      calls.push({ method: "get", url });
      if (url === `spaces/${SPACE_ID}/presets`) {
        return { data: { presets: mergedPresets() } };
      }
      if (url === `spaces/${SPACE_ID}/components`) {
        return {
          data: {
            components: [
              { id: 100, name: "header", image: space.headerComponentImage },
              { id: 101, name: "footer", image: space.footerComponentImage },
            ],
          },
        };
      }
      if (url === `spaces/${SPACE_ID}/asset_folders/`) {
        return {
          data: { asset_folders: [{ id: 7, name: "Component Screenshots" }] },
        };
      }
      throw new Error(`unexpected GET ${url}`);
    },
    async put(url, body) {
      calls.push({ method: "put", url, body });
      return { data: {} };
    },
  };
};

const createUpload = () => {
  const uploads = [];
  return {
    uploads,
    async upload(client, spaceId, fileName) {
      uploads.push(fileName);
      return { id: 99, url: HEADER_UPLOADED_IMAGE };
    },
  };
};

const fetchScreenshot = async (url) => {
  const bytes = remoteScreenshots[url];
  if (!bytes) throw new Error(`unexpected fetch ${url}`);
  return {
    ok: true,
    arrayBuffer: async () =>
      bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
  };
};

const writes = (client) => client.calls.filter((call) => call.method === "put");

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test("one run points the component at the screenshot it uploaded", async () => {
  const client = createClient();
  const { uploads, upload } = createUpload();

  await sync({ client, uploadScreenshot: upload, fetchImpl: fetchScreenshot });

  assert.deepEqual(uploads, [`${SCREENSHOTS}/layout-header--header.png`]);
  assert.deepEqual(writes(client), [
    {
      method: "put",
      url: `spaces/${SPACE_ID}/presets/11`,
      body: { preset: { image: HEADER_UPLOADED_IMAGE } },
    },
    {
      method: "put",
      url: `spaces/${SPACE_ID}/components/100`,
      body: { component: { image: HEADER_UPLOADED_IMAGE } },
    },
    {
      method: "put",
      url: `spaces/${SPACE_ID}/components/101`,
      body: { component: { image: FOOTER_IMAGE } },
    },
  ]);
});

test("a second run over the updated space writes nothing", async () => {
  // What run 1 left behind: the preset and the component carry the uploaded URL.
  space.headerPresetImage = HEADER_UPLOADED_IMAGE;
  space.headerComponentImage = HEADER_UPLOADED_IMAGE;
  space.footerComponentImage = FOOTER_IMAGE;
  writeConfig();

  const client = createClient();
  const { uploads, upload } = createUpload();

  await sync({ client, uploadScreenshot: upload, fetchImpl: fetchScreenshot });

  assert.deepEqual(uploads, []);
  assert.deepEqual(writes(client), []);
});

test("a no-upload run repoints every component behind its preset", async () => {
  // The presets are current, so this run uploads nothing — the reported
  // `Updated 0 component images` state — while both components still carry
  // older images.
  space.headerPresetImage = HEADER_UPLOADED_IMAGE;
  space.headerComponentImage = HEADER_STALE_IMAGE;
  space.footerComponentImage = FOOTER_STALE_IMAGE;
  writeConfig();

  const client = createClient();
  const { uploads, upload } = createUpload();

  await sync({ client, uploadScreenshot: upload, fetchImpl: fetchScreenshot });

  assert.deepEqual(uploads, []);
  assert.deepEqual(writes(client), [
    {
      method: "put",
      url: `spaces/${SPACE_ID}/components/100`,
      body: { component: { image: HEADER_UPLOADED_IMAGE } },
    },
    {
      method: "put",
      url: `spaces/${SPACE_ID}/components/101`,
      body: { component: { image: FOOTER_IMAGE } },
    },
  ]);
});
