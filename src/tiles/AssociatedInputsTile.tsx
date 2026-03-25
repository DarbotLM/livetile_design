import type { LiveTileTheme } from '../shared/types';

const ENUM_VALUES = [
  { value: 'Auto', description: 'Inputs on the current card and any parent cards will be validated and submitted for this Action.' },
  { value: 'None', description: 'None of the inputs will be validated or submitted for this Action.' },
] as const;

export function AssociatedInputsTile({ theme }: { theme: LiveTileTheme }) {
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
        AssociatedInputs
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {ENUM_VALUES.map((v) => {
          const isAuto = v.value === 'Auto';
          return (
            <div
              key={v.value}
              style={{
                flex: 1,
                background: theme.emphasisBg,
                border: `1px solid ${theme.emphasisBorder}`,
                borderLeft: `3px solid ${isAuto ? theme.goodLeft : theme.dangerLeft}`,
                borderRadius: 8,
                padding: '10px 12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: isAuto ? '#4ade80' : '#f87171',
                  }}
                />
                <div style={{ fontSize: 11, fontWeight: 700, color: theme.text }}>{v.value}</div>
              </div>
              <div style={{ fontSize: 8, color: theme.textSubtle, lineHeight: 1.4 }}>
                {v.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
