import React from 'react';
import type { OverviewCardsContent, LiveTileTheme } from '../shared/types';

type OverviewCardsTileProps = { content: OverviewCardsContent; theme: LiveTileTheme };

const F = { xs: '8px', sm: '9px' } as const;

export const OverviewCardsTile: React.FC<OverviewCardsTileProps> = ({ content, theme: t }) => {
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
      <div style={{ fontSize: F.sm, color: t.textMid, marginBottom: '2px' }}>
        {content.description}
      </div>

      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3px',
          overflow: 'hidden',
        }}
      >
        {content.cards.map((card) => (
          <div
            key={card}
            style={{
              background: t.emphasisBg,
              border: `1px solid ${t.emphasisBorder}`,
              borderLeft: `2px solid ${t.emphasisLeft}`,
              borderRadius: '4px',
              padding: '4px 6px',
              fontSize: F.xs,
              color: t.text,
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {card}
          </div>
        ))}
      </div>
    </div>
  );
};
