import React from 'react';
import type { LiveTileTheme, HeroContent } from '../shared/types';

const F = { xs: '8px', sm: '9px', md: '10px', lg: '11px', xl: '12px', xxl: '14px' } as const;

export const HeroTile: React.FC<{ content: HeroContent; theme: LiveTileTheme }> = ({ content, theme: t }) => {
  // Split title on newline or "\n" to allow a two-line hero heading
  const titleParts = content.title.split('\n');

  return (
    <div
      style={{
        height: '100%',
        background: t.headerGrad,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '12px 16px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Radial glow overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 60% 70% at 30% 50%, ${t.accentGlow} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Badge — top-right */}
      <div
        style={{
          position: 'absolute',
          top: 8,
          right: 10,
          background: t.pill,
          border: `1px solid ${t.pillBorder}`,
          borderRadius: '100px',
          padding: '1px 8px',
          color: t.accentLight,
          fontSize: F.xs,
          fontWeight: 700,
          zIndex: 1,
        }}
      >
        {content.badge}
      </div>

      {/* Micro-label */}
      <div
        style={{
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '0.14em',
          color: t.textSubtle,
          textTransform: 'uppercase',
          marginBottom: '6px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {content.badge}
      </div>

      {/* Title block */}
      <div
        style={{
          fontSize: '18px',
          fontWeight: 800,
          color: t.text,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          marginBottom: '4px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {titleParts.length > 1 ? (
          <>
            {titleParts[0]}
            <br />
            <span style={{ color: t.accentLight }}>{titleParts.slice(1).join(' ')}</span>
          </>
        ) : (
          <span style={{ color: t.accentLight }}>{titleParts[0]}</span>
        )}
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: '9.5px',
          color: t.textSubtle,
          marginTop: '6px',
          lineHeight: 1.4,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {content.subtitle}
      </div>
    </div>
  );
};
