import { useState } from 'react';

type JsonInspectorProps = {
  data: unknown;
  title: string;
  accentColor?: string;
};

/** Syntax-highlighted JSON view with dark panel styling */
function JsonView({ data }: { data: unknown }) {
  const raw = JSON.stringify(data, null, 2);
  const html = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"([^"]+)":/g, '<span style="color:#60a5fa">"$1"</span>:')
    .replace(/: "([^"]+)"/g, ': <span style="color:#86efac">"$1"</span>')
    .replace(/: (\d+\.?\d*)/g, ': <span style="color:#fbbf24">$1</span>')
    .replace(/: (true|false|null)/g, ': <span style="color:#f87171">$1</span>');

  return (
    <pre
      style={{
        margin: 0,
        fontFamily: "'Cascadia Code','Fira Code',monospace",
        fontSize: '9.5px',
        lineHeight: 1.55,
        color: '#d4d4d8',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * JsonInspector — dark panel with toggle tabs and syntax-highlighted JSON.
 */
export function JsonInspector({ data, title, accentColor = '#60a5fa' }: JsonInspectorProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: 8,
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: accentColor,
          }}
        >
          {title}
        </div>

        <button
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Expand JSON' : 'Collapse JSON'}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.4)',
            cursor: 'pointer',
            fontSize: '10px',
            fontWeight: 700,
            padding: '0 4px',
            transition: 'color 120ms ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = accentColor; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
        >
          {collapsed ? '▸' : '▾'}
        </button>
      </div>

      {/* Content */}
      {!collapsed && (
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '8px 12px 12px',
          }}
        >
          <JsonView data={data} />
        </div>
      )}
    </div>
  );
}
