# Livetile Component Catalog

This catalog documents the livetile variants available in the viewport-grid design system. Each tile follows the BD coordinate system with slot dimensions in W (words) × R (rows).

## Size Reference

| Size Class | Slot | Pixels @96DPI | Use Case |
|------------|------|---------------|----------|
| Nano | 1W × 2R | 80 × 40 | Minimal indicator |
| Small | 2W × 4R | 160 × 80 | KPI badge |
| Medium | 4W × 8R | 320 × 160 | Standard tile |
| Wide | 8W × 8R | 640 × 160 | Status dashboard |
| Large | 8W × 16R | 640 × 320 | Detail panel |
| XL | 16W × 32R | 1280 × 640 | Full dashboard |

---

## Tile Catalog

### tile-a: AccuracyTile (Small: 2W × 4R)

**Purpose**: Displays model accuracy as a percentage KPI with threshold-based color coding.

**Visual Elements**:
- Large percentage value with trend indicator
- Color-coded by threshold (cyan/amber/red)
- Compact footprint for dashboard grids

**Data Contract**:
```typescript
interface AccuracyTileData {
  value: number;        // 0-100
  unit: "%";
  threshold: {
    warn: number;       // Default: 90
    critical: number;   // Default: 80
  };
  trend: "up" | "down" | "stable";
}
```

**Color States**:
| State | Condition | Color |
|-------|-----------|-------|
| Nominal | value >= warn | `#00d4ff` (cyan) |
| Warning | critical <= value < warn | `#f59e0b` (amber) |
| Critical | value < critical | `#ef4444` (red) |

**Runbook**: Thread `accuracy` - introduces@VP4, reinforces@VP8, recaps@VP16

---

### tile-b: EventsSecTile (Medium: 4W × 8R)

**Purpose**: Real-time throughput monitor with utilization bar.

**Visual Elements**:
- Current events/second value
- Utilization bar (% of peak)
- Time window selector
- Peak/baseline reference values

**Data Contract**:
```typescript
interface EventsSecTileData {
  value: number;       // Current events/sec
  peak: number;        // Peak observed
  baseline: number;    // Expected baseline
  window: "1m" | "5m" | "15m";
  history?: number[];  // Sparkline samples (max 60)
}
```

**Color States**:
| State | Condition | Color |
|-------|-----------|-------|
| Nominal | < 65% of peak | `#22c55e` (green) |
| Elevated | 65-85% of peak | `#f59e0b` (amber) |
| High Load | > 85% of peak | `#ef4444` (red) |

**Runbook**: Thread `events-sec` - introduces@VP4, reinforces@VP8

---

### tile-c: StatusTile (Wide: 8W × 8R)

**Purpose**: Multi-system status dashboard with individual system health.

**Visual Elements**:
- Overall status indicator (large)
- System-by-system breakdown with latency
- Last update timestamp
- Status dot indicators

**Data Contract**:
```typescript
type SystemStatus = "nominal" | "degraded" | "outage" | "maintenance";

interface StatusSystem {
  name: string;
  status: SystemStatus;
  latencyMs?: number;
}

interface StatusTileData {
  overall: SystemStatus;
  systems: StatusSystem[];
  updatedAt: string;  // ISO 8601
}
```

**Status Colors**:
| Status | Color | Description |
|--------|-------|-------------|
| nominal | `#22c55e` | All systems operational |
| degraded | `#f59e0b` | Partial functionality |
| outage | `#ef4444` | Service unavailable |
| maintenance | `#a855f7` | Planned downtime |

**Runbook**: Thread `status` - introduces@VP4

---

## Common CSS Classes

### Base Structure
```css
.livetile {
  position: relative;
  background: var(--surface-1);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.livetile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  border-bottom: 1px solid var(--border-subtle);
  background: rgba(0, 0, 0, 0.15);
}

.livetile-body {
  padding: 12px;
  height: calc(100% - 28px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.livetile-val {
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
}

.livetile-sub {
  font-size: 11px;
  color: var(--text-med);
}

.livetile-meta {
  font-size: 9px;
  color: rgba(0, 212, 255, 0.34);
  font-family: var(--font-mono);
}
```

### Size Modifiers
```css
.livetile--2w4r { width: 160px; height: 80px; }
.livetile--4w8r { width: 320px; height: 160px; }
.livetile--8w8r { width: 640px; height: 160px; }
.livetile--8w16r { width: 640px; height: 320px; }
.livetile--16w32r { width: 1280px; height: 640px; }
```

### Interactive States
```css
.livetile:hover {
  border-color: rgba(255, 255, 255, 0.16);
}

.livetile.dragging {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  z-index: 100;
}

.livetile.layer-0 {
  opacity: 0.04;
  pointer-events: none;
  filter: grayscale(1);
}
```

---

## Creating New Tiles

### Step 1: Define the Data Contract

```typescript
interface MyTileData {
  // Required fields
  primaryValue: number;

  // Optional fields
  secondaryValue?: number;
  status?: "ok" | "warning" | "error";
}
```

### Step 2: Choose Appropriate Slot Size

Consider:
- Amount of data to display
- Visual hierarchy requirements
- Dashboard grid constraints

### Step 3: Implement the Component

```tsx
export function MyTile({ data, locked }: TileProps<MyTileData>) {
  return (
    <div className="livetile livetile--4w8r">
      <div className="livetile-header">
        <span className="livetile-title">My Tile</span>
        <span className="livetile-bd">4W x 8R</span>
      </div>
      <div className="livetile-body">
        <div className="livetile-val">{data.primaryValue}</div>
        <div className="livetile-sub">Description</div>
      </div>
    </div>
  );
}
```

### Step 4: Add to TILE_MANIFEST

```javascript
'tile-my': {
  id: 'tile-my',
  label: 'My Tile',
  color: '#00d4ff',
  bdW: 4,
  bdR: 8,
  tsx: [...],
  json: {...},
  yaml: '...',
  md: '...'
}
```

### Step 5: Define Runbook Schedule

```yaml
runbook:
  thread: my-thread
  schedule:
    - vp: 4
      role: introduces
    - vp: 8
      role: reinforces
```

---

## Layer 0 (Semantic Index)

For LLM-readable tiles, add the `layer-0` class:

```html
<div class="livetile layer-0">
  <!-- Hidden from visual rendering -->
  <!-- Contains machine-readable metadata -->
</div>
```

Layer 0 tiles:
- Opacity reduced to 4%
- Greyscale filter applied
- Pointer events disabled
- Contain semantic annotations for AI consumption

---

## References

- [BD Coordinate System](./BD-COORDINATE-SYSTEM.md)
- [Design Tokens](../tokens/design-tokens.json)
- [Bridge API](./BRIDGE-API.md)
