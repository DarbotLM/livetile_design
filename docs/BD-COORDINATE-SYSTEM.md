# BD (Bitblock Display) Coordinate System

The BD coordinate system is a grid-based layout system for positioning adaptive tiles in viewport-grid presentations. It provides DPI-aware sizing with consistent semantic units across display densities.

## Core Concepts

### Units

| Unit | Name | Description |
|------|------|-------------|
| **W** | Word | Horizontal unit = 4 characters width |
| **R** | Row | Vertical unit = 1 row height |
| **BD** | Bitblock | The fundamental grid cell |

A tile's slot is expressed as `WxR` (e.g., `2W x 4R` = 2 words wide, 4 rows tall).

### DPI-Aware Grid Sizes

The system supports three grid sizes that map to common display densities:

| Grid Size | DPI | Theme Color | Use Case |
|-----------|-----|-------------|----------|
| 15px | 72 | Cyan (`#00d4ff`) | Low-DPI displays, legacy monitors |
| 20px | 96 | Gold (`#f59e0b`) | Standard displays (default) |
| 30px | 144 | Green (`#22c55e`) | High-DPI/Retina displays |

```javascript
var GRIDS = {
  15: { size: 15, theme: 'cyan',  dpi: 72 },
  20: { size: 20, theme: 'gold',  dpi: 96 },
  30: { size: 30, theme: 'green', dpi: 144 }
};
```

### Tile Slot Calculation

To calculate pixel dimensions for a tile:

```
Width  = W × 4 × gridSize
Height = R × gridSize
```

Example for a `2W x 4R` tile at 96 DPI (20px grid):
- Width: 2 × 4 × 20 = 160px
- Height: 4 × 20 = 80px

## Tile Size Categories

Standard tile sizes follow a naming convention:

| Size | Dimensions | Description |
|------|------------|-------------|
| Nano | 1W × 2R | Minimal indicator |
| Small | 2W × 4R | KPI badge |
| Medium | 4W × 8R | Standard tile |
| Large | 8W × 16R | Detail panel |
| XL | 16W × 32R | Full dashboard |

### Tile Manifest Structure

Each tile has a manifest defining its slot, data contract, and runbook schedule:

```yaml
tile:
  id: tile-a
  label: Accuracy
  slot:
    width: 2   # bitblock words (4ch each)
    height: 4  # bitblock rows
  color: "#00d4ff"
  vp: bd-grid-schema.vp4
  runbook:
    thread: accuracy
    schedule:
      - vp: 4
        role: introduces
      - vp: 8
        role: reinforces
      - vp: 16
        role: recaps
```

## Viewport Registry

Viewports are identified by numeric VP IDs that follow a doubling hierarchy:

| VP ID | Block Size | Role |
|-------|------------|------|
| VP4 | 4 blocks | Introduction |
| VP8 | 8 blocks | Reinforcement |
| VP16 | 16 blocks | Recap |
| VP32 | 32 blocks | Deep dive |

The Viewport Registry tracks:
- VP ID (e.g., `bd-grid-schema.vp4`)
- Navigation graph (which VP leads to which)
- Hardened status (locked/unlocked)

## Canvas Layers

The viewport grid uses a 4-layer canvas architecture:

| Layer | Z-Index | Purpose |
|-------|---------|---------|
| Grid Layer | 10 | Background coordinate grid |
| Frame Canvas | 50 | Decorative frame borders |
| Livetile Engine | 100 | Tile content rendering |
| Bridge Integration | 200 | Live data overlay |

## Runbook Thread System

Tiles are organized into "threads" that schedule their appearance across viewports:

```
Thread: accuracy
├── VP4: introduces (first exposure)
├── VP8: reinforces (repetition)
└── VP16: recaps (summary)
```

Thread roles:
- `introduces` - First presentation of a concept
- `reinforces` - Repeated exposure for retention
- `recaps` - Summary/review context
- `deep-dive` - Detailed exploration

### Doubling Block Hierarchy

The runbook system uses a 4-8-16-32 doubling pattern:
- 4 blocks = Quick overview
- 8 blocks = Standard detail
- 16 blocks = Extended content
- 32 blocks = Complete deep-dive

## Frame Gradients

Each page has a distinctive frame gradient for visual identification:

```javascript
var FRAMES = {
  1: { colors: [[0,'#2563eb'],[0.2,'#3b82f6'],[0.4,'#d4a017'],[0.55,'#f59e0b'],[0.75,'#16a34a'],[1,'#22c55e']] },
  2: { colors: [[0,'#f59e0b'],[0.2,'#f97316'],[0.4,'#d946ef'],[0.55,'#a855f7'],[0.8,'#e0e0e0'],[1,'#ffffff']] },
  3: { colors: [[0,'#f8fafc'],[0.28,'#dbe4f0'],[0.62,'#94a3b8'],[1,'#f8fafc']] },
  4: { colors: [[0,'#00d4ff'],[0.3,'#0ea5e9'],[0.65,'#0077b6'],[0.85,'#06b6d4'],[1,'#00d4ff']] }
};
```

## Layer 0 Semantic Index

Layer 0 is a hidden semantic layer designed for LLM consumption:
- Not rendered visually
- Contains machine-readable metadata
- Enables AI understanding of tile relationships
- Includes semantic tags and relationships

## Color Themes

The system uses semantic color tokens:

| Token | Hex | Usage |
|-------|-----|-------|
| `--accent-cyan` | `#00d4ff` | Primary accent, 72 DPI theme |
| `--accent-gold` | `#f59e0b` | Warning, 96 DPI theme |
| `--accent-green` | `#22c55e` | Success, 144 DPI theme |
| `--accent-violet` | `#a855f7` | Secondary accent |
| `--accent-red` | `#ef4444` | Error/critical |

## Integration with Adaptive Cards

BD coordinates map to Adaptive Card layouts:

```
BD Slot 2W x 4R → ColumnSet with 2 columns, height ~80px
BD Slot 4W x 8R → Container with minHeight: 160px
```

Tiles export to adaptive-slide format via the runbook projection system.

## Usage Example

```javascript
// Define a tile at 2W x 4R
const tile = {
  id: 'accuracy-kpi',
  slot: { width: 2, height: 4 },  // 2W x 4R
  viewport: 'bd-grid-schema.vp4',
  thread: 'accuracy',
  role: 'introduces'
};

// Calculate pixel dimensions at 96 DPI
const gridSize = 20;  // 96 DPI
const pixelWidth = tile.slot.width * 4 * gridSize;   // 160px
const pixelHeight = tile.slot.height * gridSize;     // 80px
```

## References

- `viewport-grid.html` - Full implementation (3300+ lines)
- `docs/BRIDGE-API.md` - Bridge API contract
- adaptive-slide schema - Presentation export format
