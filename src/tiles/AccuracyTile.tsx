import type { LiveTileTheme } from '../shared/types';

export type AccuracyTrend = 'up' | 'down' | 'stable';

export type AccuracyTileData = {
  value: number;
  unit: '%';
  threshold: {
    warn: number;
    critical: number;
  };
  trend: AccuracyTrend;
};

type AccuracyTileProps = {
  content: AccuracyTileData;
  theme: LiveTileTheme;
  locked?: boolean;
};

function accuracyColor(content: AccuracyTileData): string {
  if (content.value >= content.threshold.warn) {
    return '#00d4ff';
  }
  if (content.value >= content.threshold.critical) {
    return '#f59e0b';
  }
  return '#ef4444';
}

export function AccuracyTile({ content, theme, locked = false }: AccuracyTileProps) {
  const trendLabel = content.trend === 'stable' ? 'stable' : content.trend === 'up' ? 'improving' : 'declining';

  return (
    <div
      aria-label="Accuracy tile"
      style={{
        height: '100%',
        background: theme.emphasisBg,
        border: `1px solid ${locked ? theme.border : 'rgba(0, 212, 255, 0.35)'}`,
        borderLeft: `3px solid ${accuracyColor(content)}`,
        borderRadius: 8,
        padding: '12px 14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity: locked ? 0.72 : 1,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <span
          style={{
            color: theme.accentLight,
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Accuracy
        </span>
        <span style={{ color: theme.textSubtle, fontSize: 10 }}>2W x 4R</span>
      </div>

      <div>
        <div
          style={{
            color: accuracyColor(content),
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: '-0.04em',
          }}
        >
          {content.value.toFixed(1)}
          {content.unit}
        </div>
        <div style={{ color: theme.textSubtle, fontSize: 11 }}>Model accuracy</div>
      </div>

      <div
        style={{
          color: content.trend === 'down' ? '#f87171' : content.trend === 'up' ? '#4ade80' : theme.textSubtle,
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
        }}
      >
        {trendLabel}
      </div>
    </div>
  );
}
