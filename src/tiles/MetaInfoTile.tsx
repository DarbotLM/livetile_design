import React from 'react';
import type { LiveTileTheme, MetaInfoContent } from '../shared/types';

const F = { xs: '8px', sm: '9px', md: '10px', lg: '11px', xl: '12px', xxl: '14px' } as const;

const HIGHLIGHT_COLOR = '#4ade80';

export const MetaInfoTile: React.FC<{ content: MetaInfoContent; theme: LiveTileTheme }> = ({ content, theme: t }) => (
  <div
    style={{
      height: '100%',
      background: t.emphasisBg,
      border: `1px solid ${t.emphasisBorder}`,
      borderRadius: '5px',
      padding: '8px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '4px',
      overflow: 'hidden',
    }}
  >
    {/* Section label */}
    <div
      style={{
        fontSize: F.xs,
        fontWeight: 700,
        color: t.accentLight,
        letterSpacing: '0.09em',
        textTransform: 'uppercase',
        marginBottom: '3px',
      }}
    >
      {content.title}
    </div>

    {/* Key-value rows */}
    {content.entries.map((entry) => (
      <div
        key={entry.key}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: F.xs,
          padding: '2px 0',
          borderBottom: `1px solid ${t.tableBorder}`,
        }}
      >
        <span style={{ color: t.textSubtle }}>{entry.key}</span>
        <span
          style={{
            color: entry.highlight ? HIGHLIGHT_COLOR : t.accentLight,
            fontWeight: 600,
          }}
        >
          {entry.value}
        </span>
      </div>
    ))}
  </div>
);
