import { useState } from 'react';
import type { LiveTileTheme } from '../shared/types';

type ThemeSwitcherProps = {
  themes: Record<string, LiveTileTheme>;
  selectedId: string;
  onSelect: (id: string) => void;
};

/**
 * ThemeSwitcher — row of accent-coloured swatch buttons for theme selection.
 * Shows theme name on hover via a tooltip label.
 */
export function ThemeSwitcher({ themes, selectedId, onSelect }: ThemeSwitcherProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div
      role="radiogroup"
      aria-label="Theme selection"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        position: 'relative',
      }}
    >
      {Object.values(themes).map((t) => {
        const isSelected = t.id === selectedId;
        const isHovered = t.id === hoveredId;

        return (
          <div
            key={t.id}
            style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            onMouseEnter={() => setHoveredId(t.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
              <button
              type="button"
              onClick={() => onSelect(t.id)}
              role="radio"
              aria-checked={isSelected}
              aria-label={`Select ${t.name} theme`}
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${t.accent}, ${t.accentLight})`,
                border: 'none',
                cursor: 'pointer',
                outline: isSelected
                  ? `2px solid ${t.accent}`
                  : 'none',
                outlineOffset: 2,
                boxShadow: isSelected
                  ? `0 0 8px ${t.accentGlow}`
                  : isHovered
                    ? `0 0 6px ${t.accentGlow}`
                    : 'none',
                transition: 'all 150ms ease',
                transform: isSelected ? 'scale(1.15)' : isHovered ? 'scale(1.08)' : 'scale(1)',
                flexShrink: 0,
              }}
            />

            {/* Tooltip label */}
            {isHovered && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  marginTop: 6,
                  whiteSpace: 'nowrap',
                  background: 'rgba(0,0,0,0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  padding: '2px 8px',
                  fontSize: '8.5px',
                  fontWeight: 600,
                  color: t.accentLight,
                  pointerEvents: 'none',
                  zIndex: 100,
                }}
              >
                {t.name}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
