import type { TileType } from '../shared/types';

export type GalleryAssetKind =
  | 'unovis'
  | 'pattern'
  | 'tile-spec'
  | 'html-entry'
  | 'app-bundle'
  | 'api-endpoint'
  | 'sdk-runtime'
  | 'engine';
export type GalleryAssetCoverageTarget =
  | TileType
  | 'accuracy-tile'
  | 'events-sec-tile'
  | 'status-tile'
  | 'app-shell'
  | 'favicon'
  | 'tile-runtime'
  | 'api-status'
  | 'flipcard-runtime'
  | 'flipcard-livetile-engine';

export type GalleryAssetCoverage = {
  kind: GalleryAssetKind;
  title: string;
  pathname: string;
  description: string;
  source: string;
  coveredByTiles: readonly GalleryAssetCoverageTarget[];
};

export type GalleryAssetCollectionCoverage = {
  title: string;
  description: string;
  assets: readonly GalleryAssetCoverage[];
};

const unovisSource = (pathname: string) =>
  `https://github.com/f5/unovis/tree/main/packages/shared/examples/${pathname}`;

const appBundleSource = 'dist/index.html';
const patternSource = 'lib/MVP_proto/flipcard-pattern-library.html';
const adaptiveCardsSource = (samplePath: string) =>
  `https://raw.githubusercontent.com/microsoft/AdaptiveCards/main/samples/${samplePath}`;

export const GALLERY_ASSET_COVERAGE = [
  {
    title: 'HTML Entry Points',
    description: 'Root HTML shells and bundled app artifacts reviewed for tile-system coverage.',
    assets: [
      { kind: 'html-entry', title: 'Vite App Entry', pathname: 'index-html-main-entry', description: 'Root index.html shell that mounts the React app through /src/main.tsx.', source: 'index.html', coveredByTiles: ['app-shell'] },
      { kind: 'html-entry', title: 'Inline Tile Favicon', pathname: 'index-html-favicon', description: 'Inline SVG favicon using the four-panel livetile motif.', source: 'index.html', coveredByTiles: ['favicon'] },
      { kind: 'app-bundle', title: 'Single-file Tile Runtime Bundle', pathname: 'single-file-html-runtime', description: 'Bundled livetile design runtime containing all 19 tile component types.', source: appBundleSource, coveredByTiles: ['tile-runtime', 'hero', 'accent-header', 'kpi', 'bar-chart', 'pie-chart', 'line-chart', 'radar-chart', 'stacked-bar', 'table', 'fact-sheet', 'pipeline', 'status-grid', 'overview-cards', 'meta-info', 'emphasis', 'compare-left', 'compare-right', 'stat-block', 'grouped-column'] },
      { kind: 'app-bundle', title: 'Title Overview Template', pathname: 'title-overview', description: 'Bundled template asset with hero, overview cards, and metadata tiles.', source: appBundleSource, coveredByTiles: ['hero', 'overview-cards', 'meta-info'] },
      { kind: 'app-bundle', title: 'Dashboard Template', pathname: 'dashboard', description: 'Bundled template asset with header, KPI metrics, bar chart, and pie chart.', source: appBundleSource, coveredByTiles: ['accent-header', 'kpi', 'bar-chart', 'pie-chart'] },
      { kind: 'app-bundle', title: 'Analytics Template', pathname: 'analytics', description: 'Bundled template asset with line, radar, stacked bar, and stat block tiles.', source: appBundleSource, coveredByTiles: ['accent-header', 'line-chart', 'radar-chart', 'stacked-bar', 'stat-block'] },
      { kind: 'app-bundle', title: 'Comparison Template', pathname: 'comparison', description: 'Bundled template asset with side-by-side compare tiles.', source: appBundleSource, coveredByTiles: ['accent-header', 'compare-left', 'compare-right'] },
      { kind: 'app-bundle', title: 'Pipeline Flow Template', pathname: 'pipeline', description: 'Bundled template asset with workflow, status grid, and bar chart tiles.', source: appBundleSource, coveredByTiles: ['accent-header', 'pipeline', 'status-grid', 'bar-chart'] },
      { kind: 'app-bundle', title: 'Executive Brief Template', pathname: 'executive', description: 'Bundled template asset with fact sheet, KPIs, emphasis, and table tiles.', source: appBundleSource, coveredByTiles: ['accent-header', 'fact-sheet', 'kpi', 'emphasis', 'table'] },
      { kind: 'app-bundle', title: 'Data Report Template', pathname: 'data-report', description: 'Bundled template asset with table, line, pie, emphasis, and KPI tiles.', source: appBundleSource, coveredByTiles: ['accent-header', 'table', 'line-chart', 'pie-chart', 'emphasis', 'kpi'] },
      { kind: 'app-bundle', title: 'KPI Board Template', pathname: 'kpi-board', description: 'Bundled template asset with dense KPI, radar, pie, and line chart tiles.', source: appBundleSource, coveredByTiles: ['accent-header', 'kpi', 'radar-chart', 'pie-chart', 'line-chart'] },
    ],
  },
  {
    title: 'Tile Spec Viewer',
    description: 'Inline tile specifications from lib/MVP_proto/tile-spec-viewer.html now represented as reusable library tile components.',
    assets: [
      { kind: 'tile-spec', title: 'Accuracy', pathname: 'tile-a', description: '2W x 4R model accuracy KPI with threshold color states and trend indicator.', source: 'lib/MVP_proto/tile-spec-viewer.html', coveredByTiles: ['accuracy-tile', 'kpi'] },
      { kind: 'tile-spec', title: 'Events/sec', pathname: 'tile-b', description: '4W x 8R throughput tile with peak utilization thresholds and aggregation window.', source: 'lib/MVP_proto/tile-spec-viewer.html', coveredByTiles: ['events-sec-tile', 'bar-chart', 'stat-block'] },
      { kind: 'tile-spec', title: 'Status', pathname: 'tile-c', description: '8W x 8R system health tile with overall status, per-system state, latency, and freshness.', source: 'lib/MVP_proto/tile-spec-viewer.html', coveredByTiles: ['status-tile', 'status-grid'] },
    ],
  },
  {
    title: 'Line Charts',
    description: 'Time-series and categorical line visualizations with gap handling and multi-series support.',
    assets: [
      { kind: 'unovis', title: 'Basic Line Chart', pathname: 'basic-line-chart', description: 'Single-series line with default axis configuration', source: unovisSource('basic-line-chart'), coveredByTiles: ['line-chart'] },
      { kind: 'unovis', title: 'Multi Line Chart', pathname: 'multi-line-chart', description: 'Multiple series with automatic color assignment', source: unovisSource('multi-line-chart'), coveredByTiles: ['line-chart'] },
      { kind: 'unovis', title: 'Line Chart with Data Gaps', pathname: 'data-gap-line-chart', description: 'Graceful handling of null/undefined data points', source: unovisSource('data-gap-line-chart'), coveredByTiles: ['line-chart'] },
      { kind: 'unovis', title: 'Patchy Line Chart with Data Gaps', pathname: 'patchy-line-chart', description: 'Segmented rendering for sparse time-series data', source: unovisSource('patchy-line-chart'), coveredByTiles: ['line-chart'] },
      { kind: 'unovis', title: 'Basic Timeline', pathname: 'basic-timeline', description: 'Horizontal timeline with event positioning', source: unovisSource('basic-timeline'), coveredByTiles: ['line-chart', 'pipeline'] },
    ],
  },
  {
    title: 'Area Charts',
    description: 'Filled region charts for cumulative, stacked, and baseline-relative data.',
    assets: [
      { kind: 'unovis', title: 'Non-Stacked Area Chart', pathname: 'non-stacked-area-chart', description: 'Overlapping area series without stacking', source: unovisSource('non-stacked-area-chart'), coveredByTiles: ['line-chart'] },
      { kind: 'unovis', title: 'Stacked Area Chart with XYLabels', pathname: 'stacked-area-chart', description: 'Cumulative stacking with inline axis labels', source: unovisSource('stacked-area-chart'), coveredByTiles: ['stacked-bar', 'line-chart'] },
      { kind: 'unovis', title: 'Stacked Area Chart with attributes', pathname: 'stacked-area-chart-with-attributes', description: 'Custom fill/stroke attributes per series', source: unovisSource('stacked-area-chart-with-attributes'), coveredByTiles: ['stacked-bar', 'line-chart'] },
      { kind: 'unovis', title: 'Area with Baseline', pathname: 'baseline-area-chart', description: 'Area fill relative to a configurable baseline value', source: unovisSource('baseline-area-chart'), coveredByTiles: ['line-chart'] },
      { kind: 'unovis', title: 'Step Area Chart', pathname: 'step-area-chart', description: 'Discrete step interpolation for categorical data', source: unovisSource('step-area-chart'), coveredByTiles: ['line-chart'] },
    ],
  },
  {
    title: 'Bar Charts',
    description: 'Grouped and stacked bar visualizations with horizontal/vertical orientation.',
    assets: [
      { kind: 'unovis', title: 'Basic Grouped Bar Chart', pathname: 'basic-grouped-bar', description: 'Side-by-side grouped bars with category axis', source: unovisSource('basic-grouped-bar'), coveredByTiles: ['grouped-column', 'bar-chart'] },
      { kind: 'unovis', title: 'Horizontal Stacked Bar Chart with Tooltip and Legend', pathname: 'horizontal-stacked-bar-chart', description: 'Horizontal orientation with tooltip and interactive legend', source: unovisSource('horizontal-stacked-bar-chart'), coveredByTiles: ['stacked-bar', 'bar-chart'] },
    ],
  },
  {
    title: 'Scatter Plots',
    description: 'Point-based visualizations with size and shape encoding for multivariate data.',
    assets: [
      { kind: 'unovis', title: 'Basic Scatter Plot', pathname: 'basic-scatter-plot', description: 'Simple X/Y point distribution', source: unovisSource('basic-scatter-plot'), coveredByTiles: ['radar-chart'] },
      { kind: 'unovis', title: 'Scatter Plot with Varied Size', pathname: 'sized-scatter-plot', description: 'Point radius mapped to a third variable', source: unovisSource('sized-scatter-plot'), coveredByTiles: ['radar-chart'] },
      { kind: 'unovis', title: 'Scatter Plot with Varied Shape', pathname: 'shaped-scatter-plot', description: 'Shape encoding for categorical differentiation', source: unovisSource('shaped-scatter-plot'), coveredByTiles: ['radar-chart'] },
    ],
  },
  {
    title: 'Maps',
    description: 'Geospatial visualizations using TopoJSON, Leaflet, and MapLibre.',
    assets: [
      { kind: 'unovis', title: 'Basic Leaflet Map', pathname: 'basic-leaflet-map', description: 'Tile-based interactive map with Leaflet integration', source: unovisSource('basic-leaflet-map'), coveredByTiles: ['overview-cards', 'meta-info'] },
      { kind: 'unovis', title: 'Leaflet Flow Map', pathname: 'leaflet-flow-map', description: 'Directional flow lines overlaid on a Leaflet map', source: unovisSource('leaflet-flow-map'), coveredByTiles: ['pipeline', 'overview-cards'] },
      { kind: 'unovis', title: 'Advanced Leaflet Map', pathname: 'advanced-leaflet-map', description: 'MapLibre GL rendering with advanced tile layers', source: unovisSource('advanced-leaflet-map'), coveredByTiles: ['overview-cards', 'meta-info'] },
      { kind: 'unovis', title: 'Choropleth World Map with Custom Legend', pathname: 'topojson-map', description: 'TopoJSON geometry with color-coded regions and legend', source: unovisSource('topojson-map'), coveredByTiles: ['status-grid', 'meta-info'] },
    ],
  },
  {
    title: 'Networks and Flows',
    description: 'Graph, Sankey, and hierarchical layout visualizations for relationship data.',
    assets: [
      { kind: 'unovis', title: 'Basic Sankey', pathname: 'basic-sankey', description: 'Flow diagram with proportional link widths', source: unovisSource('basic-sankey'), coveredByTiles: ['pipeline'] },
      { kind: 'unovis', title: 'Expandable Sankey', pathname: 'expandable-sankey', description: 'Interactive expand/collapse of Sankey node groups', source: unovisSource('expandable-sankey'), coveredByTiles: ['pipeline'] },
      { kind: 'unovis', title: 'Dagre Layout Graph', pathname: 'dagre-graph', description: 'Directed acyclic graph using Dagre layout engine', source: unovisSource('dagre-graph'), coveredByTiles: ['pipeline', 'overview-cards'] },
      { kind: 'unovis', title: 'Force Layout Graph', pathname: 'force-graph', description: 'Physics-based force-directed node placement', source: unovisSource('force-graph'), coveredByTiles: ['pipeline', 'overview-cards'] },
      { kind: 'unovis', title: 'Parallel Layout Graph', pathname: 'parallel-graph', description: 'Parallel left-to-right hierarchical graph layout', source: unovisSource('parallel-graph'), coveredByTiles: ['pipeline'] },
      { kind: 'unovis', title: 'ELK Layered Graph Layout', pathname: 'elk-layered-graph', description: 'Eclipse Layout Kernel layered algorithm', source: unovisSource('elk-layered-graph'), coveredByTiles: ['pipeline', 'overview-cards'] },
      { kind: 'unovis', title: 'Custom Nodes Graph with tooltips', pathname: 'custom-nodes-graph', description: 'SVG/HTML custom node rendering with hover tooltips', source: unovisSource('custom-nodes-graph'), coveredByTiles: ['overview-cards', 'meta-info'] },
    ],
  },
  {
    title: 'Circular Charts',
    description: 'Radial visualizations including donut, chord, and sunburst layouts.',
    assets: [
      { kind: 'unovis', title: 'Basic Donut Chart', pathname: 'basic-donut-chart', description: 'Ring chart with proportional arc segments', source: unovisSource('basic-donut-chart'), coveredByTiles: ['pie-chart'] },
      { kind: 'unovis', title: 'Hierarchical Chord Diagram', pathname: 'hierarchical-chord-diagram', description: 'Nested group chords showing inter-group flows', source: unovisSource('hierarchical-chord-diagram'), coveredByTiles: ['pie-chart', 'pipeline'] },
      { kind: 'unovis', title: 'Sunburst Nested Donut', pathname: 'sunburst-nested-donut', description: 'Multi-level concentric rings for hierarchical data', source: unovisSource('sunburst-nested-donut'), coveredByTiles: ['pie-chart'] },
    ],
  },
  {
    title: 'Treemap',
    description: 'Nested rectangular partitioning for hierarchical data proportions.',
    assets: [
      { kind: 'unovis', title: 'Treemap', pathname: 'treemap', description: 'Space-filling hierarchical rectangle layout', source: unovisSource('treemap'), coveredByTiles: ['overview-cards', 'stat-block'] },
    ],
  },
  {
    title: 'Composite Charts',
    description: 'Multi-component overlays combining different chart types on shared axes.',
    assets: [
      { kind: 'unovis', title: 'Dual Axis Chart', pathname: 'dual-axis-chart', description: 'Two Y-axes with independent scales and chart types', source: unovisSource('dual-axis-chart'), coveredByTiles: ['line-chart', 'bar-chart'] },
      { kind: 'unovis', title: 'Range Plot', pathname: 'range-plot', description: 'Vertical range bands showing min/max intervals', source: unovisSource('range-plot'), coveredByTiles: ['bar-chart', 'line-chart'] },
    ],
  },
  {
    title: 'Auxiliary Components',
    description: 'Interactive overlays: annotations, brushes, crosshairs, plot bands, and legends.',
    assets: [
      { kind: 'unovis', title: 'Chart Annotations', pathname: 'basic-annotations', description: 'Text and marker annotations on chart elements', source: unovisSource('basic-annotations'), coveredByTiles: ['line-chart', 'meta-info'] },
      { kind: 'unovis', title: 'Stacked Bar Chart with Crosshair', pathname: 'crosshair-stacked-bar', description: 'Vertical crosshair cursor with value readout', source: unovisSource('crosshair-stacked-bar'), coveredByTiles: ['stacked-bar'] },
      { kind: 'unovis', title: 'Grouped Bar with Brush and Interactive Legend', pathname: 'brush-grouped-bar', description: 'Axis brush selection with legend-driven series toggle', source: unovisSource('brush-grouped-bar'), coveredByTiles: ['grouped-column', 'bar-chart'] },
      { kind: 'unovis', title: 'Scatter Plot with Free Brush', pathname: 'free-brush-scatters', description: 'Rectangular free-form brush for point selection', source: unovisSource('free-brush-scatters'), coveredByTiles: ['radar-chart'] },
      { kind: 'unovis', title: 'Plot bands and plot lines', pathname: 'plotband-plotline', description: 'Shaded bands and reference lines overlaid on chart area', source: unovisSource('plotband-plotline'), coveredByTiles: ['line-chart', 'bar-chart'] },
    ],
  },
  {
    title: 'Reusable FlipCard Component',
    description: 'Core reusable flip surface extracted from the pattern library.',
    assets: [
      { kind: 'pattern', title: 'FlipCard Props', pathname: 'flipcard-props', description: 'Shared component contract with front/back slots, JSON auto-rendering, and controlled state.', source: patternSource, coveredByTiles: ['overview-cards', 'meta-info'] },
    ],
  },
  {
    title: 'Adaptive Cards Gallery',
    description: 'Official Adaptive Cards sample descriptors presented as FlipCard gallery entries with rendered fronts and JSON backs.',
    assets: [
      { kind: 'pattern', title: 'Flight Itinerary', pathname: 'flight-itinerary', description: 'Official Adaptive Cards scenario sample rendered in the pattern library front face and exposed as raw JSON on the back.', source: adaptiveCardsSource('v1.5/Scenarios/FlightItinerary.json'), coveredByTiles: ['overview-cards', 'fact-sheet'] },
      { kind: 'pattern', title: 'Weather Forecast', pathname: 'weather-forecast', description: 'Official Adaptive Cards scenario sample rendered in the pattern library front face and exposed as raw JSON on the back.', source: adaptiveCardsSource('v1.5/Scenarios/WeatherCompact.json'), coveredByTiles: ['overview-cards', 'kpi'] },
      { kind: 'pattern', title: 'Expense Report', pathname: 'expense-report', description: 'Official Adaptive Cards scenario sample rendered in the pattern library front face and exposed as raw JSON on the back.', source: adaptiveCardsSource('v1.5/Scenarios/ExpenseReport.json'), coveredByTiles: ['table', 'fact-sheet'] },
      { kind: 'pattern', title: 'Stock Update', pathname: 'stock-update', description: 'Official Adaptive Cards scenario sample rendered in the pattern library front face and exposed as raw JSON on the back.', source: adaptiveCardsSource('v1.5/Scenarios/StockUpdate.json'), coveredByTiles: ['line-chart', 'kpi'] },
      { kind: 'pattern', title: 'Food Order', pathname: 'food-order', description: 'Official Adaptive Cards scenario sample rendered in the pattern library front face and exposed as raw JSON on the back.', source: adaptiveCardsSource('v1.5/Scenarios/FoodOrder.json'), coveredByTiles: ['table', 'fact-sheet'] },
      { kind: 'pattern', title: 'Activity Update', pathname: 'activity-update', description: 'Official Adaptive Cards scenario sample rendered in the pattern library front face and exposed as raw JSON on the back.', source: adaptiveCardsSource('v1.5/Scenarios/ActivityUpdate.json'), coveredByTiles: ['pipeline', 'status-grid'] },
      { kind: 'pattern', title: 'Input Form', pathname: 'input-form', description: 'Official Adaptive Cards scenario sample rendered in the pattern library front face and exposed as raw JSON on the back.', source: adaptiveCardsSource('v1.5/Scenarios/InputForm.json'), coveredByTiles: ['table', 'meta-info'] },
      { kind: 'pattern', title: 'Restaurant', pathname: 'restaurant', description: 'Official Adaptive Cards scenario sample rendered in the pattern library front face and exposed as raw JSON on the back.', source: adaptiveCardsSource('v1.5/Scenarios/Restaurant.json'), coveredByTiles: ['overview-cards', 'fact-sheet'] },
    ],
  },
  {
    title: 'Adaptive Tiles Library',
    description: 'Tile schema patterns with Power Fx bindings mirrored from the pattern library.',
    assets: [
      { kind: 'pattern', title: 'Donut Chart', pathname: 'donut-chart-tile', description: 'Analytics tile schema using proportional columns to simulate a donut breakdown.', source: patternSource, coveredByTiles: ['pie-chart'] },
      { kind: 'pattern', title: 'Horizontal Bar Chart', pathname: 'horizontal-bar-chart-tile', description: 'Analytics tile schema using ColumnSet widths to encode score percentages.', source: patternSource, coveredByTiles: ['bar-chart', 'stacked-bar'] },
    ],
  },
  {
    title: 'livetile design Canvas',
    description: 'Adaptive live tile patterns, including the same additional schema views on every live tile card.',
    assets: [
      { kind: 'pattern', title: 'Eval Configs', pathname: 'eval-configs-live-tile', description: 'KPI live tile showing evaluation configuration count and trend delta.', source: patternSource, coveredByTiles: ['kpi'] },
      { kind: 'pattern', title: 'Live Weather', pathname: 'live-weather-tile', description: 'Live weather tile populated from Open-Meteo with current conditions and a compact forecast strip.', source: 'https://api.open-meteo.com/v1/forecast', coveredByTiles: ['kpi', 'line-chart'] },
      { kind: 'pattern', title: 'BIC Scores', pathname: 'bic-scores-live-tile', description: 'Score breakdown live tile rendered as dashboard bars over a dark surface.', source: patternSource, coveredByTiles: ['bar-chart'] },
    ],
  },
  {
    title: 'Component Showcase',
    description: 'Pattern library demo cards covering a simple adaptive card and a dashboard template surface.',
    assets: [
      { kind: 'pattern', title: 'Hello World Card', pathname: 'hello-world-card', description: 'Minimal hello-world adaptive card demo used in the component showcase section.', source: patternSource, coveredByTiles: ['hero', 'accent-header'] },
      { kind: 'pattern', title: 'Dashboard Template', pathname: 'dashboard-template', description: 'Dashboard template card showing a 12-column, 7-row layout with 7 tiles.', source: patternSource, coveredByTiles: ['accent-header', 'kpi', 'bar-chart', 'pie-chart'] },
    ],
  },
  {
    title: 'Discover Templates',
    description: 'FAQ-driven Copilot card template surfaced through the pattern library Discover section.',
    assets: [
      { kind: 'pattern', title: 'FAQ Chatbot', pathname: 'faq-chatbot-template', description: 'FAQ assistant template with ShowCard-based answers and Power Fx data bindings.', source: patternSource, coveredByTiles: ['overview-cards', 'fact-sheet'] },
    ],
  },
  {
    title: 'Evaluation Tiles',
    description: 'Evaluation KPI surfaces with explicit JSON schema views mirrored from the pattern library.',
    assets: [
      { kind: 'pattern', title: 'Eval Configs', pathname: 'eval-configs-evaluation-tile', description: 'Evaluation KPI tile summarizing configuration count for the environment.', source: patternSource, coveredByTiles: ['kpi'] },
      { kind: 'pattern', title: 'Pass Rate', pathname: 'pass-rate-evaluation-tile', description: 'Combined pass-rate KPI tile with run totals and week-over-week trend.', source: patternSource, coveredByTiles: ['kpi', 'stat-block'] },
    ],
  },
  {
    title: 'Security Summary',
    description: 'Summary metric cards extracted from the pattern library security admin section.',
    assets: [
      { kind: 'pattern', title: 'Total Agents', pathname: 'total-agents', description: 'Environment-wide agent count summary metric.', source: patternSource, coveredByTiles: ['kpi'] },
      { kind: 'pattern', title: 'No Authentication', pathname: 'no-authentication', description: 'Critical summary metric highlighting agents without authentication.', source: patternSource, coveredByTiles: ['kpi', 'status-grid'] },
      { kind: 'pattern', title: 'Microsoft Auth', pathname: 'microsoft-auth', description: 'Summary metric showing agents already using Microsoft authentication.', source: patternSource, coveredByTiles: ['kpi', 'status-grid'] },
      { kind: 'pattern', title: 'Web Security Off', pathname: 'web-security-off', description: 'Critical summary metric tracking unsecured web channel exposure.', source: patternSource, coveredByTiles: ['kpi', 'status-grid'] },
    ],
  },
  {
    title: 'Portfolio Scope',
    description: '3DKG portfolio layer cards mirrored from the security admin scope subsection.',
    assets: [
      { kind: 'pattern', title: 'Security Layer', pathname: 'security-layer', description: 'Identity, access policy, and agent-connectivity gates', source: patternSource, coveredByTiles: ['fact-sheet', 'pipeline', 'meta-info'] },
      { kind: 'pattern', title: 'Identity Layer', pathname: 'identity-layer', description: 'Inner core identity surface', source: patternSource, coveredByTiles: ['fact-sheet', 'pipeline', 'meta-info'] },
      { kind: 'pattern', title: 'Channel Layer', pathname: 'channel-layer', description: 'Where the agent surfaces to users and platforms', source: patternSource, coveredByTiles: ['fact-sheet', 'pipeline', 'meta-info'] },
      { kind: 'pattern', title: 'AI Settings Layer', pathname: 'ai-settings-layer', description: 'Model, planner, grounding, and file-analysis controls', source: patternSource, coveredByTiles: ['fact-sheet', 'pipeline', 'meta-info'] },
    ],
  },
  {
    title: 'Security Settings',
    description: 'Actionable security setting cards with compliance state and recommended target values.',
    assets: [
      { kind: 'pattern', title: 'Authentication Mode', pathname: 'auth-mode', description: 'Require Entra ID authentication before any user can interact with the agent.', source: patternSource, coveredByTiles: ['status-grid', 'fact-sheet'] },
      { kind: 'pattern', title: 'Authentication Trigger', pathname: 'auth-trigger', description: 'Controls when the authentication prompt appears. Always means every new session requires sign-in.', source: patternSource, coveredByTiles: ['status-grid', 'fact-sheet'] },
      { kind: 'pattern', title: 'Access Control', pathname: 'access-control', description: 'Restricts which users or groups can interact with the agent.', source: patternSource, coveredByTiles: ['status-grid', 'fact-sheet'] },
      { kind: 'pattern', title: 'Web Channel Security', pathname: 'web-channel-sec', description: 'When disabled, the Direct Line token endpoint is open.', source: patternSource, coveredByTiles: ['status-grid', 'fact-sheet'] },
      { kind: 'pattern', title: 'Agent Connectivity', pathname: 'agent-connectable', description: 'Allows other Copilot Studio agents to call this agent as a sub-agent.', source: patternSource, coveredByTiles: ['status-grid', 'fact-sheet'] },
      { kind: 'pattern', title: 'Generative Actions', pathname: 'generative-actions', description: 'Enables the LLM to autonomously select and invoke plugin actions without explicit topic routing.', source: patternSource, coveredByTiles: ['status-grid', 'fact-sheet'] },
      { kind: 'pattern', title: 'File Upload Analysis', pathname: 'file-analysis', description: 'Allows users to upload files which the LLM will parse and analyze within the conversation context.', source: patternSource, coveredByTiles: ['status-grid', 'fact-sheet'] },
    ],
  },
  {
    title: 'Architecture Index',
    description: 'Pattern library architecture-surface flip cards mapped to the reusable tile coverage model.',
    assets: [
      { kind: 'pattern', title: 'Reusable FlipCard Surface', pathname: 'arch-reusable-flipcard', description: 'Architecture index card for the shared FlipCard component contract and click-anywhere trigger.', source: patternSource, coveredByTiles: ['overview-cards', 'meta-info'] },
      { kind: 'pattern', title: 'FlipCard Sample Gallery Surface', pathname: 'arch-flipcard-sample-gallery', description: 'Architecture index card for FlipCard sample surfaces that render visual previews on the front and source JSON on the back.', source: patternSource, coveredByTiles: ['overview-cards', 'meta-info'] },
      { kind: 'pattern', title: 'Adaptive Tiles Library Surface', pathname: 'arch-adaptive-tiles-library', description: 'Architecture index card for TileCard previews with full tile schema JSON back faces.', source: patternSource, coveredByTiles: ['overview-cards', 'meta-info'] },
      { kind: 'pattern', title: 'livetile design Canvas Surface', pathname: 'arch-livetile-design-canvas', description: 'Architecture index card for livetile canvas surfaces exposing individual tile schemas.', source: patternSource, coveredByTiles: ['overview-cards', 'meta-info'] },
      { kind: 'pattern', title: 'Component Showcase Surface', pathname: 'arch-component-showcase', description: 'Architecture index card for FlipCard demo variants with JSON and custom back faces.', source: patternSource, coveredByTiles: ['overview-cards', 'meta-info'] },
      { kind: 'pattern', title: 'Discover Templates Surface', pathname: 'arch-discover-templates', description: 'Architecture index card for Discover gallery templates using FlipCard and CopilotCard surfaces.', source: patternSource, coveredByTiles: ['overview-cards', 'meta-info'] },
      { kind: 'pattern', title: 'Evaluation Tiles Surface', pathname: 'arch-evaluation-tiles', description: 'Architecture index card for evaluation KPI tiles with persistent schema back faces.', source: patternSource, coveredByTiles: ['overview-cards', 'meta-info'] },
      { kind: 'pattern', title: 'Security Summary Surface', pathname: 'arch-security-summary', description: 'Architecture index card for summary metrics with security audit JSON back faces.', source: patternSource, coveredByTiles: ['overview-cards', 'meta-info'] },
      { kind: 'pattern', title: 'Portfolio Scope Surface', pathname: 'arch-portfolio-scope', description: 'Architecture index card for 3DKG layer cards rendered as Adaptive Card surfaces.', source: patternSource, coveredByTiles: ['overview-cards', 'meta-info'] },
      { kind: 'pattern', title: 'Security Settings Surface', pathname: 'arch-security-settings', description: 'Architecture index card for setting-state cards with config JSON and impact metadata.', source: patternSource, coveredByTiles: ['overview-cards', 'meta-info'] },
    ],
  },
  {
    title: 'FlipCard Runtime Integrations',
    description: 'External source feeds and render helpers used by the FlipCard pattern library hydration layer.',
    assets: [
      { kind: 'engine', title: 'flipcard_livetile Engine', pathname: 'flipcard-livetile-engine', description: 'Typed engine that composes LiveTile template/profile data into FlipCard front surfaces and copyable JSON back faces.', source: 'src/engines/flipcard_livetile_engine.ts', coveredByTiles: ['flipcard-livetile-engine', 'flipcard-runtime', 'tile-runtime'] },
      { kind: 'api-endpoint', title: 'Adaptive Cards GitHub Repository API', pathname: 'github-repo-api', description: 'Public GitHub REST endpoint used for microsoft/AdaptiveCards repository status metadata.', source: 'https://api.github.com/repos/microsoft/AdaptiveCards', coveredByTiles: ['api-status', 'meta-info'] },
      { kind: 'api-endpoint', title: 'Adaptive Cards Raw Sample Base', pathname: 'adaptive-cards-raw-samples', description: 'Raw GitHub content base used as sample data for FlipCard front/back gallery entries.', source: 'https://raw.githubusercontent.com/microsoft/AdaptiveCards/main/samples', coveredByTiles: ['api-status', 'flipcard-runtime'] },
      { kind: 'sdk-runtime', title: 'FlipCard Preview Renderer', pathname: 'flipcard-preview-renderer', description: 'Pattern-library render helper that turns source JSON into FlipCard front-face previews and copyable back-face payloads.', source: patternSource, coveredByTiles: ['flipcard-runtime', 'overview-cards'] },
      { kind: 'api-endpoint', title: 'Open-Meteo Forecast API', pathname: 'open-meteo-forecast-api', description: 'No-key weather API used by the Live Weather tile and API status layer.', source: 'https://api.open-meteo.com/v1/forecast', coveredByTiles: ['api-status', 'kpi', 'line-chart'] },
    ],
  },
] as const satisfies readonly GalleryAssetCollectionCoverage[];

export const GALLERY_ASSET_TOTAL = GALLERY_ASSET_COVERAGE.reduce(
  (total, collection) => total + collection.assets.length,
  0,
);

export const GALLERY_ASSET_TITLES = GALLERY_ASSET_COVERAGE.flatMap((collection) =>
  collection.assets.map((asset) => asset.title),
);
