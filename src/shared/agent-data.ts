// ── Agent & Bot Analytics Sample Data ─────────────────────────────────────────
// Reusable data banks for agent/bot-focused slide templates.

import type {
  KpiContent,
  BarChartDataPoint,
  PieChartDataPoint,
  LineChartDataPoint,
  RadarChartDataPoint,
  StackedBarDataPoint,
  StatusGridItem,
} from './types';

// ── Agent KPIs ───────────────────────────────────────────────────────────────

export const AGENT_KPI_BANK: KpiContent[] = [
  { label: 'Active Sessions',   value: '1,247',  delta: '+142',    up: true  },
  { label: 'Resolution Rate',   value: '87.3%',  delta: '+2.1%',   up: true  },
  { label: 'Handoff Rate',      value: '12.7%',  delta: '-1.8%',   up: true  },
  { label: 'Avg Response Time',  value: '1.4s',   delta: '-0.3s',   up: true  },
  { label: 'CSAT Score',        value: '4.6',    delta: '+0.2',    up: true  },
  { label: 'Escalations',       value: '38',     delta: '-12',     up: true  },
  { label: 'Messages / Session', value: '6.8',    delta: '+0.4',    up: null  },
  { label: 'Unique Users',      value: '892',    delta: '+67',     up: true  },
];

// ── Agent Response Bar Chart ─────────────────────────────────────────────────

export const AGENT_RESPONSE_DATA: BarChartDataPoint[] = [
  { dim: 'Grounding',   score: 94, prev: 90 },
  { dim: 'Accuracy',    score: 91, prev: 88 },
  { dim: 'Helpfulness', score: 87, prev: 84 },
  { dim: 'Safety',      score: 96, prev: 95 },
  { dim: 'Latency',     score: 82, prev: 78 },
];

// ── Bot Message Distribution ─────────────────────────────────────────────────

export const BOT_MESSAGE_PIE: PieChartDataPoint[] = [
  { name: 'Knowledge Answers',  value: 42 },
  { name: 'Tool Actions',       value: 28 },
  { name: 'Clarifications',     value: 15 },
  { name: 'Handoff to Human',   value: 10 },
  { name: 'Fallback / Unknown', value: 5  },
];

// ── Agent Quality Trend ──────────────────────────────────────────────────────

export const AGENT_TREND_DATA: LineChartDataPoint[] = [
  { q: 'Week 1',  bic: 0.82, latency: 2.1, tput: 340  },
  { q: 'Week 2',  bic: 0.84, latency: 1.9, tput: 380  },
  { q: 'Week 3',  bic: 0.86, latency: 1.7, tput: 420  },
  { q: 'Week 4',  bic: 0.89, latency: 1.5, tput: 460  },
  { q: 'Week 5',  bic: 0.91, latency: 1.4, tput: 510  },
];

// ── Conversation Intent Radar ────────────────────────────────────────────────

export const INTENT_RADAR_DATA: RadarChartDataPoint[] = [
  { dim: 'FAQ',          score: 92 },
  { dim: 'Transactions', score: 78 },
  { dim: 'Navigation',   score: 85 },
  { dim: 'Complaints',   score: 65 },
  { dim: 'Scheduling',   score: 88 },
  { dim: 'Feedback',     score: 72 },
];

// ── Bot Stacked Bar (Resolved / Escalated / Abandoned) ───────────────────────

export const BOT_RESOLUTION_DATA: StackedBarDataPoint[] = [
  { q: 'Mon',  pass: 82, warn: 12, fail: 6  },
  { q: 'Tue',  pass: 85, warn: 10, fail: 5  },
  { q: 'Wed',  pass: 79, warn: 14, fail: 7  },
  { q: 'Thu',  pass: 88, warn: 8,  fail: 4  },
  { q: 'Fri',  pass: 84, warn: 11, fail: 5  },
];

// ── Agent Status Grid ────────────────────────────────────────────────────────

export const AGENT_STATUS_ITEMS: StatusGridItem[] = [
  { label: 'HR Agent',       subtitle: 'All systems nominal',     severity: 'good'    },
  { label: 'IT Helpdesk',    subtitle: 'High volume detected',    severity: 'warning'  },
  { label: 'Sales Bot',      subtitle: 'Response time elevated',  severity: 'warning'  },
  { label: 'Onboarding',     subtitle: 'Running smoothly',        severity: 'good'    },
  { label: 'Compliance',     subtitle: 'Grounding issue flagged', severity: 'danger'  },
  { label: 'Finance Agent',  subtitle: 'Stable performance',      severity: 'good'    },
];
