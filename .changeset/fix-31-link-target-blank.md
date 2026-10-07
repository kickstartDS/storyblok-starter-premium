---
"@kickstartds/design-system": patch
---

Honour the Storyblok multilink `target=_blank` toggle. The derived `newTab` flag is now
forwarded as `target="_blank" rel="noopener noreferrer"` by the nav (topbar, flyout,
dropdown), logo, footer column headings and legal link, blog teaser, event teasers, mosaic
tile buttons and business card. Blog teaser, teaser card and mosaic tile links also pass the
base Button's `href` prop again instead of `url`, so they render as anchors that can carry
the target instead of inert `<button>` elements.
