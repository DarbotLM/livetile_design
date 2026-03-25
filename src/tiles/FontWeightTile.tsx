import type { LiveTileTheme } from '../shared/types';

const WEIGHTS = [
  { value: 'lighter', css: 300 },
  { value: 'default', css: 400 },
  { value: 'bolder', css: 700 },
] as const;

export function FontWeightTile({ theme }: { theme: LiveTileTheme }) {
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
        FontWeight
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {WEIGHTS.map((w) => (
          <div
            key={w.value}
            style={{
              flex: 1,
              background: theme.emphasisBg,
              border: `1px solid ${theme.emphasisBorder}`,
              borderRadius: 8,
              padding: '12px 10px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: w.css,
                color: theme.text,
                marginBottom: 6,
              }}
            >
              Aa
            </div>
            <div style={{ fontSize: 9, fontWeight: 700, color: theme.accentLight }}>{w.value}</div>
            <div style={{ fontSize: 8, color: theme.textSubtle, marginTop: 2 }}>{w.css}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
