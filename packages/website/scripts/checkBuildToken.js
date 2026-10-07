/**
 * Refuse to start a site build without the preview token `next build` needs.
 *
 * The `capture-site` chain runs this before `build-site`, so a missing token fails with the
 * message that says what to do instead of with Next's own build error. It stays out of
 * `build-site` itself, which keeps its meaning for a direct caller.
 */

const path = require("node:path");

process.chdir(path.resolve(__dirname, ".."));

require("@dotenvx/dotenvx").config({
  path: ".env.local",
  ignore: ["MISSING_ENV_FILE"],
  quiet: true,
});

if (!process.env.NEXT_STORYBLOK_API_TOKEN) {
  console.error(
    "capture-site: NEXT_STORYBLOK_API_TOKEN is not set; the site cannot be built, so there is nothing to picture"
  );
  process.exit(1);
}
