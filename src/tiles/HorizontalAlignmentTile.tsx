import type { LiveTileTheme } from '../shared/types';

const ALIGNMENTS = ['left', 'center', 'right'] as const;

export function HorizontalAlignmentTile({ theme }: { theme: LiveTileTheme }) {
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
        HorizontalAlignment
      </div>
      <div style={{ fontSize: 8, color: theme.textSubtle, marginBottom: 10 }}>
        Controls how content is horizontally positioned within its container.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {ALIGNMENTS.map((a) => (
          <div
            key={a}
            style={{
              background: theme.emphasisBg,
              border: `1px solid ${theme.emphasisBorder}`,
              borderRadius: 6,
              padding: '8px 12px',
              textAlign: a,
            }}
          >
            <div
              style={{
                display: 'inline-block',
                background: `${theme.accent}33`,
                border: `1px dashed ${theme.accent}`,
                borderRadius: 4,
                padding: '3px 12px',
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
