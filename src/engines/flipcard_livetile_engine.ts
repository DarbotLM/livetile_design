import { buildSlideProfile } from '../shared/profile-builder';
import { getDefaultContent } from '../shared/sample-data';
import type {
  LiveTileTheme,
  SlideProfile,
  TileContentMap,
  TileDefinition,
  TileTemplate,
  TileType,
} from '../shared/types';

export const FLIPCARD_LIVETILE_ENGINE_ID = 'flipcard_livetile' as const;
export const FLIPCARD_LIVETILE_SCHEMA = 'flipcard-livetile/v1.0' as const;

export type FlipcardLiveTileEngineId = typeof FLIPCARD_LIVETILE_ENGINE_ID;

export type FlipcardLiveTileFlipModel = {
  mode: 'front-back-json';
  trigger: 'click';
  frontRole: 'rendered-livetile';
  backRole: 'copyable-schema';
};

export type FlipcardResolvedTile<T extends TileType = TileType> = {
  id: string;
  type: T;
  grid: {
    col: number;
    row: number;
    colSpan: number;
    rowSpan: number;
  };
  content: TileContentMap[T];
};

export type FlipcardLiveTileCard<T extends TileType = TileType> = {
  engine: FlipcardLiveTileEngineId;
  schema: typeof FLIPCARD_LIVETILE_SCHEMA;
  id: string;
  title: string;
  tile: FlipcardResolvedTile<T>;
  theme: Pick<LiveTileTheme, 'id' | 'name' | 'accent' | 'accentLight'>;
  flip: FlipcardLiveTileFlipModel;
  front: {
    title: string;
    subtitle: string;
    tileType: T;
    content: TileContentMap[T];
  };
  back: {
    title: string;
    json: {
      engine: FlipcardLiveTileEngineId;
      schema: typeof FLIPCARD_LIVETILE_SCHEMA;
      tile: FlipcardResolvedTile<T>;
    };
  };
};

export type FlipcardLiveTileDeck = {
  engine: FlipcardLiveTileEngineId;
  schema: typeof FLIPCARD_LIVETILE_SCHEMA;
  template: {
    id: string;
    name: string;
    title: string;
    subtitle: string;
  };
  profile: SlideProfile;
  cards: FlipcardLiveTileCard[];
};

const flipModel: FlipcardLiveTileFlipModel = {
  mode: 'front-back-json',
  trigger: 'click',
  frontRole: 'rendered-livetile',
  backRole: 'copyable-schema',
};

function resolveTile<T extends TileType>(
  tile: TileDefinition & { type: T },
  content: TileContentMap[T],
): FlipcardResolvedTile<T> {
  return {
    id: tile.id,
    type: tile.type,
    grid: {
      col: tile.col,
      row: tile.row,
      colSpan: tile.cs,
      rowSpan: tile.rs,
    },
    content,
  };
}

export function buildFlipcardLiveTileCard<T extends TileType>(
  tile: TileDefinition & { type: T },
  options: {
    template: TileTemplate;
    theme: LiveTileTheme;
    tileIndex: number;
  },
): FlipcardLiveTileCard<T> {
  const content = getDefaultContent(tile.type, options.tileIndex, options.template.id) as TileContentMap[T];
  const resolvedTile = resolveTile(tile, content);

  return {
    engine: FLIPCARD_LIVETILE_ENGINE_ID,
    schema: FLIPCARD_LIVETILE_SCHEMA,
    id: `${options.template.id}-${tile.id}`,
    title: `${options.template.name} / ${tile.type}`,
    tile: resolvedTile,
    theme: {
      id: options.theme.id,
      name: options.theme.name,
      accent: options.theme.accent,
      accentLight: options.theme.accentLight,
    },
    flip: flipModel,
    front: {
      title: options.template.slideTitle,
      subtitle: options.template.slideSubtitle,
      tileType: tile.type,
      content,
    },
    back: {
      title: `${tile.type} schema`,
      json: {
        engine: FLIPCARD_LIVETILE_ENGINE_ID,
        schema: FLIPCARD_LIVETILE_SCHEMA,
        tile: resolvedTile,
      },
    },
  };
}

export function buildFlipcardLiveTileDeck(
  template: TileTemplate,
  theme: LiveTileTheme,
): FlipcardLiveTileDeck {
  return {
    engine: FLIPCARD_LIVETILE_ENGINE_ID,
    schema: FLIPCARD_LIVETILE_SCHEMA,
    template: {
      id: template.id,
      name: template.name,
      title: template.slideTitle,
      subtitle: template.slideSubtitle,
    },
    profile: buildSlideProfile(template, theme.id),
    cards: template.tiles.map((tile, tileIndex) =>
      buildFlipcardLiveTileCard(tile, {
        template,
        theme,
        tileIndex,
      }),
    ),
  };
}

export function getFlipcardLiveTileCoverage(deck: FlipcardLiveTileDeck) {
  return {
    engine: deck.engine,
    template: deck.template.id,
    cardCount: deck.cards.length,
    tileTypes: Array.from(new Set(deck.cards.map((card) => card.tile.type))).sort(),
    schema: deck.schema,
  };
}