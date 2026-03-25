import type { LiveTileTheme } from '../shared/types';

const ENUM_VALUES = [
  { value: 'default', description: 'Action is displayed as normal', color: null },
  { value: 'positive', description: 'Displayed with a positive style (accent color)', color: '#4ade80' },
  { value: 'destructive', description: 'Displayed with a destructive style (red)', color: '#f87171' },
] as const;

export function ActionStyleTile({ theme }: { theme: LiveTileTheme }) {
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
        ActionStyle
      </div>
      <div style={{ fontSize: 8, color: theme.textSubtle, marginBottom: 10 }}>
        Controls the style of an Action, influencing how it is displayed and spoken.
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {ENUM_VALUES.map((v) => {
          const btnBg = v.color ?? theme.emphasisBorder;
          const btnText = v.color ? theme.bg : theme.text;
          return (
            <div
              key={v.value}
              style={{
                flex: 1,
                background: theme.emphasisBg,
                border: `1px solid ${theme.emphasisBorder}`,
                borderRadius: 8,
                padding: '10px 8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <div
                style={{
                  width: '100%',
                  padding: '5px 0',
                  borderRadius: 6,
                  background: btnBg,
                  fontSize: 9,
                  fontWeight: 700,
                  color: btnText,
                  textAlign: 'center',
                }}
              >
                {v.value}
              </div>
              <div
                style={{
                  fontSize: 7.5,
                  color: theme.textSubtle,
                  textAlign: 'center',
                  lineHeight: 1.3,
                }}
              >
                {v.description}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 8, fontSize: 8, color: theme.textSubtle, fontStyle: 'italic' }}>
        v1.2 | Feature 861
      </div>
    </div>
  );
}
