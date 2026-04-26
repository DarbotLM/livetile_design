import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function rewriteInlinedAssetUrls(code: string, bundle: Record<string, unknown>, chunkFileName: string): string {
  const chunkDirectory = chunkFileName.includes('/')
    ? chunkFileName.slice(0, chunkFileName.lastIndexOf('/') + 1)
    : '';

  if (!chunkDirectory) {
    return code;
  }

  let rewrittenCode = code;

  for (const [fileName, output] of Object.entries(bundle)) {
    if (
      typeof output === 'object' &&
      output !== null &&
      'type' in output &&
      output.type === 'asset' &&
      fileName.startsWith(chunkDirectory)
    ) {
      const relativeAssetName = fileName.slice(chunkDirectory.length);
      const inlinedAssetPath = `./${fileName}`;
      const assetUrlPattern = new RegExp(
        `new URL\\((["'])${escapeRegExp(relativeAssetName)}\\1,\\s*import\\.meta\\.url\\)`,
        'g',
      );

      rewrittenCode = rewrittenCode.replace(
        assetUrlPattern,
        (_match, quote: string) => `new URL(${quote}${inlinedAssetPath}${quote},import.meta.url)`,
      );
    }
  }

  return rewrittenCode;
}

function singleFileHtml(): Plugin {
  return {
    name: 'single-file-html',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const htmlFileName = Object.keys(bundle).find(
        (fileName) => fileName.endsWith('.html') && bundle[fileName].type === 'asset',
      );

      if (!htmlFileName) {
        return;
      }

      const htmlAsset = bundle[htmlFileName];
      if (htmlAsset.type !== 'asset') {
        return;
      }

      let html = String(htmlAsset.source);

      for (const [fileName, output] of Object.entries(bundle)) {
        const assetPathPattern = `(?:\\.?/)?${escapeRegExp(fileName)}`;

        if (output.type === 'chunk') {
          const scriptTag = new RegExp(
            `<script([^>]*)src=["']${assetPathPattern}["']([^>]*)></script>`,
            'g',
          );
          const code = rewriteInlinedAssetUrls(output.code, bundle, fileName).replaceAll(
            '</script',
            '<\\/script',
          );
          const nextHtml = html.replace(
            scriptTag,
            (_match, beforeSrc: string, afterSrc: string) =>
              `<script${beforeSrc}${afterSrc}>\n${code}\n</script>`,
          );

          if (nextHtml !== html) {
            html = nextHtml;
            delete bundle[fileName];
          }
        }

        if (output.type === 'asset' && fileName.endsWith('.css')) {
          const styleTag = new RegExp(
            `<link([^>]*?)href=["']${assetPathPattern}["']([^>]*?)>`,
            'g',
          );
          const css = String(output.source).replaceAll('</style', '<\\/style');
          const nextHtml = html.replace(styleTag, () => `<style>\n${css}\n</style>`);

          if (nextHtml !== html) {
            html = nextHtml;
            delete bundle[fileName];
          }
        }
      }

      htmlAsset.source = html;
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), singleFileHtml()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
