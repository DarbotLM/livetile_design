import type { LiveTileTheme } from '../shared/types';

export function FallbackOptionTile({ theme }: { theme: LiveTileTheme }) {
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
        FallbackOption
      </div>
      <div
        style={{
          background: theme.emphasisBg,
          border: `1px solid ${theme.emphasisBorder}`,
          borderLeft: `3px solid #f87171`,
          borderRadius: 8,
          padding: '14px 16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: '#f8717122',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              color: '#f87171',
              fontWeight: 800,
            }}
          >
            X
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: theme.text }}>drop</div>
        </div>
        <div style={{ fontSize: 9, color: theme.textSubtle, lineHeight: 1.5 }}>
          Causes this element to be dropped immediately when unknown elements are encountered.
          The unknown element does not bubble up any higher.
        </div>
        <div
          style={{
            marginTop: 10,
            padding: '4px 8px',
            background: '#f8717118',
            borderRadius: 4,
            fontSize: 8,
            color: '#f87171',
            fontWeight: 600,
            fontFamily: 'monospace',
          }}
        >
          fallback: "drop"
        </div>
      </div>
    </div>
  );
}
