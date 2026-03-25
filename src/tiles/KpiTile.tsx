import type { KpiContent, LiveTileTheme } from '../shared/types';

export function KpiTile({ content, theme }: { content: KpiContent; theme: LiveTileTheme }) {
  const deltaColor =
    content.up === true ? '#4ade80' : content.up === false ? '#f87171' : theme.textSubtle;
  const deltaArrow =
    content.up === true ? '▲' : content.up === false ? '▼' : '—';

  return (
    <div
      style={{
        background: theme.emphasisBg,
        border: `1px solid ${theme.emphasisBorder}`,
        borderRadius: 10,
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
      }}
    >
      <span
        style={{
          fontSize: 18,
          fontWeight: 800,
          color: theme.accentLight,
          letterSpacing: '-0.02em',
        }}
      >
        {content.value}
      </span>

      <span style={{ fontSize: 12, color: theme.textSubtle }}>{content.label}</span>

      <span style={{ fontSize: 12, fontWeight: 600, color: deltaColor }}>
        {deltaArrow} {content.delta}
      </span>
    </div>
  );
}
