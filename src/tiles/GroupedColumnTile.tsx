import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import type { GroupedColumnContent, LiveTileTheme } from '../shared/types';

interface GroupedColumnTileProps {
  content: GroupedColumnContent;
  theme: LiveTileTheme;
}

/**
 * Grouped Column Chart -- vertical multi-series columns with category grouping.
 * Adapted from Syncfusion EJ2 grouped-column pattern.
 * Each category shows N bars side-by-side, one per series, with distinct fills.
 */
export function GroupedColumnTile({ content, theme }: GroupedColumnTileProps): React.ReactElement {
  const seriesColors = [
    theme.accent,
    theme.accentLight,
    theme.goodLeft,
    theme.dangerLeft,
    theme.emphasisLeft,
  ];

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
            margin={{ top: 4, right: 4, left: -18, bottom: 0 }}
            barCategoryGap="20%"
            barGap={2}
          >
            <CartesianGrid
              strokeDasharray="2 2"
              stroke={theme.emphasisBorder}
              vertical={false}
            />
            <XAxis
              dataKey="category"
              tick={{ fill: theme.textSubtle, fontSize: 7 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: theme.textSubtle, fontSize: 7 }}
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
              labelStyle={{ color: theme.text, fontWeight: 600 }}
              itemStyle={{ color: theme.textMid }}
              cursor={{ fill: `${theme.accent}10` }}
            />
            <Legend
              iconType="square"
              iconSize={6}
              wrapperStyle={{ fontSize: 7, color: theme.textSubtle, paddingTop: 2 }}
            />
            {content.series.map((s, i) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.name}
                fill={s.color || seriesColors[i % seriesColors.length]}
                radius={[2, 2, 0, 0]}
                maxBarSize={18}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
