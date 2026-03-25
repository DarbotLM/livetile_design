import type {
  TileType,
  TileContentMap,
  KpiContent,
  BarChartDataPoint,
  PieChartDataPoint,
  LineChartDataPoint,
  RadarChartDataPoint,
  StackedBarDataPoint,
} from './types';

import {
  AGENT_KPI_BANK,
  AGENT_RESPONSE_DATA,
  BOT_MESSAGE_PIE,
  AGENT_TREND_DATA,
  INTENT_RADAR_DATA,
  BOT_RESOLUTION_DATA,
  AGENT_STATUS_ITEMS,
} from './agent-data';

// ── Static Data Banks ────────────────────────────────────────────────────────

/** Six KPI samples covering the evaluation audit surface */
export const KPI_BANK: KpiContent[] = [
  { label: 'Eval Configs',  value: '12',  delta: '+2',     up: true  },
  { label: 'Eval Metrics',  value: '48',  delta: '+6',     up: true  },
  { label: 'Result Runs',   value: '19',  delta: '+3',     up: true  },
  { label: 'Best Model',    value: '92%', delta: 'stable', up: null  },
  { label: 'Resp. Traces',  value: '38',  delta: '+8',     up: true  },
  { label: 'Follow-ups',    value: '3',   delta: 'down 1', up: true  },
];

/** BIC (Benchmark for Information Completeness) bar chart data */
export const BIC_DATA: BarChartDataPoint[] = [
  { dim: 'Relevance', score: 91, prev: 88 },
  { dim: 'Complete',  score: 84, prev: 80 },
  { dim: 'Coherence', score: 88, prev: 86 },
  { dim: 'Tool Acc',  score: 79, prev: 82 },
  { dim: 'Citation',  score: 85, prev: 83 },
];

/** Audit evidence distribution for pie / donut charts */
export const PIE_DATA: PieChartDataPoint[] = [
  { name: 'Offline Eval', value: 45 },
  { name: 'Online A/B',   value: 30 },
  { name: 'Shadow Mode',  value: 15 },
  { name: 'Canary',       value: 10 },
];

/** Quarterly quality trend line data */
export const TREND_DATA: LineChartDataPoint[] = [
  { q: "Q1 '24", bic: 0.78, latency: 2.8, tput: 88   },
  { q: "Q2 '24", bic: 0.82, latency: 2.4, tput: 92   },
  { q: "Q3 '24", bic: 0.85, latency: 2.1, tput: 95   },
  { q: "Q4 '24", bic: 0.87, latency: 1.9, tput: 97   },
  { q: "Q1 '25", bic: 0.91, latency: 1.7, tput: 99.9 },
];

/** Radar chart data for dimension coverage */
export const RADAR_DATA: RadarChartDataPoint[] = [
  { dim: 'Grounded', score: 91 },
  { dim: 'Relevant', score: 88 },
  { dim: 'Complete', score: 84 },
  { dim: 'Tool Use', score: 79 },
  { dim: 'Coherent', score: 88 },
  { dim: 'Citation', score: 85 },
];

/** Pass / Warn / Fail stacked bar data by quarter */
export const STACKED_DATA: StackedBarDataPoint[] = [
  { q: "Q3 '24", pass: 72, warn: 18, fail: 10 },
  { q: "Q4 '24", pass: 78, warn: 15, fail: 7  },
  { q: "Q1 '25", pass: 85, warn: 11, fail: 4  },
];

// ── Default Content Factory ──────────────────────────────────────────────────

/** Template IDs that use agent/bot-focused data */
const AGENT_TEMPLATE_IDS = new Set(['agent-analytics', 'bot-dashboard', 'conversation-flow', 'channel-analytics']);

/**
 * Returns typed sample content for any tile type.
 * The `index` parameter is used for types that cycle through a bank (e.g. KPI).
 * The optional `templateId` parameter switches to agent/bot data banks when
 * rendering agent-focused templates.
 */
export function getDefaultContent<T extends TileType>(
  tileType: T,
  index: number,
  templateId?: string,
): TileContentMap[T] {
  const isAgent = templateId ? AGENT_TEMPLATE_IDS.has(templateId) : false;

  const contentMap: Record<TileType, () => TileContentMap[TileType]> = {
    'hero': () => ({
      title: isAgent ? 'Agent Performance Overview' : 'Copilot Studio Evaluation Audit',
      subtitle: isAgent
        ? 'Sessions · Resolution · Handoffs · CSAT'
        : 'Open workspace · Review metrics · Review results · Review responses',
      badge: '1 / 9',
    }),
    'accent-header': () => isAgent
      ? {
          title: templateId === 'bot-dashboard'
            ? 'Bot Operations Dashboard'
            : templateId === 'conversation-flow'
              ? 'Conversation Flow Analytics'
              : 'Agent Performance Analytics',
          subtitle: templateId === 'bot-dashboard'
            ? 'Agent health · Resolution rates · Escalation tracking'
            : templateId === 'conversation-flow'
              ? 'Intent distribution · Message routing · Coverage'
              : 'Response quality · Session metrics · CSAT',
          page: '1 / 3',
        }
      : {
          title: 'Evaluation Review Dashboard',
          subtitle: 'Native metrics · Results archive · Response evidence',
          page: '5 / 9',
        },
    'kpi': () => isAgent
      ? AGENT_KPI_BANK[index % AGENT_KPI_BANK.length]!
      : KPI_BANK[index % KPI_BANK.length]!,
    'bar-chart': () => ({
      title: isAgent ? 'Agent Response Quality Scores' : 'BIC Scores by Dimension',
      data: isAgent ? AGENT_RESPONSE_DATA : BIC_DATA,
    }),
    'pie-chart': () => ({
      title: isAgent ? 'Bot Message Distribution' : 'Audit Evidence Distribution',
      data: isAgent ? BOT_MESSAGE_PIE : PIE_DATA,
    }),
    'line-chart': () => ({
      title: isAgent ? 'Agent Quality Trend (Weekly)' : 'Evaluation Quality Trend',
      data: isAgent ? AGENT_TREND_DATA : TREND_DATA,
    }),
    'radar-chart': () => ({
      title: isAgent ? 'Conversation Intent Coverage' : 'Dimension Radar',
      data: isAgent ? INTENT_RADAR_DATA : RADAR_DATA,
    }),
    'stacked-bar': () => ({
      title: isAgent ? 'Resolution / Escalation / Abandoned (Daily)' : 'Pass / Warn / Fail by Review Stage',
      data: isAgent ? BOT_RESOLUTION_DATA : STACKED_DATA,
    }),
    'table': () => ({
      title: isAgent ? 'Agent Roster' : 'Audit Steps',
      columns: isAgent
        ? ['Agent', 'Status', 'Sessions Today', 'Avg CSAT']
        : ['Step', 'Surface', 'Review Goal'],
      rows: isAgent
        ? [
            ['HR Benefits', 'Active', '342', '4.7'],
            ['IT Helpdesk', 'Active', '218', '4.3'],
            ['Sales Bot', 'Active', '156', '4.5'],
            ['Onboarding', 'Active', '89', '4.8'],
          ]
        : [
            ['1', 'Evaluations', 'Open evaluation dashboard'],
            ['2', 'Metrics', 'Review native BIC metrics'],
            ['3', 'Results', 'Inspect archived result runs'],
            ['4', 'Responses', 'Trace individual responses'],
          ],
    }),
    'fact-sheet': () => ({
      title: isAgent ? 'Agent Fleet Summary' : 'Evaluation Audit',
      subtitle: isAgent ? 'Copilot Studio deployed agents' : 'Copilot Studio review checklist',
      entries: isAgent
        ? [
            { key: 'Fleet Size', value: '6 agents' },
            { key: 'Platform', value: 'Copilot Studio' },
            { key: 'Region', value: 'US West 2' },
            { key: 'Last Deploy', value: '2026-03-20' },
            { key: 'Status', value: 'All Active' },
          ]
        : [
            { key: 'Agent', value: 'HR Benefits Agent' },
            { key: 'Environment', value: 'Production' },
            { key: 'Last Run', value: '2026-03-13' },
            { key: 'Config Count', value: '12' },
            { key: 'Status', value: 'Active' },
          ],
    }),
    'pipeline': () => ({
      title: isAgent ? 'Conversation Resolution Pipeline' : 'Evaluation Review Workflow',
      steps: isAgent
        ? ['Intake', 'Intent Match', 'Knowledge Retrieval', 'Tool Execution', 'Response', 'Resolution']
        : ['Open Studio', 'Evaluations', 'Native Metrics', 'Results', 'Responses', 'Evidence'],
      completedCount: isAgent ? 5 : 4,
    }),
    'status-grid': () => ({
      title: isAgent ? 'Agent Fleet Health' : 'Evaluation Review Surfaces',
      items: isAgent
        ? AGENT_STATUS_ITEMS
        : [
            { label: 'Metrics', subtitle: 'BIC scores healthy', severity: 'good' as const },
            { label: 'Results', subtitle: 'Archive up to date', severity: 'good' as const },
            { label: 'Responses', subtitle: 'Trace lag detected', severity: 'warning' as const },
            { label: 'Evidence', subtitle: 'Missing citations', severity: 'danger' as const },
            { label: 'Config', subtitle: 'All configs valid', severity: 'good' as const },
            { label: 'Deploy', subtitle: 'Canary live', severity: 'good' as const },
          ],
    }),
    'overview-cards': () => ({
      description: isAgent ? 'Agent capabilities and channels' : 'Evaluation audit workflow steps',
      cards: isAgent
        ? [
            'Teams Channel',
            'Web Chat Widget',
            'Email Integration',
            'Slack Connector',
            'Knowledge Base',
            'Tool Actions',
            'Human Handoff',
            'Analytics Feed',
          ]
        : [
            'Open Copilot Studio',
            'Navigate to Evaluations',
            'Review Native Metrics',
            'Inspect Archived Results',
            'Trace Response Evidence',
            'Check Citation Coverage',
            'Validate Tool Accuracy',
            'Close Audit Review',
          ],
    }),
    'meta-info': () => ({
      title: isAgent ? 'Agent Profile' : 'Document Metadata',
      entries: isAgent
        ? [
            { key: 'Name', value: 'HR Benefits Agent', highlight: true },
            { key: 'Model', value: 'GPT-4o' },
            { key: 'Sessions', value: '1,247' },
            { key: 'CSAT', value: '4.6 / 5.0' },
            { key: 'Uptime', value: '99.97%' },
          ]
        : [
            { key: 'Author', value: 'DAYOURBOT Swarm', highlight: true },
            { key: 'Date', value: '2026-03-13' },
            { key: 'Pages', value: '1' },
            { key: 'Citations', value: '8' },
            { key: 'Schema', value: 'adaptive-slide/v1.0' },
          ],
    }),
    'emphasis': () => ({
      label: isAgent ? 'Agent Insight' : 'Key Insight',
      text: isAgent
        ? 'Resolution rate improved 2.1% this week driven by enhanced knowledge grounding and fewer tool execution failures.'
        : 'Review metrics, results, and response traces together before closing the evaluation audit.',
      highlights: isAgent
        ? ['Resolution rate', 'knowledge grounding', 'tool execution']
        : ['metrics', 'results', 'response traces'],
    }),
    'compare-left': () => ({
      label: isAgent ? 'AUTOMATED' : 'OFFLINE',
      strategy: isAgent ? 'Agent Resolution' : 'Pre-Deploy',
      colorScheme: 'good' as const,
      items: isAgent
        ? [
            'Knowledge-grounded answers',
            'Tool action execution',
            'Multi-turn conversation',
            'Instant availability 24/7',
          ]
        : [
            'Static dataset evaluation',
            'BIC scoring on held-out set',
            'No live traffic impact',
            'Reproducible results',
          ],
      footer: isAgent ? '87.3% of conversations resolved' : 'Run before every deployment',
    }),
    'compare-right': () => ({
      label: isAgent ? 'HUMAN HANDOFF' : 'ONLINE',
      strategy: isAgent ? 'Escalation Path' : 'Production',
      colorScheme: 'accent' as const,
      items: isAgent
        ? [
            'Complex multi-step issues',
            'Emotional support required',
            'Policy exception handling',
            'Compliance-sensitive topics',
          ]
        : [
            'Live A/B traffic split',
            'Real user engagement metrics',
            'Latency + throughput telemetry',
            'Shadow + canary modes',
          ],
      footer: isAgent ? '12.7% escalation rate' : 'Continuous post-deploy monitoring',
    }),
    'stat-block': () => ({
      title: isAgent ? 'Weekly Movement' : 'Quality Movement',
      entries: isAgent
        ? [
            { label: 'Resolution', value: '+2.1%', up: true },
            { label: 'CSAT', value: '+0.2', up: true },
            { label: 'Escalations', value: '-12', up: true },
          ]
        : [
            { label: 'Relevance', value: '+3%', up: true },
            { label: 'Completeness', value: '+5%', up: true },
            { label: 'Tool Accuracy', value: '-2%', up: false },
          ],
    }),
    'grouped-column': () => ({
      title: isAgent ? 'Agent Channel Volume (Weekly)' : 'Evaluation Scores by Review Stage',
      series: isAgent
        ? [
            { key: 'teams', name: 'Teams' },
            { key: 'web', name: 'Web Chat' },
            { key: 'email', name: 'Email' },
          ]
        : [
            { key: 'relevance', name: 'Relevance' },
            { key: 'completeness', name: 'Completeness' },
            { key: 'coherence', name: 'Coherence' },
          ],
      data: isAgent
        ? [
            { category: 'Week 1', teams: 320, web: 180, email: 95 },
            { category: 'Week 2', teams: 340, web: 210, email: 88 },
            { category: 'Week 3', teams: 380, web: 195, email: 102 },
            { category: 'Week 4', teams: 410, web: 230, email: 110 },
            { category: 'Week 5', teams: 450, web: 250, email: 125 },
          ]
        : [
            { category: 'Metrics', relevance: 91, completeness: 84, coherence: 88 },
            { category: 'Results', relevance: 88, completeness: 82, coherence: 90 },
            { category: 'Responses', relevance: 85, completeness: 79, coherence: 86 },
            { category: 'Evidence', relevance: 92, completeness: 87, coherence: 91 },
          ],
    }),
  };

  return contentMap[tileType]() as TileContentMap[T];
}
