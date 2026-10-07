// EventListTeaserComponent.tsx renders `TagLabel` from `@kickstartds/base`,
// which relies on the vanilla-JS `TagLabel` behavior (`base.tag-label`) for
// its remove-button click handling. That registration is only reachable from
// the React component bundle normally, so it needs its own `*.client` entry
// point here to ship in the website's React-free static client bundle (see
// bundleStaticAssets.js).
import "@kickstartds/base/lib/tag-label/lazyTagLabel.js";
