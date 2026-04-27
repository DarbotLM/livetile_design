import type {
  BarChartDataPoint,
  GroupedColumnDataPoint,
  GroupedColumnSeries,
  KpiContent,
  LineChartDataPoint,
  PieChartDataPoint,
  RadarChartDataPoint,
  StackedBarDataPoint,
  StatusGridItem,
  TileContentMap,
  TileType,
} from './types';

type DomainLibrary = {
  title: string;
  subtitle: string;
  badge: string;
  headerPage: string;
  kpis: KpiContent[];
  barTitle: string;
  barData: BarChartDataPoint[];
  pieTitle: string;
  pieData: PieChartDataPoint[];
  lineTitle: string;
  lineData: LineChartDataPoint[];
  radarTitle: string;
  radarData: RadarChartDataPoint[];
  stackedTitle: string;
  stackedData: StackedBarDataPoint[];
  tableTitle: string;
  tableColumns: string[];
  tableRows: string[][];
  factTitle: string;
  factSubtitle: string;
  facts: Array<{ key: string; value: string }>;
  pipelineTitle: string;
  pipelineSteps: string[];
  completedCount: number;
  statusTitle: string;
  statusItems: StatusGridItem[];
  cardsDescription: string;
  cards: string[];
  metaTitle: string;
  metaEntries: Array<{ key: string; value: string; highlight?: boolean }>;
  insightLabel: string;
  insightText: string;
  insightHighlights: string[];
  compareLeftLabel: string;
  compareLeftStrategy: string;
  compareLeftItems: string[];
  compareLeftFooter: string;
  compareRightLabel: string;
  compareRightStrategy: string;
  compareRightItems: string[];
  compareRightFooter: string;
  statTitle: string;
  stats: Array<{ label: string; value: string; up: boolean }>;
  groupedTitle: string;
  groupedSeries: GroupedColumnSeries[];
  groupedData: GroupedColumnDataPoint[];
};

export const KPI_BANK: KpiContent[] = [
  { label: 'Service Level', value: '96%', delta: '+2%', up: true },
  { label: 'Cycle Time', value: '4.2d', delta: '-0.6d', up: true },
  { label: 'Risk Items', value: '7', delta: '-3', up: true },
  { label: 'Coverage', value: '84%', delta: '+5%', up: true },
  { label: 'Cost Index', value: '0.91', delta: '-4%', up: true },
  { label: 'Escalations', value: '12', delta: '+2', up: false },
];

export const BIC_DATA: BarChartDataPoint[] = [
  { dim: 'Quality', score: 91, prev: 87 },
  { dim: 'Speed', score: 84, prev: 81 },
  { dim: 'Cost', score: 88, prev: 86 },
  { dim: 'Risk', score: 79, prev: 82 },
  { dim: 'Experience', score: 85, prev: 80 },
];

export const PIE_DATA: PieChartDataPoint[] = [
  { name: 'Core Ops', value: 44 },
  { name: 'Advisory', value: 28 },
  { name: 'Automation', value: 18 },
  { name: 'Exception', value: 10 },
];

export const TREND_DATA: LineChartDataPoint[] = [
  { q: "Q1 '25", bic: 0.78, latency: 2.8, tput: 88 },
  { q: "Q2 '25", bic: 0.82, latency: 2.4, tput: 92 },
  { q: "Q3 '25", bic: 0.86, latency: 2.1, tput: 95 },
  { q: "Q4 '25", bic: 0.89, latency: 1.9, tput: 98 },
  { q: "Q1 '26", bic: 0.92, latency: 1.6, tput: 99 },
];

export const RADAR_DATA: RadarChartDataPoint[] = [
  { dim: 'Quality', score: 91 },
  { dim: 'Speed', score: 84 },
  { dim: 'Cost', score: 88 },
  { dim: 'Risk', score: 79 },
  { dim: 'Adoption', score: 86 },
  { dim: 'Evidence', score: 82 },
];

export const STACKED_DATA: StackedBarDataPoint[] = [
  { q: 'Phase 1', pass: 72, warn: 18, fail: 10 },
  { q: 'Phase 2', pass: 78, warn: 15, fail: 7 },
  { q: 'Phase 3', pass: 85, warn: 11, fail: 4 },
];

const BASE_LIBRARY: DomainLibrary = {
  title: 'Operating Model Review',
  subtitle: 'Performance, risk, adoption, and delivery quality',
  badge: 'Library',
  headerPage: '1 / 4',
  kpis: KPI_BANK,
  barTitle: 'Performance by Dimension',
  barData: BIC_DATA,
  pieTitle: 'Workload Distribution',
  pieData: PIE_DATA,
  lineTitle: 'Operating Trend',
  lineData: TREND_DATA,
  radarTitle: 'Capability Coverage',
  radarData: RADAR_DATA,
  stackedTitle: 'Readiness by Phase',
  stackedData: STACKED_DATA,
  tableTitle: 'Operating Review',
  tableColumns: ['Area', 'Owner', 'Decision'],
  tableRows: [
    ['Demand', 'Operations', 'Scale intake'],
    ['Quality', 'Delivery', 'Reduce rework'],
    ['Risk', 'Controls', 'Close gaps'],
    ['Adoption', 'Enablement', 'Improve uptake'],
  ],
  factTitle: 'Program Summary',
  factSubtitle: 'Cross-industry planning view',
  facts: [
    { key: 'Portfolio', value: 'Shared services' },
    { key: 'Scope', value: '12 workstreams' },
    { key: 'Region', value: 'North America' },
    { key: 'Review', value: 'Monthly' },
    { key: 'Status', value: 'On track' },
  ],
  pipelineTitle: 'Delivery Workflow',
  pipelineSteps: ['Intake', 'Triage', 'Plan', 'Execute', 'Validate', 'Improve'],
  completedCount: 4,
  statusTitle: 'Workstream Health',
  statusItems: [
    { label: 'Demand', subtitle: 'Volume stable', severity: 'good' },
    { label: 'Quality', subtitle: 'Rework improving', severity: 'good' },
    { label: 'Risk', subtitle: 'Two gaps open', severity: 'warning' },
    { label: 'Data', subtitle: 'Lineage missing', severity: 'danger' },
    { label: 'Change', subtitle: 'Training ready', severity: 'good' },
    { label: 'Support', subtitle: 'Backlog steady', severity: 'good' },
  ],
  cardsDescription: 'Reusable specialty library cards',
  cards: [
    'Healthcare access',
    'Financial controls',
    'Retail experience',
    'Manufacturing quality',
    'Supply chain recovery',
    'Cybersecurity posture',
    'Education outcomes',
    'Energy reliability',
  ],
  metaTitle: 'Library Metadata',
  metaEntries: [
    { key: 'Library', value: 'Generic Industries', highlight: true },
    { key: 'Version', value: 'adaptive-slide/v1.0' },
    { key: 'Templates', value: '12' },
    { key: 'Tile Families', value: '18' },
    { key: 'Use', value: 'Reusable demos' },
  ],
  insightLabel: 'Operating Insight',
  insightText: 'The strongest boards pair outcome metrics with risk signals and a clear owner for the next action.',
  insightHighlights: ['outcome metrics', 'risk signals', 'clear owner'],
  compareLeftLabel: 'CURRENT',
  compareLeftStrategy: 'Baseline Model',
  compareLeftItems: ['Manual triage', 'Weekly reporting', 'Reactive controls', 'Limited instrumentation'],
  compareLeftFooter: 'Good for small teams',
  compareRightLabel: 'TARGET',
  compareRightStrategy: 'Scaled Model',
  compareRightItems: ['Automated routing', 'Daily telemetry', 'Preventive controls', 'Decision-ready evidence'],
  compareRightFooter: 'Ready for enterprise operations',
  statTitle: 'Movement',
  stats: [
    { label: 'Quality', value: '+4%', up: true },
    { label: 'Speed', value: '+7%', up: true },
    { label: 'Risk', value: '-3', up: true },
  ],
  groupedTitle: 'Volume by Channel',
  groupedSeries: [
    { key: 'digital', name: 'Digital' },
    { key: 'field', name: 'Field' },
    { key: 'partner', name: 'Partner' },
  ],
  groupedData: [
    { category: 'Week 1', digital: 320, field: 180, partner: 95 },
    { category: 'Week 2', digital: 340, field: 210, partner: 88 },
    { category: 'Week 3', digital: 380, field: 195, partner: 102 },
    { category: 'Week 4', digital: 410, field: 230, partner: 110 },
    { category: 'Week 5', digital: 450, field: 250, partner: 125 },
  ],
};

const LIBRARIES: Record<string, DomainLibrary> = {
  'title-overview': {
    ...BASE_LIBRARY,
    title: 'Healthcare Access Program',
    subtitle: 'Patient intake, care navigation, service quality, and outcomes',
    badge: 'Health',
    cardsDescription: 'Healthcare operating capabilities',
    cards: ['Patient intake', 'Care navigation', 'Provider access', 'Claims support', 'Quality measures', 'Member outreach', 'Referral flow', 'Equity review'],
    metaEntries: [
      { key: 'Industry', value: 'Healthcare', highlight: true },
      { key: 'Specialty', value: 'Access operations' },
      { key: 'Audience', value: 'Care leadership' },
      { key: 'Review', value: 'Weekly' },
      { key: 'Schema', value: 'adaptive-slide/v1.0' },
    ],
  },
  dashboard: {
    ...BASE_LIBRARY,
    title: 'Financial Services Portfolio Dashboard',
    subtitle: 'Risk posture, service levels, client impact, and operations',
    headerPage: '2 / 4',
    kpis: [
      { label: 'SLA Met', value: '97%', delta: '+1%', up: true },
      { label: 'Open Risk', value: '14', delta: '-5', up: true },
      { label: 'Client NPS', value: '61', delta: '+4', up: true },
      { label: 'Cost Ratio', value: '0.78', delta: '-3%', up: true },
    ],
    barTitle: 'Control Scores by Domain',
    pieTitle: 'Portfolio Exposure Mix',
  },
  analytics: {
    ...BASE_LIBRARY,
    title: 'Retail Demand and Experience Analytics',
    subtitle: 'Demand trend, channel mix, loyalty signals, and conversion',
    lineTitle: 'Demand Conversion Trend',
    radarTitle: 'Experience Coverage',
    stackedTitle: 'Promotion Readiness',
    statTitle: 'Customer Movement',
  },
  comparison: {
    ...BASE_LIBRARY,
    title: 'Manufacturing Quality Strategy',
    subtitle: 'Preventive controls, inspection flow, throughput, and defects',
    compareLeftLabel: 'INSPECT',
    compareLeftStrategy: 'Reactive Quality',
    compareLeftItems: ['End-line inspection', 'Manual defect coding', 'Batch-level review', 'Delayed containment'],
    compareLeftFooter: 'Higher rework exposure',
    compareRightLabel: 'PREVENT',
    compareRightStrategy: 'Predictive Quality',
    compareRightItems: ['Inline signal capture', 'Automated defect taxonomy', 'Cell-level alerts', 'Fast containment loop'],
    compareRightFooter: 'Lower scrap and rework',
  },
  pipeline: {
    ...BASE_LIBRARY,
    title: 'Supply Chain Recovery Workflow',
    subtitle: 'Plan, source, make, deliver, resolve, and improve',
    pipelineTitle: 'Recovery Workflow',
    pipelineSteps: ['Detect', 'Prioritize', 'Allocate', 'Expedite', 'Communicate', 'Stabilize'],
    statusTitle: 'Supply Health',
    barTitle: 'Recovery Impact by Node',
  },
  executive: {
    ...BASE_LIBRARY,
    title: 'Cybersecurity Executive Brief',
    subtitle: 'Risk reduction, response readiness, exposure, and controls',
    factTitle: 'Security Posture',
    factSubtitle: 'Board-ready operating summary',
    facts: [
      { key: 'Threat Level', value: 'Elevated' },
      { key: 'Coverage', value: '92%' },
      { key: 'Open Vulns', value: '17' },
      { key: 'MTTR', value: '4.6 hours' },
      { key: 'Status', value: 'Improving' },
    ],
    insightLabel: 'Risk Insight',
    insightText: 'Exposure is down, but identity coverage and third-party evidence need tighter operating cadence.',
    insightHighlights: ['Exposure', 'identity coverage', 'third-party evidence'],
  },
  'data-report': {
    ...BASE_LIBRARY,
    title: 'Education Program Evidence',
    subtitle: 'Learner engagement, intervention quality, and completion',
    tableTitle: 'Program Evidence',
    tableColumns: ['Metric', 'Segment', 'Action'],
    tableRows: [
      ['Attendance', 'Grade 9', 'Target outreach'],
      ['Completion', 'STEM', 'Add tutoring'],
      ['Engagement', 'Hybrid', 'Refresh content'],
      ['Support', 'Advising', 'Increase capacity'],
    ],
    pieTitle: 'Learner Support Mix',
  },
  'kpi-board': {
    ...BASE_LIBRARY,
    title: 'Energy Operations KPI Board',
    subtitle: 'Reliability, safety, field response, and sustainability',
    kpis: [
      { label: 'Reliability', value: '99.94%', delta: '+0.02%', up: true },
      { label: 'Safety', value: '0.7', delta: '-0.1', up: true },
      { label: 'Response', value: '38m', delta: '-6m', up: true },
      { label: 'Emissions', value: '-8%', delta: '-2%', up: true },
      { label: 'Backlog', value: '42', delta: '+4', up: false },
      { label: 'Coverage', value: '91%', delta: '+3%', up: true },
    ],
    radarTitle: 'Reliability Coverage',
    pieTitle: 'Asset Work Mix',
    lineTitle: 'Field Response Trend',
  },
  'agent-analytics': {
    ...BASE_LIBRARY,
    title: 'Customer Success Analytics',
    subtitle: 'Adoption, retention, support quality, and expansion signals',
    barTitle: 'Success Score by Segment',
    pieTitle: 'Engagement Mix',
  },
  'bot-dashboard': {
    ...BASE_LIBRARY,
    title: 'Public Sector Service Dashboard',
    subtitle: 'Case volume, response timeliness, channel demand, and outcomes',
    statusTitle: 'Service Health',
    stackedTitle: 'Case Outcomes by Day',
  },
  'conversation-flow': {
    ...BASE_LIBRARY,
    title: 'Legal Operations Matter Flow',
    subtitle: 'Matter intake, review routing, evidence readiness, and closeout',
    pipelineTitle: 'Matter Flow',
    pipelineSteps: ['Intake', 'Conflict check', 'Assign', 'Review', 'Approve', 'Close'],
    radarTitle: 'Practice Coverage',
    pieTitle: 'Matter Type Mix',
  },
  'channel-analytics': {
    ...BASE_LIBRARY,
    title: 'Field Services Channel Analytics',
    subtitle: 'Dispatch volume, technician capacity, parts availability, and SLA trend',
    groupedTitle: 'Dispatch Volume by Channel',
    lineTitle: 'SLA Trend',
  },
};

function getLibrary(templateId?: string): DomainLibrary {
  return (templateId && LIBRARIES[templateId]) || BASE_LIBRARY;
}

export function getDefaultContent<T extends TileType>(
  tileType: T,
  index: number,
  templateId?: string,
): TileContentMap[T] {
  const lib = getLibrary(templateId);

  const contentMap: Record<TileType, () => TileContentMap[TileType]> = {
    hero: () => ({
      title: lib.title,
      subtitle: lib.subtitle,
      badge: lib.badge,
    }),
    'accent-header': () => ({
      title: lib.title,
      subtitle: lib.subtitle,
      page: lib.headerPage,
    }),
    kpi: () => lib.kpis[index % lib.kpis.length]!,
    'bar-chart': () => ({
      title: lib.barTitle,
      data: lib.barData,
    }),
    'pie-chart': () => ({
      title: lib.pieTitle,
      data: lib.pieData,
    }),
    'line-chart': () => ({
      title: lib.lineTitle,
      data: lib.lineData,
    }),
    'radar-chart': () => ({
      title: lib.radarTitle,
      data: lib.radarData,
    }),
    'stacked-bar': () => ({
      title: lib.stackedTitle,
      data: lib.stackedData,
    }),
    table: () => ({
      title: lib.tableTitle,
      columns: lib.tableColumns,
      rows: lib.tableRows,
    }),
    'fact-sheet': () => ({
      title: lib.factTitle,
      subtitle: lib.factSubtitle,
      entries: lib.facts,
    }),
    pipeline: () => ({
      title: lib.pipelineTitle,
      steps: lib.pipelineSteps,
      completedCount: lib.completedCount,
    }),
    'status-grid': () => ({
      title: lib.statusTitle,
      items: lib.statusItems,
    }),
    'overview-cards': () => ({
      description: lib.cardsDescription,
      cards: lib.cards,
    }),
    'meta-info': () => ({
      title: lib.metaTitle,
      entries: lib.metaEntries,
    }),
    emphasis: () => ({
      label: lib.insightLabel,
      text: lib.insightText,
      highlights: lib.insightHighlights,
    }),
    'compare-left': () => ({
      label: lib.compareLeftLabel,
      strategy: lib.compareLeftStrategy,
      colorScheme: 'good' as const,
      items: lib.compareLeftItems,
      footer: lib.compareLeftFooter,
    }),
    'compare-right': () => ({
      label: lib.compareRightLabel,
      strategy: lib.compareRightStrategy,
      colorScheme: 'accent' as const,
      items: lib.compareRightItems,
      footer: lib.compareRightFooter,
    }),
    'stat-block': () => ({
      title: lib.statTitle,
      entries: lib.stats,
    }),
    'grouped-column': () => ({
      title: lib.groupedTitle,
      series: lib.groupedSeries,
      data: lib.groupedData,
    }),
  };

  return contentMap[tileType]() as TileContentMap[T];
}
