import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import type { PieChartContent, LiveTileTheme } from '../shared/types';

interface PieChartTileProps {
  content: PieChartContent;
  theme: LiveTileTheme;
}

export function PieChartTile({ content, theme }: PieChartTileProps): React.ReactElement {
  const colors = [theme.accent, theme.accentLight, theme.emphasisLeft, theme.textSubtle];

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
          <PieChart>
            <Pie
              data={content.data}
              cx="50%"
              cy="48%"
              innerRadius="28%"
              outerRadius="55%"
              dataKey="value"
              paddingAngle={2}
            >
              {content.data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: theme.card,
                border: `1px solid ${theme.border}`,
                borderRadius: 4,
                fontSize: 9,
              }}
              itemStyle={{ color: theme.accentLight }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '3px 8px',
          justifyContent: 'center',
        }}
      >
        {content.data.map((d, i) => (
          <div
            key={i}
            style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 8 }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: 2,
                background: colors[i % colors.length],
                flexShrink: 0,
              }}
            />
            <span style={{ color: theme.textSubtle }}>{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
