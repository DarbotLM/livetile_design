import type { LiveTileTheme } from '../shared/types';

const MODES = [
  { value: 'cover', short: 'Scales to cover entire width. Content may clip.' },
  { value: 'repeatHorizontally', short: 'Repeats in the x axis.' },
  { value: 'repeatVertically', short: 'Repeats in the y axis.' },
  { value: 'repeat', short: 'Repeats in both axes.' },
] as const;

export function ImageFillModeTile({ theme }: { theme: LiveTileTheme }) {
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
        ImageFillMode
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 6,
        }}
      >
        {MODES.map((m) => {
          const isCover = m.value === 'cover';
          const repeatX = m.value === 'repeatHorizontally' || m.value === 'repeat';
          const repeatY = m.value === 'repeatVertically' || m.value === 'repeat';
          return (
            <div
              key={m.value}
              style={{
                background: theme.emphasisBg,
                border: `1px solid ${theme.emphasisBorder}`,
                borderRadius: 8,
                padding: 8,
              }}
            >
              <div
                style={{
                  height: 36,
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: `1px dashed ${theme.border}`,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: isCover ? 'stretch' : 'flex-start',
                }}
              >
                {isCover ? (
                  <div style={{ width: '100%', height: '100%', background: `${theme.accent}44` }} />
                ) : (
                  Array.from({ length: repeatX && repeatY ? 9 : repeatX ? 3 : 3 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: repeatX ? '33%' : '100%',
                        height: repeatY ? '33%' : '100%',
                        background: `${theme.accent}${i % 2 === 0 ? '44' : '22'}`,
                        border: `0.5px solid ${theme.accent}33`,
                        flexShrink: 0,
                      }}
                    />
                  ))
                )}
              </div>
              <div style={{ fontSize: 9, fontWeight: 700, color: theme.text, marginTop: 6 }}>
                {m.value}
              </div>
              <div style={{ fontSize: 7.5, color: theme.textSubtle, lineHeight: 1.3, marginTop: 2 }}>
                {m.short}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
