import { useState } from 'react';
import type { LiveTileTheme } from '../shared/types';
import { TILE_SCHEMA_INDEX, getSchemasByCategory } from '../shared/schema-index';
import type { TileCategory } from '../shared/schema-index';

type SettingsPanelProps = {
  open: boolean;
  onClose: () => void;
  theme: LiveTileTheme;
  gridGap: number;
  onGridGapChange: (v: number) => void;
  gridPadding: number;
  onGridPaddingChange: (v: number) => void;
  animSpeed: number;
  onAnimSpeedChange: (v: number) => void;
};

const CATEGORY_LABELS: Record<TileCategory, string> = {
  layout: 'Layout',
  chart: 'Charts',
  data: 'Data',
  comparison: 'Comparison',
  status: 'Status',
  input: 'Input',
};

/** Expanding settings panel triggered by the logo LiveTile. */
export function SettingsPanel({
  open,
  onClose,
  theme,
  gridGap,
  onGridGapChange,
  gridPadding,
  onGridPaddingChange,
  animSpeed,
  onAnimSpeedChange,
}: SettingsPanelProps) {
  const [activeTab, setActiveTab] = useState<'layout' | 'schema' | 'animation'>('layout');
  const grouped = getSchemasByCategory();

  if (!open) return null;

  const sliderTrackStyle = (value: number, max: number): React.CSSProperties => ({
    background: `linear-gradient(90deg, ${theme.accent} ${(value / max) * 100}%, ${theme.border} ${(value / max) * 100}%)`,
  });

  return (
    <>
      {/* Backdrop */}
      <div
        className="settings-backdrop"
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 999,
        }}
      />

      {/* Panel */}
      <div
        className="settings-panel"
        style={{
          position: 'fixed',
          top: 52,
          left: 16,
          width: 420,
          maxHeight: 'calc(100vh - 80px)',
          background: theme.card,
          border: `1px solid ${theme.accent}40`,
          borderRadius: 12,
          boxShadow: `0 8px 40px rgba(0,0,0,0.6), 0 0 30px ${theme.accentGlow}, inset 0 1px 0 ${theme.accent}20`,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderBottom: `1px solid ${theme.border}`,
            background: theme.headerGrad,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentLight})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 800,
                color: '#fff',
              }}
            >
              S
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: theme.text }}>
              Design Settings
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: theme.textSubtle,
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 700,
              padding: '0 4px',
              lineHeight: 1,
            }}
          >
            x
          </button>
        </div>

        {/* Tab Bar */}
        <div
          style={{
            display: 'flex',
            gap: 2,
            padding: '8px 12px',
            borderBottom: `1px solid ${theme.border}`,
          }}
        >
          {(['layout', 'schema', 'animation'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '4px 0',
                borderRadius: 4,
                fontSize: '8px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                border: 'none',
                transition: 'all 150ms ease',
                background: activeTab === tab ? `${theme.accent}20` : 'transparent',
                color: activeTab === tab ? theme.accentLight : theme.textSubtle,
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: activeTab === tab ? `${theme.accent}40` : 'transparent',
              }}
            >
              {tab === 'layout' ? 'GRID / LAYOUT' : tab === 'schema' ? 'SCHEMA INDEX' : 'ANIMATION'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '12px 16px' }}>
          {activeTab === 'layout' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Grid Gap */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <label style={{ fontSize: '9px', fontWeight: 600, color: theme.textMid }}>
                    Grid Gap
                  </label>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: theme.accentLight }}>
                    {gridGap}px
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={12}
                  value={gridGap}
                  onChange={(e) => onGridGapChange(Number(e.target.value))}
                  className="settings-slider"
                  style={sliderTrackStyle(gridGap, 12)}
                />
              </div>

              {/* Grid Padding */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <label style={{ fontSize: '9px', fontWeight: 600, color: theme.textMid }}>
                    Grid Padding
                  </label>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: theme.accentLight }}>
                    {gridPadding}px
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={20}
                  value={gridPadding}
                  onChange={(e) => onGridPaddingChange(Number(e.target.value))}
                  className="settings-slider"
                  style={sliderTrackStyle(gridPadding, 20)}
                />
              </div>

              {/* Dimensions Info */}
              <div
                style={{
                  padding: '10px 12px',
                  borderRadius: 6,
                  background: theme.emphasisBg,
                  border: `1px solid ${theme.emphasisBorder}`,
                  borderLeft: `3px solid ${theme.emphasisLeft}`,
                }}
              >
                <div style={{ fontSize: '8px', fontWeight: 700, color: theme.accentLight, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                  Slide Dimensions
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div>
                    <div style={{ fontSize: '8px', color: theme.textSubtle }}>Width</div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: theme.text }}>1280px</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '8px', color: theme.textSubtle }}>Height</div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: theme.text }}>720px</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '8px', color: theme.textSubtle }}>Columns</div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: theme.text }}>12</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '8px', color: theme.textSubtle }}>Rows</div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: theme.text }}>7</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(Object.keys(grouped) as TileCategory[])
                .filter((cat) => grouped[cat].length > 0)
                .map((cat) => (
                  <div key={cat}>
                    <div
                      style={{
                        fontSize: '8px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: theme.accentLight,
                        marginBottom: 6,
                        padding: '2px 6px',
                        background: `${theme.accent}15`,
                        borderRadius: 3,
                        display: 'inline-block',
                      }}
                    >
                      {CATEGORY_LABELS[cat]} ({grouped[cat].length})
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {grouped[cat].map((entry) => (
                        <div
                          key={entry.type}
                          style={{
                            padding: '6px 8px',
                            borderRadius: 4,
                            background: 'rgba(255,255,255,0.02)',
                            border: `1px solid ${theme.border}`,
                            transition: 'all 120ms ease',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                            <span
                              style={{
                                fontSize: '7px',
                                fontWeight: 800,
                                color: theme.accent,
                                background: `${theme.accent}18`,
                                padding: '1px 4px',
                                borderRadius: 2,
                                letterSpacing: '0.04em',
                              }}
                            >
                              {entry.icon}
                            </span>
                            <span style={{ fontSize: '9px', fontWeight: 700, color: theme.text }}>
                              {entry.displayName}
                            </span>
                            <span style={{ fontSize: '7px', color: theme.textSubtle, marginLeft: 'auto' }}>
                              min {entry.minSpan.cols}x{entry.minSpan.rows}
                            </span>
                          </div>
                          <div style={{ fontSize: '7.5px', color: theme.textMid, lineHeight: 1.4 }}>
                            {entry.description}
                          </div>
                          <div style={{ display: 'flex', gap: 3, marginTop: 4, flexWrap: 'wrap' }}>
                            {entry.tags.map((tag) => (
                              <span
                                key={tag}
                                style={{
                                  fontSize: '6.5px',
                                  fontWeight: 600,
                                  color: theme.textSubtle,
                                  background: theme.pill,
                                  border: `1px solid ${theme.pillBorder}`,
                                  borderRadius: 3,
                                  padding: '0 4px',
                                  lineHeight: 1.6,
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeTab === 'animation' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Flip Speed */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <label style={{ fontSize: '9px', fontWeight: 600, color: theme.textMid }}>
                    Tile Flip Speed
                  </label>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: theme.accentLight }}>
                    {animSpeed}ms
                  </span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={1200}
                  step={50}
                  value={animSpeed}
                  onChange={(e) => onAnimSpeedChange(Number(e.target.value))}
                  className="settings-slider"
                  style={sliderTrackStyle(animSpeed, 1200)}
                />
              </div>

              {/* Animation Preview */}
              <div
                style={{
                  padding: '10px 12px',
                  borderRadius: 6,
                  background: theme.emphasisBg,
                  border: `1px solid ${theme.emphasisBorder}`,
                  borderLeft: `3px solid ${theme.emphasisLeft}`,
                }}
              >
                <div style={{ fontSize: '8px', fontWeight: 700, color: theme.accentLight, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                  Active Animations
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {[
                    { name: 'Tile 3D Flip', value: `${animSpeed}ms ease` },
                    { name: 'Theme Transition', value: '300ms ease' },
                    { name: 'Selection Glow', value: '180ms ease' },
                    { name: 'Logo Pulse', value: '2s infinite' },
                    { name: 'Hover Highlight', value: '130ms ease' },
                  ].map((item) => (
                    <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '8px', color: theme.textMid }}>{item.name}</span>
                      <span
                        style={{
                          fontSize: '7.5px',
                          fontFamily: "'Cascadia Code','Fira Code',monospace",
                          color: theme.accent,
                          background: `${theme.accent}12`,
                          padding: '1px 6px',
                          borderRadius: 3,
                        }}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '8px 16px',
            borderTop: `1px solid ${theme.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '7.5px',
            color: theme.textSubtle,
          }}
        >
          <span>{Object.keys(TILE_SCHEMA_INDEX).length} tile types indexed</span>
          <span>adaptive-slide/v1.0</span>
        </div>
      </div>
    </>
  );
}
