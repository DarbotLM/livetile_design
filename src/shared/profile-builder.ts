import type { TileTemplate, SlideProfile } from './types';
import { getDefaultContent } from './sample-data';

/**
 * Builds a complete SlideProfile JSON document conforming to the
 * `adaptive-slide/v1.0` schema.
 *
 * @param template  – The tile template defining the slide layout
 * @param themeId   – The theme identifier to embed in the profile
 * @param _selectedTileId – Reserved for future single-tile export (currently unused)
 * @returns A fully resolved SlideProfile with sample content for each tile
 */
export function buildSlideProfile(
  template: TileTemplate,
  themeId: string,
  _selectedTileId?: string,
): SlideProfile {
  return {
    $schema: 'adaptive-slide/v1.0',
    slide: {
      id: `slide-${template.id}`,
      title: template.slideTitle,
      subtitle: template.slideSubtitle,
      template: template.id,
      theme: themeId,
      dimensions: { width: 1280, height: 720 },
      grid: { columns: 12, rows: 7, gap: 3, padding: 4 },
      tiles: template.tiles.map((tile, i) => ({
        id: tile.id,
        type: tile.type,
        grid: {
          col: tile.col,
          row: tile.row,
          colSpan: tile.cs,
          rowSpan: tile.rs,
        },
        content: getDefaultContent(tile.type, i, template.id),
      })),
    },
  };
}
