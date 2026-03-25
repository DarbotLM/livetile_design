import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  Tooltip,
} from 'recharts';
import type { RadarChartContent, LiveTileTheme } from '../shared/types';

interface RadarChartTileProps {
  content: RadarChartContent;
  theme: LiveTileTheme;
}

export function RadarChartTile({ content, theme }: RadarChartTileProps): React.ReactElement {
  return (
    <div
      style={{
        height: '100%',
        background: theme.emphasisBg,
        border: `1px solid ${theme.emphasisBorder}`,
        borderRadius: '5px',
        padding: '8px 6px 4px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          fontSize: '8px',
          fontWeight: 700,
          color: theme.accentLight,
          letterSpacing: '0.09em',
          textTransform: 'uppercase',
          marginBottom: '3px',
        }}
      >
        {content.title}
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            data={content.data}
            margin={{ top: 0, right: 14, left: 14, bottom: 0 }}
          >
            <PolarGrid stroke={theme.emphasisBorder} />
            <PolarAngleAxis
              dataKey="dim"
              tick={{ fill: theme.textSubtle, fontSize: 7 }}
            />
            <Radar
              dataKey="score"
              stroke={theme.accent}
              fill={theme.accent}
              fillOpacity={0.18}
              strokeWidth={1.5}
            />
            <Tooltip
              contentStyle={{
                background: theme.card,
                border: `1px solid ${theme.border}`,
                borderRadius: 4,
                fontSize: 9,
              }}
              itemStyle={{ color: theme.accentLight }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
