import type { LiveTileTheme } from '../shared/types';

const SIZES = [
  { value: 'auto', px: 32, description: 'Scale down to fit, never scale up.' },
  { value: 'stretch', px: 0, description: 'Scale both down and up to fit.' },
  { value: 'small', px: 20, description: 'Fixed small width.' },
  { value: 'medium', px: 32, description: 'Fixed medium width.' },
  { value: 'large', px: 48, description: 'Fixed large width.' },
] as const;

export function ImageSizeTile({ theme }: { theme: LiveTileTheme }) {
  return (
    <div>
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: theme.accentLight,
          marginBottom: 8,
        }}
      >
        ImageSize
      </div>
      <div style={{ fontSize: 8, color: theme.textSubtle, marginBottom: 10 }}>
        Controls the approximate size of the image. Aspect ratio is preserved.
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, marginBottom: 6 }}>
        {SIZES.filter((s) => s.value !== 'stretch').map((s) => (
          <div
            key={s.value}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              flex: 1,
            }}
          >
            <div
              style={{
                width: s.px,
                height: s.px,
                background: `${theme.accent}33`,
                border: `1px solid ${theme.accent}`,
                borderRadius: 4,
              }}
            />
            <div style={{ fontSize: 8, fontWeight: 700, color: theme.text }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          background: theme.emphasisBg,
          border: `1px solid ${theme.emphasisBorder}`,
          borderRadius: 6,
          padding: '6px 10px',
          marginTop: 4,
        }}
      >
        <div
          style={{
            width: '100%',
            height: 14,
            background: `${theme.accent}22`,
            border: `1px dashed ${theme.accent}`,
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 7,
            color: theme.accentLight,
            fontWeight: 600,
          }}
        >
          stretch (fills available width)
        </div>
      </div>
    </div>
  );
}
