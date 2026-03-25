import type { LiveTileTheme } from '../shared/types';

const ENUM_VALUES = [
  { value: 'primary', description: 'Action is displayed as a button.' },
  { value: 'secondary', description: 'Action is placed in an overflow menu (typically a popup menu under a ... button).' },
] as const;

export function ActionModeTile({ theme }: { theme: LiveTileTheme }) {
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
        ActionMode
      </div>
      <div style={{ fontSize: 8, color: theme.textSubtle, marginBottom: 10 }}>
        Determines whether an action is displayed with a button or moved to the overflow menu.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {ENUM_VALUES.map((v) => {
          const isPrimary = v.value === 'primary';
          return (
            <div
              key={v.value}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: theme.emphasisBg,
                border: `1px solid ${theme.emphasisBorder}`,
                borderRadius: 8,
                padding: '8px 12px',
              }}
            >
              <div
                style={{
                  minWidth: 56,
                  padding: '4px 10px',
                  borderRadius: isPrimary ? 6 : 12,
                  background: isPrimary ? theme.accent : 'transparent',
                  border: `1px solid ${isPrimary ? theme.accent : theme.emphasisBorder}`,
                  fontSize: 9,
                  fontWeight: 700,
                  color: isPrimary ? theme.bg : theme.textSubtle,
                  textAlign: 'center',
                }}
              >
                {isPrimary ? 'Submit' : '...'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: theme.text }}>{v.value}</div>
                <div
                  style={{
                    fontSize: 8,
                    color: theme.textSubtle,
                    marginTop: 2,
                    lineHeight: 1.3,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {v.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 8,
          fontSize: 8,
          color: theme.textSubtle,
          fontStyle: 'italic',
        }}
      >
        v1.5 | Feature 4715
      </div>
    </div>
  );
}
