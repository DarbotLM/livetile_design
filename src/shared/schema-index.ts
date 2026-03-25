// ── LiveTile Schema Index ─────────────────────────────────────────────────────
// Formal catalog of every tile type: schema definition, category, description,
// required fields, and content shape. Decouples data from rendering for reuse.

import type { TileType, TileContentMap } from './types';

/** Tile category for grouping in the schema catalog */
export type TileCategory = 'layout' | 'chart' | 'data' | 'comparison' | 'status' | 'input';

/** Field descriptor within a tile content schema */
export type SchemaField = {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  required: boolean;
  description: string;
  items?: string;
};

/** Full schema entry for a tile type */
export type TileSchemaEntry = {
  type: TileType;
  category: TileCategory;
  displayName: string;
  description: string;
  icon: string;
  fields: SchemaField[];
  /** Minimum grid span recommendation */
  minSpan: { cols: number; rows: number };
  /** Tags for search/filter */
  tags: string[];
};

/** The complete schema index -- one entry per tile type */
export const TILE_SCHEMA_INDEX: Record<TileType, TileSchemaEntry> = {
  'hero': {
    type: 'hero',
    category: 'layout',
    displayName: 'Hero Banner',
    description: 'Full-width banner with title, subtitle, and badge. Ideal for slide headers.',
    icon: 'HERO',
    fields: [
      { name: 'title', type: 'string', required: true, description: 'Primary heading text' },
      { name: 'subtitle', type: 'string', required: true, description: 'Supporting description line' },
      { name: 'badge', type: 'string', required: false, description: 'Corner badge (e.g. page number)' },
    ],
    minSpan: { cols: 8, rows: 2 },
    tags: ['header', 'banner', 'title', 'hero'],
  },

  'accent-header': {
    type: 'accent-header',
    category: 'layout',
    displayName: 'Accent Header',
    description: 'Gradient-backed header bar with title, subtitle, and page indicator.',
    icon: 'HDR',
    fields: [
      { name: 'title', type: 'string', required: true, description: 'Header title' },
      { name: 'subtitle', type: 'string', required: true, description: 'Header subtitle' },
      { name: 'page', type: 'string', required: false, description: 'Page indicator' },
    ],
    minSpan: { cols: 12, rows: 1 },
    tags: ['header', 'navigation', 'accent'],
  },

  'kpi': {
    type: 'kpi',
    category: 'data',
    displayName: 'KPI Metric',
    description: 'Single key performance indicator with label, value, delta, and trend direction.',
    icon: 'KPI',
    fields: [
      { name: 'label', type: 'string', required: true, description: 'Metric label' },
      { name: 'value', type: 'string', required: true, description: 'Current metric value' },
      { name: 'delta', type: 'string', required: true, description: 'Change indicator text' },
      { name: 'up', type: 'boolean', required: false, description: 'Trend direction (true=up, false=down, null=neutral)' },
    ],
    minSpan: { cols: 2, rows: 2 },
    tags: ['metric', 'kpi', 'number', 'trend'],
  },

  'bar-chart': {
    type: 'bar-chart',
    category: 'chart',
    displayName: 'Bar Chart',
    description: 'Grouped bar chart comparing current vs previous values across dimensions.',
    icon: 'BAR',
    fields: [
      { name: 'title', type: 'string', required: true, description: 'Chart title' },
      { name: 'data', type: 'array', required: true, description: 'Array of {dim, score, prev} data points', items: 'BarChartDataPoint' },
    ],
    minSpan: { cols: 4, rows: 3 },
    tags: ['chart', 'bar', 'comparison', 'score'],
  },

  'pie-chart': {
    type: 'pie-chart',
    category: 'chart',
    displayName: 'Pie / Donut Chart',
    description: 'Distribution chart showing proportions across categories.',
    icon: 'PIE',
    fields: [
      { name: 'title', type: 'string', required: true, description: 'Chart title' },
      { name: 'data', type: 'array', required: true, description: 'Array of {name, value} slices', items: 'PieChartDataPoint' },
    ],
    minSpan: { cols: 3, rows: 3 },
    tags: ['chart', 'pie', 'donut', 'distribution'],
  },

  'line-chart': {
    type: 'line-chart',
    category: 'chart',
    displayName: 'Line Chart',
    description: 'Multi-series trend line showing metrics over time.',
    icon: 'LINE',
    fields: [
      { name: 'title', type: 'string', required: true, description: 'Chart title' },
      { name: 'data', type: 'array', required: true, description: 'Array of {q, bic, latency, tput} points', items: 'LineChartDataPoint' },
    ],
    minSpan: { cols: 4, rows: 3 },
    tags: ['chart', 'line', 'trend', 'time-series'],
  },

  'radar-chart': {
    type: 'radar-chart',
    category: 'chart',
    displayName: 'Radar Chart',
    description: 'Multi-axis radar showing coverage across dimensions.',
    icon: 'RADAR',
    fields: [
      { name: 'title', type: 'string', required: true, description: 'Chart title' },
      { name: 'data', type: 'array', required: true, description: 'Array of {dim, score} axes', items: 'RadarChartDataPoint' },
    ],
    minSpan: { cols: 4, rows: 3 },
    tags: ['chart', 'radar', 'spider', 'coverage'],
  },

  'stacked-bar': {
    type: 'stacked-bar',
    category: 'chart',
    displayName: 'Stacked Bar Chart',
    description: 'Stacked bar showing pass/warn/fail distribution over time.',
    icon: 'STACK',
    fields: [
      { name: 'title', type: 'string', required: true, description: 'Chart title' },
      { name: 'data', type: 'array', required: true, description: 'Array of {q, pass, warn, fail} points', items: 'StackedBarDataPoint' },
    ],
    minSpan: { cols: 4, rows: 3 },
    tags: ['chart', 'stacked', 'bar', 'pass-fail'],
  },

  'table': {
    type: 'table',
    category: 'data',
    displayName: 'Data Table',
    description: 'Tabular data with column headers and row data.',
    icon: 'TBL',
    fields: [
      { name: 'title', type: 'string', required: true, description: 'Table title' },
      { name: 'columns', type: 'array', required: true, description: 'Column header strings', items: 'string' },
      { name: 'rows', type: 'array', required: true, description: '2D array of cell values', items: 'string[]' },
    ],
    minSpan: { cols: 4, rows: 3 },
    tags: ['table', 'data', 'grid', 'rows'],
  },

  'fact-sheet': {
    type: 'fact-sheet',
    category: 'data',
    displayName: 'Fact Sheet',
    description: 'Key-value fact list with title and subtitle.',
    icon: 'FACT',
    fields: [
      { name: 'title', type: 'string', required: true, description: 'Fact sheet title' },
      { name: 'subtitle', type: 'string', required: true, description: 'Fact sheet subtitle' },
      { name: 'entries', type: 'array', required: true, description: 'Array of {key, value} pairs', items: 'FactSheetEntry' },
    ],
    minSpan: { cols: 4, rows: 3 },
    tags: ['facts', 'key-value', 'metadata', 'summary'],
  },

  'pipeline': {
    type: 'pipeline',
    category: 'status',
    displayName: 'Pipeline Flow',
    description: 'Sequential workflow steps with progress tracking.',
    icon: 'PIPE',
    fields: [
      { name: 'title', type: 'string', required: true, description: 'Pipeline title' },
      { name: 'steps', type: 'array', required: true, description: 'Step label strings', items: 'string' },
      { name: 'completedCount', type: 'number', required: true, description: 'Number of completed steps' },
    ],
    minSpan: { cols: 6, rows: 2 },
    tags: ['pipeline', 'workflow', 'steps', 'progress'],
  },

  'status-grid': {
    type: 'status-grid',
    category: 'status',
    displayName: 'Status Grid',
    description: 'Grid of status indicators with severity levels.',
    icon: 'STATUS',
    fields: [
      { name: 'title', type: 'string', required: true, description: 'Grid title' },
      { name: 'items', type: 'array', required: true, description: 'Array of {label, subtitle, severity} items', items: 'StatusGridItem' },
    ],
    minSpan: { cols: 4, rows: 3 },
    tags: ['status', 'health', 'grid', 'severity'],
  },

  'overview-cards': {
    type: 'overview-cards',
    category: 'layout',
    displayName: 'Overview Cards',
    description: 'Grid of labeled cards for workflow steps or feature listing.',
    icon: 'CARDS',
    fields: [
      { name: 'description', type: 'string', required: true, description: 'Cards section description' },
      { name: 'cards', type: 'array', required: true, description: 'Card label strings', items: 'string' },
    ],
    minSpan: { cols: 6, rows: 3 },
    tags: ['cards', 'overview', 'grid', 'workflow'],
  },

  'meta-info': {
    type: 'meta-info',
    category: 'data',
    displayName: 'Meta Info Panel',
    description: 'Metadata key-value panel with optional highlight entries.',
    icon: 'META',
    fields: [
      { name: 'title', type: 'string', required: true, description: 'Panel title' },
      { name: 'entries', type: 'array', required: true, description: 'Array of {key, value, highlight?} entries', items: 'MetaInfoEntry' },
    ],
    minSpan: { cols: 3, rows: 3 },
    tags: ['meta', 'info', 'key-value', 'details'],
  },

  'emphasis': {
    type: 'emphasis',
    category: 'layout',
    displayName: 'Emphasis Callout',
    description: 'Highlighted callout block with label, text, and optional keyword highlights.',
    icon: 'CALL',
    fields: [
      { name: 'label', type: 'string', required: true, description: 'Callout label' },
      { name: 'text', type: 'string', required: true, description: 'Callout body text' },
      { name: 'highlights', type: 'array', required: false, description: 'Keywords to highlight', items: 'string' },
    ],
    minSpan: { cols: 3, rows: 2 },
    tags: ['emphasis', 'callout', 'highlight', 'note'],
  },

  'compare-left': {
    type: 'compare-left',
    category: 'comparison',
    displayName: 'Compare Left Column',
    description: 'Left side of a two-column comparison layout.',
    icon: 'CMP-L',
    fields: [
      { name: 'label', type: 'string', required: true, description: 'Column label' },
      { name: 'strategy', type: 'string', required: true, description: 'Strategy name' },
      { name: 'colorScheme', type: 'string', required: true, description: 'Color scheme: good or accent' },
      { name: 'items', type: 'array', required: true, description: 'Comparison bullet points', items: 'string' },
      { name: 'footer', type: 'string', required: true, description: 'Footer summary text' },
    ],
    minSpan: { cols: 5, rows: 4 },
    tags: ['compare', 'left', 'versus', 'side-by-side'],
  },

  'compare-right': {
    type: 'compare-right',
    category: 'comparison',
    displayName: 'Compare Right Column',
    description: 'Right side of a two-column comparison layout.',
    icon: 'CMP-R',
    fields: [
      { name: 'label', type: 'string', required: true, description: 'Column label' },
      { name: 'strategy', type: 'string', required: true, description: 'Strategy name' },
      { name: 'colorScheme', type: 'string', required: true, description: 'Color scheme: good or accent' },
      { name: 'items', type: 'array', required: true, description: 'Comparison bullet points', items: 'string' },
      { name: 'footer', type: 'string', required: true, description: 'Footer summary text' },
    ],
    minSpan: { cols: 5, rows: 4 },
    tags: ['compare', 'right', 'versus', 'side-by-side'],
  },

  'stat-block': {
    type: 'stat-block',
    category: 'data',
    displayName: 'Stat Block',
    description: 'Compact block of labeled statistics with trend arrows.',
    icon: 'STAT',
    fields: [
      { name: 'title', type: 'string', required: true, description: 'Block title' },
      { name: 'entries', type: 'array', required: true, description: 'Array of {label, value, up} entries', items: 'StatBlockEntry' },
    ],
    minSpan: { cols: 3, rows: 2 },
    tags: ['stats', 'block', 'metrics', 'trend'],
  },

  'grouped-column': {
    type: 'grouped-column',
    category: 'chart',
    displayName: 'Grouped Column',
    description: 'Vertical multi-series column chart with category grouping. Each category shows side-by-side bars for each series.',
    icon: 'GCOL',
    fields: [
      { name: 'title', type: 'string', required: true, description: 'Chart title' },
      { name: 'series', type: 'array', required: true, description: 'Array of {key, name, color?} series definitions', items: 'GroupedColumnSeries' },
      { name: 'data', type: 'array', required: true, description: 'Array of data points with category + series values', items: 'GroupedColumnDataPoint' },
    ],
    minSpan: { cols: 4, rows: 3 },
    tags: ['chart', 'column', 'grouped', 'multi-series', 'vertical', 'comparison'],
  },
};

/** Get all tile schemas grouped by category */
export function getSchemasByCategory(): Record<TileCategory, TileSchemaEntry[]> {
  const grouped: Record<TileCategory, TileSchemaEntry[]> = {
    layout: [],
    chart: [],
    data: [],
    comparison: [],
    status: [],
    input: [],
  };
  for (const entry of Object.values(TILE_SCHEMA_INDEX)) {
    grouped[entry.category].push(entry);
  }
  return grouped;
}

/** Search schema index by tag or display name */
export function searchSchemas(query: string): TileSchemaEntry[] {
  const q = query.toLowerCase();
  return Object.values(TILE_SCHEMA_INDEX).filter(
    (s) =>
      s.displayName.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.tags.some((t) => t.includes(q)),
  );
}

/** Get the schema for a specific tile type */
export function getSchema(type: TileType): TileSchemaEntry {
  return TILE_SCHEMA_INDEX[type];
}

/** Validate content against a tile's required fields */
export function validateContent(type: TileType, content: Record<string, unknown>): string[] {
  const schema = TILE_SCHEMA_INDEX[type];
  const errors: string[] = [];
  for (const field of schema.fields) {
    if (field.required && !(field.name in content)) {
      errors.push(`Missing required field: ${field.name}`);
    }
  }
  return errors;
}
