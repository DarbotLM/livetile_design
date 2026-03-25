import type { LiveTileTheme } from '../shared/types';

const ENUM_VALUES = [
  { value: 'compact', description: 'Dropdown selector', version: null },
  { value: 'expanded', description: 'Radio button list', version: null },
  { value: 'filtered', description: 'Type-ahead filter', version: '1.5' },
] as const;

export function ChoiceInputStyleTile({ theme }: { theme: LiveTileTheme }) {
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
        ChoiceInputStyle
      </div>
      <div style={{ fontSize: 8, color: theme.textSubtle, marginBottom: 10 }}>
        Style hint for Input.ChoiceSet.
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {ENUM_VALUES.map((v) => (
          <div
            key={v.value}
            style={{
              flex: 1,
              background: theme.emphasisBg,
              border: `1px solid ${theme.emphasisBorder}`,
              borderRadius: 8,
              padding: '10px 8px',
              position: 'relative',
            }}
          >
            {v.version && (
              <div
                style={{
                  position: 'absolute',
                  top: 4,
                  right: 6,
                  fontSize: 7,
                  color: theme.accentLight,
                  background: theme.pill,
                  border: `1px solid ${theme.pillBorder}`,
                  borderRadius: 100,
                  padding: '1px 5px',
                  fontWeight: 600,
                }}
              >
                v{v.version}
              </div>
            )}
            <div style={{ fontSize: 10, fontWeight: 700, color: theme.text, marginBottom: 6 }}>
              {v.value}
            </div>
            {/* Visual mock of each input style */}
            {v.value === 'compact' && (
              <div
                style={{
                  border: `1px solid ${theme.border}`,
                  borderRadius: 4,
                  padding: '3px 6px',
                  fontSize: 8,
                  color: theme.textMid,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>Select...</span>
                <span style={{ color: theme.textSubtle }}>v</span>
              </div>
            )}
            {v.value === 'expanded' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {['Option A', 'Option B'].map((opt, i) => (
                  <div key={opt} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        border: `1.5px solid ${i === 0 ? theme.accent : theme.border}`,
                        background: i === 0 ? theme.accent : 'transparent',
                      }}
                    />
                    <span style={{ fontSize: 8, color: theme.textMid }}>{opt}</span>
                  </div>
                ))}
              </div>
            )}
            {v.value === 'filtered' && (
              <div
                style={{
                  border: `1px solid ${theme.accent}`,
                  borderRadius: 4,
                  padding: '3px 6px',
                  fontSize: 8,
                  color: theme.text,
                }}
              >
                Opt<span style={{ borderLeft: `1px solid ${theme.accent}`, marginLeft: 1 }} />
              </div>
            )}
            <div style={{ fontSize: 7.5, color: theme.textSubtle, marginTop: 6, lineHeight: 1.3 }}>
              {v.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
