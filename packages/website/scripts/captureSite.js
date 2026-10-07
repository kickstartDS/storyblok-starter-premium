/**
 * Capture one route of the locally built site, for the pull-request automation.
 *
 * The automation publishes the illustration but cannot produce it: it is Python-stdlib-only and
 * ships no browser. So the capture is this command, which `[visual] web_command` names, and it
 * owns everything the automation will not — `npm run capture-site` builds the site first, this
 * script serves the build on a port of its own and tears that server down again.
 *
 * The image is an illustration only. A page has no committed baseline, so nothing is compared
 * and nothing is written into the repository: the single PNG goes to `OMP_VISUAL_OUT`, where the
 * automation picks it up as it is.
 *
 *   OMP_VISUAL_ROUTE  the route to capture; empty means the site root
 *   OMP_VISUAL_OUT    the directory the PNG is written into
 *   OMP_VISUAL_VIEWPORT  the viewport to capture at, `WIDTHxHEIGHT`; 1440x900 by default
 *   OMP_VISUAL_CLICK  a selector clicked once the page's runtime is up, for state that only
 *                     exists after an interaction — e.g. `.dsa-nav-toggle` for the mobile menu
 *
 * Exits non-zero with a message on stderr when nothing could be captured — the automation reads
 * that as "no illustration" and says so in the pull request instead of failing the run.
 */

const { spawn } = require("node:child_process");
const { once } = require("node:events");
const fs = require("node:fs");
const net = require("node:net");
const path = require("node:path");

const packageRoot = path.resolve(__dirname, "..");
process.chdir(packageRoot);

require("@dotenvx/dotenvx").config({
  path: ".env.local",
  ignore: ["MISSING_ENV_FILE"],
  quiet: true,
});

const { chromium } = require("playwright");

/** The server this command owns; 3210 is unused by every other script in the repository. */
const HOST = "127.0.0.1";
const PORT = 3210;
/** The desktop viewport a capture uses unless `OMP_VISUAL_VIEWPORT` asks for another one. */
const DEFAULT_VIEWPORT = { width: 1440, height: 900 };

/** A navigation, the started server answering, and the page's images settling. */
const NAVIGATION_TIMEOUT_MS = 30_000;
const SERVER_START_TIMEOUT_MS = 30_000;
const SETTLE_TIMEOUT_MS = 10_000;

/**
 * States a route only shows after an interaction, reached through the hook the page declares
 * itself — never through a query parameter invented for the capture.
 *
 * `hash` is the search pages' own `#q=<term>` hook: `SearchForm.updateFromHash()` fills the
 * field and runs the same search a visitor's typing runs, and the form's own submit writes the
 * same hash. `click` is an element the page marks as a panel's trigger, e.g.
 * `[data-topic="dsa.search-modal.open"]` on the header's search button.
 *
 * The terms are page names the site itself carries (`/kontakt`, `/en/contact`), so Pagefind has
 * something to match; the capture fails when a term returns no hits instead of writing a picture
 * of an empty result list.
 */
const ROUTE_STATES = {
  "/suche": { hash: "q=Kontakt" },
  "/en/search": { hash: "q=Contact" },
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** The message the automation needs on stderr when nothing could be captured, then a non-zero exit. */
const fail = (reason) => {
  console.error(`capture-site: ${reason}`);
  process.exit(1);
};

/** The automation's own naming rule: `/suche` -> `suche.png`, `/` -> `index.png`. */
const fileNameFor = (route) =>
  `${route.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "index"}.png`;

/** `WIDTHxHEIGHT` -> `{ width, height }`; anything else is the caller's mistake, not a default. */
const parseViewport = (value) => {
  const match = /^(\d+)x(\d+)$/.exec(value.trim());
  if (!match) fail(`OMP_VISUAL_VIEWPORT is not WIDTHxHEIGHT ("${value}")`);
  return { width: Number(match[1]), height: Number(match[2]) };
};

let server = null;
let spawnError = null;

/** The port must be free before the server starts, so a foreign site is never pictured. */
const assertPortFree = () =>
  new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.once("error", () =>
      reject(new Error(`port ${PORT} is already in use, so ${HOST}:${PORT} is not ours`))
    );
    probe.once("listening", () => probe.close(resolve));
    probe.listen(PORT, HOST);
  });

const waitForServer = async (url) => {
  const deadline = Date.now() + SERVER_START_TIMEOUT_MS;
  while (Date.now() < deadline) {
    if (spawnError) throw new Error(`could not start the site server (${spawnError.message})`);
    if (server.exitCode !== null) throw new Error(`the site server exited with ${server.exitCode}`);
    try {
      await fetch(url, { redirect: "manual" });
      return;
    } catch {
      await delay(250);
    }
  }
  throw new Error(`the site server did not answer ${url} within ${SERVER_START_TIMEOUT_MS / 1000}s`);
};

const stopServer = async () => {
  if (!server || server.exitCode !== null) return;
  try {
    process.kill(-server.pid, "SIGTERM");
  } catch {
    server.kill("SIGTERM");
  }
  await Promise.race([once(server, "exit"), delay(3_000)]);
  if (server.exitCode === null) {
    try {
      process.kill(-server.pid, "SIGKILL");
    } catch {
      // already gone
    }
  }
};

/** The page's client runtime (`public/_/client.js`) wires the components and unveils images. */
const waitForRuntime = async (page) => {
  try {
    await page.waitForFunction(() => Boolean(window._ks && window._ks.radio), {
      timeout: SETTLE_TIMEOUT_MS,
    });
  } catch {
    // Bounded and warning-only, like the design system's test-runner hook: a stale or missing
    // bundle degrades the picture, it must not hang the capture.
    console.error("capture-site: the page's client runtime never came up; capturing anyway");
  }
};

/** Proof that the page's own hook ran: the field it fills carries the term. */
const waitForHashState = async (page, hash) => {
  const term = new URLSearchParams(hash).get("q");
  try {
    await page.waitForFunction(
      (value) => document.querySelector(".dsa-search-bar__input input")?.value === value,
      term,
      { timeout: NAVIGATION_TIMEOUT_MS }
    );
  } catch {
    throw new Error(`the page's own #${hash} hook never filled the search field`);
  }
};

/**
 * Proof that Pagefind answered with hits. `SearchForm.renderResults()` appends one `li` per
 * result into `ol.dsa-search-form__results` and leaves it empty for a term that matches nothing,
 * so a term without hits would still capture the search state — just with an empty result list.
 * The capture fails instead of writing a picture of an empty search.
 */
const waitForSearchResults = async (page, hash) => {
  const term = new URLSearchParams(hash).get("q");
  try {
    await page.waitForFunction(
      () => document.querySelectorAll(".dsa-search-form__results > li").length > 0,
      undefined,
      { timeout: NAVIGATION_TIMEOUT_MS }
    );
  } catch {
    throw new Error(
      `Pagefind returned no hits for "${term}", so the captured search would be empty`
    );
  }
};

/**
 * Full-page shots leave everything below the fold blank unless the lazy images are started and
 * awaited first — the settling step of the design system's own screenshot hook. `error`
 * resolves as well, so an image that fails to load cannot stall the capture.
 */
const settleImages = async (page) => {
  await page.evaluate(async (settleTimeout) => {
    const pending = Array.from(document.querySelectorAll(".lazyload, .lazyloading"));
    const waiting = [
      ...pending,
      ...Array.from(document.images).filter((image) => !image.complete),
    ].map(
      (element) =>
        new Promise((resolve) => {
          element.addEventListener("load", () => resolve(), { once: true });
          element.addEventListener("error", () => resolve(), { once: true });
          element.addEventListener("lazyloaded", () => resolve(), { once: true });
        })
    );
    pending.forEach((element) => window.lazySizes?.loader?.unveil?.(element));

    await Promise.race([
      Promise.all(waiting),
      new Promise((resolve) => setTimeout(resolve, settleTimeout)),
    ]);
  }, SETTLE_TIMEOUT_MS);
  await page.waitForTimeout(1_000);
};

const capture = async (url, state, outDir, route, viewport) => {
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const response = await page.goto(url, {
      // `domcontentloaded`, not `load`: stylesheets are applied and the deferred module bundle
      // has run by then, so the waits below (fonts, the page's runtime, the lazy images) are
      // what the screenshot actually depends on — a third-party request that never settles can
      // hold `load` past the timeout.
      waitUntil: "domcontentloaded",
      timeout: NAVIGATION_TIMEOUT_MS,
    });
    if (!response) throw new Error(`nothing answered at ${url}`);
    if (response.status() >= 400) {
      throw new Error(`the route answered ${response.status()} (${url})`);
    }

    await page.evaluate(() => document.fonts.ready);
    await waitForRuntime(page);
    if (state?.click) await page.click(state.click, { timeout: NAVIGATION_TIMEOUT_MS });
    if (state?.hash) {
      await waitForHashState(page, state.hash);
      await waitForSearchResults(page, state.hash);
    }
    await settleImages(page);

    const shot = path.join(outDir, fileNameFor(route));
    await page.screenshot({ path: shot, fullPage: true });
    if (!fs.existsSync(shot) || !fs.statSync(shot).size) {
      throw new Error(`nothing was written to ${shot}`);
    }
    return shot;
  } finally {
    await browser.close();
  }
};

const main = async () => {
  const outDir = process.env.OMP_VISUAL_OUT;
  if (!outDir) fail("OMP_VISUAL_OUT is not set");
  if (!fs.existsSync(path.join(packageRoot, ".next/BUILD_ID"))) {
    fail("there is no site build in .next; `npm run capture-site` builds it first");
  }

  const route = (process.env.OMP_VISUAL_ROUTE || "").trim() || "/";
  const viewport = process.env.OMP_VISUAL_VIEWPORT
    ? parseViewport(process.env.OMP_VISUAL_VIEWPORT)
    : DEFAULT_VIEWPORT;
  // A selector on the command line replaces the route's own click hook: it is
  // the caller saying which panel of *this* route they want pictured. The
  // route's own hash state is not a click and stays as it is.
  const click = (process.env.OMP_VISUAL_CLICK || "").trim();
  const state = { ...ROUTE_STATES[route], ...(click ? { click } : {}) };
  const url = `http://${HOST}:${PORT}${route}${state?.hash ? `#${state.hash}` : ""}`;
  fs.mkdirSync(outDir, { recursive: true });

  await assertPortFree();
  // `output: "standalone"` (next.config.js) makes `next start` warn on the pinned Next 13.5.6
  // and fail outright from Next 14. The replacement is the standalone server the Dockerfile
  // runs — `node .next/standalone/packages/website/server.js` (outputFileTracingRoot is the
  // monorepo root, so the standalone tree mirrors the repo), with `.next/static` and `public`
  // copied beside it (the Pagefind index lives in `public/pagefind`) and PORT/HOSTNAME set.
  // The switch has to be exercised in a publish run: no other environment can build the site.
  server = spawn("next", ["start", "-p", String(PORT), "-H", HOST], {
    cwd: packageRoot,
    detached: true,
    stdio: "ignore",
  });
  server.on("error", (error) => {
    spawnError = error;
  });

  try {
    await waitForServer(url);
    console.log(await capture(url, state, outDir, route, viewport));
  } finally {
    await stopServer();
  }
};

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    stopServer().finally(() => {
      console.error(`capture-site: interrupted (${signal})`);
      process.exit(1);
    });
  });
}

main().catch((error) => {
  console.error(`capture-site: ${error.message}`);
  process.exitCode = 1;
});
