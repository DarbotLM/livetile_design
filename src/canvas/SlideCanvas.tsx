import React, { useState, useMemo } from 'react';
import type { TileTemplate, TileDefinition, LiveTileTheme } from '../shared/types';
import { getDefaultContent } from '../shared/sample-data';
import { TileRenderer } from '../tiles/TileRenderer';

type SlideCanvasProps = {
  template: TileTemplate;
  themeId: string;
  theme: LiveTileTheme;
  selectedTileId: string | null;
  onSelectTile: (id: string | null) => void;
  gridGap?: number;
  gridPadding?: number;
};

/** JSON badge shown on hover to flip tile to JSON view */
function JsonBadge({ onClick }: { onClick: (e: React.MouseEvent) => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Show tile JSON"
      style={{
        position: 'absolute',
        top: 4,
        right: 4,
        zIndex: 10,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 4,
        padding: '1px 5px',
        fontSize: '7.5px',
        fontWeight: 700,
        color: '#60a5fa',
        cursor: 'pointer',
        letterSpacing: '0.06em',
        lineHeight: 1.6,
        transition: 'all 120ms ease',
      }}
    >
      {'{ }'}
    </button>
  );
}

/** Type badge overlay on hover/selected */
function TypeBadge({ type }: { type: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 3,
        left: 4,
        zIndex: 10,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 3,
        padding: '0px 5px',
        fontSize: '7px',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.55)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        pointerEvents: 'none',
      }}
    >
      {type}
    </div>
  );
}

/** JSON back-face content */
function JsonBackFace({ tile, theme }: { tile: TileDefinition; theme: LiveTileTheme }) {
  const content = getDefaultContent(tile.type, 0);
  const raw = JSON.stringify(content, null, 2);
  const html = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"([^"]+)":/g, '<span style="color:#60a5fa">"$1"</span>:')
    .replace(/: "([^"]+)"/g, ': <span style="color:#86efac">"$1"</span>')
    .replace(/: (\d+\.?\d*)/g, ': <span style="color:#fbbf24">$1</span>')
    .replace(/: (true|false|null)/g, ': <span style="color:#f87171">$1</span>');

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: theme.card,
        border: `1px solid ${theme.border}`,
        borderRadius: 5,
        padding: 6,
        overflow: 'auto',
      }}
    >
      <pre
        style={{
          margin: 0,
          fontFamily: "'Cascadia Code','Fira Code',monospace",
          fontSize: '8px',
          lineHeight: 1.5,
          color: '#d4d4d8',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

/** Interactive wrapper for each tile in the grid */
function TileShell({
  tile,
  theme,
  selected,
  kpiIndex,
  onSelect,
  templateId,
}: {
  tile: TileDefinition;
  theme: LiveTileTheme;
  selected: boolean;
  kpiIndex: number;
  onSelect: () => void;
  templateId?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFlipped((f) => !f);
  };

  const showOverlays = hovered || selected;

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setFlipped(false); }}
      style={{
        gridColumn: `${tile.col} / span ${tile.cs}`,
        gridRow: `${tile.row} / span ${tile.rs}`,
        position: 'relative',
        cursor: 'pointer',
        borderRadius: 5,
        overflow: 'hidden',
        transition: 'box-shadow 180ms ease, outline 180ms ease',
        outline: selected
          ? `2px solid ${theme.accent}`
          : hovered
            ? `1px solid ${theme.border}`
            : '1px solid transparent',
        outlineOffset: -1,
        boxShadow: selected
          ? `0 0 16px ${theme.accentGlow}, inset 0 0 0 1px ${theme.accent}`
          : 'none',
      }}
    >
      {/* Corner handles when selected */}
      {selected && (
        <>
          {(['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const).map((corner) => {
            const isTop = corner.startsWith('top');
            const isLeft = corner.endsWith('Left');
            return (
              <div
                key={corner}
                style={{
                  position: 'absolute',
                  width: 6,
                  height: 6,
                  borderRadius: 1,
                  background: theme.accent,
                  zIndex: 20,
                  ...(isTop ? { top: -1 } : { bottom: -1 }),
                  ...(isLeft ? { left: -1 } : { right: -1 }),
                  pointerEvents: 'none',
                }}
              />
            );
          })}
        </>
      )}

      {/* Overlays */}
      {showOverlays && <JsonBadge onClick={handleFlip} />}
      {showOverlays && <TypeBadge type={tile.type} />}

      {/* 3D card flip container */}
      <div
        className="tile-flip-container"
        style={{ width: '100%', height: '100%' }}
      >
        <div
          className={`tile-flip-inner${flipped ? ' flipped' : ''}`}
        >
          {/* Front: tile content */}
          <div className="tile-flip-front">
            <TileRenderer tile={tile} theme={theme} kpiIndex={kpiIndex} templateId={templateId} />
          </div>
          {/* Back: JSON view */}
          <div className="tile-flip-back">
            <JsonBackFace tile={tile} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * SlideCanvas — 12×7 CSS Grid that renders all tiles in a template.
 * Maintains 16:9 aspect ratio and scales to fit its container.
 */
export function SlideCanvas({
  template,
  theme,
  selectedTileId,
  onSelectTile,
  gridGap = 3,
  gridPadding = 4,
}: SlideCanvasProps) {
  // Track KPI index across tiles
  const kpiIndices = useMemo(() => {
    const map: Record<string, number> = {};
    let idx = 0;
    for (const tile of template.tiles) {
      map[tile.id] = tile.type === 'kpi' ? idx++ : 0;
    }
    return map;
  }, [template.tiles]);

  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '1280 / 720',
        background: theme.card,
        borderRadius: 8,
        border: `1px solid ${theme.border}`,
        padding: gridPadding,
        overflow: 'hidden',
        boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px ${theme.border}`,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridTemplateRows: 'repeat(7, 1fr)',
          gap: gridGap,
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onSelectTile(null);
        }}
      >
        {template.tiles.map((tile) => (
          <TileShell
            key={tile.id}
            tile={tile}
            theme={theme}
            selected={selectedTileId === tile.id}
            kpiIndex={kpiIndices[tile.id] ?? 0}
            templateId={template.id}
            onSelect={() =>
              onSelectTile(selectedTileId === tile.id ? null : tile.id)
            }
          />
        ))}
      </div>
    </div>
  );
}
