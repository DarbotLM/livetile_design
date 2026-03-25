import React from 'react';
import type { TableContent, LiveTileTheme } from '../shared/types';

type TableTileProps = { content: TableContent; theme: LiveTileTheme };

const F = { xs: '8px', sm: '9px' } as const;

export const TableTile: React.FC<TableTileProps> = ({ content, theme: t }) => {
  const colCount = content.columns.length;
  const gridCols = content.columns.map(() => '1fr').join(' ');

  return (
    <div
      style={{
        height: '100%',
        background: t.emphasisBg,
        border: `1px solid ${t.emphasisBorder}`,
        borderRadius: '5px',
        padding: '6px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          fontSize: F.xs,
          fontWeight: 700,
          color: t.accentLight,
          letterSpacing: '0.09em',
          textTransform: 'uppercase',
          marginBottom: '3px',
        }}
      >
        {content.title}
      </div>

      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          border: `1px solid ${t.tableBorder}`,
          borderRadius: '4px',
        }}
      >
        {/* Header row */}
        <div style={{ display: 'grid', gridTemplateColumns: gridCols, background: t.tableHeader }}>
          {content.columns.map((h) => (
            <div
              key={h}
              style={{
                padding: '3px 6px',
                fontSize: F.xs,
                fontWeight: 700,
                color: t.accentLight,
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {/* Data rows */}
        {content.rows.map((row, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: gridCols,
              background: i % 2 === 1 ? t.tableRow : 'transparent',
              borderTop: `1px solid ${t.tableBorder}`,
            }}
          >
            {row.slice(0, colCount).map((cell, j) => (
              <div
                key={j}
                style={{
                  padding: '3px 6px',
                  fontSize: F.xs,
                  color: j === 0 ? t.text : t.textMid,
                  fontWeight: j === 0 ? 700 : 400,
                  lineHeight: 1.25,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
