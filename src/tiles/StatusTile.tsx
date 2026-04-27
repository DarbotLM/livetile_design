import type { LiveTileTheme } from '../shared/types';

export type SystemStatus = 'nominal' | 'degraded' | 'outage' | 'maintenance';

export type StatusSystem = {
  name: string;
  status: SystemStatus;
  latencyMs?: number;
};

export type StatusTileData = {
  overall: SystemStatus;
  systems: StatusSystem[];
  updatedAt: string;
};

type StatusTileProps = {
  content: StatusTileData;
  theme: LiveTileTheme;
};

const STATUS_COLORS: Record<SystemStatus, string> = {
  nominal: '#22c55e',
  degraded: '#f59e0b',
  outage: '#ef4444',
  maintenance: '#a855f7',
};

export function StatusTile({ content, theme }: StatusTileProps) {
  return (
    <div
      aria-label="System status tile"
      style={{
        height: '100%',
        background: theme.emphasisBg,
        border: '1px solid rgba(168, 85, 247, 0.35)',
        borderLeft: '3px solid #a855f7',
        borderRadius: 8,
        padding: '12px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
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
          Status
        </span>
        <span style={{ color: theme.textSubtle, fontSize: 10 }}>8W x 8R</span>
      </div>

      <div
        style={{
          color: STATUS_COLORS[content.overall],
          fontSize: 22,
          fontWeight: 800,
          textTransform: 'uppercase',
        }}
      >
        {content.overall}
      </div>

      <div style={{ display: 'grid', gap: 7 }}>
        {content.systems.map((system) => (
          <div key={system.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: STATUS_COLORS[system.status],
                boxShadow: `0 0 12px ${STATUS_COLORS[system.status]}`,
              }}
            />
            <span style={{ flex: 1, color: theme.text, fontSize: 12 }}>{system.name}</span>
            {system.latencyMs !== undefined && (
              <span style={{ color: theme.textSubtle, fontSize: 10 }}>{system.latencyMs}ms</span>
            )}
          </div>
        ))}
      </div>

      <div style={{ color: theme.textSubtle, fontSize: 10 }}>
        Updated: {new Date(content.updatedAt).toLocaleTimeString()}
      </div>
    </div>
  );
}
