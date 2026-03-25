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
import type { StackedBarContent, LiveTileTheme } from '../shared/types';

interface StackedBarTileProps {
  content: StackedBarContent;
  theme: LiveTileTheme;
}

export function StackedBarTile({ content, theme }: StackedBarTileProps): React.ReactElement {
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
            barSize={24}
          >
            <CartesianGrid
              strokeDasharray="2 2"
              stroke={theme.emphasisBorder}
              vertical={false}
            />
            <XAxis
              dataKey="q"
              tick={{ fill: theme.textSubtle, fontSize: 8 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
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
            />
            <Bar dataKey="pass" stackId="a" fill="#4ade80" name="Pass" />
            <Bar dataKey="warn" stackId="a" fill={theme.accent} name="Warn" />
            <Bar
              dataKey="fail"
              stackId="a"
              fill="#f87171"
              name="Fail"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
