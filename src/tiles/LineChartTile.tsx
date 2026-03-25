import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import type { LineChartContent, LiveTileTheme } from '../shared/types';

interface LineChartTileProps {
  content: LineChartContent;
  theme: LiveTileTheme;
}

export function LineChartTile({ content, theme }: LineChartTileProps): React.ReactElement {
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
          <LineChart
            data={content.data}
            margin={{ top: 2, right: 8, left: -18, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="2 2" stroke={theme.emphasisBorder} />
            <XAxis
              dataKey="q"
              tick={{ fill: theme.textSubtle, fontSize: 8 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0.7, 1.0]}
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
              itemStyle={{ color: theme.accentLight }}
            />
            <Line
              type="monotone"
              dataKey="bic"
              stroke={theme.accent}
              strokeWidth={2}
              dot={{ fill: theme.accent, r: 3 }}
              name="BIC"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
