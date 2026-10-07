# ADR: Visual Regression Stays with Chromatic; `test` Stops Comparing Pixels

**Status:** Accepted
**Date:** 2026-09-20
**Context:** #63/#65 removed the `rm -rf __snapshots__` step that used to run before the
Storybook test-runner suite, which turned `pnpm -r run test` into a pixel-comparison gate against
the committed LFS baselines. Those baselines are only reproducible in a canonical environment.

## Decision

**Decision:** The Storybook test-runner asserts on image snapshots only when
`STORYBOOK_IMAGE_SNAPSHOTS=1` is set, and only `previews:capture` sets it. `test` builds and serves
Storybook, visits every story and fails on render errors, but performs no image comparison. Visual
regression comparison is Chromatic's job, in its canonical CI environment.

Implementation:

- `packages/design-system/.storybook/test-runner.tsx` — module-scope
  `const imageSnapshotsEnabled = process.env.STORYBOOK_IMAGE_SNAPSHOTS === "1";` (strict equality, so
  an ambient empty value cannot re-enable the assertion). At the end of `postVisit`, after the #64
  lazy-image settle step and the grace period, the hook returns early unless the flag is set. The
  `.preview--wrapper` injection (screenshot framing only), `page.screenshot()` and
  `toMatchImageSnapshot` live inside the gate.
- `packages/design-system/package.json` — `previews:capture` is
  `playwright install chromium && npx wait-on http://127.0.0.1:6006 && STORYBOOK_IMAGE_SNAPSHOTS=1 test-storybook --maxWorkers=8 --updateSnapshot`.
  Every other script (`test`, `test:server`, `test:suite`, `pretest`, `capture-previews`,
  `previews:copy`) is unchanged, so `capture-previews` keeps its exact behaviour: assert, write
  `__snapshots__/*.png`, copy them into `static/img/screenshots/`.

**Rationale:** Re-running the capture on one machine at one commit changed 74 files (37 stories) at
`--maxWorkers=8`, and comparison runs at `--maxWorkers=4` failed on 1, then 3, different stories
each time (`page-archetypes--overview`, `--jobs`, `--jobs-detail`, `video-curtain--color-neutral-text`
— a video frame at an arbitrary moment). That is Chromium/font environment drift and non-deterministic
stories, not the change under review, so gating merges on it fails for unrelated reasons. The capture
path still needs the assertion — `--updateSnapshot` writes the snapshot, but `toMatchImageSnapshot`
is what produces the comparison report and `updatePassedSnapshot` rewrite — so the gate belongs on
the assertion, not on the command. Chromatic already renders in a canonical environment and its CI
job exists.

**Consequence — reverses an earlier criterion:** The acceptance criterion merged with #65 ("CI's
`pnpm -r run test` performs a visual comparison against the committed baselines") no longer holds.
`test` is now a render smoke test only; its remaining signal is that every story renders without
throwing. Broken or 404 images no longer fail it — that failure mode moves to Chromatic.

**Consequence — no per-PR visual gate:** The Chromatic job is `needs: build` with
`if: github.event_name == 'push' && github.ref == 'refs/heads/main'` and `--exit-zero-on-changes`, so
it currently runs post-merge on `main` and never fails on a diff. Nothing blocks a visual regression
on a pull request. Making Chromatic a required PR check (run on `pull_request`, drop
`--exit-zero-on-changes`) is a separate CI policy decision and is not part of this change.

**Consequence — baselines stay tracked:** `__snapshots__/*.png` remain committed (LFS) and
`previews:copy` still reads them to refresh `static/img/screenshots/`, which Rollup ships and
`presets.json` references. "Locally captured images are not committed" is satisfied by the `test`
path no longer writing or rewriting PNGs, which is consistent with ADR-009 (locally regenerated LFS
visual artifacts are not committed as part of change batches). The "commit the updated files"
instructions for a deliberate preview refresh stay.

**Alternatives considered:**

- **Default the assertion to on and disable it in `test:suite`** (`STORYBOOK_IMAGE_SNAPSHOTS=0`) —
  rejected: it inverts the safe default. Any direct `test-storybook` invocation would then compare
  pixels against baselines captured elsewhere and fail on drift, which is the failure being removed.
- **Drop the assertion entirely and rely on `--updateSnapshot`** — rejected: `capture-previews`
  keeps its comparison and report; blanket removal changes the capture path too, which the ticket
  freezes.
- **Keep the comparison in `test` and raise the failure threshold / allow-list known-flaky stories**
  — rejected: still environment-dependent, and an allow-list would hide real regressions.
- **Fix the non-determinism (pin fonts, freeze the video frame) and keep the local gate** —
  rejected as out of scope: it duplicates Chromatic's canonical environment at high effort, and
  `video-curtain` captures an arbitrary video frame by design.
