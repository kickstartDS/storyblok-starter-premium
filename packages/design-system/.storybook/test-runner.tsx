// .storybook/test-runner.ts
import {
  TestRunnerConfig,
  getStoryContext,
  waitForPageReady,
} from "@storybook/test-runner";
import { toMatchImageSnapshot } from "jest-image-snapshot";

const customSnapshotsDir = `${process.cwd()}/__snapshots__`;

// Pixel comparison is only reproducible in the canonical Chromatic environment, so the
// render smoke test (`test`) must not assert on images: comparisons there fail on
// environment drift. `previews:capture` is the one command that sets this, because it
// needs the assertion to write the snapshot PNGs.
const imageSnapshotsEnabled = process.env.STORYBOOK_IMAGE_SNAPSHOTS === "1";

// Upper bound for the lazy image settle step: a request that fires neither `load` nor
// `error` must not stall the suite.
const lazyImageSettleTimeout = 10000;

type LazySizesWindow = Window & {
  lazySizes?: { loader?: { unveil?: (element: Element) => void } };
};

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },

  async postVisit(page, story) {
    const context = await getStoryContext(page, story);
    await waitForPageReady(page);
    await page.setViewportSize(context.parameters.viewport);

    await page.evaluate(async (settleTimeout) => {
      // lazysizes only unveils elements that have a layout box, so an image the
      // viewport change left without one is never requested, and the slider's
      // autoheight then waits forever for its `lazyloaded` event. Start those loads
      // explicitly and wait for them, plus for the images already in flight.
      const lazySizes = (window as LazySizesWindow).lazySizes;
      const pending = Array.from(
        document.querySelectorAll(".lazyload, .lazyloading"),
      );
      const waiting = [
        ...pending,
        ...Array.from(document.images).filter((image) => !image.complete),
      ].map(
        (element) =>
          new Promise<void>((resolve) => {
            element.addEventListener("load", () => resolve(), { once: true });
            element.addEventListener("error", () => resolve(), { once: true });
            element.addEventListener("lazyloaded", () => resolve(), {
              once: true,
            });
          }),
      );
      pending.forEach((element) => lazySizes?.loader?.unveil?.(element));

      // `error` resolves as well: an image that fails to load must not stall the run —
      // when image snapshots are enabled it then fails the comparison below.
      await Promise.race([
        Promise.all(waiting),
        new Promise<void>((resolve) => setTimeout(resolve, settleTimeout)),
      ]);
    }, lazyImageSettleTimeout);

    await page.waitForTimeout(1000);

    if (!imageSnapshotsEnabled) return;

    await page.evaluate(() => {
      if (!document.querySelectorAll(".preview--wrapper").length) {
        const previewWrapper = document.createElement("div");
        previewWrapper.className = "preview--wrapper";
        const preview = document.createElement("div");
        preview.className = "preview";
        previewWrapper.appendChild(preview);
        while (document.body.firstChild) {
          preview.appendChild(document.body.firstChild);
        }
        document.body.appendChild(previewWrapper);
      }
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir,
      customSnapshotIdentifier: story.id,
      failureThresholdType: "percent",
      failureThreshold: 0.2,
      updatePassedSnapshot: true,
    });
  },
};
export default config;
