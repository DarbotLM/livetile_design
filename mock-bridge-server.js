#!/usr/bin/env node
/**
 * Mock Bridge Server for viewport-grid.html
 *
 * Provides test data for all bridge API endpoints.
 * Run: node mock-bridge-server.js
 * Serves at: http://127.0.0.1:8090
 */

const http = require('http');
const url = require('url');

const PORT = 8090;
const HOST = '127.0.0.1';

// ========================================
// Mock Data
// ========================================

const startTime = Date.now();

function getHealth() {
  return {
    status: 'ok',
    version: '1.0.0',
    uptime: Math.floor((Date.now() - startTime) / 1000),
    timestamp: new Date().toISOString()
  };
}

function getProfiles() {
  return {
    profiles: [
      {
        id: 'profile-prod',
        name: 'Production',
        description: 'Production environment monitoring',
        createdAt: '2026-01-15T10:00:00Z',
        metadata: { region: 'us-east-1' }
      },
      {
        id: 'profile-staging',
        name: 'Staging',
        description: 'Staging environment testing',
        createdAt: '2026-02-01T14:00:00Z',
        metadata: { region: 'us-west-2' }
      },
      {
        id: 'profile-dev',
        name: 'Development',
        description: 'Local development context',
        createdAt: '2026-03-01T09:00:00Z',
        metadata: {}
      }
    ],
    activeProfileId: 'profile-prod'
  };
}

function getAgents() {
  const baseTime = Date.now();
  return {
    items: [
      {
        id: 'agent-code-review',
        name: 'Code Review Agent',
        type: 'reviewer',
        status: 'active',
        lastSeen: new Date(baseTime - 5000).toISOString(),
        metrics: { tasksCompleted: 156, avgResponseTime: 1250 }
      },
      {
        id: 'agent-test-gen',
        name: 'Test Generator',
        type: 'generator',
        status: 'active',
        lastSeen: new Date(baseTime - 12000).toISOString(),
        metrics: { tasksCompleted: 89, avgResponseTime: 2100 }
      },
      {
        id: 'agent-doc-writer',
        name: 'Documentation Writer',
        type: 'writer',
        status: 'idle',
        lastSeen: new Date(baseTime - 300000).toISOString(),
        metrics: { tasksCompleted: 42, avgResponseTime: 3500 }
      },
      {
        id: 'agent-security',
        name: 'Security Scanner',
        type: 'scanner',
        status: 'active',
        lastSeen: new Date(baseTime - 8000).toISOString(),
        metrics: { tasksCompleted: 234, avgResponseTime: 890 }
      },
      {
        id: 'agent-refactor',
        name: 'Refactoring Assistant',
        type: 'assistant',
        status: 'offline',
        lastSeen: new Date(baseTime - 3600000).toISOString(),
        metrics: { tasksCompleted: 67, avgResponseTime: 4200 }
      }
    ],
    total: 5
  };
}

function getStoreOverview() {
  return {
    totalSnapshots: 1250 + Math.floor(Math.random() * 10),
    avgResponseMs: 145 + Math.floor(Math.random() * 50),
    peakResponseMs: 892,
    profilesCount: 3,
    agentsCount: 5,
    lastUpdated: new Date().toISOString()
  };
}

function getEvalSummary() {
  return {
    byAgent: [
      {
        agentId: 'agent-code-review',
        agentName: 'Code Review Agent',
        evalCount: 156,
        passRate: 0.94,
        avgScore: 87.5,
        lastEval: new Date(Date.now() - 300000).toISOString()
      },
      {
        agentId: 'agent-test-gen',
        agentName: 'Test Generator',
        evalCount: 89,
        passRate: 0.91,
        avgScore: 82.3,
        lastEval: new Date(Date.now() - 600000).toISOString()
      },
      {
        agentId: 'agent-security',
        agentName: 'Security Scanner',
        evalCount: 234,
        passRate: 0.97,
        avgScore: 93.1,
        lastEval: new Date(Date.now() - 120000).toISOString()
      }
    ],
    totalEvals: 479,
    globalPassRate: 0.94
  };
}

function getActivity(limit = 18) {
  const activityTypes = ['task_completed', 'task_started', 'eval_run', 'profile_switch'];
  const agents = getAgents().items;
  const items = [];
  const now = Date.now();

  for (let i = 0; i < Math.min(limit, 20); i++) {
    const agent = agents[Math.floor(Math.random() * agents.length)];
    const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    items.push({
      id: `act-${String(i).padStart(3, '0')}`,
      type: type,
      agentId: agent.id,
      agentName: agent.name,
      summary: getSummaryForType(type, agent.name),
      timestamp: new Date(now - i * 60000 - Math.random() * 30000).toISOString(),
      metadata: {}
    });
  }

  return {
    items: items,
    total: 150
  };
}

function getSummaryForType(type, agentName) {
  const summaries = {
    task_completed: [
      'Reviewed PR #' + Math.floor(Math.random() * 500),
      'Generated test suite for UserService',
      'Completed security scan of auth module',
      'Refactored database queries',
      'Updated API documentation'
    ],
    task_started: [
      'Starting code review for feature branch',
      'Beginning test generation for new endpoint',
      'Initiating security audit',
      'Starting documentation update'
    ],
    eval_run: [
      'Evaluation completed with 94% pass rate',
      'Performance benchmark finished',
      'Quality check passed',
      'Regression tests completed'
    ],
    profile_switch: [
      'Switched to Production profile',
      'Activated Staging environment',
      'Changed to Development context'
    ]
  };
  const list = summaries[type] || ['Activity recorded'];
  return list[Math.floor(Math.random() * list.length)];
}

function getTimeline(agentId, limit = 20) {
  const eventTypes = ['inference', 'tool_call', 'memory_access', 'output'];
  const items = [];
  const now = Date.now();

  for (let i = 0; i < Math.min(limit, 30); i++) {
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    items.push({
      id: `evt-${String(i).padStart(3, '0')}`,
      type: type,
      summary: getTimelineSummary(type),
      timestamp: new Date(now - i * 45000 - Math.random() * 20000).toISOString(),
      durationMs: 500 + Math.floor(Math.random() * 2000),
      tokens: {
        input: 200 + Math.floor(Math.random() * 800),
        output: 50 + Math.floor(Math.random() * 300)
      }
    });
  }

  return {
    items: items,
    agentId: agentId,
    total: 45
  };
}

function getTimelineSummary(type) {
  const summaries = {
    inference: [
      'Generated code review feedback',
      'Analyzed code complexity',
      'Produced refactoring suggestions',
      'Created documentation draft'
    ],
    tool_call: [
      'Executed file search',
      'Ran test suite',
      'Invoked code formatter',
      'Called linter'
    ],
    memory_access: [
      'Retrieved project context',
      'Loaded conversation history',
      'Accessed code patterns DB',
      'Fetched user preferences'
    ],
    output: [
      'Sent review comments',
      'Published test results',
      'Delivered documentation',
      'Returned analysis'
    ]
  };
  const list = summaries[type] || ['Event recorded'];
  return list[Math.floor(Math.random() * list.length)];
}

// ========================================
// HTTP Server
// ========================================

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let response;
  let status = 200;

  try {
    if (path === '/health') {
      response = getHealth();
    } else if (path === '/profiles') {
      response = getProfiles();
    } else if (path === '/agents') {
      response = getAgents();
    } else if (path === '/store/overview') {
      response = getStoreOverview();
    } else if (path === '/eval/summary') {
      response = getEvalSummary();
    } else if (path === '/store/activity') {
      const limit = parseInt(query.limit) || 18;
      response = getActivity(limit);
    } else if (path.startsWith('/store/timeline/')) {
      const agentId = decodeURIComponent(path.replace('/store/timeline/', ''));
      const limit = parseInt(query.limit) || 20;
      response = getTimeline(agentId, limit);
    } else {
      status = 404;
      response = { error: 'Not found', path: path };
    }
  } catch (err) {
    status = 500;
    response = { error: err.message };
  }

  res.writeHead(status);
  res.end(JSON.stringify(response, null, 2));
});

server.listen(PORT, HOST, () => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║  Mock Bridge Server                                          ║
║  Serving viewport-grid.html test data                        ║
╠══════════════════════════════════════════════════════════════╣
║  URL: http://${HOST}:${PORT}                              ║
║                                                              ║
║  Endpoints:                                                  ║
║    GET /health           - Health check                      ║
║    GET /profiles         - Context profiles                  ║
║    GET /agents           - Agent list                        ║
║    GET /store/overview   - Store statistics                  ║
║    GET /eval/summary     - Evaluation summary                ║
║    GET /store/activity   - Activity stream                   ║
║    GET /store/timeline/:id - Agent timeline                  ║
║                                                              ║
║  Press Ctrl+C to stop                                        ║
╚══════════════════════════════════════════════════════════════╝
`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Error: Port ${PORT} is already in use`);
    process.exit(1);
  }
  throw err;
});
