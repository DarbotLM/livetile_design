import type { LiveTileTheme } from '../shared/types';

const SPACINGS = [
  { value: 'none', px: 0 },
  { value: 'small', px: 4 },
  { value: 'default', px: 8 },
  { value: 'medium', px: 16 },
  { value: 'large', px: 24 },
  { value: 'extraLarge', px: 32 },
  { value: 'padding', px: 16 },
] as const;

export function SpacingTile({ theme }: { theme: LiveTileTheme }) {
  const maxPx = 32;
  return (
    <div>
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: theme.accentLight,
          marginBottom: 4,
        }}
      >
        Spacing
      </div>
      <div style={{ fontSize: 8, color: theme.textSubtle, marginBottom: 10 }}>
        Host-defined spacing scale. Exact pixel amounts vary per host.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {SPACINGS.map((s) => {
          const barWidth = s.px > 0 ? Math.max(10, (s.px / maxPx) * 100) : 4;
          return (
            <div
              key={s.value}
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <div
                style={{
                  minWidth: 62,
                  fontSize: 8,
                  fontWeight: 600,
                  color: theme.textMid,
                  fontFamily: 'monospace',
                  textAlign: 'right',
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  width: `${barWidth}%`,
                  height: 12,
                  background: s.value === 'padding' ? `${theme.accent}44` : theme.accent,
                  borderRadius: 3,
                  border: s.value === 'padding' ? `1px dashed ${theme.accent}` : 'none',
                  opacity: s.px === 0 ? 0.3 : 1,
                }}
              />
              <div style={{ fontSize: 7.5, color: theme.textSubtle }}>{s.px}px</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
