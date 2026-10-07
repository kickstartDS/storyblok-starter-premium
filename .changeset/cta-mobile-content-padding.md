---
"@kickstartds/design-system": patch
---

Keep `Cta`'s content box padding on mobile. A CTA without the content-padding toggle
(`padding: false`, the schema default - and the state every CTA in the Storyblok space
renders in, because the CMS hides the field) zeroed the box at every container width. On
desktop that is invisible: the image takes one half and the flex gap in front of the text
insets it from the card edge. Below a 640px container the CTA stacks, the image is
full-bleed, and the headline, subheadline and button sat flush against the card edge - the
homepage slider CTAs on the website, for instance. The zeroing now only applies at and above
the 640px container width, and only when the CTA has an image; a text-only CTA keeps its
flush box, as before. Desktop is unchanged.
