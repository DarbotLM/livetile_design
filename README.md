# LiveTile Design

LiveTile Design is a Vite, React, and TypeScript workspace for building and reviewing adaptive dashboard tile layouts. The app includes a tile schema catalog, design-system components, curated gallery evidence, asset coverage tracking, local HTML review pages, and optional bridge API integration for live viewport-grid telemetry.

## Features

- React 19 canvas for composing and inspecting LiveTile layouts.
- Typed catalog covering 19 renderable slide tiles and 23 FlipCard reference tiles.
- Asset coverage registry for HTML entries, bundled templates, Unovis examples, Adaptive Card samples, API/runtime integrations, and tile-spec artifacts.
- Vite build configured for single-file HTML output.
- Gallery tab for browsing curated bakeoff image evidence stored in `lib/img/`.
- Local review artifacts for breakpoint testing, tile specs, FlipCard pattern libraries, Unovis galleries, and viewport-grid prototypes.
- Bridge API documentation for polling local telemetry and agent state.

## Getting started

Use Node.js 22, then install dependencies from the lockfile:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Preview a production build:

```bash
npm run preview
```

## GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/pages.yml`. On every push to `master`, the workflow installs dependencies, runs `npm run build`, uploads `dist/`, and deploys the site to GitHub Pages at [darbotlm.github.io/livetile_design](https://darbotlm.github.io/livetile_design/).

The deployed app includes a `Gallery` tab that loads curated bakeoff screenshots from `lib/img/`, plus a coverage view powered by `src/tiles/galleryAssetCoverage.ts`. Keep source images in `lib/img/` and review HTML artifacts in `lib/MVP_proto/` so they remain available for future gallery and documentation work.

## Project structure

| Path | Description |
| --- | --- |
| `src/canvas/` | Canvas, settings, theme, and template browser UI. |
| `src/engines/` | FlipCard/LiveTile runtime helpers that project templates into front/back card models. |
| `src/shared/` | Shared tile schemas, catalog metadata, curated gallery data, templates, sample data, themes, and types. |
| `src/tiles/` | Tile renderer, individual tile implementations, tile-spec components, and asset coverage registry. |
| `docs/` | Component catalog, asset coverage notes, coordinate-system notes, bakeoff summary, and bridge API documentation. |
| `lib/` | Reusable browser helpers, viewport/export utilities, MVP HTML review artifacts, and image evidence. |
| `lib/img/` | Image assets used by the curated gallery and documentation artifacts. |
| `lib/MVP_proto/` | Preserved static review artifacts mirrored from earlier root HTML prototypes. |

## Documentation

- `docs/LIVETILE-CATALOG.md` describes the available tile variants and their data contracts.
- `docs/ASSET-COVERAGE.md` describes the coverage registry, asset sources, and maintenance rules.
- `docs/BD-COORDINATE-SYSTEM.md` documents coordinate-system conventions.
- `docs/BRIDGE-API.md` documents the optional local bridge API contract.
- `docs/AGENT-PLATFORM-BAKEOFF.md` documents the first parallel agent platform bakeoff and orchestration model.

## Asset and coverage workflow

- Use `src/shared/gallery.ts` for curated screenshot metadata shown in the app gallery.
- Use `src/shared/tile-catalog.ts` for searchable tile catalog metadata.
- Use `src/tiles/galleryAssetCoverage.ts` when adding or retiring source assets from root HTML files, `lib/MVP_proto/`, external sample feeds, or runtime integrations.
- Use `lib/viewport-registry.js` and `lib/adaptive-slide-export.js` for standalone viewport-grid and adaptive-slide helper workflows.

## License

This project is licensed under the MIT License. See `LICENSE` for details.
