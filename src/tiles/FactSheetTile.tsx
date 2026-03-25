import React from 'react';
import type { FactSheetContent, LiveTileTheme } from '../shared/types';

type FactSheetTileProps = { content: FactSheetContent; theme: LiveTileTheme };

const F = { xs: '8px', sm: '9px' } as const;

export const FactSheetTile: React.FC<FactSheetTileProps> = ({ content, theme: t }) => {
  return (
    <div
      style={{
        height: '100%',
        background: t.emphasisBg,
        border: `1px solid ${t.emphasisBorder}`,
        borderRadius: '5px',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
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

      <div style={{ fontSize: F.sm, color: t.textSubtle, marginBottom: '6px' }}>
        {content.subtitle}
      </div>

      {content.entries.map((entry) => (
        <div
          key={entry.key}
          style={{
            display: 'flex',
            gap: '8px',
            fontSize: F.xs,
            padding: '3px 0',
            borderBottom: `1px solid ${t.tableBorder}`,
          }}
        >
          <span
            style={{
              color: t.accentLight,
              fontWeight: 700,
              width: '62px',
              flexShrink: 0,
            }}
          >
            {entry.key}
          </span>
          <span style={{ color: t.textMid, lineHeight: 1.3 }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};
