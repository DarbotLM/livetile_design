import type { LiveTileTheme } from '../shared/types';

const SIZES = [
  { value: 'default', px: 12 },
  { value: 'small', px: 10 },
  { value: 'medium', px: 14 },
  { value: 'large', px: 18 },
  { value: 'extraLarge', px: 22 },
] as const;

export function FontSizeTile({ theme }: { theme: LiveTileTheme }) {
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
        FontSize
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {SIZES.map((s) => (
          <div
            key={s.value}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 10,
              background: theme.emphasisBg,
              border: `1px solid ${theme.emphasisBorder}`,
              borderRadius: 6,
              padding: '6px 12px',
            }}
          >
            <div
              style={{
                minWidth: 70,
                fontSize: 8,
                fontWeight: 600,
                color: theme.accentLight,
                fontFamily: 'monospace',
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: Math.min(s.px, 16),
                fontWeight: 600,
                color: theme.text,
                whiteSpace: 'nowrap',
              }}
            >
              The quick brown fox
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
