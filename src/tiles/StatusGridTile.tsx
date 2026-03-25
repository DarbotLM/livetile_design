import type { StatusGridContent, StatusGridItem, LiveTileTheme } from '../shared/types';

type SeverityStyle = { bg: string; border: string; left: string; text: string };

function severityStyles(severity: StatusGridItem['severity'], theme: LiveTileTheme): SeverityStyle {
  switch (severity) {
    case 'good':
      return { bg: theme.goodBg, border: theme.goodBorder, left: theme.goodLeft, text: '#4ade80' };
    case 'warning':
      return { bg: theme.emphasisBg, border: theme.emphasisBorder, left: theme.emphasisLeft, text: theme.accentLight };
    case 'danger':
      return { bg: theme.dangerBg, border: theme.dangerBorder, left: theme.dangerLeft, text: '#f87171' };
  }
}

export function StatusGridTile({ content, theme }: { content: StatusGridContent; theme: LiveTileTheme }) {
  return (
    <div>
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: theme.accentLight,
          marginBottom: 10,
        }}
      >
        {content.title}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
        }}
      >
        {content.items.map((item, i) => {
          const s = severityStyles(item.severity, theme);
          return (
            <div
              key={i}
              style={{
                background: s.bg,
                border: `1px solid ${s.border}`,
                borderLeft: `3px solid ${s.left}`,
                borderRadius: 8,
                padding: '10px 12px',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: s.text }}>{item.label}</div>
              <div style={{ fontSize: 10, color: theme.textSubtle, marginTop: 3 }}>
                {item.subtitle}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
