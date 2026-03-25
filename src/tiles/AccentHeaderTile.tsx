import React from 'react';
import type { LiveTileTheme, AccentHeaderContent } from '../shared/types';

const F = { xs: '8px', sm: '9px', md: '10px', lg: '11px', xl: '12px', xxl: '14px' } as const;

export const AccentHeaderTile: React.FC<{ content: AccentHeaderContent; theme: LiveTileTheme }> = ({ content, theme: t }) => (
  <div
    style={{
      height: '100%',
      background: t.headerGrad,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 14px',
      borderBottom: `1px solid ${t.border}`,
    }}
  >
    {/* Left: title + subtitle */}
    <div>
      <div
        style={{
          fontSize: F.xxl,
          fontWeight: 800,
          color: t.text,
          letterSpacing: '-0.02em',
        }}
      >
        {content.title}
      </div>
      <div style={{ fontSize: F.xs, color: t.textSubtle }}>
        {content.subtitle}
      </div>
    </div>

    {/* Right: LIVE pill badge */}
    <span
      style={{
        background: t.pill,
        border: `1px solid ${t.pillBorder}`,
        borderRadius: '100px',
        padding: '1px 6px',
        color: t.accentLight,
        fontSize: F.xs,
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      LIVE
    </span>
  </div>
);
