import type { LiveTileTheme } from '../shared/types';

const STYLES = [
  { value: 'default', description: 'Images displayed in original aspect ratio.' },
  { value: 'stacked', description: 'Images stack on top of each other.' },
  { value: 'grid', description: 'Images in a grid at uniform size.' },
] as const;

export function ImageSetStyleTile({ theme }: { theme: LiveTileTheme }) {
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
        ImageSetStyle
      </div>
      <div style={{ fontSize: 8, color: theme.textSubtle, marginBottom: 10 }}>
        Controls how an ImageSet is displayed. v1.6
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {STYLES.map((s) => (
          <div
            key={s.value}
            style={{
              flex: 1,
              background: theme.emphasisBg,
              border: `1px solid ${theme.emphasisBorder}`,
              borderRadius: 8,
              padding: 8,
            }}
          >
            <div style={{ fontSize: 9, fontWeight: 700, color: theme.text, marginBottom: 6 }}>
              {s.value}
            </div>
            {/* Visual layout mock */}
            <div
              style={{
                height: 40,
                display: s.value === 'grid' ? 'grid' : 'flex',
                ...(s.value === 'grid'
                  ? { gridTemplateColumns: '1fr 1fr', gap: 2 }
                  : {
                      flexDirection: s.value === 'stacked' ? 'column' : 'row',
                      gap: 2,
                    }),
                overflow: 'hidden',
              }}
            >
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  style={{
                    flex: s.value === 'default' ? '0 0 auto' : undefined,
                    width: s.value === 'default' ? 20 : undefined,
                    height: s.value === 'stacked' ? 12 : undefined,
                    background: `${theme.accent}${30 + n * 10}`,
                    borderRadius: 2,
                    border: `0.5px solid ${theme.accent}55`,
                    minHeight: 0,
                    minWidth: 0,
                  }}
                />
              ))}
            </div>
            <div style={{ fontSize: 7.5, color: theme.textSubtle, marginTop: 6, lineHeight: 1.3 }}>
              {s.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
