import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import type { BarChartContent, LiveTileTheme } from '../shared/types';

interface BarChartTileProps {
  content: BarChartContent;
  theme: LiveTileTheme;
}

export function BarChartTile({ content, theme }: BarChartTileProps): React.ReactElement {
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
          <BarChart
            data={content.data}
            margin={{ top: 2, right: 4, left: -18, bottom: 0 }}
            barSize={14}
          >
            <CartesianGrid
              strokeDasharray="2 2"
              stroke={theme.emphasisBorder}
              vertical={false}
            />
            <XAxis
              dataKey="dim"
              tick={{ fill: theme.textSubtle, fontSize: 8 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[60, 100]}
              tick={{ fill: theme.textSubtle, fontSize: 8 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: theme.card,
                border: `1px solid ${theme.border}`,
                borderRadius: 4,
                fontSize: 9,
              }}
              labelStyle={{ color: theme.text }}
              itemStyle={{ color: theme.accentLight }}
            />
            <Bar
              dataKey="prev"
              fill={theme.emphasisBorder}
              radius={[2, 2, 0, 0]}
              name="Prev"
            />
            <Bar
              dataKey="score"
              fill={theme.accent}
              radius={[2, 2, 0, 0]}
              name="Current"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
