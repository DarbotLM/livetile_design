import { useState, useMemo } from 'react';
import '@/design/index.css';

import { THEMES, DEFAULT_THEME_ID } from '@/shared/themes';
import { TEMPLATES } from '@/shared/templates';
import { buildSlideProfile } from '@/shared/profile-builder';
import { getDefaultContent } from '@/shared/sample-data';
import { SlideCanvas } from '@/canvas/SlideCanvas';
import { TemplateBrowser } from '@/canvas/TemplateBrowser';
import { ThemeSwitcher } from '@/canvas/ThemeSwitcher';
import { JsonInspector } from '@/canvas/JsonInspector';
import { SettingsPanel } from '@/canvas/SettingsPanel';

import type { TileTemplate } from '@/shared/types';

/**
 * LiveTile Design Studio -- main application shell.
 * Wires canvas, template browser, theme switcher, settings panel,
 * and JSON inspector together.
 */
export function App() {
  const [themeId, setThemeId] = useState<string>(DEFAULT_THEME_ID);
  const [templateId, setTemplateId] = useState(TEMPLATES[0]?.id ?? 'title-overview');
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null);
  const [jsonMode, setJsonMode] = useState<'slide' | 'tile'>('slide');
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Settings state
  const [gridGap, setGridGap] = useState(3);
  const [gridPadding, setGridPadding] = useState(4);
  const [animSpeed, setAnimSpeed] = useState(500);

  const theme = THEMES[themeId] ?? THEMES[DEFAULT_THEME_ID]!;

  const template: TileTemplate = useMemo(
    () => TEMPLATES.find((t) => t.id === templateId) ?? TEMPLATES[0]!,
    [templateId],
  );

  const slideProfile = useMemo(
    () => buildSlideProfile(template, themeId, selectedTileId ?? undefined),
    [template, themeId, selectedTileId],
  );

  // If a tile is selected, get its content for the tile profile view
  const selectedTileProfile = useMemo(() => {
    if (!selectedTileId) return null;
    const tileDef = template.tiles.find((t) => t.id === selectedTileId);
    if (!tileDef) return null;
    const kpiIdx = tileDef.type === 'kpi'
      ? template.tiles.filter((t) => t.type === 'kpi').indexOf(tileDef)
      : 0;
    return {
      id: tileDef.id,
      type: tileDef.type,
      grid: { col: tileDef.col, row: tileDef.row, colSpan: tileDef.cs, rowSpan: tileDef.rs },
      content: getDefaultContent(tileDef.type, kpiIdx, template.id),
    };
  }, [selectedTileId, template]);

  // Clear selected tile when switching templates
  const handleTemplateChange = (id: string) => {
    setTemplateId(id);
    setSelectedTileId(null);
  };

  // Auto-switch JSON mode when selecting/deselecting tiles
  const handleSelectTile = (id: string | null) => {
    setSelectedTileId(id);
    if (id) setJsonMode('tile');
  };

  const inspectorData = jsonMode === 'tile' && selectedTileProfile
    ? selectedTileProfile
    : slideProfile;

  const inspectorTitle = jsonMode === 'tile' && selectedTileProfile
    ? `Tile Profile -- ${selectedTileProfile.type}`
    : 'Slide Profile';

  // Apply animation speed via CSS custom property
  const animSpeedStyle = {
    '--flip-speed': `${animSpeed}ms`,
  } as React.CSSProperties;

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: theme.bg,
        color: theme.text,
        overflow: 'hidden',
        transition: 'background-color 300ms ease',
        ...animSpeedStyle,
      }}
    >
      {/* -- Top Bar -- */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 20px',
          borderBottom: `1px solid ${theme.border}`,
          flexShrink: 0,
          background: theme.headerGrad,
          transition: 'background 300ms ease, border-color 300ms ease',
        }}
      >
        {/* Logo / Title -- clickable to expand settings */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            className="logo-tile"
            onClick={() => setSettingsOpen((v) => !v)}
            title="Open Design Settings"
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentLight})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 800,
              color: '#fff',
              boxShadow: `0 0 12px ${theme.accentGlow}`,
            }}
          >
            {settingsOpen ? 'S' : '\u25C6'}
          </div>
          <div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: theme.text,
              }}
            >
              LiveTile Design Studio
            </div>
            <div
              style={{
                fontSize: '8px',
                fontWeight: 600,
                color: theme.textSubtle,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              adaptive-slide/v1.0
            </div>
          </div>
        </div>

        {/* Theme Switcher */}
        <ThemeSwitcher
          themes={THEMES}
          selectedId={themeId}
          onSelect={setThemeId}
        />
      </header>

      {/* -- Settings Panel (expanding from logo) -- */}
      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        theme={theme}
        gridGap={gridGap}
        onGridGapChange={setGridGap}
        gridPadding={gridPadding}
        onGridPaddingChange={setGridPadding}
        animSpeed={animSpeed}
        onAnimSpeedChange={setAnimSpeed}
      />

      {/* -- Template Browser -- */}
      <div
        style={{
          borderBottom: `1px solid ${theme.border}`,
          flexShrink: 0,
          background: `${theme.card}cc`,
          transition: 'background-color 300ms ease, border-color 300ms ease',
        }}
      >
        <TemplateBrowser
          templates={TEMPLATES}
          selectedId={templateId}
          onSelect={handleTemplateChange}
          theme={theme}
        />
      </div>

      {/* -- Main Content -- */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
          minHeight: 0,
        }}
      >
        {/* Canvas Area (~65%) */}
        <div
          className="canvas-area"
          style={{
            flex: '0 0 65%',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px 16px 12px 20px',
            overflow: 'hidden',
          }}
        >
          {/* Canvas */}
          <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ width: '100%', maxHeight: '100%' }}>
              <SlideCanvas
                template={template}
                themeId={themeId}
                theme={theme}
                selectedTileId={selectedTileId}
                onSelectTile={handleSelectTile}
                gridGap={gridGap}
                gridPadding={gridPadding}
              />
            </div>
          </div>

          {/* Slide Title / Subtitle below canvas */}
          <div
            style={{
              padding: '10px 0 0',
              textAlign: 'center',
              flexShrink: 0,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 800,
                color: theme.accentLight,
                letterSpacing: '-0.01em',
              }}
            >
              {template.slideTitle}
            </div>
            <div
              style={{
                fontSize: '9px',
                color: theme.textSubtle,
                marginTop: 2,
              }}
            >
              {template.slideSubtitle}
            </div>
          </div>
        </div>

        {/* JSON Inspector Area (~35%) */}
        <div
          style={{
            flex: '0 0 35%',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px 20px 12px 8px',
            overflow: 'hidden',
            borderLeft: `1px solid ${theme.border}`,
            transition: 'border-color 300ms ease',
          }}
        >
          {/* Tab Switcher */}
          <div
            style={{
              display: 'flex',
              gap: 2,
              marginBottom: 8,
              flexShrink: 0,
            }}
          >
            {(['slide', 'tile'] as const).map((mode) => {
              const isActive = jsonMode === mode;
              const disabled = mode === 'tile' && !selectedTileProfile;
              return (
                <button
                  key={mode}
                  onClick={() => !disabled && setJsonMode(mode)}
                  disabled={disabled}
                  style={{
                    flex: 1,
                    padding: '5px 0',
                    borderRadius: 4,
                    fontSize: '8.5px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    cursor: disabled ? 'default' : 'pointer',
                    transition: 'all 150ms ease',
                    background: isActive ? theme.emphasisBg : 'transparent',
                    color: disabled
                      ? 'rgba(255,255,255,0.15)'
                      : isActive
                        ? theme.accentLight
                        : theme.textSubtle,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: isActive ? theme.emphasisBorder : 'transparent',
                  }}
                >
                  {mode === 'slide' ? 'SLIDE PROFILE' : 'TILE PROFILE'}
                </button>
              );
            })}
          </div>

          {/* Inspector */}
          <div style={{ flex: 1, minHeight: 0 }}>
            <JsonInspector
              data={inspectorData}
              title={inspectorTitle}
              accentColor={theme.accentLight}
            />
          </div>

          {/* Stats footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px 0 0',
              fontSize: '8px',
              color: theme.textSubtle,
              flexShrink: 0,
            }}
          >
            <span>{template.tiles.length} tiles</span>
            <span>{Object.keys(THEMES).length} themes</span>
            <span>{TEMPLATES.length} templates</span>
          </div>
        </div>
      </div>
    </div>
  );
}
