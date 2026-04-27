# Asset Coverage Registry

The asset coverage registry tracks which source artifacts are represented by the reusable tile system. It is the bridge between static review pages, external sample feeds, runtime integrations, and the React tile/catalog surface.

## Source of truth

| Surface | File | Purpose |
| --- | --- | --- |
| Coverage registry | `src/tiles/galleryAssetCoverage.ts` | Typed map of asset collections, source locations, and coverage targets. |
| Coverage UI | `src/App.tsx` | Renders the coverage collections in the app's Gallery inspector mode. |
| Tile catalog | `src/shared/tile-catalog.ts` | Searchable catalog for 19 slide tiles and 23 FlipCard reference tiles. |
| Curated image gallery | `src/shared/gallery.ts` | Curated subset of review screenshots from `lib/img/`. |
| FlipCard runtime | `src/engines/flipcard_livetile_engine.ts` | Builds front/back JSON card models from LiveTile templates. |

## Current coverage groups

The registry currently covers 100 assets across 24 collections:

- Root HTML entries and bundled app/template artifacts from `index.html` and `dist/index.html`.
- Tile-spec viewer assets from `lib/MVP_proto/tile-spec-viewer.html`.
- Unovis gallery examples from `lib/MVP_proto/unovis-gallery-flipcards.html`.
- Adaptive Card samples from the Microsoft AdaptiveCards sample repository.
- Pattern library FlipCard, Adaptive Tiles, LiveTile Studio, component showcase, discovery, evaluation, security, architecture, and portfolio surfaces.
- Runtime and API integrations including the FlipCard LiveTile engine, Adaptive Cards GitHub endpoints, raw sample feeds, FlipCard preview rendering, and Open-Meteo weather data.

## Coverage target conventions

`coveredByTiles` should point to one or more of:

- A renderable `TileType` from `src/shared/types.ts`.
- A concrete tile-spec component target such as `accuracy-tile`, `events-sec-tile`, or `status-tile`.
- A non-visual runtime target such as `app-shell`, `favicon`, `tile-runtime`, `flipcard-runtime`, `api-status`, or `flipcard-livetile-engine`.

When an asset is represented by both a concrete tile and a broader runtime, list both targets. For example, a weather feed can be covered by `api-status`, `kpi`, and `line-chart`.

## Maintenance checklist

1. Add new source assets to the closest existing collection in `src/tiles/galleryAssetCoverage.ts`, or create a new collection when the source has a distinct lifecycle.
2. Keep `source` values stable and reviewable: local paths for repo artifacts, canonical URLs for external feeds.
3. Prefer existing tile targets before adding a new synthetic target.
4. Update this document when adding a new asset kind or synthetic coverage target.
5. Update `README.md` when adding a new top-level source folder or major documentation surface.

## Related documentation

- `docs/LIVETILE-CATALOG.md` documents tile contracts and the tile catalog.
- `docs/AGENT-PLATFORM-BAKEOFF.md` documents the review evidence and orchestration context.
- `docs/BD-COORDINATE-SYSTEM.md` documents BD sizing and viewport slot semantics.
