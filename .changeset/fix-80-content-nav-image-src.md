---
"@kickstartds/design-system": patch
---

Declare `content-nav`'s `image.src` with `format: "image"` instead of
`format: "uri"`. The Storyblok config generator derives the editor field type
from that keyword, so the field was emitted as a `multilink` (a link picker with
an asset option) even though what the CMS stores for it is asset-shaped — every
other image `src` in the design system already uses `format: "image"` and is
emitted as an `asset` field. The `links[].url` field is a real link and stays
`format: "uri"`.

The schema change alone does not change the editor: the live Storyblok space
keeps the `multilink` field until the merged CMS config is pushed
(`pnpm --filter website update-storyblok-config`, which needs the OAuth token),
so that generate → merge → push step and the content pass
(`migrate-content-nav-image`) are still outstanding. A field type flip does not
migrate stored content either, hence the same-run content pass.
