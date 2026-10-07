---
"@kickstartds/design-system": patch
---

Preview the Header and Footer as Dr. Hubert's header and footer.

The Header and Footer stories are the source of those two components' Storyblok preview images, so
they now carry the client's own content instead of the design system's placeholder: `static/logo.svg`
and `static/logo-inverted.svg` are byte copies of Dr. Hubert's Storyblok assets (space 303819, source
recorded in `src/themes/index.ts`), the Header story overrides `navItems` with the site's navigation,
and the Footer story carries the client's flat column navigation and copyright. The design system
still ships its own copy of the logo and carries no CMS reference.

`static/logo.svg` is shared with the Business Card and token-playground stories, so their snapshots
change with it; the schemas' own `examples` are untouched.
