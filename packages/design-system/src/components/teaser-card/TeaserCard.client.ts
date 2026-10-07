// Registers the base kickstartDS "whole card clickable" behavior for
// `.c-teaser` markup (adds the `js-linked` class once a `.c-teaser__link a`
// anchor is found, which in turn gates the `.c-teaser.js-linked:hover`
// box-shadow rule).
//
// `TeaserCardComponent.tsx` imports `@kickstartds/base/lib/teaser-box`
// (React component only), which normally pulls in this registration too -
// but that import is only reachable from the React component bundle. The
// website's `scripts/bundleStaticAssets.js` builds a separate, React-free
// static client bundle by globbing `dist/components/**/*.client.js`, so the
// registration needs its own `*.client` entry point here to be picked up and
// actually ship to production (see teaser-card.scss / teaser.css for the
// `js-linked` hover styling this activates).
import "@kickstartds/base/lib/teaser/lazyTeaser.js";
