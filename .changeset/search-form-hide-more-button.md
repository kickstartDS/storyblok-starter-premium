---
"@kickstartds/design-system": patch
---

Hide `SearchForm`'s "view all results" button whenever there are no hits to
show. The button, which carries the total hit count and is rendered when the
form has an `action` (as in the header's search modal), was only ever hidden by
the rendering that follows a successful search, so the last count stayed on
screen after the term was cleared - and after a term with no hits. Clearing the
input and closing the modal both reset the form, and both now drop the button
with the results.
