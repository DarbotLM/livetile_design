import { useState } from 'react';
import type { TileTemplate, LiveTileTheme } from '../shared/types';

type TemplateBrowserProps = {
  templates: TileTemplate[];
  selectedId: string;
  onSelect: (id: string) => void;
  theme: LiveTileTheme;
};

/** Miniature grid thumbnail showing tile positions for a template */
function TemplateThumbnail({
  tmpl,
  selected,
  onClick,
  theme,
}: {
  tmpl: TileTemplate;
  selected: boolean;
  onClick: () => void;
  theme: LiveTileTheme;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 80,
          height: 50,
          borderRadius: 4,
          background: selected ? theme.emphasisBg : 'rgba(255,255,255,0.03)',
          border: `1px solid ${
            selected ? theme.accent : hovered ? theme.border : 'rgba(255,255,255,0.08)'
          }`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: selected ? `0 0 10px ${theme.accentGlow}` : 'none',
          transition: 'all 130ms ease',
        }}
      >
        {/* Mini-grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(12,1fr)',
            gridTemplateRows: 'repeat(7,1fr)',
            gap: '0.5px',
          }}
        >
          {tmpl.tiles.map((tile) => (
            <div
              key={tile.id}
              style={{
                gridColumn: `${tile.col}/span ${tile.cs}`,
                gridRow: `${tile.row}/span ${tile.rs}`,
                background: selected ? `${theme.accent}50` : `${theme.textSubtle}20`,
                borderRadius: 1,
              }}
            />
          ))}
        </div>

        {/* Icon (hidden when selected to let grid show through) */}
        <div
          style={{
            fontSize: '14px',
            position: 'relative',
            zIndex: 1,
            opacity: selected ? 0 : 0.6,
          }}
        >
          {tmpl.icon}
        </div>
      </div>

      {/* Label */}
      <div
        style={{
          fontSize: '8.5px',
          fontWeight: selected ? 700 : 500,
          color: selected ? theme.accentLight : theme.textSubtle,
          textAlign: 'center',
          lineHeight: 1.2,
          transition: 'color 120ms ease',
        }}
      >
        {tmpl.name}
      </div>
    </div>
  );
}

/**
 * TemplateBrowser — horizontal scrolling strip of template thumbnails.
 */
export function TemplateBrowser({ templates, selectedId, onSelect, theme }: TemplateBrowserProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        padding: '8px 16px',
        overflowX: 'auto',
        overflowY: 'hidden',
        alignItems: 'flex-start',
        scrollbarGutter: 'stable',
      }}
    >
      {templates.map((tmpl) => (
        <TemplateThumbnail
          key={tmpl.id}
          tmpl={tmpl}
          selected={tmpl.id === selectedId}
          onClick={() => onSelect(tmpl.id)}
          theme={theme}
        />
      ))}
    </div>
  );
}
