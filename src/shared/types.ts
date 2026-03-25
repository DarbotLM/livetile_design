// ── LiveTile Design System – Shared Types ────────────────────────────────────

/** All 18 tile types in the design system */
export type TileType =
  | 'hero'
  | 'accent-header'
  | 'kpi'
  | 'bar-chart'
  | 'pie-chart'
  | 'line-chart'
  | 'radar-chart'
  | 'stacked-bar'
  | 'table'
  | 'fact-sheet'
  | 'pipeline'
  | 'status-grid'
  | 'overview-cards'
  | 'meta-info'
  | 'emphasis'
  | 'compare-left'
  | 'compare-right'
  | 'stat-block'
  | 'grouped-column';

// ── Theme ────────────────────────────────────────────────────────────────────

/** Full theme token set for dark-first design */
export type LiveTileTheme = {
  /** Unique theme identifier (kebab-case) */
  id: string;
  /** Human-readable display name */
  name: string;
  /** Page / slide background */
  bg: string;
  /** Card / tile background */
  card: string;
  /** Primary accent colour */
  accent: string;
  /** Lighter variant of accent */
  accentLight: string;
  /** Glow effect colour (usually accent with low alpha) */
  accentGlow: string;
  /** Default border colour */
  border: string;
  /** Primary text colour */
  text: string;
  /** Mid-contrast text */
  textMid: string;
  /** Subtle / muted text */
  textSubtle: string;
  /** Pill / badge background */
  pill: string;
  /** Pill border colour */
  pillBorder: string;
  /** Header gradient background */
  headerGrad: string;
  /** Emphasis callout background */
  emphasisBg: string;
  /** Emphasis callout border */
  emphasisBorder: string;
  /** Emphasis callout left accent */
  emphasisLeft: string;
  /** Positive / success background */
  goodBg: string;
  /** Positive / success border */
  goodBorder: string;
  /** Positive / success left accent */
  goodLeft: string;
  /** Danger / error background */
  dangerBg: string;
  /** Danger / error border */
  dangerBorder: string;
  /** Danger / error left accent */
  dangerLeft: string;
  /** Table header background */
  tableHeader: string;
  /** Table border colour */
  tableBorder: string;
  /** Table alternating row tint */
  tableRow: string;
  /** Palette preview swatches (5 colours) */
  swatches: string[];
};

// ── Grid & Layout ────────────────────────────────────────────────────────────

/** Grid position for a tile within a 12-col × 7-row slide */
export type TilePosition = {
  col: number;
  row: number;
  colSpan: number;
  rowSpan: number;
};

/** Definition of a tile within a template */
export type TileDefinition = {
  /** Unique tile ID within the template */
  id: string;
  /** Tile component type */
  type: TileType;
  /** 1-based column start */
  col: number;
  /** 1-based row start */
  row: number;
  /** Column span */
  cs: number;
  /** Row span */
  rs: number;
};

/** Slide template with tile layout */
export type TileTemplate = {
  /** Unique template identifier (kebab-case) */
  id: string;
  /** Human-readable name */
  name: string;
  /** Icon / emoji for the template picker */
  icon: string;
  /** Short description of the layout */
  description: string;
  /** Default slide title */
  slideTitle: string;
  /** Default slide subtitle */
  slideSubtitle: string;
  /** Tile definitions in this template */
  tiles: TileDefinition[];
};

// ── Tile Content Schemas ─────────────────────────────────────────────────────

/** Hero banner content */
export type HeroContent = {
  title: string;
  subtitle: string;
  badge: string;
};

/** Accent header bar content */
export type AccentHeaderContent = {
  title: string;
  subtitle: string;
  page: string;
};

/** Single KPI metric */
export type KpiContent = {
  label: string;
  value: string;
  delta: string;
  up: boolean | null;
};

/** Single data point for a bar chart */
export type BarChartDataPoint = {
  dim: string;
  score: number;
  prev: number;
};

/** Bar chart tile content */
export type BarChartContent = {
  title: string;
  data: BarChartDataPoint[];
};

/** Single data point for a pie chart */
export type PieChartDataPoint = {
  name: string;
  value: number;
};

/** Pie chart tile content */
export type PieChartContent = {
  title: string;
  data: PieChartDataPoint[];
};

/** Single data point for a line chart */
export type LineChartDataPoint = {
  q: string;
  bic: number;
  latency: number;
  tput: number;
};

/** Line chart tile content */
export type LineChartContent = {
  title: string;
  data: LineChartDataPoint[];
};

/** Single data point for a radar chart */
export type RadarChartDataPoint = {
  dim: string;
  score: number;
};

/** Radar chart tile content */
export type RadarChartContent = {
  title: string;
  data: RadarChartDataPoint[];
};

/** Single data point for a stacked bar chart */
export type StackedBarDataPoint = {
  q: string;
  pass: number;
  warn: number;
  fail: number;
};

/** Stacked bar chart tile content */
export type StackedBarContent = {
  title: string;
  data: StackedBarDataPoint[];
};

/** Table tile content */
export type TableContent = {
  title: string;
  columns: string[];
  rows: string[][];
};

/** Single entry in a fact sheet */
export type FactSheetEntry = {
  key: string;
  value: string;
};

/** Fact sheet tile content */
export type FactSheetContent = {
  title: string;
  subtitle: string;
  entries: FactSheetEntry[];
};

/** Pipeline flow tile content */
export type PipelineContent = {
  title: string;
  steps: string[];
  completedCount: number;
};

/** Single item in a status grid */
export type StatusGridItem = {
  label: string;
  subtitle: string;
  severity: 'good' | 'warning' | 'danger';
};

/** Status grid tile content */
export type StatusGridContent = {
  title: string;
  items: StatusGridItem[];
};

/** Overview cards tile content */
export type OverviewCardsContent = {
  description: string;
  cards: string[];
};

/** Single entry in a meta-info panel */
export type MetaInfoEntry = {
  key: string;
  value: string;
  highlight?: boolean;
};

/** Meta-info tile content */
export type MetaInfoContent = {
  title: string;
  entries: MetaInfoEntry[];
};

/** Emphasis callout tile content */
export type EmphasisContent = {
  label: string;
  text: string;
  highlights?: string[];
};

/** Compare column tile content */
export type CompareContent = {
  label: string;
  strategy: string;
  colorScheme: 'good' | 'accent';
  items: string[];
  footer: string;
};

/** Single entry in a stat block */
export type StatBlockEntry = {
  label: string;
  value: string;
  up: boolean;
};

/** Stat block tile content */
export type StatBlockContent = {
  title: string;
  entries: StatBlockEntry[];
};

/** Single data point for a grouped column chart (multi-series vertical bars) */
export type GroupedColumnDataPoint = {
  category: string;
  [series: string]: string | number;
};

/** Series definition for grouped column chart */
export type GroupedColumnSeries = {
  key: string;
  name: string;
  color?: string;
};

/** Grouped column chart tile content */
export type GroupedColumnContent = {
  title: string;
  series: GroupedColumnSeries[];
  data: GroupedColumnDataPoint[];
};

// ── Content Map ──────────────────────────────────────────────────────────────

/** Maps each TileType to its content schema */
export type TileContentMap = {
  'hero': HeroContent;
  'accent-header': AccentHeaderContent;
  'kpi': KpiContent;
  'bar-chart': BarChartContent;
  'pie-chart': PieChartContent;
  'line-chart': LineChartContent;
  'radar-chart': RadarChartContent;
  'stacked-bar': StackedBarContent;
  'table': TableContent;
  'fact-sheet': FactSheetContent;
  'pipeline': PipelineContent;
  'status-grid': StatusGridContent;
  'overview-cards': OverviewCardsContent;
  'meta-info': MetaInfoContent;
  'emphasis': EmphasisContent;
  'compare-left': CompareContent;
  'compare-right': CompareContent;
  'stat-block': StatBlockContent;
  'grouped-column': GroupedColumnContent;
};

// ── Component Props ──────────────────────────────────────────────────────────

/** Props every tile component receives */
export type TileProps<T extends TileType = TileType> = {
  content: TileContentMap[T];
  theme: LiveTileTheme;
};

// ── Resolved / Export Types ──────────────────────────────────────────────────

/** Resolved tile in a slide profile */
export type ResolvedTile = {
  id: string;
  type: TileType;
  grid: TilePosition;
  content: TileContentMap[TileType];
};

/** Full slide profile for export (adaptive-slide/v1.0 schema) */
export type SlideProfile = {
  $schema: string;
  slide: {
    id: string;
    title: string;
    subtitle: string;
    template: string;
    theme: string;
    dimensions: { width: number; height: number };
    grid: { columns: number; rows: number; gap: number; padding: number };
    tiles: ResolvedTile[];
  };
};
