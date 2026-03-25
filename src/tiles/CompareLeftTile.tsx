import type { CompareContent, LiveTileTheme } from '../shared/types';

interface CompareLeftTileProps {
  content: CompareContent;
  theme: LiveTileTheme;
}

const GOOD_GREEN = '#4ade80';

const F = { xs: '10px', sm: '11px', lg: '14px' } as const;

function getFooterStyle(theme: LiveTileTheme, scheme: CompareContent['colorScheme']): React.CSSProperties {
  if (scheme === 'good') {
    return {
      background: theme.goodBg,
      border: `1px solid ${theme.goodBorder}`,
      borderLeft: `2px solid ${theme.goodLeft}`,
      borderRadius: '4px',
      padding: '5px 7px',
      marginTop: 'auto',
      fontSize: F.xs,
      color: theme.textMid,
    };
  }
  return {
    background: theme.emphasisBg,
    border: `1px solid ${theme.emphasisBorder}`,
    borderLeft: `2px solid ${theme.emphasisLeft}`,
    borderRadius: '4px',
    padding: '5px 7px',
    marginTop: 'auto',
    fontSize: F.xs,
    color: theme.textMid,
  };
}

function parseFooter(footer: string, highlightColor: string): React.ReactNode {
  const colonIdx = footer.indexOf(':');
  if (colonIdx === -1) {
    return <span>{footer}</span>;
  }
  const prefix = footer.slice(0, colonIdx + 1);
  const rest = footer.slice(colonIdx + 1);
  return (
    <>
      <span style={{ color: highlightColor, fontWeight: 700 }}>{prefix} </span>
      {rest.trim()}
    </>
  );
}

export function CompareLeftTile({ content, theme }: CompareLeftTileProps): React.ReactElement {
  const isGood = content.colorScheme === 'good';
  const headerBg = isGood ? theme.goodBg : theme.emphasisBg;
  const headerBorder = isGood ? theme.goodBorder : theme.emphasisBorder;
  const labelColor = isGood ? GOOD_GREEN : theme.accentLight;
  const dotColor = isGood ? GOOD_GREEN : theme.accent;

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          background: headerBg,
          border: `1px solid ${headerBorder}`,
          borderRadius: '5px',
          padding: '6px 8px',
        }}
      >
        <div style={{ fontSize: F.lg, fontWeight: 800, color: labelColor }}>
          {content.label}
        </div>
        <div style={{ fontSize: F.xs, color: theme.textSubtle }}>
          {content.strategy}
        </div>
      </div>

      {content.items.map((item) => (
        <div
          key={item}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: F.xs,
            color: theme.textMid,
          }}
        >
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: dotColor,
              flexShrink: 0,
            }}
          />
          {item}
        </div>
      ))}

      <div style={getFooterStyle(theme, content.colorScheme)}>
        {parseFooter(content.footer, labelColor)}
      </div>
    </div>
  );
}
