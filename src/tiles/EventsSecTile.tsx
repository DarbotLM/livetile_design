import type { LiveTileTheme } from '../shared/types';

export type EventsSecTileData = {
  value: number;
  peak: number;
  baseline: number;
  window: '1m' | '5m' | '15m';
  history?: number[];
};

type EventsSecTileProps = {
  content: EventsSecTileData;
  theme: LiveTileTheme;
};

function utilization(content: EventsSecTileData): number {
  if (content.peak <= 0) {
    return 0;
  }
  return Math.min(100, (content.value / content.peak) * 100);
}

function utilizationColor(pct: number): string {
  if (pct > 85) {
    return '#ef4444';
  }
  if (pct > 65) {
    return '#f59e0b';
  }
  return '#22c55e';
}

export function EventsSecTile({ content, theme }: EventsSecTileProps) {
  const pct = utilization(content);
  const color = utilizationColor(pct);

  return (
    <div
      aria-label="Events per second tile"
      style={{
        height: '100%',
        background: theme.emphasisBg,
        border: '1px solid rgba(245, 158, 11, 0.35)',
        borderLeft: '3px solid #f59e0b',
        borderRadius: 8,
        padding: '12px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span
          style={{
            color: theme.accentLight,
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Events/sec
        </span>
        <span style={{ color: theme.textSubtle, fontSize: 10 }}>{content.window}</span>
      </div>

      <div>
        <div style={{ color, fontSize: 32, fontWeight: 800, letterSpacing: '-0.04em' }}>
          {content.value.toLocaleString()}
        </div>
        <div style={{ color: theme.textSubtle, fontSize: 11 }}>Throughput</div>
      </div>

      <div
        style={{
          height: 7,
          borderRadius: 999,
          background: theme.tableBorder,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: color,
            borderRadius: 999,
          }}
        />
      </div>

      <div style={{ color: theme.textSubtle, fontSize: 10 }}>
        Peak: {content.peak.toLocaleString()} | Base: {content.baseline.toLocaleString()}
      </div>
    </div>
  );
}
