import type { LiveTileTheme } from '../shared/types';

const ALIGNMENTS = ['top', 'center', 'bottom'] as const;

const JUSTIFY_MAP: Record<string, string> = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
};

export function VerticalContentAlignmentTile({ theme }: { theme: LiveTileTheme }) {
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
        VerticalContentAlignment
      </div>
      <div style={{ fontSize: 8, color: theme.textSubtle, marginBottom: 10 }}>
        Vertical positioning of content within a container.
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {ALIGNMENTS.map((a) => (
          <div
            key={a}
            style={{
              flex: 1,
              height: 90,
              background: theme.emphasisBg,
              border: `1px solid ${theme.emphasisBorder}`,
              borderRadius: 8,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: JUSTIFY_MAP[a],
              padding: 8,
              gap: 3,
            }}
          >
            <div
              style={{
                height: 8,
                width: '80%',
                background: `${theme.accent}44`,
                borderRadius: 2,
              }}
            />
            <div
              style={{
                height: 8,
                width: '60%',
                background: `${theme.accent}33`,
                borderRadius: 2,
              }}
            />
            <div
              style={{
                marginTop: 2,
                fontSize: 8,
                fontWeight: 700,
                color: theme.accentLight,
              }}
            >
              {a}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
