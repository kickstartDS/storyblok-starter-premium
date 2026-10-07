---
"@kickstartds/design-system": minor
"@kickstartds/storyblok-services": patch
---

Point the `buttons` array of `hero`, `cta` and `video-curtain` at the canonical
`button` schema (`$ref` to `button.schema.json`) instead of restating an inline
label+url subset.

The inline shape had no `$id`, so the Storyblok config generator resolved it to a
blok named after the property (`buttons`) rather than to the canonical `button`
component — which is why the hero's buttons lost the `icon` the button schema
already exposed. The generated prop types follow: the item type is now
`ButtonProps`, so `variant`, `size`, `disabled` and `type` become available on
hero/cta/video-curtain buttons.

`injectRootFieldComponentTypes` now names array-of-objects items after the item
schema's `$id` when that schema is one the Storyblok config generator emits as a
standalone component, and after the property name otherwise — the same rule the
generator applies (a nested bloks field like `blog-head.tags` is emitted as
`tags`, not as the `blog-tag` schema it references). The set comes from the new
`collectStandaloneComponents()`, derived from the content type schema. With the
`$ref` above, root-field generation (`generate_root_field`) emits
`component: "button"` for `cta.buttons` instead of `component: "buttons"`, which
is what the schema-derived validation rules for that slot require.
