---
"@kickstartds/design-system": patch
---

Let `SearchForm`'s client move its hits and pagination into the element named by an optional
`data-results-container` attribute on the form. A page that puts the form on an inverted
background can point the attribute at a container on the default one — the search page does
this so that only the headline and the form itself stay on the bold, inverted band while the
results render below it, aligned with the headline. The form keeps rendering into the same
result list after the move; without the attribute, or when the selector matches nothing, the
hits stay inline as before.
