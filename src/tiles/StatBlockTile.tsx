import type { StatBlockContent, LiveTileTheme } from '../shared/types';

export function StatBlockTile({ content, theme }: { content: StatBlockContent; theme: LiveTileTheme }) {
  return (
    <div
      style={{
        background: theme.emphasisBg,
        border: `1px solid ${theme.emphasisBorder}`,
        borderRadius: 10,
        padding: '16px 18px',
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: theme.accentLight,
          marginBottom: 12,
        }}
      >
        {content.title}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {content.entries.map((entry, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0',
              borderBottom:
                i < content.entries.length - 1
                  ? `1px solid ${theme.tableBorder}`
                  : 'none',
            }}
          >
            <span style={{ fontSize: 12, color: theme.textSubtle }}>{entry.label}</span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: entry.up ? '#4ade80' : '#f87171',
              }}
            >
              {entry.up ? '▲' : '▼'} {entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
