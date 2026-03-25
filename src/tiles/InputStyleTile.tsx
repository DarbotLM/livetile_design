import type { LiveTileTheme } from '../shared/types';

const STYLES = [
  { value: 'default', description: 'Show the default editable state for input controls.' },
  { value: 'revealOnHover', description: 'Show input fields in read-only view unless user takes action.' },
] as const;

export function InputStyleTile({ theme }: { theme: LiveTileTheme }) {
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
        InputStyle
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        {STYLES.map((s) => {
          const isReveal = s.value === 'revealOnHover';
          return (
            <div
              key={s.value}
              style={{
                flex: 1,
                background: theme.emphasisBg,
                border: `1px solid ${theme.emphasisBorder}`,
                borderRadius: 8,
                padding: '12px 10px',
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 700, color: theme.text, marginBottom: 8 }}>
                {s.value}
              </div>
              {/* Mock input field */}
              <div
                style={{
                  height: 22,
                  border: isReveal ? `1px dashed ${theme.border}44` : `1px solid ${theme.border}`,
                  borderRadius: 4,
                  background: isReveal ? 'transparent' : `${theme.bg}88`,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 6px',
                  fontSize: 9,
                  color: isReveal ? theme.textSubtle : theme.textMid,
                  fontStyle: isReveal ? 'italic' : 'normal',
                }}
              >
                {isReveal ? 'hover to edit...' : 'Enter value'}
              </div>
              <div style={{ fontSize: 7.5, color: theme.textSubtle, marginTop: 8, lineHeight: 1.3 }}>
                {s.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
