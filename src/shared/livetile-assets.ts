export type LiveTileBrandAssetFormat = 'ico' | 'json' | 'png' | 'svg' | 'webmanifest';

export type LiveTileBrandAsset = {
  path: string;
  fileName: string;
  title: string;
  platform: string;
  format: LiveTileBrandAssetFormat;
  src: string;
  isImage: boolean;
  size: string | null;
};

const brandAssetModules = import.meta.glob(
  '../../lib/livetile_assets/livetile_icons/**/*.{ico,json,png,svg,webmanifest}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  },
) as Record<string, string>;

function titleFromFileName(fileName: string): string {
  return fileName
    .replace(/\.(ico|json|png|svg|webmanifest)$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function platformFromPath(path: string): string {
  if (path.includes('/android/')) return 'Android';
  if (path.includes('/ios/')) return 'iOS';
  if (path.includes('/web/')) return 'Web';
  if (path.includes('/vectors/')) return 'Vector';
  return 'Core';
}

function sizeFromFileName(fileName: string): string | null {
  return fileName.match(/(\d+x\d+)/)?.[1] ?? null;
}

const LIVETILE_BRAND_ASSETS: LiveTileBrandAsset[] = Object.entries(brandAssetModules)
  .map(([path, src]) => {
    const normalizedPath = path.replace(/\\/g, '/');
    const fileName = normalizedPath.split('/').pop() ?? normalizedPath;
    const extension = fileName.split('.').pop()?.toLowerCase() as LiveTileBrandAssetFormat | undefined;
    const format = extension ?? 'png';

    return {
      path: normalizedPath.replace('../../', ''),
      fileName,
      title: titleFromFileName(fileName),
      platform: platformFromPath(normalizedPath),
      format,
      src,
      isImage: format === 'ico' || format === 'png' || format === 'svg',
      size: sizeFromFileName(fileName),
    };
  })
  .sort((a, b) => a.platform.localeCompare(b.platform) || a.path.localeCompare(b.path));

export const LIVETILE_PRIMARY_ICON =
  LIVETILE_BRAND_ASSETS.find((asset) => asset.path.endsWith('/vectors/primary_icon.svg')) ??
  LIVETILE_BRAND_ASSETS.find((asset) => asset.fileName === 'icon-512x512.png') ??
  LIVETILE_BRAND_ASSETS.find((asset) => asset.isImage);

export const LIVETILE_FAVICON =
  LIVETILE_BRAND_ASSETS.find((asset) => asset.path.endsWith('/web/favicon.svg')) ??
  LIVETILE_BRAND_ASSETS.find((asset) => asset.path.endsWith('/web/favicon.ico')) ??
  LIVETILE_PRIMARY_ICON;

export const LIVETILE_APPLE_TOUCH_ICON =
  LIVETILE_BRAND_ASSETS.find((asset) => asset.fileName === 'apple-touch-icon.png') ??
  LIVETILE_BRAND_ASSETS.find((asset) => asset.fileName === 'icon-180x180.png') ??
  LIVETILE_BRAND_ASSETS.find((asset) => asset.fileName === 'icon-192x192.png') ??
  LIVETILE_PRIMARY_ICON;

export const LIVETILE_MANIFEST_ICONS = LIVETILE_BRAND_ASSETS
  .filter((asset) => asset.format === 'png' && asset.size)
  .map((asset) => ({
    src: asset.src,
    sizes: asset.size!,
    type: 'image/png',
    purpose: asset.fileName.includes('maskable') ? 'maskable' : 'any',
  }));
