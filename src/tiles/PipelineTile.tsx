import React from 'react';
import type { PipelineContent, LiveTileTheme } from '../shared/types';

type PipelineTileProps = { content: PipelineContent; theme: LiveTileTheme };

const F = { xs: '8px' } as const;

const ArrowConnector: React.FC<{ color: string }> = ({ color }) => (
  <div style={{ width: '8px', height: '1px', background: color, flexShrink: 0 }}>
    <svg
      width="8"
      height="6"
      viewBox="0 0 8 6"
      style={{ marginTop: '-3px', marginLeft: '0px' }}
      fill="none"
    >
      <path
        d="M0 3h6M4 1l2 2-2 2"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

export const PipelineTile: React.FC<PipelineTileProps> = ({ content, theme: t }) => {
  return (
    <div
      style={{
        height: '100%',
        background: t.emphasisBg,
        border: `1px solid ${t.emphasisBorder}`,
        borderRadius: '5px',
        padding: '8px 10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
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
          display: 'flex',
          alignItems: 'center',
          gap: '0',
          marginTop: '4px',
          flexWrap: 'nowrap',
          overflow: 'hidden',
        }}
      >
        {content.steps.map((step, i) => {
          const completed = i < content.completedCount;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: completed ? t.accent : t.emphasisBorder,
                  border: `1px solid ${completed ? t.accent : t.emphasisBorder}`,
                  borderRadius: '3px',
                  padding: '4px 4px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '7.5px',
                    fontWeight: 700,
                    color: completed ? t.bg : t.textSubtle,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {step}
                </div>
              </div>
              {i < content.steps.length - 1 && <ArrowConnector color={t.emphasisBorder} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
