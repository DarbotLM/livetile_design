# Viewport Grid Bridge API Contract

The viewport-grid.html UI polls a local bridge server at `http://127.0.0.1:8090` for real-time telemetry, agent state, and evaluation data.

## Overview

The bridge provides a REST-like JSON API that the viewport grid polls every 12 seconds. When the bridge is unavailable, the UI degrades gracefully showing "offline" status.

**Base URL**: `http://127.0.0.1:8090`

**Polling Interval**: 12 seconds

## Related source surfaces

The bridge is documented as a local runtime integration and is represented in the broader asset/coverage workflow:

| Surface | Purpose |
| --- | --- |
| `viewport-grid.html` | Static review UI that polls the bridge. |
| `lib\viewport-registry.js` | Standalone viewport/runbook/slot helper used by viewport-grid artifacts. |
| `lib\adaptive-slide-export.js` | Browser helper for projecting livetile DOM nodes into adaptive-slide-style JSON. |
| `src/tiles/galleryAssetCoverage.ts` | Registry for API/runtime assets and their tile coverage targets. |

## Endpoints

### GET /health

Health check endpoint indicating bridge status.

**Response**:
```json
{
  "status": "ok",
  "version": "1.0.0",
  "uptime": 3600,
  "timestamp": "2026-03-31T12:00:00Z"
}
```

**Fields**:
| Field | Type | Description |
|-------|------|-------------|
| status | "ok" \| "degraded" | Bridge health status |
| version | string | Bridge API version |
| uptime | number | Seconds since start |
| timestamp | string | ISO 8601 timestamp |

**Status Mapping**:
- `status: "ok"` → UI shows "online" (green)
- `status: "degraded"` → UI shows "degraded" (amber)
- Connection failure → UI shows "offline" (red)

---

### GET /profiles

Returns available context profiles and active profile.

**Response**:
```json
{
  "profiles": [
    {
      "id": "profile-001",
      "name": "Production",
      "description": "Production environment context",
      "createdAt": "2026-01-15T10:00:00Z",
      "metadata": {}
    }
  ],
  "activeProfileId": "profile-001"
}
```

**Fields**:
| Field | Type | Description |
|-------|------|-------------|
| profiles | array | List of profile objects |
| profiles[].id | string | Unique profile identifier |
| profiles[].name | string | Display name |
| profiles[].description | string | Profile description |
| profiles[].createdAt | string | ISO 8601 creation time |
| profiles[].metadata | object | Optional metadata |
| activeProfileId | string \| null | Currently active profile ID |

---

### GET /agents

Returns list of registered agents with their status.

**Response**:
```json
{
  "items": [
    {
      "id": "agent-001",
      "name": "Code Review Agent",
      "type": "reviewer",
      "status": "active",
      "lastSeen": "2026-03-31T11:59:00Z",
      "metrics": {
        "tasksCompleted": 42,
        "avgResponseTime": 1250
      }
    }
  ],
  "total": 1
}
```

**Fields**:
| Field | Type | Description |
|-------|------|-------------|
| items | array | List of agent objects |
| items[].id | string | Unique agent identifier |
| items[].name | string | Agent display name |
| items[].type | string | Agent type/category |
| items[].status | "active" \| "idle" \| "offline" | Current status |
| items[].lastSeen | string | Last activity timestamp |
| items[].metrics | object | Performance metrics |
| total | number | Total agent count |

---

### GET /store/overview

Returns unified store overview statistics.

**Response**:
```json
{
  "totalSnapshots": 1250,
  "avgResponseMs": 145,
  "peakResponseMs": 892,
  "profilesCount": 3,
  "agentsCount": 5,
  "lastUpdated": "2026-03-31T12:00:00Z"
}
```

**Fields**:
| Field | Type | Description |
|-------|------|-------------|
| totalSnapshots | number | Total monitoring snapshots |
| avgResponseMs | number | Average response time (ms) |
| peakResponseMs | number | Peak response time (ms) |
| profilesCount | number | Active profile count |
| agentsCount | number | Registered agent count |
| lastUpdated | string | ISO 8601 timestamp |

---

### GET /eval/summary

Returns evaluation summary statistics by agent.

**Response**:
```json
{
  "byAgent": [
    {
      "agentId": "agent-001",
      "agentName": "Code Review Agent",
      "evalCount": 156,
      "passRate": 0.94,
      "avgScore": 87.5,
      "lastEval": "2026-03-31T11:55:00Z"
    }
  ],
  "totalEvals": 500,
  "globalPassRate": 0.91
}
```

**Fields**:
| Field | Type | Description |
|-------|------|-------------|
| byAgent | array | Per-agent evaluation stats |
| byAgent[].agentId | string | Agent identifier |
| byAgent[].agentName | string | Agent display name |
| byAgent[].evalCount | number | Evaluations run |
| byAgent[].passRate | number | Pass rate 0-1 |
| byAgent[].avgScore | number | Average score 0-100 |
| byAgent[].lastEval | string | Last evaluation time |
| totalEvals | number | Global evaluation count |
| globalPassRate | number | Global pass rate 0-1 |

---

### GET /store/activity

Returns recent activity stream.

**Query Parameters**:
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| limit | number | 20 | Max items to return |

**Response**:
```json
{
  "items": [
    {
      "id": "act-001",
      "type": "task_completed",
      "agentId": "agent-001",
      "agentName": "Code Review Agent",
      "summary": "Reviewed PR #123",
      "timestamp": "2026-03-31T11:58:00Z",
      "metadata": {}
    }
  ],
  "total": 150
}
```

**Activity Types**:
- `task_completed` - Agent finished a task
- `task_started` - Agent began a task
- `error` - Error occurred
- `eval_run` - Evaluation executed
- `profile_switch` - Context profile changed

---

### GET /store/timeline/:agentId

Returns timeline of events for a specific agent.

**Path Parameters**:
| Param | Type | Description |
|-------|------|-------------|
| agentId | string | Agent identifier (URL encoded) |

**Query Parameters**:
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| limit | number | 20 | Max items to return |

**Response**:
```json
{
  "items": [
    {
      "id": "evt-001",
      "type": "inference",
      "summary": "Generated code review feedback",
      "timestamp": "2026-03-31T11:57:00Z",
      "durationMs": 1250,
      "tokens": {
        "input": 500,
        "output": 150
      }
    }
  ],
  "agentId": "agent-001",
  "total": 45
}
```

---

## Bridge State Structure

The viewport-grid.html maintains this internal state based on bridge responses:

```javascript
var bridgeState = {
  status: 'offline',       // 'online' | 'degraded' | 'offline' | 'loading'
  health: null,            // /health response
  profiles: null,          // /profiles response
  agents: null,            // /agents response
  overview: null,          // /store/overview response
  evalSummary: null,       // /eval/summary response
  activity: null,          // /store/activity response
  timeline: null,          // /store/timeline/:id response
  selectedAgentId: null,   // Currently selected agent for timeline
  lastUpdated: null,       // Timestamp of last successful poll
  lastError: ''            // Error message if any
};
```

## Viewport Registry Semantics

The viewport grid uses a "BD coordinate system" (Bitblock-based Design coordinates) where:

- **W (Width)**: Measured in "words" (4 characters each)
- **R (Row)**: Row height units

Tiles occupy slots defined as `WxR` (e.g., `2W x 4R` = 2 words wide, 4 rows tall).

Viewports (VP) are registered with:
- **VP ID**: Numeric identifier (e.g., VP4, VP8, VP16)
- **Grid Schema**: Defines tile slots and positions
- **Runbook**: Schedule of when tiles appear in a presentation flow

## Runbook Thread System

The runbook system orchestrates tile presentations across viewports:

```yaml
runbook:
  thread: accuracy        # Thread name
  schedule:
    - vp: 4
      role: introduces    # First appearance
    - vp: 8
      role: reinforces    # Repeat for retention
    - vp: 16
      role: recaps        # Summary appearance
```

Thread roles:
- `introduces` - First presentation of the concept
- `reinforces` - Repeated exposure for learning
- `recaps` - Summary/review context
- `deep-dive` - Detailed exploration

---

## Error Handling

The bridge should return appropriate HTTP status codes:

| Code | Meaning |
|------|---------|
| 200 | Success |
| 404 | Resource not found |
| 500 | Server error |

On connection failure or timeout, the UI sets `bridgeState.status = 'offline'`.
