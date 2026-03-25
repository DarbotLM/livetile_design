import React from 'react';
import type { LiveTileTheme, EmphasisContent } from '../shared/types';

const F = { xs: '8px', sm: '9px', md: '10px', lg: '11px', xl: '12px', xxl: '14px' } as const;

/**
 * Highlight matching words in text with accent styling.
 * Returns an array of React nodes with highlighted spans.
 */
function renderHighlightedText(
  text: string,
  highlights: string[] | undefined,
  accentColor: string,
): React.ReactNode {
  if (!highlights || highlights.length === 0) {
    return text;
  }

  // Build a regex that matches any highlight phrase (case-insensitive)
  const escaped = highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(pattern);

  return parts.map((part, i) => {
    const isHighlight = highlights.some(h => h.toLowerCase() === part.toLowerCase());
    if (isHighlight) {
      return (
        <span key={i} style={{ color: accentColor, fontWeight: 700 }}>
          {part}
        </span>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

export const EmphasisTile: React.FC<{ content: EmphasisContent; theme: LiveTileTheme }> = ({ content, theme: t }) => (
  <div
    style={{
      height: '100%',
      background: t.emphasisBg,
      border: `1px solid ${t.emphasisBorder}`,
      borderLeft: `2px solid ${t.emphasisLeft}`,
      borderRadius: '4px',
      padding: '5px 7px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'hidden',
    }}
  >
    {/* Uppercase label */}
    <div
      style={{
        fontSize: F.xs,
        fontWeight: 700,
        color: t.accentLight,
        marginBottom: '4px',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}
    >
      {content.label}
    </div>

    {/* Body text with optional word highlights */}
    <div style={{ fontSize: F.sm, color: t.textMid, lineHeight: 1.5 }}>
      {renderHighlightedText(content.text, content.highlights, t.accentLight)}
    </div>
  </div>
);
