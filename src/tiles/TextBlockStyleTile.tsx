import type { LiveTileTheme } from '../shared/types';

const STYLES = [
  { value: 'default', description: 'No special styling or behavior.' },
  { value: 'heading', description: 'Applies heading styling and marks as heading for accessibility.' },
] as const;

export function TextBlockStyleTile({ theme }: { theme: LiveTileTheme }) {
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
        TextBlockStyle
      </div>
      <div style={{ fontSize: 8, color: theme.textSubtle, marginBottom: 10 }}>
        Controls how a TextBlock behaves. v1.5
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        {STYLES.map((s) => {
          const isHeading = s.value === 'heading';
          return (
            <div
              key={s.value}
              style={{
                flex: 1,
                background: theme.emphasisBg,
                border: `1px solid ${theme.emphasisBorder}`,
                borderRadius: 8,
                padding: '14px 12px',
              }}
            >
              <div
                style={{
                  fontSize: isHeading ? 16 : 11,
                  fontWeight: isHeading ? 800 : 400,
                  color: theme.text,
                  marginBottom: 6,
                  letterSpacing: isHeading ? '-0.02em' : 'normal',
                }}
              >
                {isHeading ? 'Heading Text' : 'Body text sample'}
              </div>
              <div
                style={{
                  display: 'inline-block',
                  padding: '2px 6px',
                  borderRadius: 4,
                  background: theme.pill,
                  border: `1px solid ${theme.pillBorder}`,
                  fontSize: 8,
                  fontWeight: 700,
                  color: theme.accentLight,
                  marginBottom: 6,
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: 7.5, color: theme.textSubtle, lineHeight: 1.4 }}>
                {s.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
