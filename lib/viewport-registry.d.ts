/**
 * Type definitions for viewport-registry module
 * @module viewport-registry
 */

export interface GridConfig {
  size: number;
  theme: 'cyan' | 'gold' | 'green';
  dpi: number;
  accentColor: string;
}

export interface TileSlot {
  w: number;
  r: number;
  label: string;
  description: string;
}

export interface ViewportLinks {
  prev: string | null;
  next: string | null;
  left: string | null;
  right: string | null;
  spawned: string[];
}

export interface ViewportEntry {
  id: string;
  slug: string;
  pageNum: number;
  name: string;
  createdAt: number | null;
  hardened: boolean;
  origin: string | null;
  originTile: string | null;
  links: ViewportLinks;
}

export interface ViewportRegistryOptions {
  schemaPrefix?: string;
  gridSize?: number;
}

export interface ViewportRegistryExport {
  schemaPrefix: string;
  gridSize: number;
  pageNames: Record<number, string>;
  registry: Record<number, ViewportEntry>;
}

export type ViewportEventType = 'init' | 'register' | 'harden' | 'import';

export interface ViewportEventData {
  init: { totalPages: number };
  register: { entry: ViewportEntry; origin: ViewportEntry | null };
  harden: { hardened: boolean };
  import: ViewportRegistryExport;
}

export declare class ViewportRegistry {
  constructor(options?: ViewportRegistryOptions);

  slugify(str: string): string;
  generateVPId(pageNum: number, slug: string): string;
  init(pageNames?: Record<number, string>, totalPages?: number): void;
  registerDynamic(
    pageNum: number,
    originPageNum: number,
    originTileLabel: string,
    direction?: 'prev' | 'next' | 'left' | 'right'
  ): ViewportEntry;
  get(pageNum: number): ViewportEntry | null;
  getById(vpId: string): ViewportEntry | null;
  getPageNum(vpId: string): number | null;
  setAllHardened(hardened: boolean): void;
  getAll(): Record<number, ViewportEntry>;
  toJSON(): string;
  fromJSON(json: string): void;
  on<T extends ViewportEventType>(event: T, callback: (data: ViewportEventData[T]) => void): void;
  off<T extends ViewportEventType>(event: T, callback: (data: ViewportEventData[T]) => void): void;
}

export type RunbookRole = 'introduce' | 'reinforce' | 'recap' | 'rollup';

export interface RunbookBlock {
  id: string;
  label: string;
  range: [number, number];
  role: RunbookRole;
  rgb: string;
}

export interface ThreadScheduleStop {
  vp: number;
  role: 'introduces' | 'reinforces' | 'recaps' | 'rollup';
}

export interface RunbookThread {
  id: string;
  label: string;
  color: string;
  tileId?: string;
  schedule: ThreadScheduleStop[];
}

export interface RunbookDefinition {
  id?: string;
  title?: string;
  blocks?: RunbookBlock[];
  threads?: RunbookThread[];
}

export declare class Runbook {
  id: string;
  title: string;
  blocks: RunbookBlock[];
  threads: RunbookThread[];

  constructor(definition: RunbookDefinition);

  getBlockForVP(vpNum: number): RunbookBlock | null;
  getThreadsForVP(vpNum: number): RunbookThread[];
  getVPsForThread(threadId: string): number[];
  getThread(threadId: string): RunbookThread | null;
  addThread(thread: Partial<RunbookThread> & { label: string; color: string }): void;
  toJSON(): string;

  static fromJSON(json: string): Runbook;
  static defaultBlocks(): RunbookBlock[];
}

export interface TileSizeResult {
  width: number;
  height: number;
  label: string;
  slot: TileSlot | null;
}

export declare function calculateTileSize(
  slotOrW: keyof typeof TILE_SLOTS | number,
  r?: number,
  gridSize?: number
): TileSizeResult;

export declare function getGridForDPI(dpi: number): GridConfig;
export declare function detectOptimalGrid(): GridConfig;

export declare const GRIDS: Record<15 | 20 | 30, GridConfig>;
export declare const TILE_SLOTS: Record<'nano' | 'small' | 'medium' | 'large' | 'xl', TileSlot>;
export declare const WORD_WIDTH: 4;
export declare const version: string;
