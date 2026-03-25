import type { LiveTileTheme } from '../shared/types';

const ENUM_VALUES = [
  { value: 'auto', description: 'Height determined by contents.' },
  { value: 'stretch', description: 'Stretches to available remaining height of parent.' },
] as const;

export function BlockElementHeightTile({ theme }: { theme: LiveTileTheme }) {
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
        BlockElementHeight
      </div>
      <div style={{ display: 'flex', gap: 10, height: 100 }}>
        {ENUM_VALUES.map((v) => {
          const isStretch = v.value === 'stretch';
          return (
            <div
              key={v.value}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                background: theme.emphasisBg,
                border: `1px solid ${theme.emphasisBorder}`,
                borderRadius: 8,
                padding: 8,
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 700, color: theme.text, marginBottom: 6 }}>
                {v.value}
              </div>
              <div
                style={{
                  flex: isStretch ? 1 : undefined,
                  height: isStretch ? undefined : 28,
                  background: `${theme.accent}33`,
                  border: `1px dashed ${theme.accent}`,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 8,
                  color: theme.accentLight,
                  fontWeight: 600,
                }}
              >
                {isStretch ? 'FILL' : 'FIT'}
              </div>
              <div style={{ fontSize: 7.5, color: theme.textSubtle, marginTop: 4, lineHeight: 1.3 }}>
                {v.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
