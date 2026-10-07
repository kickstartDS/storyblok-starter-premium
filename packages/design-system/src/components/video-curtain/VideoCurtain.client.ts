// VideoCurtainComponent.tsx renders `VisualContextDefault` from
// `@kickstartds/content`, which relies on the vanilla-JS `Visual` behavior
// (`content.visual`) for its background-video play/pause-on-intersection and
// "continue" scroll button. That registration is only reachable from the
// React component bundle normally, so it needs its own `*.client` entry point
// here to ship in the website's React-free static client bundle (see
// bundleStaticAssets.js).
import "@kickstartds/content/lib/visual/lazyVisual.js";
