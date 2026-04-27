import { useEffect, useMemo, useState } from 'react';
import '@/design/index.css';

import { THEMES, DEFAULT_THEME_ID } from '@/shared/themes';
import { TEMPLATES } from '@/shared/templates';
import { buildSlideProfile } from '@/shared/profile-builder';
import { getDefaultContent } from '@/shared/sample-data';
import { CURATED_GALLERY_ITEMS } from '@/shared/gallery';
import {
  LIVETILE_APPLE_TOUCH_ICON,
  LIVETILE_FAVICON,
  LIVETILE_MANIFEST_ICONS,
  LIVETILE_PRIMARY_ICON,
} from '@/shared/livetile-assets';
import { getCatalogByGroup, TILE_CATALOG_STATS, type TileCatalogGroup } from '@/shared/tile-catalog';
import { SlideCanvas } from '@/canvas/SlideCanvas';
import { TemplateBrowser } from '@/canvas/TemplateBrowser';
import { ThemeSwitcher } from '@/canvas/ThemeSwitcher';
import { JsonInspector } from '@/canvas/JsonInspector';
import { SettingsPanel } from '@/canvas/SettingsPanel';
import { GALLERY_ASSET_COVERAGE, GALLERY_ASSET_TOTAL } from '@/tiles';

import type { TileTemplate } from '@/shared/types';

type InspectorMode = 'slide' | 'tile' | 'catalog' | 'gallery';

const inspectorModeLabels: Record<InspectorMode, string> = {
  slide: 'SLIDE PROFILE',
  tile: 'TILE PROFILE',
  catalog: 'CATALOG',
  gallery: 'GALLERY',
};

const catalogGroupLabels: Record<TileCatalogGroup, string> = {
  layout: 'Layout Tiles',
  chart: 'Chart Tiles',
  data: 'Data Tiles',
  comparison: 'Comparison Tiles',
  status: 'Status Tiles',
  input: 'Input Tiles',
  'flipcard-action': 'Flipcard Actions',
  'flipcard-container': 'Flipcard Containers',
  'flipcard-input': 'Flipcard Inputs',
  'flipcard-media': 'Flipcard Media',
  'flipcard-text': 'Flipcard Text',
  'flipcard-layout': 'Flipcard Layout',
  'flipcard-reference': 'Flipcard Reference',
};

const catalogGroupOrder: TileCatalogGroup[] = [
  'layout',
  'chart',
  'data',
  'comparison',
  'status',
  'input',
  'flipcard-action',
  'flipcard-container',
  'flipcard-input',
  'flipcard-media',
  'flipcard-text',
  'flipcard-layout',
  'flipcard-reference',
];

const catalogByGroup = getCatalogByGroup();

function setHeadLink(rel: string, href: string, type?: string) {
  let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
  if (type) link.type = type;
}

const galleryImageModules = import.meta.glob('../lib/img/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const galleryImages = Object.entries(galleryImageModules)
  .map(([path, src]) => {
    const fileName = path.split('/').pop() ?? path;
    const title = fileName
      .replace(/\.png$/i, '')
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return { fileName, title, src };
  })
  .sort((a, b) => a.fileName.localeCompare(b.fileName));

const galleryImageByFileName = new Map(galleryImages.map((image) => [image.fileName, image]));

const curatedGalleryImages = CURATED_GALLERY_ITEMS.map((item) => {
  const image = galleryImageByFileName.get(item.fileName);
  return image ? { ...image, ...item } : null;
}).filter((image): image is NonNullable<typeof image> => image !== null);

/**
 * livetile design -- main application shell.
 * Wires canvas, template browser, theme switcher, settings panel,
 * and JSON inspector together.
 */
export function App() {
  const [themeId, setThemeId] = useState<string>(DEFAULT_THEME_ID);
  const [templateId, setTemplateId] = useState(TEMPLATES[0]?.id ?? 'title-overview');
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null);
  const [inspectorMode, setInspectorMode] = useState<InspectorMode>('slide');
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Settings state
  const [gridGap, setGridGap] = useState(4);
  const [gridPadding, setGridPadding] = useState(6);
  const [animSpeed, setAnimSpeed] = useState(500);

  const theme = THEMES[themeId] ?? THEMES[DEFAULT_THEME_ID]!;

  useEffect(() => {
    if (LIVETILE_FAVICON) {
      setHeadLink('icon', LIVETILE_FAVICON.src, LIVETILE_FAVICON.format === 'svg' ? 'image/svg+xml' : undefined);
    }

    if (LIVETILE_APPLE_TOUCH_ICON) {
      setHeadLink('apple-touch-icon', LIVETILE_APPLE_TOUCH_ICON.src);
    }

    const manifest = {
      name: 'livetile design',
      short_name: 'livetile',
      icons: LIVETILE_MANIFEST_ICONS,
      theme_color: '#168CFF',
      background_color: '#080A0C',
      display: 'standalone',
    };
    const manifestUrl = URL.createObjectURL(new Blob([JSON.stringify(manifest)], { type: 'application/manifest+json' }));
    setHeadLink('manifest', manifestUrl, 'application/manifest+json');

    return () => URL.revokeObjectURL(manifestUrl);
  }, []);

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
    if (id) setInspectorMode('tile');
  };

  const inspectorData = inspectorMode === 'tile' && selectedTileProfile
    ? selectedTileProfile
    : slideProfile;

  const inspectorTitle = inspectorMode === 'tile' && selectedTileProfile
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
          padding: '9px 20px',
          borderBottom: `1px solid ${theme.border}`,
          flexShrink: 0,
          background: theme.headerGrad,
          transition: 'background 300ms ease, border-color 300ms ease',
        }}
      >
        {/* Logo / Title -- clickable to expand settings */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            className="logo-tile"
            onClick={() => setSettingsOpen((v) => !v)}
            type="button"
            aria-label="Open design settings"
            aria-expanded={settingsOpen}
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              border: 'none',
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentLight})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 3,
              boxShadow: `0 0 12px ${theme.accentGlow}`,
              cursor: 'pointer',
            }}
          >
            {LIVETILE_PRIMARY_ICON ? (
              <img
                src={LIVETILE_PRIMARY_ICON.src}
                alt=""
                aria-hidden="true"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  filter: settingsOpen ? 'brightness(1.15)' : 'none',
                }}
              />
            ) : (
              'LT'
            )}
          </button>
          <div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: theme.text,
              }}
            >
              livetile design
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
            flex: '0 0 62%',
            display: 'flex',
            flexDirection: 'column',
            padding: '12px 12px 10px 18px',
            overflow: 'hidden',
          }}
        >
          {/* Canvas */}
          <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', position: 'relative', zIndex: 1, paddingTop: 6 }}>
            <div style={{ width: '100%', maxWidth: 1180, maxHeight: '100%' }}>
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
              padding: '8px 0 0',
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

         {/* JSON Inspector Area */}
        <div
          style={{
            flex: '0 0 38%',
            display: 'flex',
            flexDirection: 'column',
            padding: '12px 18px 10px 10px',
            overflow: 'hidden',
            borderLeft: `1px solid ${theme.border}`,
            transition: 'border-color 300ms ease',
          }}
        >
          {/* Tab Switcher */}
          <div
            style={{
              display: 'flex',
              gap: 4,
              marginBottom: 10,
              flexShrink: 0,
            }}
          >
            {(['slide', 'tile', 'catalog', 'gallery'] as const).map((mode) => {
              const isActive = inspectorMode === mode;
              const disabled = mode === 'tile' && !selectedTileProfile;
              return (
                <button
                  key={mode}
                  onClick={() => !disabled && setInspectorMode(mode)}
                  disabled={disabled}
                  style={{
                    flex: 1,
                    padding: '6px 4px',
                    borderRadius: 4,
                    fontSize: '9px',
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
                  aria-pressed={isActive}
                  aria-label={`Show ${inspectorModeLabels[mode].toLowerCase()}`}
                >
                  {inspectorModeLabels[mode]}
                </button>
              );
            })}
          </div>

          {/* Inspector */}
          <div style={{ flex: 1, minHeight: 0 }}>
            {inspectorMode === 'catalog' ? (
              <div
                style={{
                  height: '100%',
                  overflowY: 'auto',
                  paddingRight: 4,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '10px',
                        fontWeight: 800,
                        color: theme.accentLight,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Tile Catalog
                    </div>
                    <div style={{ fontSize: '8px', color: theme.textSubtle, marginTop: 2 }}>
                      Slide tiles and first-class flipcard enum reference tiles.
                    </div>
                  </div>
                  <div style={{ fontSize: '8px', color: theme.textSubtle, textAlign: 'right' }}>
                    {TILE_CATALOG_STATS.total} entries<br />
                    {TILE_CATALOG_STATS.flipcardTiles} flipcard
                  </div>
                </div>

                {catalogGroupOrder
                  .filter((group) => catalogByGroup[group].length > 0)
                  .map((group) => (
                    <section key={group} style={{ marginBottom: 14 }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: 7,
                        }}
                      >
                        <div
                          style={{
                            fontSize: '9px',
                            fontWeight: 800,
                            color: theme.text,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {catalogGroupLabels[group]}
                        </div>
                        <div style={{ fontSize: '8px', color: theme.textSubtle }}>
                          {catalogByGroup[group].length}
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                          gap: 8,
                        }}
                      >
                        {catalogByGroup[group].map((entry) => (
                          <div
                            key={entry.type}
                            style={{
                              background: theme.card,
                              border: `1px solid ${theme.border}`,
                              borderRadius: 8,
                              padding: '8px 9px',
                              minHeight: 96,
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: 8,
                                marginBottom: 5,
                              }}
                            >
                              <div style={{ fontSize: '9px', fontWeight: 800, color: theme.text }}>
                                {entry.displayName}
                              </div>
                              <span
                                style={{
                                  fontSize: '7px',
                                  color: entry.renderableInSlide ? theme.accentLight : theme.textSubtle,
                                  background: theme.pill,
                                  border: `1px solid ${theme.pillBorder}`,
                                  borderRadius: 4,
                                  padding: '1px 4px',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {entry.renderableInSlide ? 'slide' : 'flipcard'}
                              </span>
                            </div>
                            <div style={{ fontSize: '8px', color: theme.textSubtle, lineHeight: 1.35 }}>
                              {entry.description}
                            </div>
                            <div
                              style={{
                                marginTop: 7,
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: 8,
                                fontSize: '7px',
                                color: theme.textSubtle,
                              }}
                            >
                              <span>{entry.componentName}</span>
                              <span>{entry.minSpan.cols}x{entry.minSpan.rows}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}
              </div>
            ) : inspectorMode === 'gallery' ? (
              <div
                style={{
                  height: '100%',
                  overflowY: 'auto',
                  paddingRight: 4,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '10px',
                        fontWeight: 800,
                        color: theme.accentLight,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Pattern Library Coverage
                    </div>
                    <div style={{ fontSize: '8px', color: theme.textSubtle, marginTop: 2 }}>
                      Assets audited from flipcard-pattern-library.html and related library sources.
                    </div>
                  </div>
                  <div style={{ fontSize: '8px', color: theme.textSubtle }}>
                    {GALLERY_ASSET_TOTAL} assets
                  </div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
                    gap: 10,
                    marginBottom: 18,
                  }}
                >
                  {GALLERY_ASSET_COVERAGE.map((collection) => (
                    <div
                      key={collection.title}
                      style={{
                        background: theme.card,
                        border: `1px solid ${theme.border}`,
                        borderRadius: 8,
                        padding: '9px 10px',
                        minHeight: 120,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: 8,
                          marginBottom: 5,
                        }}
                      >
                        <div
                          style={{
                            fontSize: '9px',
                            fontWeight: 800,
                            color: theme.text,
                            lineHeight: 1.25,
                          }}
                        >
                          {collection.title}
                        </div>
                        <div
                          style={{
                            fontSize: '8px',
                            fontWeight: 800,
                            color: theme.accentLight,
                            background: theme.emphasisBg,
                            border: `1px solid ${theme.emphasisBorder}`,
                            borderRadius: 999,
                            padding: '1px 6px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {collection.assets.length}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: '8px',
                          color: theme.textSubtle,
                          lineHeight: 1.35,
                          marginBottom: 7,
                        }}
                      >
                        {collection.description}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 4,
                        }}
                      >
                        {collection.assets.slice(0, 6).map((asset) => (
                          <span
                            key={asset.pathname}
                            title={`${asset.title} - ${asset.source}`}
                            style={{
                              fontSize: '7px',
                              lineHeight: 1.25,
                              color: theme.textMid,
                              background: theme.pill,
                              border: `1px solid ${theme.pillBorder}`,
                              borderRadius: 4,
                              padding: '2px 5px',
                            }}
                          >
                            {asset.title}
                          </span>
                        ))}
                        {collection.assets.length > 6 && (
                          <span
                            style={{
                              fontSize: '7px',
                              lineHeight: 1.25,
                              color: theme.textSubtle,
                              border: `1px solid ${theme.border}`,
                              borderRadius: 4,
                              padding: '2px 5px',
                            }}
                          >
                            +{collection.assets.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '10px',
                        fontWeight: 800,
                        color: theme.accentLight,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Curated Reference Gallery
                    </div>
                    <div style={{ fontSize: '8px', color: theme.textSubtle, marginTop: 2 }}>
                      Canonical visual evidence selected from the full screenshot inventory.
                    </div>
                  </div>
                  <div style={{ fontSize: '8px', color: theme.textSubtle }}>
                    {curatedGalleryImages.length} curated / {galleryImages.length} total
                  </div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                    gap: 10,
                  }}
                >
                  {curatedGalleryImages.map((image) => (
                    <a
                      key={image.fileName}
                      href={image.src}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'block',
                        textDecoration: 'none',
                        color: theme.text,
                        background: theme.card,
                        border: `1px solid ${theme.border}`,
                        borderRadius: 8,
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={image.src}
                        alt={image.title}
                        loading="lazy"
                        style={{
                          width: '100%',
                          aspectRatio: '16 / 10',
                          objectFit: 'cover',
                          display: 'block',
                          background: theme.bg,
                        }}
                      />
                      <div
                        style={{
                          padding: '7px 8px 8px',
                          fontSize: '8px',
                          lineHeight: 1.35,
                          color: theme.textSubtle,
                        }}
                      >
                        {image.title}
                        <div style={{ marginTop: 3, color: theme.textSubtle }}>
                          {image.group} | {image.description}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <JsonInspector
                data={inspectorData}
                title={inspectorTitle}
                accentColor={theme.accentLight}
              />
            )}
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
