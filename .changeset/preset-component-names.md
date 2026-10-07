---
"@kickstartds/design-system": patch
---

Resolve React element `type` references to component display names when writing
`snippets.json`. Split-layout stories pass their slot content as JSX, so `type` was a
component object that `JSON.stringify` collapsed to `{}`; the Storyblok preset generator
could therefore not recover the child component. `dist/components/presets.json` now
carries the component names, letting presets be generated schema-clean.
