---
"@kickstartds/design-system": patch
---

Render `children` inside `NavFlyout`, so a consuming app can place its own content in the mobile
menu panel next to the navigation — e.g. the website's language switcher — without forking the
flyout markup. The children render after the nav list, inside the panel's `<nav>`.
