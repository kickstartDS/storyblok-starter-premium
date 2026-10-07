---
"@kickstartds/design-system": patch
---

Show an identical search hit only once. Pagefind builds a page's excerpt from
the region its best match sits in, and the excerpt of the section holding that
region from the same region, so the result list showed the same text twice: as
the non-indented page hit and again as one of its indented section hits. The
pagefind client now drops a sub-hit whose excerpt repeats the text of an
earlier hit of the same page, comparing the text a visitor sees - highlight
markup stripped, whitespace collapsed. A hit whose excerpt is its own stays
visible, and so does a section hit that only repeats a heading.
