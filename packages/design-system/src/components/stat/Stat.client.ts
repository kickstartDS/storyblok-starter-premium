// StatComponent.tsx renders `CountUp` from `@kickstartds/content`, which
// relies on the vanilla-JS `CountUp` behavior (`content.count-up`) to animate
// the number when it scrolls into view. That registration is only reachable
// from the React component bundle normally, so it needs its own `*.client`
// entry point here to ship in the website's React-free static client bundle
// (see bundleStaticAssets.js).
import "@kickstartds/content/lib/count-up/lazyCountUp.js";
