import type { LiveTileTheme } from '../shared/types';

const ENUM_VALUES = [
  { value: 'default', family: 'inherit' },
  { value: 'monospace', family: 'monospace' },
] as const;

export function FontTypeTile({ theme }: { theme: LiveTileTheme }) {
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
        FontType
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {ENUM_VALUES.map((v) => (
          <div
            key={v.value}
            style={{
              flex: 1,
              background: theme.emphasisBg,
              border: `1px solid ${theme.emphasisBorder}`,
              borderRadius: 8,
              padding: '12px 14px',
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 700, color: theme.accentLight, marginBottom: 8 }}>
              {v.value}
            </div>
            <div
              style={{
                fontFamily: v.family,
                fontSize: 13,
                color: theme.text,
                lineHeight: 1.5,
              }}
            >
              AaBbCc 123
            </div>
            <div
              style={{
                fontFamily: v.family,
                fontSize: 9,
                color: theme.textSubtle,
                marginTop: 4,
                lineHeight: 1.4,
              }}
            >
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
