# LiveTile Design

LiveTile Design is a Vite, React, and TypeScript workspace for building and reviewing adaptive dashboard tile layouts. The app includes a tile schema catalog, design-system components, local HTML review pages, and optional bridge API integration for live viewport-grid telemetry.

## Features

- React 19 canvas for composing and inspecting LiveTile layouts.
- Typed tile schema index for grouping tile types by layout, chart, data, comparison, status, and input categories.
- Vite build configured for single-file HTML output.
- Gallery tab for browsing the bakeoff image evidence stored in `lib\img\`.
- Local review artifacts for breakpoint testing, tile specs, and viewport-grid prototypes.
- Bridge API documentation for polling local telemetry and agent state.

## Getting started

Install dependencies:

```bash
npm install
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

The repository includes a GitHub Actions workflow at `.github\workflows\pages.yml`. On every push to `master`, the workflow installs dependencies, runs `npm run build`, uploads `dist\`, and deploys the site to GitHub Pages.

The deployed app includes a `Gallery` tab that loads the curated bakeoff screenshots from `lib\img\`. Keep source images in that folder so they remain available for future gallery and documentation work.

## Project structure

| Path | Description |
| --- | --- |
| `src\canvas\` | Canvas, settings, theme, and template browser UI. |
| `src\shared\` | Shared tile schemas, templates, sample data, themes, and types. |
| `src\tiles\` | Tile renderer and individual tile implementations. |
| `docs\` | Component catalog, coordinate-system notes, and bridge API documentation. |
| `lib\img\` | Image assets used by review and documentation artifacts. |

## Documentation

- `docs\LIVETILE-CATALOG.md` describes the available tile variants and their data contracts.
- `docs\BD-COORDINATE-SYSTEM.md` documents coordinate-system conventions.
- `docs\BRIDGE-API.md` documents the optional local bridge API contract.
- `docs\AGENT-PLATFORM-BAKEOFF.md` documents the first parallel agent platform bakeoff and orchestration model.

## License

This project is licensed under the MIT License. See `LICENSE` for details.
