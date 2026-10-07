# ruhmesmeile Storyblok Website

A **Next.js 13** website powered by [Storyblok CMS](https://www.storyblok.com/) and the [kickstartDS](https://www.kickstartds.com/) design system (`@kickstartds/design-system`). Features ISR (Incremental Static Regeneration), Storyblok Visual Editor integration, AI-powered in-editor content generation, and a three-layer design token architecture.

## Quick Start

### Requirements

- **Node.js 24+** — `nvs use` or `nvm use` for automatic version selection
- **pnpm 9.15.0** — `corepack enable && corepack prepare pnpm@9.15.0 --activate`
- [`mkcert`](https://github.com/FiloSottile/mkcert#installation) — for local SSL (required for the Storyblok Visual Editor iframe)

### Environment Variables

Create `.env.local` (see `.env.local.sample`) with:

| Variable                     | Required     | Description                                                     |
| ---------------------------- | ------------ | --------------------------------------------------------------- |
| `NEXT_STORYBLOK_API_TOKEN`   | ✅           | Preview API token                                               |
| `NEXT_STORYBLOK_OAUTH_TOKEN` | ✅           | Management API token                                            |
| `NEXT_STORYBLOK_SPACE_ID`    | ✅           | Space ID (without `#`)                                          |
| `NEXT_OPENAI_API_KEY`        | For Prompter | OpenAI API key for AI content generation                        |
| `NEXT_PUBLIC_SITE_URL`       | For Prompter | Public site URL (used for API route calls in the Visual Editor) |

### Install & Run

```bash
# From the monorepo root
pnpm install
pnpm -r run build           # Build all packages (required before first dev run)
pnpm --filter website dev   # Start dev server with SSL proxy on :3010
```

Set Storyblok Visual Editor preview URL to `https://localhost:3010/api/preview/`

## Features

### Content Types

The website supports **7 content types** with full Visual Editor integration:

| Content Type      | Description                                              |
| ----------------- | -------------------------------------------------------- |
| **page**          | Standard section-based pages                             |
| **blog-post**     | Blog articles with head, aside, CTA, and SEO root fields |
| **blog-overview** | Blog listing page                                        |
| **event-detail**  | Event detail pages (flat/Tier 2)                         |
| **event-list**    | Event listing pages                                      |
| **search**        | Site search powered by [Pagefind](https://pagefind.app/) |
| **settings**      | Global settings (header, footer, SEO defaults)           |

### Design System Components

Over 30 components from `@kickstartds/design-system` are registered, including:

`blog-teaser` · `business-card` · `contact` · `content-nav` · `cta` · `divider` · `downloads` · `faq` · `features` · `gallery` · `headline` · `hero` · `html` · `image-story` · `image-text` · `logos` · `mosaic` · `section` · `slider` · `split-even` · `split-weighted` · `stats` · `teaser-card` · `testimonials` · `text` · `video-curtain`

Plus custom local components: `prompter` · `info-table`

### Prompter (In-Editor AI Generation)

The **Prompter** component enables AI content generation directly inside Storyblok's Visual Editor. Editors place a Prompter inside a section, enter a prompt, and generate content via OpenAI — all without leaving the editor.

- **Section mode**: Generate a single section by picking a component type and entering a prompt
- **Page mode**: AI plans a multi-section page structure, generates each section sequentially, and imports them all at once
- **CMS-configurable**: Default mode, allowed component types, content type, and upload behavior are all configurable as Storyblok fields

### Design Token Architecture

A three-layer token system with five pre-built color themes:

| Layer     | Prefix         | Location                   | Description                               |
| --------- | -------------- | -------------------------- | ----------------------------------------- |
| Branding  | `--ks-brand-*` | `token/branding-token.css` | Core brand values                         |
| Semantic  | `--ks-*`       | `token/*.scss`             | Purpose-based tokens referencing branding |
| Component | `--dsa-*`      | `token/component-token/`   | Component-specific customizations         |

**Pre-built themes**: default, burgundy, coffee, mint, neon, water

Per-page token overrides are also supported — stories can carry inline CSS custom properties for page-level theming.

### Provider Hierarchy

The app shell wraps all pages in a layered provider stack:

```
LanguageProvider → BlurHashProvider → DsaProviders → ComponentProviders → ImageSizeProviders → ImageRatioProviders
```

`ComponentProviders` supplies custom implementations for `Picture`, `Link`, and various kickstartDS contexts.

### Additional Features

- **ISR (Incremental Static Regeneration)** with Storyblok webhook-triggered revalidation
- **Storyblok Visual Editor** with live preview via `editable()` HOC
- **Hero section extraction** — detects a hero starting the page and renders it outside the page's `<main>`, below the breadcrumb trail
- **BlurHash image placeholders** — pre-generated for all images
- **Breadcrumb with JSON-LD** — auto-generated from URL path segments with Schema.org structured data
- **Markdown endpoint** — every page is also available as Markdown (via middleware that rewrites `.md` URLs)
- **Global/GlobalReference system** — reusable content blocks that can be referenced across pages
- **Header/footer inversion** — per-page toggle fields override global dark/light settings
- **Consent management** via [c15t](https://github.com/nickreese/c15t)
- **Dynamic imports** — nearly all content components use `next/dynamic` for code splitting
- **Sitemap generation** via `next-sitemap`
- **Client-side search** via Pagefind

## API Routes

| Route                            | Method | Description                                             |
| -------------------------------- | ------ | ------------------------------------------------------- |
| `/api/preview`                   | GET    | Enter Storyblok preview/draft mode                      |
| `/api/exit-preview`              | GET    | Exit preview mode                                       |
| `/api/up`                        | GET    | Health check                                            |
| `/api/markdown`                  | GET    | Render any page as Markdown                             |
| `/api/prompter/story`            | GET    | Fetch a story by UID (server-side proxy)                |
| `/api/prompter/patterns`         | GET    | Fetch content patterns (component frequency, sequences) |
| `/api/prompter/recipes`          | GET    | Fetch section recipes and anti-patterns                 |
| `/api/prompter/plan`             | POST   | AI-assisted page structure planning                     |
| `/api/prompter/generate-section` | POST   | Generate a single section with site-aware context       |
| `/api/prompter/import`           | POST   | Import generated content into Storyblok                 |
| `/api/prompter/ideas`            | GET    | Fetch Storyblok Ideas                                   |

## Build Pipeline

The `build` script runs the following steps in order:

1. **`build-tokens`** — Compile design tokens via Style Dictionary
2. **`extract-tokens`** — Extract component tokens and calculate CSS properties
3. **`blurhashes`** — Generate BlurHash placeholders for all images
4. **`bundle-static-assets`** — Bundle static assets via esbuild
5. **`next build`** — Next.js production build
6. **`next-sitemap`** — Generate sitemap XML
7. **`pagefind`** — Index the built site for client-side search

## CMS Sync Commands

```bash
pnpm --filter website update-storyblok-config  # Full workflow: generate → rename → pull → merge → push → sync
pnpm --filter website push-components          # Push merged config from cms/merged/ to Storyblok
pnpm --filter website pull-content-schema      # Pull schema from Storyblok → types/
pnpm --filter website create-storyblok-config  # Regenerate CMS config from JSON schemas
pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter check-presets  # Validate the generated presets against the generated component config
pnpm --filter website generate-content-types   # Pull + generate TypeScript types
```

`merge-storyblok-config` keeps the live preset `id` and the live Storyblok CDN `image` for presets
that still exist, and takes the regenerated body. The generated body must keep the live CDN URL
because the CLI pushes the preset record verbatim: a local `img/screenshots/…` path would break the
preset previews. `update-storyblok-config` therefore runs `sync-preset-images` after
`push-components`: it uploads screenshots that changed and points the live presets at the new CDN
URLs (the local screenshot path is read from the generated config). The same run points each owning
component's preview `image` at the screenshot it uploaded — a component whose screenshot did not
change keeps its preset's live CDN URL — so one run leaves the component preview and the preset
preview agreeing, with no second run needed. It has to run after the push — the push writes the
merged presets verbatim, so a sync before it would be overwritten.

`sync-preset-images` fails loudly instead of finishing silently. Before it touches the API it checks
that every screenshot referenced by the generated presets exists under
`node_modules/@kickstartds/design-system/dist/static` (the directory `signedUpload()` reads) and
aborts with the missing paths; at the end it exits non-zero, listing the presets, when a preset that
needs a preview ends the run without a CDN image. A preset whose preview was never captured or
uploaded is a failed sync, not a warning — the editor only shows a thumbnail once this credentialed
run has uploaded the screenshot. The required order is therefore: design system build
(`capture-previews` → `build`) → `update-storyblok-config` (merge → push → `sync-preset-images`).
The `presets` step of the design system build asserts that every story has a captured screenshot
under `static/img/screenshots`, so a new or renamed story without refreshed previews fails the build
instead of shipping a preset without a thumbnail. The preflight runs before the first API call, so
`NEXT_STORYBLOK_SPACE_ID=123456 NEXT_STORYBLOK_OAUTH_TOKEN=<dummy> node scripts/syncPresetImages.js`
rehearses it offline without touching the space.

`check-presets` validates `cms/presets.123456.json` against `cms/components.123456.json` and fails
when a preset references a component or field that the component config does not define. Run it
after regenerating the config; the CI step that would enforce it is not wired yet, because the
automation's credential cannot push changes under `.github/workflows/`.

## Data Flow

```
Storyblok CMS → storyblok.ts (fetch/transform) → unflatten() → React Components
```

- **Storyblok stores flattened props** (e.g., `image_src`, `image_alt`) which get transformed via `unflatten()` into nested objects (`{ image: { src, alt } }`)
- **Story processing** in `helpers/storyblok.ts` handles asset URLs, link resolution, global references, empty image cleanup, and number coercion — all schema-driven

## Deployment

### Kamal (Docker)

The website deploys via [Kamal](https://kamal-deploy.org/) using the config at `config/deploy.yml`:

```bash
kamal deploy          # Deploy to production
kamal setup           # First-time server setup
```

### Netlify

A `netlify.toml` configuration is included. Set the required environment variables in the Netlify dashboard and deploy as a standard Next.js site.

## Creating Branded Component Previews

The design system (now inlined in `packages/design-system/`) includes a screenshot pipeline that captures visual snapshots from Storybook stories. These are uploaded to Storyblok during `init` to serve as component previews in the Visual Editor.

### How it works

```
capture-previews → build-storybook → test-storybook --updateSnapshot (records __snapshots__/*.png)
                                   → previews:copy (copies to static/img/screenshots/)
                                   → build (Rollup copies static/ → dist/static/)
                                   → presets (generates snippets.json referencing img/screenshots/{story.id}.png)
```

### Regenerate after adding or renaming stories

```bash
cd packages/design-system
pnpm run capture-previews
pnpm -r run build
```

Commit the updated files in `__snapshots__/` and `static/img/screenshots/` (tracked via Git LFS).

`pnpm run test` in `packages/design-system` is the render smoke test: it builds and serves Storybook, runs every story and fails on render errors. It does not compare images — visual regression stays with the Chromatic CI job, which renders in a canonical environment.

### A component thumbnail is its story

The preset `image` is the story screenshot (`img/screenshots/<story-id>.png` from
`capture-previews`), so a component preview can only show what its story renders. A story that
spreads the schema args renders the design system's demo content — the schema's `examples` and the
`Systemics` logo — and a component story carries no space content, so such a preview never
resembles this site. A component whose preview should look like the client's own therefore carries
that content in its story:

- **Logo.** `packages/design-system/static/logo.svg` and `logo-inverted.svg` are byte copies of
  Dr. Hubert's own Storyblok assets (`logo-hubert.svg` / `logo-hubert-inverted.svg`, space
  `303819`); the source URLs are recorded in `src/themes/index.ts`. Keep the file names — the
  design system stays stand-alone (no CMS reference in code), and `sync-preset-images` only
  recognises the literal `/logo.svg` among preset args when it uploads the content images.
  `static/logo.svg` is shared: the `Layout/Header` and `Layout/Footer` stories are the ones this
  issue was about, but the three `Corporate/Business Card` stories and the
  `Token/Playground → Spacing` story render it too, so replacing the asset refreshes those
  previews as well.
- **Navigation.** `Header.stories.tsx` overrides `navItems` and `Footer.stories.tsx` its
  `navGroups`; the schema `examples` in `nav-main.schema.json` stay the component's published demo.
- **Per-page states** (`inverted`, `floating`), the search field and the language switcher live in
  the website's providers and are not part of a thumbnail: a preview is a representative
  rendering of the component, not a capture of a route of the site.

The path that refreshes a preview is therefore: edit the story (or the shared asset) → run
`capture-previews` → commit `__snapshots__/` and `static/img/screenshots/` → build → re-install →
run the credentialed `update-storyblok-config` (see [CMS Sync Commands](#cms-sync-commands)). No
asset is uploaded by hand, and nothing in Storyblok changes before that credentialed run. The
re-install is not optional: `injectWorkspacePackages` copies the package into `node_modules`, and
the build starts with `rm -rf dist`, so until the install re-injects it both the preset generator
and `sync-preset-images` keep reading the previously injected screenshots and preset bodies.

### Update previews in Storyblok

```bash
pnpm --filter @kickstartds/ruhmesmeile-storyblok-starter run update-storyblok-config
```

The credentialed, operator-run step: it pushes the merged config and then `sync-preset-images`
uploads the changed screenshots and the `/logo.svg` referenced by preset args, and repoints the
presets and their components at the uploaded assets.

## Capturing a Page for a Pull Request

The pull-request automation pictures a change by running the repository's own command for the
surface it touched — the design system's `capture-previews` for stories, and this one for a route
of the built site:

```bash
OMP_VISUAL_ROUTE=/suche OMP_VISUAL_OUT=/tmp/omp-visual \
  npx --yes pnpm@10.30.3 --filter @kickstartds/ruhmesmeile-storyblok-starter run capture-site
```

The automation names it in the `[visual]` section of the automation config:

```toml
[visual]
web_command = "npx --yes pnpm@10.30.3 --filter @kickstartds/ruhmesmeile-storyblok-starter run capture-site"
```

The command owns the whole capture. It builds the site (`build-site` is `build` without its two
CMS-writing steps, `sync-default-theme` and `blurhashes`, which need an
`NEXT_STORYBLOK_OAUTH_TOKEN`), serves the build on `127.0.0.1:3210`, screenshots the route as a
full page at 1440x900, and stops the server again. Nothing is written into the repository and
nothing is compared: a page has no committed baseline, so the image is an illustration that the
pull request shows as it is.

| Variable              | Meaning                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| `OMP_VISUAL_ROUTE`    | the route to capture; empty means the site root                                                   |
| `OMP_VISUAL_OUT`      | the directory the PNG is written into                                                             |
| `OMP_VISUAL_VIEWPORT` | the viewport to capture at, `WIDTHxHEIGHT`; `1440x900` by default                                 |
| `OMP_VISUAL_CLICK`    | a selector clicked once the page's runtime is up, for state that only exists after an interaction |

The file is named after the route with the leading slash dropped and everything unsafe replaced:
`/suche` becomes `suche.png`, `/` becomes `index.png`. One PNG is written per captured view. The
command exits non-zero with a message on stderr when nothing could be captured — the automation
reports that as "no illustration" instead of failing the run.

`NEXT_STORYBLOK_API_TOKEN` has to be in the environment (or in the local env file): without it
`next build` cannot fetch a single route. `checkBuildToken.js` runs before the build in the
`capture-site` chain and fails with that message, so a missing token never surfaces as Next's own
build error. The browser comes from the website's own `playwright` dependency.

A route whose changed state only exists after an interaction is reached through the hook the page
declares itself, never through a URL parameter invented for the capture: `/suche` and
`/en/search` use the search form's own `#q=<term>` hash, the mechanism `SearchForm` wires to
`hashchange`. A hook that never materialises fails the command rather than writing a picture of
the wrong state.

The search terms are the site's own page names — `Kontakt` for `/suche`, `Contact` for
`/en/search` (`/kontakt`, `/en/contact` in `helpers/i18n.ts`) — and the capture asserts Pagefind
returned at least one result for the term. A term that stops matching fails the command with the
term named, instead of writing a picture of an empty result list; pick a new term from the page's
content and put it in `SEARCH_TERMS` when the site's copy or the Pagefind index changes.

The header's mobile menu is the case `OMP_VISUAL_VIEWPORT` and `OMP_VISUAL_CLICK` exist for: it
only exists below `62rem`, and it only shows once its own toggle is clicked.

```bash
OMP_VISUAL_ROUTE=/ OMP_VISUAL_VIEWPORT=390x844 OMP_VISUAL_CLICK=.dsa-nav-toggle \
  OMP_VISUAL_OUT=/tmp/omp-visual \
  npx --yes pnpm@10.30.3 --filter @kickstartds/ruhmesmeile-storyblok-starter run capture-site
```

## Content Schema & Migrations

### TypeScript Types

Generated types live in `types/components-schema.d.ts`. Regenerate with:

```bash
pnpm --filter website generate-content-types
```

### Migrations

Follow [Storyblok's Best Practices](https://www.storyblok.com/tp/storyblok-cli-best-practices#modify-blok-structure) when changing the content schema.

## License

This project is licensed under either of

- [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0) ([LICENSE-APACHE](../../LICENSE-APACHE))
- [MIT license](https://opensource.org/license/mit/) ([LICENSE-MIT](../../LICENSE-MIT))

at your option.
