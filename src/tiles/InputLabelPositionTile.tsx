import type { LiveTileTheme } from '../shared/types';

const POSITIONS = [
  { value: 'inline', description: 'Label appears next to the input.' },
  { value: 'above', description: 'Label appears above the input.' },
] as const;

export function InputLabelPositionTile({ theme }: { theme: LiveTileTheme }) {
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
        InputLabelPosition
      </div>
      <div style={{ fontSize: 8, color: theme.textSubtle, marginBottom: 10 }}>
        Specifies position of the label with respect to the input.
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        {POSITIONS.map((p) => {
          const isInline = p.value === 'inline';
          return (
            <div
              key={p.value}
              style={{
                flex: 1,
                background: theme.emphasisBg,
                border: `1px solid ${theme.emphasisBorder}`,
                borderRadius: 8,
                padding: '12px 10px',
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 700, color: theme.text, marginBottom: 8 }}>
                {p.value}
              </div>
              {/* Mock input with label */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: isInline ? 'row' : 'column',
                  alignItems: isInline ? 'center' : 'flex-start',
                  gap: isInline ? 8 : 4,
                }}
              >
                <div style={{ fontSize: 9, fontWeight: 600, color: theme.textMid }}>Name</div>
                <div
                  style={{
                    flex: isInline ? 1 : undefined,
                    width: isInline ? undefined : '100%',
                    height: 20,
                    border: `1px solid ${theme.border}`,
                    borderRadius: 4,
                    background: `${theme.bg}88`,
                  }}
                />
              </div>
              <div style={{ fontSize: 7.5, color: theme.textSubtle, marginTop: 8, lineHeight: 1.3 }}>
                {p.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
