/**
 * Layer 0 Semantic Index Module
 *
 * Provides machine-readable semantic annotations for LLM consumption.
 * Layer 0 tiles are visually hidden but contain structured metadata
 * for AI understanding of tile relationships and context.
 *
 * @module layer0-semantic
 * @version 1.0.0
 */

(function(global) {
  'use strict';

  // ========================================
  // Constants
  // ========================================

  /**
   * Semantic annotation types
   */
  var ANNOTATION_TYPES = {
    METRIC: 'metric',
    STATUS: 'status',
    RELATIONSHIP: 'relationship',
    NAVIGATION: 'navigation',
    TEMPORAL: 'temporal',
    HIERARCHY: 'hierarchy',
    CONTEXT: 'context'
  };

  /**
   * Relationship types between tiles
   */
  var RELATIONSHIPS = {
    PARENT_OF: 'parentOf',
    CHILD_OF: 'childOf',
    SIBLING_OF: 'siblingOf',
    DEPENDS_ON: 'dependsOn',
    AFFECTS: 'affects',
    RELATED_TO: 'relatedTo',
    SUMMARIZES: 'summarizes',
    DETAILS: 'details'
  };

  /**
   * Context scopes
   */
  var SCOPES = {
    LOCAL: 'local',      // Within same viewport
    VIEWPORT: 'viewport', // Across viewports in same page
    GLOBAL: 'global',    // Across entire presentation
    THREAD: 'thread'     // Within runbook thread
  };

  // ========================================
  // Semantic Annotation Class
  // ========================================

  /**
   * Creates a semantic annotation
   * @constructor
   * @param {Object} config - Annotation configuration
   */
  function SemanticAnnotation(config) {
    this.id = config.id || generateId('anno');
    this.type = config.type || ANNOTATION_TYPES.CONTEXT;
    this.tileId = config.tileId;
    this.data = config.data || {};
    this.scope = config.scope || SCOPES.LOCAL;
    this.timestamp = config.timestamp || Date.now();
    this.version = config.version || 1;
  }

  /**
   * Serialize annotation to JSON-LD format
   * @returns {Object} JSON-LD object
   */
  SemanticAnnotation.prototype.toJSONLD = function() {
    return {
      '@context': 'https://darbotlabs.com/adaptive-design/layer0/context.jsonld',
      '@type': 'TileAnnotation',
      '@id': this.id,
      annotationType: this.type,
      target: this.tileId,
      data: this.data,
      scope: this.scope,
      created: new Date(this.timestamp).toISOString(),
      version: this.version
    };
  };

  /**
   * Serialize to HTML data attributes
   * @returns {Object} Data attribute map
   */
  SemanticAnnotation.prototype.toDataAttrs = function() {
    return {
      'data-semantic-id': this.id,
      'data-semantic-type': this.type,
      'data-semantic-scope': this.scope,
      'data-semantic-data': JSON.stringify(this.data)
    };
  };

  // ========================================
  // Metric Annotation
  // ========================================

  /**
   * Creates a metric annotation for KPI tiles
   * @param {Object} config - Metric configuration
   * @returns {SemanticAnnotation}
   */
  function createMetricAnnotation(config) {
    return new SemanticAnnotation({
      type: ANNOTATION_TYPES.METRIC,
      tileId: config.tileId,
      scope: config.scope || SCOPES.GLOBAL,
      data: {
        name: config.name,
        value: config.value,
        unit: config.unit || '',
        trend: config.trend || 'stable', // up, down, stable
        threshold: config.threshold || null,
        status: deriveStatus(config.value, config.threshold),
        source: config.source || 'unknown',
        refreshInterval: config.refreshInterval || null,
        lastUpdated: config.lastUpdated || Date.now(),
        historicalRange: config.historicalRange || null,
        semanticMeaning: config.semanticMeaning || config.name
      }
    });
  }

  /**
   * Derive status from value and threshold
   */
  function deriveStatus(value, threshold) {
    if (!threshold) return 'nominal';
    if (typeof value !== 'number') return 'unknown';
    if (threshold.critical !== undefined && value <= threshold.critical) return 'critical';
    if (threshold.warning !== undefined && value <= threshold.warning) return 'warning';
    if (threshold.target !== undefined && value >= threshold.target) return 'excellent';
    return 'nominal';
  }

  // ========================================
  // Status Annotation
  // ========================================

  /**
   * Creates a status annotation
   * @param {Object} config - Status configuration
   * @returns {SemanticAnnotation}
   */
  function createStatusAnnotation(config) {
    return new SemanticAnnotation({
      type: ANNOTATION_TYPES.STATUS,
      tileId: config.tileId,
      scope: config.scope || SCOPES.GLOBAL,
      data: {
        status: config.status, // online, degraded, offline, unknown
        entity: config.entity,
        entityType: config.entityType || 'service',
        uptime: config.uptime || null,
        lastCheck: config.lastCheck || Date.now(),
        checkInterval: config.checkInterval || 60000,
        incidents: config.incidents || [],
        dependencies: config.dependencies || [],
        severity: statusToSeverity(config.status)
      }
    });
  }

  function statusToSeverity(status) {
    switch (status) {
      case 'offline': return 'critical';
      case 'degraded': return 'warning';
      case 'online': return 'info';
      default: return 'unknown';
    }
  }

  // ========================================
  // Relationship Annotation
  // ========================================

  /**
   * Creates a relationship annotation between tiles
   * @param {Object} config - Relationship configuration
   * @returns {SemanticAnnotation}
   */
  function createRelationshipAnnotation(config) {
    return new SemanticAnnotation({
      type: ANNOTATION_TYPES.RELATIONSHIP,
      tileId: config.sourceTileId,
      scope: config.scope || SCOPES.VIEWPORT,
      data: {
        relationshipType: config.relationshipType,
        targetTileId: config.targetTileId,
        targetViewport: config.targetViewport || null,
        strength: config.strength || 1.0, // 0.0 - 1.0
        bidirectional: config.bidirectional || false,
        label: config.label || '',
        inference: config.inference || false // Was this auto-inferred?
      }
    });
  }

  // ========================================
  // Navigation Annotation
  // ========================================

  /**
   * Creates a navigation annotation
   * @param {Object} config - Navigation configuration
   * @returns {SemanticAnnotation}
   */
  function createNavigationAnnotation(config) {
    return new SemanticAnnotation({
      type: ANNOTATION_TYPES.NAVIGATION,
      tileId: config.tileId,
      scope: SCOPES.GLOBAL,
      data: {
        targetViewport: config.targetViewport,
        direction: config.direction, // next, prev, up, down, left, right
        trigger: config.trigger || 'click', // click, drag, scroll
        condition: config.condition || null, // Condition to enable navigation
        spawnsNewViewport: config.spawnsNewViewport || false,
        runbookThread: config.runbookThread || null,
        runbookRole: config.runbookRole || null
      }
    });
  }

  // ========================================
  // Temporal Annotation
  // ========================================

  /**
   * Creates a temporal annotation for time-based data
   * @param {Object} config - Temporal configuration
   * @returns {SemanticAnnotation}
   */
  function createTemporalAnnotation(config) {
    return new SemanticAnnotation({
      type: ANNOTATION_TYPES.TEMPORAL,
      tileId: config.tileId,
      scope: config.scope || SCOPES.LOCAL,
      data: {
        timeRange: config.timeRange, // { start, end }
        granularity: config.granularity, // minute, hour, day, week, month
        timezone: config.timezone || 'UTC',
        isRealtime: config.isRealtime || false,
        updateFrequency: config.updateFrequency || null,
        aggregation: config.aggregation || 'none' // sum, avg, min, max, count
      }
    });
  }

  // ========================================
  // Hierarchy Annotation
  // ========================================

  /**
   * Creates a hierarchy annotation
   * @param {Object} config - Hierarchy configuration
   * @returns {SemanticAnnotation}
   */
  function createHierarchyAnnotation(config) {
    return new SemanticAnnotation({
      type: ANNOTATION_TYPES.HIERARCHY,
      tileId: config.tileId,
      scope: config.scope || SCOPES.THREAD,
      data: {
        level: config.level, // 0 = root
        path: config.path || [], // Array of ancestor tile IDs
        children: config.children || [],
        isLeaf: config.isLeaf || false,
        isCollapsed: config.isCollapsed || false,
        domain: config.domain || 'default' // Logical grouping
      }
    });
  }

  // ========================================
  // Semantic Index
  // ========================================

  /**
   * Creates a Semantic Index for managing Layer 0 annotations
   * @constructor
   */
  function SemanticIndex() {
    this._annotations = {};
    this._tileIndex = {};   // tileId -> [annotationIds]
    this._typeIndex = {};   // type -> [annotationIds]
    this._relationshipGraph = {};
    this._version = 0;
  }

  /**
   * Add an annotation to the index
   * @param {SemanticAnnotation} annotation
   */
  SemanticIndex.prototype.add = function(annotation) {
    this._annotations[annotation.id] = annotation;
    this._version++;

    // Index by tile
    if (annotation.tileId) {
      if (!this._tileIndex[annotation.tileId]) {
        this._tileIndex[annotation.tileId] = [];
      }
      this._tileIndex[annotation.tileId].push(annotation.id);
    }

    // Index by type
    if (!this._typeIndex[annotation.type]) {
      this._typeIndex[annotation.type] = [];
    }
    this._typeIndex[annotation.type].push(annotation.id);

    // Build relationship graph
    if (annotation.type === ANNOTATION_TYPES.RELATIONSHIP) {
      var src = annotation.tileId;
      var tgt = annotation.data.targetTileId;
      if (!this._relationshipGraph[src]) this._relationshipGraph[src] = [];
      this._relationshipGraph[src].push({
        target: tgt,
        type: annotation.data.relationshipType,
        annotationId: annotation.id
      });
      if (annotation.data.bidirectional) {
        if (!this._relationshipGraph[tgt]) this._relationshipGraph[tgt] = [];
        this._relationshipGraph[tgt].push({
          target: src,
          type: reverseRelationship(annotation.data.relationshipType),
          annotationId: annotation.id
        });
      }
    }
  };

  function reverseRelationship(type) {
    switch (type) {
      case RELATIONSHIPS.PARENT_OF: return RELATIONSHIPS.CHILD_OF;
      case RELATIONSHIPS.CHILD_OF: return RELATIONSHIPS.PARENT_OF;
      case RELATIONSHIPS.SUMMARIZES: return RELATIONSHIPS.DETAILS;
      case RELATIONSHIPS.DETAILS: return RELATIONSHIPS.SUMMARIZES;
      default: return type;
    }
  }

  /**
   * Get all annotations for a tile
   * @param {string} tileId
   * @returns {Array<SemanticAnnotation>}
   */
  SemanticIndex.prototype.getForTile = function(tileId) {
    var ids = this._tileIndex[tileId] || [];
    var self = this;
    return ids.map(function(id) { return self._annotations[id]; });
  };

  /**
   * Get all annotations of a type
   * @param {string} type
   * @returns {Array<SemanticAnnotation>}
   */
  SemanticIndex.prototype.getByType = function(type) {
    var ids = this._typeIndex[type] || [];
    var self = this;
    return ids.map(function(id) { return self._annotations[id]; });
  };

  /**
   * Get related tiles
   * @param {string} tileId
   * @param {string} [relationshipType] - Filter by relationship type
   * @returns {Array<Object>} Related tile info
   */
  SemanticIndex.prototype.getRelated = function(tileId, relationshipType) {
    var edges = this._relationshipGraph[tileId] || [];
    if (relationshipType) {
      edges = edges.filter(function(e) { return e.type === relationshipType; });
    }
    return edges;
  };

  /**
   * Query annotations
   * @param {Object} query - Query criteria
   * @returns {Array<SemanticAnnotation>}
   */
  SemanticIndex.prototype.query = function(query) {
    var results = Object.values(this._annotations);

    if (query.type) {
      results = results.filter(function(a) { return a.type === query.type; });
    }
    if (query.scope) {
      results = results.filter(function(a) { return a.scope === query.scope; });
    }
    if (query.tileId) {
      results = results.filter(function(a) { return a.tileId === query.tileId; });
    }
    if (query.dataFilter) {
      results = results.filter(query.dataFilter);
    }

    return results;
  };

  /**
   * Export index as JSON-LD graph
   * @returns {Object} JSON-LD graph
   */
  SemanticIndex.prototype.toJSONLD = function() {
    var self = this;
    return {
      '@context': 'https://darbotlabs.com/adaptive-design/layer0/context.jsonld',
      '@type': 'SemanticIndex',
      version: this._version,
      created: new Date().toISOString(),
      annotations: Object.values(this._annotations).map(function(a) { return a.toJSONLD(); }),
      relationships: this._relationshipGraph
    };
  };

  /**
   * Export as LLM-friendly text summary
   * @returns {string}
   */
  SemanticIndex.prototype.toTextSummary = function() {
    var lines = [];
    lines.push('# Semantic Index Summary');
    lines.push('');

    // Metrics
    var metrics = this.getByType(ANNOTATION_TYPES.METRIC);
    if (metrics.length) {
      lines.push('## Metrics (' + metrics.length + ')');
      metrics.forEach(function(m) {
        lines.push('- ' + m.data.name + ': ' + m.data.value + ' ' + (m.data.unit || '') + ' (' + m.data.status + ')');
      });
      lines.push('');
    }

    // Status
    var statuses = this.getByType(ANNOTATION_TYPES.STATUS);
    if (statuses.length) {
      lines.push('## Status Indicators (' + statuses.length + ')');
      statuses.forEach(function(s) {
        lines.push('- ' + s.data.entity + ': ' + s.data.status);
      });
      lines.push('');
    }

    // Relationships
    var rels = this.getByType(ANNOTATION_TYPES.RELATIONSHIP);
    if (rels.length) {
      lines.push('## Relationships (' + rels.length + ')');
      rels.forEach(function(r) {
        lines.push('- ' + r.tileId + ' --[' + r.data.relationshipType + ']--> ' + r.data.targetTileId);
      });
      lines.push('');
    }

    return lines.join('\n');
  };

  /**
   * Import from JSON-LD
   * @param {Object} jsonld - JSON-LD graph
   */
  SemanticIndex.prototype.fromJSONLD = function(jsonld) {
    var self = this;
    if (jsonld.annotations) {
      jsonld.annotations.forEach(function(a) {
        self.add(new SemanticAnnotation({
          id: a['@id'],
          type: a.annotationType,
          tileId: a.target,
          data: a.data,
          scope: a.scope,
          timestamp: new Date(a.created).getTime(),
          version: a.version
        }));
      });
    }
  };

  // ========================================
  // DOM Integration
  // ========================================

  /**
   * Inject semantic annotations into DOM elements
   * @param {HTMLElement} container - Container element
   * @param {SemanticIndex} index - Semantic index
   */
  function injectSemanticDOM(container, index) {
    var tiles = container.querySelectorAll('.livetile');
    tiles.forEach(function(tile) {
      var tileId = tile.id;
      if (!tileId) return;

      var annotations = index.getForTile(tileId);
      if (annotations.length === 0) return;

      // Add layer-0 data container
      var layer0 = tile.querySelector('.layer-0-data');
      if (!layer0) {
        layer0 = document.createElement('div');
        layer0.className = 'layer-0-data';
        layer0.style.cssText = 'display:none;visibility:hidden;position:absolute;';
        tile.appendChild(layer0);
      }

      // Inject JSON-LD script
      var script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(annotations.map(function(a) { return a.toJSONLD(); }));
      layer0.appendChild(script);

      // Add data attributes to tile
      tile.setAttribute('data-semantic-count', annotations.length);
      tile.setAttribute('data-layer-0', 'true');
    });
  }

  /**
   * Extract semantic annotations from DOM
   * @param {HTMLElement} container - Container element
   * @returns {SemanticIndex}
   */
  function extractSemanticDOM(container) {
    var index = new SemanticIndex();
    var scripts = container.querySelectorAll('.layer-0-data script[type="application/ld+json"]');

    scripts.forEach(function(script) {
      try {
        var data = JSON.parse(script.textContent);
        if (Array.isArray(data)) {
          data.forEach(function(a) {
            index.add(new SemanticAnnotation({
              id: a['@id'],
              type: a.annotationType,
              tileId: a.target,
              data: a.data,
              scope: a.scope
            }));
          });
        }
      } catch (e) {
        console.warn('Failed to parse Layer 0 data:', e);
      }
    });

    return index;
  }

  // ========================================
  // Utility Functions
  // ========================================

  var _idCounter = 0;

  function generateId(prefix) {
    return (prefix || 'id') + '-' + (++_idCounter) + '-' + Math.random().toString(36).substr(2, 6);
  }

  // ========================================
  // Module Export
  // ========================================

  var Layer0Semantic = {
    // Classes
    SemanticAnnotation: SemanticAnnotation,
    SemanticIndex: SemanticIndex,

    // Annotation factories
    createMetricAnnotation: createMetricAnnotation,
    createStatusAnnotation: createStatusAnnotation,
    createRelationshipAnnotation: createRelationshipAnnotation,
    createNavigationAnnotation: createNavigationAnnotation,
    createTemporalAnnotation: createTemporalAnnotation,
    createHierarchyAnnotation: createHierarchyAnnotation,

    // DOM integration
    injectSemanticDOM: injectSemanticDOM,
    extractSemanticDOM: extractSemanticDOM,

    // Constants
    ANNOTATION_TYPES: ANNOTATION_TYPES,
    RELATIONSHIPS: RELATIONSHIPS,
    SCOPES: SCOPES,

    // Version
    version: '1.0.0'
  };

  // Export for different module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Layer0Semantic;
  } else if (typeof define === 'function' && define.amd) {
    define(function() { return Layer0Semantic; });
  } else {
    global.Layer0Semantic = Layer0Semantic;
  }

})(typeof window !== 'undefined' ? window : this);
