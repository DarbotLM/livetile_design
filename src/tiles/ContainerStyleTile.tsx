import type { LiveTileTheme } from '../shared/types';

const ENUM_VALUES = [
  { value: 'default', version: null },
  { value: 'emphasis', version: null },
  { value: 'good', version: '1.2' },
  { value: 'attention', version: '1.2' },
  { value: 'warning', version: '1.2' },
  { value: 'accent', version: '1.2' },
] as const;

const STYLE_COLORS: Record<string, string> = {
  default: '#94a3b8',
  emphasis: '#cbd5e1',
  good: '#4ade80',
  attention: '#f87171',
  warning: '#facc15',
  accent: '#3b82f6',
};

export function ContainerStyleTile({ theme }: { theme: LiveTileTheme }) {
  return (
    <div>
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: theme.accentLight,
          marginBottom: 8,
        }}
      >
        ContainerStyle
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 6,
        }}
      >
        {ENUM_VALUES.map((v) => {
          const color = STYLE_COLORS[v.value] ?? theme.textMid;
          return (
            <div
              key={v.value}
              style={{
                background: `${color}11`,
                border: `1px solid ${color}44`,
                borderTop: `3px solid ${color}`,
                borderRadius: 6,
                padding: '8px 8px 6px',
                position: 'relative',
              }}
            >
              <div style={{ fontSize: 9, fontWeight: 700, color: theme.text }}>{v.value}</div>
              {v.version && (
                <div
                  style={{
                    fontSize: 7,
                    color: theme.accentLight,
                    background: theme.pill,
                    border: `1px solid ${theme.pillBorder}`,
                    borderRadius: 100,
                    padding: '0px 4px',
                    marginTop: 4,
                    display: 'inline-block',
                    fontWeight: 600,
                  }}
                >
                  v{v.version}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
