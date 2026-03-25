import type { LiveTileTheme } from '../shared/types';

const STYLES = [
  { value: 'default', description: 'Standard rectangular image display.' },
  { value: 'person', description: 'Image displayed as a circle (avatar style).' },
] as const;

export function ImageStyleTile({ theme }: { theme: LiveTileTheme }) {
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
        ImageStyle
      </div>
      <div style={{ fontSize: 8, color: theme.textSubtle, marginBottom: 10 }}>
        Controls how this Image is displayed.
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        {STYLES.map((s) => {
          const isCircle = s.value === 'person';
          return (
            <div
              key={s.value}
              style={{
                flex: 1,
                background: theme.emphasisBg,
                border: `1px solid ${theme.emphasisBorder}`,
                borderRadius: 8,
                padding: '14px 12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: isCircle ? '50%' : 6,
                  background: `${theme.accent}33`,
                  border: `2px solid ${theme.accent}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  color: theme.accentLight,
                }}
              >
                {isCircle ? 'P' : 'IMG'}
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, color: theme.text }}>{s.value}</div>
              <div style={{ fontSize: 8, color: theme.textSubtle, textAlign: 'center', lineHeight: 1.3 }}>
                {s.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
