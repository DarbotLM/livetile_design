import type { LiveTileTheme } from '../shared/types';

const ALIGNMENTS = ['top', 'center', 'bottom'] as const;

const ALIGN_MAP: Record<string, string> = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
};

export function VerticalAlignmentTile({ theme }: { theme: LiveTileTheme }) {
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
        VerticalAlignment
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {ALIGNMENTS.map((a) => (
          <div
            key={a}
            style={{
              flex: 1,
              height: 80,
              background: theme.emphasisBg,
              border: `1px solid ${theme.emphasisBorder}`,
              borderRadius: 8,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: ALIGN_MAP[a],
              alignItems: 'center',
              padding: 8,
            }}
          >
            <div
              style={{
                background: `${theme.accent}33`,
                border: `1px dashed ${theme.accent}`,
                borderRadius: 4,
                padding: '4px 12px',
                fontSize: 9,
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
