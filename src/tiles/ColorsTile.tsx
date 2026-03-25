import type { LiveTileTheme } from '../shared/types';

const SEMANTIC_COLORS: { value: string; hex: string }[] = [
  { value: 'default', hex: '#e2e8f0' },
  { value: 'dark', hex: '#1e293b' },
  { value: 'light', hex: '#f1f5f9' },
  { value: 'accent', hex: '#3b82f6' },
  { value: 'good', hex: '#4ade80' },
  { value: 'warning', hex: '#facc15' },
  { value: 'attention', hex: '#f87171' },
];

export function ColorsTile({ theme }: { theme: LiveTileTheme }) {
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
        Colors
      </div>
      <div style={{ fontSize: 8, color: theme.textSubtle, marginBottom: 10 }}>
        Semantic color tokens for text and foreground elements.
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 6,
        }}
      >
        {SEMANTIC_COLORS.map((c) => (
          <div
            key={c.value}
            style={{
              background: theme.emphasisBg,
              border: `1px solid ${theme.emphasisBorder}`,
              borderRadius: 8,
              padding: '8px 6px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                background: c.hex,
                border: `1px solid ${theme.border}`,
              }}
            />
            <div style={{ fontSize: 8, fontWeight: 700, color: theme.text }}>{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
