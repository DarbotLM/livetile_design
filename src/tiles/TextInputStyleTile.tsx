import type { LiveTileTheme } from '../shared/types';

const INPUT_TYPES = [
  { value: 'text', placeholder: 'Enter text', version: null },
  { value: 'tel', placeholder: '+1 (555) 123-4567', version: null },
  { value: 'url', placeholder: 'https://example.com', version: null },
  { value: 'email', placeholder: 'user@domain.com', version: null },
  { value: 'password', placeholder: 'masked input', version: '1.5' },
] as const;

export function TextInputStyleTile({ theme }: { theme: LiveTileTheme }) {
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
        TextInputStyle
      </div>
      <div style={{ fontSize: 8, color: theme.textSubtle, marginBottom: 10 }}>
        Style hint for text input fields.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {INPUT_TYPES.map((t) => (
          <div
            key={t.value}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: theme.emphasisBg,
              border: `1px solid ${theme.emphasisBorder}`,
              borderRadius: 6,
              padding: '6px 10px',
            }}
          >
            <div
              style={{
                minWidth: 50,
                fontSize: 9,
                fontWeight: 700,
                color: theme.accentLight,
                fontFamily: 'monospace',
              }}
            >
              {t.value}
            </div>
            <div
              style={{
                flex: 1,
                height: 18,
                border: `1px solid ${theme.border}`,
                borderRadius: 3,
                background: `${theme.bg}88`,
                display: 'flex',
                alignItems: 'center',
                padding: '0 6px',
                fontSize: 8,
                color: theme.textSubtle,
                fontFamily: t.value === 'password' ? 'monospace' : 'inherit',
              }}
            >
              {t.value === 'password' ? '**********' : t.placeholder}
            </div>
            {t.version && (
              <div
                style={{
                  fontSize: 7,
                  color: theme.accentLight,
                  background: theme.pill,
                  border: `1px solid ${theme.pillBorder}`,
                  borderRadius: 100,
                  padding: '1px 5px',
                  fontWeight: 600,
                }}
              >
                v{t.version}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
