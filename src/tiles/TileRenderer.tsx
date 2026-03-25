import React from 'react';
import type { TileDefinition, LiveTileTheme, TileContentMap } from '../shared/types';
import { getDefaultContent } from '../shared/sample-data';
import { HeroTile } from './HeroTile';
import { AccentHeaderTile } from './AccentHeaderTile';
import { KpiTile } from './KpiTile';
import { BarChartTile } from './BarChartTile';
import { PieChartTile } from './PieChartTile';
import { LineChartTile } from './LineChartTile';
import { RadarChartTile } from './RadarChartTile';
import { StackedBarTile } from './StackedBarTile';
import { TableTile } from './TableTile';
import { FactSheetTile } from './FactSheetTile';
import { PipelineTile } from './PipelineTile';
import { StatusGridTile } from './StatusGridTile';
import { OverviewCardsTile } from './OverviewCardsTile';
import { MetaInfoTile } from './MetaInfoTile';
import { EmphasisTile } from './EmphasisTile';
import { CompareLeftTile } from './CompareLeftTile';
import { CompareRightTile } from './CompareRightTile';
import { StatBlockTile } from './StatBlockTile';
import { GroupedColumnTile } from './GroupedColumnTile';

type TileRendererProps = {
  tile: TileDefinition;
  theme: LiveTileTheme;
  kpiIndex: number;
  templateId?: string;
};

/**
 * Central tile router: resolves a TileDefinition to the appropriate
 * tile component with sample content + active theme.
 */
export function TileRenderer({ tile, theme, kpiIndex, templateId }: TileRendererProps): React.ReactElement | null {
  const content = getDefaultContent(tile.type, kpiIndex, templateId);

  const props = { theme };

  switch (tile.type) {
    case 'hero':
      return <HeroTile content={content as TileContentMap['hero']} {...props} />;
    case 'accent-header':
      return <AccentHeaderTile content={content as TileContentMap['accent-header']} {...props} />;
    case 'kpi':
      return <KpiTile content={content as TileContentMap['kpi']} {...props} />;
    case 'bar-chart':
      return <BarChartTile content={content as TileContentMap['bar-chart']} {...props} />;
    case 'pie-chart':
      return <PieChartTile content={content as TileContentMap['pie-chart']} {...props} />;
    case 'line-chart':
      return <LineChartTile content={content as TileContentMap['line-chart']} {...props} />;
    case 'radar-chart':
      return <RadarChartTile content={content as TileContentMap['radar-chart']} {...props} />;
    case 'stacked-bar':
      return <StackedBarTile content={content as TileContentMap['stacked-bar']} {...props} />;
    case 'table':
      return <TableTile content={content as TileContentMap['table']} {...props} />;
    case 'fact-sheet':
      return <FactSheetTile content={content as TileContentMap['fact-sheet']} {...props} />;
    case 'pipeline':
      return <PipelineTile content={content as TileContentMap['pipeline']} {...props} />;
    case 'status-grid':
      return <StatusGridTile content={content as TileContentMap['status-grid']} {...props} />;
    case 'overview-cards':
      return <OverviewCardsTile content={content as TileContentMap['overview-cards']} {...props} />;
    case 'meta-info':
      return <MetaInfoTile content={content as TileContentMap['meta-info']} {...props} />;
    case 'emphasis':
      return <EmphasisTile content={content as TileContentMap['emphasis']} {...props} />;
    case 'compare-left':
      return <CompareLeftTile content={content as TileContentMap['compare-left']} {...props} />;
    case 'compare-right':
      return <CompareRightTile content={content as TileContentMap['compare-right']} {...props} />;
    case 'stat-block':
      return <StatBlockTile content={content as TileContentMap['stat-block']} {...props} />;
    case 'grouped-column':
      return <GroupedColumnTile content={content as TileContentMap['grouped-column']} {...props} />;
    default:
      return null;
  }
}
