import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const distDirectory = 'dist';
const indexPath = join(distDirectory, 'index.html');

function fail(message) {
  console.error(`Build smoke check failed: ${message}`);
  process.exit(1);
}

if (!existsSync(indexPath)) {
  fail('dist/index.html was not found. Run npm run build before npm run smoke.');
}

const html = readFileSync(indexPath, 'utf8');

if (!html.includes('<script') || !html.includes('</script>')) {
  fail('dist/index.html does not contain an inline script block.');
}

if (!html.includes('<style') || !html.includes('</style>')) {
  fail('dist/index.html does not contain an inline style block.');
}

if (/<script[^>]+src=["'][^"']+["']/i.test(html)) {
  fail('dist/index.html still references an external script asset.');
}

if (/<link[^>]+rel=["']stylesheet["'][^>]+href=["'][^"']+["']/i.test(html)) {
  fail('dist/index.html still references an external stylesheet asset.');
}

if (!html.includes('livetile design')) {
  fail('expected livetile design app marker was not found.');
}

if (!html.includes('Customer Success Analytics')) {
  fail('expected industry template content was not found.');
}

if (!html.includes('primary_icon')) {
  fail('expected livetile design app logo asset was not found.');
}

if (html.includes('Brand Asset Library')) {
  fail('app icon pack must not be exposed as gallery content.');
}

if (html.includes('LiveTile Design Studio')) {
  fail('old Studio branding was found.');
}

const emittedAssets = existsSync(distDirectory)
  ? readdirSync(distDirectory, { recursive: true }).map((entry) => String(entry).replaceAll('\\\\', '/'))
  : [];

const leftoverEntryAssets = emittedAssets.filter((entry) => /assets\/.+\.(js|css)$/.test(entry));

if (leftoverEntryAssets.length > 0) {
  fail(`unexpected JS/CSS asset files remained after single-file bundling: ${leftoverEntryAssets.join(', ')}`);
}

console.log('Build smoke check passed.');
