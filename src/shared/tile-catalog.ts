import { TILE_SCHEMA_INDEX, type SchemaField, type TileCategory } from './schema-index';
import type { TileType } from './types';

export type FlipcardTileType =
  | 'action-mode'
  | 'action-style'
  | 'associated-inputs'
  | 'block-element-height'
  | 'choice-input-style'
  | 'colors'
  | 'container-style'
  | 'fallback-option'
  | 'font-size'
  | 'font-type'
  | 'font-weight'
  | 'horizontal-alignment'
  | 'image-fill-mode'
  | 'image-set-style'
  | 'image-size'
  | 'image-style'
  | 'input-label-position'
  | 'input-style'
  | 'spacing'
  | 'text-block-style'
  | 'text-input-style'
  | 'vertical-alignment'
  | 'vertical-content-alignment';

export type CatalogTileType = TileType | FlipcardTileType;

export type TileCatalogGroup =
  | TileCategory
  | 'flipcard-action'
  | 'flipcard-container'
  | 'flipcard-input'
  | 'flipcard-media'
  | 'flipcard-text'
  | 'flipcard-layout'
  | 'flipcard-reference';

export type TileCatalogEntry = {
  type: CatalogTileType;
  componentName: string;
  group: TileCatalogGroup;
  displayName: string;
  description: string;
  fields: SchemaField[];
  minSpan: { cols: number; rows: number };
  tags: string[];
  renderableInSlide: boolean;
  source: 'slide-tile' | 'flipcard-enum';
};

const noFields: SchemaField[] = [];

const componentNameByTileType: Record<TileType, string> = {
  hero: 'HeroTile',
  'accent-header': 'AccentHeaderTile',
  kpi: 'KpiTile',
  'bar-chart': 'BarChartTile',
  'pie-chart': 'PieChartTile',
  'line-chart': 'LineChartTile',
  'radar-chart': 'RadarChartTile',
  'stacked-bar': 'StackedBarTile',
  table: 'TableTile',
  'fact-sheet': 'FactSheetTile',
  pipeline: 'PipelineTile',
  'status-grid': 'StatusGridTile',
  'overview-cards': 'OverviewCardsTile',
  'meta-info': 'MetaInfoTile',
  emphasis: 'EmphasisTile',
  'compare-left': 'CompareLeftTile',
  'compare-right': 'CompareRightTile',
  'stat-block': 'StatBlockTile',
  'grouped-column': 'GroupedColumnTile',
};

const slideCatalogEntries: TileCatalogEntry[] = Object.values(TILE_SCHEMA_INDEX).map((schema) => ({
  type: schema.type,
  componentName: componentNameByTileType[schema.type],
  group: schema.category,
  displayName: schema.displayName,
  description: schema.description,
  fields: schema.fields,
  minSpan: schema.minSpan,
  tags: schema.tags,
  renderableInSlide: true,
  source: 'slide-tile',
}));

const flipcardCatalogEntries = [
  {
    type: 'action-mode',
    componentName: 'ActionModeTile',
    group: 'flipcard-action',
    displayName: 'Action Mode',
    description: 'Shows whether a flipcard action is primary on the surface or secondary in overflow.',
    tags: ['flipcard', 'action', 'mode', 'overflow'],
  },
  {
    type: 'action-style',
    componentName: 'ActionStyleTile',
    group: 'flipcard-action',
    displayName: 'Action Style',
    description: 'Reference tile for button and action styling variants used on flipcard backs.',
    tags: ['flipcard', 'action', 'style', 'button'],
  },
  {
    type: 'associated-inputs',
    componentName: 'AssociatedInputsTile',
    group: 'flipcard-input',
    displayName: 'Associated Inputs',
    description: 'Documents how actions collect nearby input values in flipcard form surfaces.',
    tags: ['flipcard', 'input', 'action', 'form'],
  },
  {
    type: 'block-element-height',
    componentName: 'BlockElementHeightTile',
    group: 'flipcard-layout',
    displayName: 'Block Element Height',
    description: 'Reference for fixed, stretch, and automatic block sizing behavior.',
    tags: ['flipcard', 'layout', 'height', 'block'],
  },
  {
    type: 'choice-input-style',
    componentName: 'ChoiceInputStyleTile',
    group: 'flipcard-input',
    displayName: 'Choice Input Style',
    description: 'Shows compact, expanded, filtered, and multiselect choice input presentation.',
    tags: ['flipcard', 'choice', 'input', 'select'],
  },
  {
    type: 'colors',
    componentName: 'ColorsTile',
    group: 'flipcard-reference',
    displayName: 'Colors',
    description: 'Semantic color token reference for flipcard foreground elements.',
    tags: ['flipcard', 'color', 'semantic', 'tokens'],
  },
  {
    type: 'container-style',
    componentName: 'ContainerStyleTile',
    group: 'flipcard-container',
    displayName: 'Container Style',
    description: 'Reference for default, emphasis, good, warning, and attention container states.',
    tags: ['flipcard', 'container', 'style', 'state'],
  },
  {
    type: 'fallback-option',
    componentName: 'FallbackOptionTile',
    group: 'flipcard-reference',
    displayName: 'Fallback Option',
    description: 'Documents fallback behavior when a host cannot render a feature.',
    tags: ['flipcard', 'fallback', 'host', 'compatibility'],
  },
  {
    type: 'font-size',
    componentName: 'FontSizeTile',
    group: 'flipcard-text',
    displayName: 'Font Size',
    description: 'Text scale reference for compact labels through large display values.',
    tags: ['flipcard', 'font', 'size', 'text'],
  },
  {
    type: 'font-type',
    componentName: 'FontTypeTile',
    group: 'flipcard-text',
    displayName: 'Font Type',
    description: 'Reference for default and monospace text treatments.',
    tags: ['flipcard', 'font', 'type', 'monospace'],
  },
  {
    type: 'font-weight',
    componentName: 'FontWeightTile',
    group: 'flipcard-text',
    displayName: 'Font Weight',
    description: 'Shows lighter, default, and bolder emphasis weights.',
    tags: ['flipcard', 'font', 'weight', 'text'],
  },
  {
    type: 'horizontal-alignment',
    componentName: 'HorizontalAlignmentTile',
    group: 'flipcard-layout',
    displayName: 'Horizontal Alignment',
    description: 'Reference for left, center, and right alignment inside a flipcard region.',
    tags: ['flipcard', 'alignment', 'horizontal', 'layout'],
  },
  {
    type: 'image-fill-mode',
    componentName: 'ImageFillModeTile',
    group: 'flipcard-media',
    displayName: 'Image Fill Mode',
    description: 'Shows cover, repeat, and repeat-horizontally image fill treatments.',
    tags: ['flipcard', 'image', 'fill', 'media'],
  },
  {
    type: 'image-set-style',
    componentName: 'ImageSetStyleTile',
    group: 'flipcard-media',
    displayName: 'Image Set Style',
    description: 'Reference for grouped image styling in compact gallery surfaces.',
    tags: ['flipcard', 'image', 'set', 'gallery'],
  },
  {
    type: 'image-size',
    componentName: 'ImageSizeTile',
    group: 'flipcard-media',
    displayName: 'Image Size',
    description: 'Shows small, medium, large, stretch, and auto image sizing.',
    tags: ['flipcard', 'image', 'size', 'media'],
  },
  {
    type: 'image-style',
    componentName: 'ImageStyleTile',
    group: 'flipcard-media',
    displayName: 'Image Style',
    description: 'Reference for default and person/avatar image treatments.',
    tags: ['flipcard', 'image', 'style', 'avatar'],
  },
  {
    type: 'input-label-position',
    componentName: 'InputLabelPositionTile',
    group: 'flipcard-input',
    displayName: 'Input Label Position',
    description: 'Shows inline and above-field label positions for form fields.',
    tags: ['flipcard', 'input', 'label', 'form'],
  },
  {
    type: 'input-style',
    componentName: 'InputStyleTile',
    group: 'flipcard-input',
    displayName: 'Input Style',
    description: 'Reference for standard input styling and validation states.',
    tags: ['flipcard', 'input', 'style', 'form'],
  },
  {
    type: 'spacing',
    componentName: 'SpacingTile',
    group: 'flipcard-layout',
    displayName: 'Spacing',
    description: 'Spacing scale reference for compact to expanded flipcard layouts.',
    tags: ['flipcard', 'spacing', 'layout', 'rhythm'],
  },
  {
    type: 'text-block-style',
    componentName: 'TextBlockStyleTile',
    group: 'flipcard-text',
    displayName: 'Text Block Style',
    description: 'Shows body and heading text behavior for flipcard copy blocks.',
    tags: ['flipcard', 'text', 'heading', 'accessibility'],
  },
  {
    type: 'text-input-style',
    componentName: 'TextInputStyleTile',
    group: 'flipcard-input',
    displayName: 'Text Input Style',
    description: 'Reference for text, email, URL, telephone, and password input modes.',
    tags: ['flipcard', 'text', 'input', 'form'],
  },
  {
    type: 'vertical-alignment',
    componentName: 'VerticalAlignmentTile',
    group: 'flipcard-layout',
    displayName: 'Vertical Alignment',
    description: 'Shows top, center, and bottom alignment for individual elements.',
    tags: ['flipcard', 'alignment', 'vertical', 'layout'],
  },
  {
    type: 'vertical-content-alignment',
    componentName: 'VerticalContentAlignmentTile',
    group: 'flipcard-layout',
    displayName: 'Vertical Content Alignment',
    description: 'Shows top, center, and bottom content distribution inside containers.',
    tags: ['flipcard', 'alignment', 'container', 'layout'],
  },
] as const satisfies readonly Omit<TileCatalogEntry, 'fields' | 'minSpan' | 'renderableInSlide' | 'source'>[];

export const TILE_CATALOG: readonly TileCatalogEntry[] = [
  ...slideCatalogEntries,
  ...flipcardCatalogEntries.map((entry) => ({
    ...entry,
    fields: noFields,
    minSpan: { cols: 3, rows: 2 },
    renderableInSlide: false,
    source: 'flipcard-enum' as const,
  })),
];

export const TILE_CATALOG_STATS = {
  total: TILE_CATALOG.length,
  slideTiles: TILE_CATALOG.filter((entry) => entry.source === 'slide-tile').length,
  flipcardTiles: TILE_CATALOG.filter((entry) => entry.source === 'flipcard-enum').length,
  renderableTiles: TILE_CATALOG.filter((entry) => entry.renderableInSlide).length,
} as const;

function createEmptyCatalogGroups(): Record<TileCatalogGroup, TileCatalogEntry[]> {
  return {
    layout: [],
    chart: [],
    data: [],
    comparison: [],
    status: [],
    input: [],
    'flipcard-action': [],
    'flipcard-container': [],
    'flipcard-input': [],
    'flipcard-media': [],
    'flipcard-text': [],
    'flipcard-layout': [],
    'flipcard-reference': [],
  };
}

export function getCatalogByGroup(): Record<TileCatalogGroup, TileCatalogEntry[]> {
  return TILE_CATALOG.reduce(
    (groups, entry) => {
      groups[entry.group].push(entry);
      return groups;
    },
    createEmptyCatalogGroups(),
  );
}

export function searchTileCatalog(query: string): TileCatalogEntry[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return [...TILE_CATALOG];
  }

  return TILE_CATALOG.filter((entry) => {
    const haystack = [
      entry.type,
      entry.componentName,
      entry.group,
      entry.displayName,
      entry.description,
      ...entry.tags,
    ].join(' ').toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}