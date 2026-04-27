export type CuratedGalleryItem = {
  fileName: string;
  title: string;
  group: 'overview' | 'grid' | 'bakeoff' | 'polish' | 'validation';
  description: string;
  canonical: boolean;
};

export const CURATED_GALLERY_ITEMS: readonly CuratedGalleryItem[] = [
  {
    fileName: 'livetile-design-overview.png',
    title: 'LiveTile Design Overview',
    group: 'overview',
    description: 'Primary overview screenshot for the current LiveTile design surface.',
    canonical: true,
  },
  {
    fileName: 'fullscreen-polished-v1.png',
    title: 'Fullscreen Polished V1',
    group: 'polish',
    description: 'Canonical full-canvas polished review state.',
    canonical: true,
  },
  {
    fileName: '16tile-grid-v3.png',
    title: '16 Tile Grid V3',
    group: 'grid',
    description: 'Latest dense grid reference for tile spacing and visual rhythm.',
    canonical: true,
  },
  {
    fileName: 'bridge-validated.png',
    title: 'Bridge Validated',
    group: 'validation',
    description: 'Evidence that local bridge/viewport telemetry integration was validated.',
    canonical: true,
  },
  {
    fileName: 'bakeoff-grok-code-dashboard.png',
    title: 'Bakeoff Grok Code Dashboard',
    group: 'bakeoff',
    description: 'Dashboard reference from the first parallel agent platform bakeoff.',
    canonical: true,
  },
  {
    fileName: 'bakeoff-grok-code-fixed.png',
    title: 'Bakeoff Grok Code Fixed',
    group: 'bakeoff',
    description: 'Corrected layout evidence from the bakeoff comparison set.',
    canonical: true,
  },
  {
    fileName: 'grok4-dashboard.png',
    title: 'Grok 4 Dashboard',
    group: 'bakeoff',
    description: 'Alternate dashboard rendering retained as a comparative reference.',
    canonical: true,
  },
  {
    fileName: 'slide10-schema-view.png',
    title: 'Slide 10 Schema View',
    group: 'validation',
    description: 'Schema-first review screenshot for tile metadata and inspection patterns.',
    canonical: true,
  },
  {
    fileName: 'batch3-review-s24.png',
    title: 'Batch 3 Review S24',
    group: 'polish',
    description: 'Late-stage review artifact retained as a canonical polish target.',
    canonical: true,
  },
  {
    fileName: 'current-state-check.png',
    title: 'Current State Check',
    group: 'validation',
    description: 'Current-state validation screenshot for regression comparison.',
    canonical: true,
  },
];

export const CURATED_GALLERY_FILE_NAMES = new Set(CURATED_GALLERY_ITEMS.map((item) => item.fileName));

export function getCuratedGalleryItem(fileName: string): CuratedGalleryItem | undefined {
  return CURATED_GALLERY_ITEMS.find((item) => item.fileName === fileName);
}