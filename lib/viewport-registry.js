/**
 * Viewport Registry Module
 *
 * Reusable module for managing BD (Bitblock Display) viewport registry,
 * runbook threads, and tile slot calculations.
 *
 * @module viewport-registry
 * @version 1.0.0
 */

(function(global) {
  'use strict';

  // ========================================
  // Constants
  // ========================================

  /**
   * Grid sizes mapping DPI to pixel values
   * @constant {Object}
   */
  var GRIDS = {
    15: { size: 15, theme: 'cyan',  dpi: 72,  accentColor: '#00d4ff' },
    20: { size: 20, theme: 'gold',  dpi: 96,  accentColor: '#f59e0b' },
    30: { size: 30, theme: 'green', dpi: 144, accentColor: '#22c55e' }
  };

  /**
   * Standard tile slot definitions (W x R)
   * W = word width (4 characters)
   * R = row height (1 grid unit)
   * @constant {Object}
   */
  var TILE_SLOTS = {
    nano:   { w: 1,  r: 2,  label: '1W×2R',   description: 'Minimal indicator' },
    small:  { w: 2,  r: 4,  label: '2W×4R',   description: 'KPI badge' },
    medium: { w: 4,  r: 8,  label: '4W×8R',   description: 'Standard tile' },
    wide:   { w: 8,  r: 8,  label: '8W×8R',   description: 'Status dashboard' },
    large:  { w: 8,  r: 16, label: '8W×16R',  description: 'Detail panel' },
    xl:     { w: 16, r: 32, label: '16W×32R', description: 'Full dashboard' }
  };

  /**
   * Word width in characters
   * @constant {number}
   */
  var WORD_WIDTH = 4;

  // ========================================
  // Viewport Registry
  // ========================================

  /**
   * Creates a new Viewport Registry instance
   * @constructor
   * @param {Object} options - Configuration options
   * @param {string} [options.schemaPrefix='bd-grid-schema'] - Prefix for VP IDs
   * @param {number} [options.gridSize=20] - Default grid size in pixels
   */
  function ViewportRegistry(options) {
    options = options || {};
    this._registry = {};
    this._schemaPrefix = options.schemaPrefix || 'bd-grid-schema';
    this._gridSize = options.gridSize || 20;
    this._pageNames = {};
    this._listeners = [];
  }

  /**
   * Slugify a string for use in VP IDs
   * @param {string} str - Input string
   * @returns {string} Slugified string
   */
  ViewportRegistry.prototype.slugify = function(str) {
    return str
      .toLowerCase()
      .replace(/card\s+\d+\s*--\s*/i, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  /**
   * Generate a viewport ID
   * @param {number} pageNum - Page number
   * @param {string} slug - Content slug
   * @returns {string} Viewport ID
   */
  ViewportRegistry.prototype.generateVPId = function(pageNum, slug) {
    return slug + '.vp' + pageNum;
  };

  /**
   * Initialize registry with page names
   * @param {Object} pageNames - Map of page numbers to names
   * @param {number} [totalPages=4] - Total number of pages
   */
  ViewportRegistry.prototype.init = function(pageNames, totalPages) {
    totalPages = totalPages || 4;
    this._pageNames = pageNames || {};

    for (var i = 1; i <= totalPages; i++) {
      var name = this._pageNames[i] || ('card-' + i);
      var slug = this.slugify(name);
      var prevSlug = i > 1 ? this.slugify(this._pageNames[i - 1] || 'card-' + (i - 1)) : null;
      var nextSlug = i < totalPages ? this.slugify(this._pageNames[i + 1] || 'card-' + (i + 1)) : null;

      this._registry[i] = {
        id: this.generateVPId(i, slug),
        slug: slug,
        pageNum: i,
        name: name,
        createdAt: null,
        hardened: false,
        origin: null,
        originTile: null,
        links: {
          prev: prevSlug ? this.generateVPId(i - 1, prevSlug) : null,
          next: nextSlug ? this.generateVPId(i + 1, nextSlug) : null,
          left: null,
          right: null,
          spawned: []
        }
      };
    }

    this._emit('init', { totalPages: totalPages });
  };

  /**
   * Register a dynamically spawned viewport
   * @param {number} pageNum - New page number
   * @param {number} originPageNum - Origin page number
   * @param {string} originTileLabel - Label of the tile that spawned this VP
   * @param {string} [direction='next'] - Link direction (prev, next, left, right)
   * @returns {Object} The new registry entry
   */
  ViewportRegistry.prototype.registerDynamic = function(pageNum, originPageNum, originTileLabel, direction) {
    direction = direction || 'next';
    var tileSlug = this.slugify(originTileLabel);
    var originEntry = this._registry[originPageNum];
    var originSlug = originEntry ? originEntry.slug : this.slugify('card-' + originPageNum);
    var shortOrigin = originSlug.split('-').slice(0, 2).join('-');
    var slug = tileSlug + '--from-' + shortOrigin;
    var id = this.generateVPId(pageNum, slug);

    this._pageNames[pageNum] = 'Card ' + pageNum + ' -- ' + originTileLabel;

    this._registry[pageNum] = {
      id: id,
      slug: slug,
      pageNum: pageNum,
      name: this._pageNames[pageNum],
      createdAt: Date.now(),
      hardened: false,
      origin: originEntry ? originEntry.id : null,
      originTile: originTileLabel,
      links: {
        prev: null,
        next: null,
        left: null,
        right: null,
        spawned: []
      }
    };

    // Update origin's links
    if (originEntry) {
      if (direction === 'next' && !originEntry.links.next) {
        originEntry.links.next = id;
      } else if (direction === 'prev' && !originEntry.links.prev) {
        originEntry.links.prev = id;
      } else if (direction === 'left' && !originEntry.links.left) {
        originEntry.links.left = id;
      } else if (direction === 'right' && !originEntry.links.right) {
        originEntry.links.right = id;
      }
      if (originEntry.links.spawned.indexOf(id) === -1) {
        originEntry.links.spawned.push(id);
      }
    }

    this._emit('register', { entry: this._registry[pageNum], origin: originEntry });
    return this._registry[pageNum];
  };

  /**
   * Get a viewport entry by page number
   * @param {number} pageNum - Page number
   * @returns {Object|null} Registry entry or null
   */
  ViewportRegistry.prototype.get = function(pageNum) {
    return this._registry[pageNum] || null;
  };

  /**
   * Get a viewport entry by VP ID
   * @param {string} vpId - Viewport ID
   * @returns {Object|null} Registry entry or null
   */
  ViewportRegistry.prototype.getById = function(vpId) {
    for (var k in this._registry) {
      if (this._registry[k].id === vpId) {
        return this._registry[k];
      }
    }
    return null;
  };

  /**
   * Get page number from VP ID
   * @param {string} vpId - Viewport ID
   * @returns {number|null} Page number or null
   */
  ViewportRegistry.prototype.getPageNum = function(vpId) {
    var entry = this.getById(vpId);
    return entry ? entry.pageNum : null;
  };

  /**
   * Set hardened state for all viewports
   * @param {boolean} hardened - Hardened state
   */
  ViewportRegistry.prototype.setAllHardened = function(hardened) {
    for (var k in this._registry) {
      this._registry[k].hardened = hardened;
    }
    this._emit('harden', { hardened: hardened });
  };

  /**
   * Get all registry entries
   * @returns {Object} All entries keyed by page number
   */
  ViewportRegistry.prototype.getAll = function() {
    return Object.assign({}, this._registry);
  };

  /**
   * Export registry as JSON
   * @returns {string} JSON string
   */
  ViewportRegistry.prototype.toJSON = function() {
    return JSON.stringify({
      schemaPrefix: this._schemaPrefix,
      gridSize: this._gridSize,
      pageNames: this._pageNames,
      registry: this._registry
    }, null, 2);
  };

  /**
   * Import registry from JSON
   * @param {string} json - JSON string
   */
  ViewportRegistry.prototype.fromJSON = function(json) {
    var data = JSON.parse(json);
    this._schemaPrefix = data.schemaPrefix || this._schemaPrefix;
    this._gridSize = data.gridSize || this._gridSize;
    this._pageNames = data.pageNames || {};
    this._registry = data.registry || {};
    this._emit('import', data);
  };

  /**
   * Add event listener
   * @param {string} event - Event name
   * @param {Function} callback - Callback function
   */
  ViewportRegistry.prototype.on = function(event, callback) {
    this._listeners.push({ event: event, callback: callback });
  };

  /**
   * Remove event listener
   * @param {string} event - Event name
   * @param {Function} callback - Callback function
   */
  ViewportRegistry.prototype.off = function(event, callback) {
    this._listeners = this._listeners.filter(function(l) {
      return !(l.event === event && l.callback === callback);
    });
  };

  /**
   * Emit event
   * @private
   */
  ViewportRegistry.prototype._emit = function(event, data) {
    this._listeners.forEach(function(l) {
      if (l.event === event) {
        l.callback(data);
      }
    });
  };

  // ========================================
  // Runbook Thread System
  // ========================================

  /**
   * Creates a new Runbook instance
   * @constructor
   * @param {Object} definition - Runbook definition
   */
  function Runbook(definition) {
    this.id = definition.id || 'runbook-' + Date.now();
    this.title = definition.title || 'Untitled Runbook';
    this.blocks = definition.blocks || [];
    this.threads = definition.threads || [];
  }

  /**
   * Get block for a viewport number
   * @param {number} vpNum - Viewport number
   * @returns {Object|null} Block definition or null
   */
  Runbook.prototype.getBlockForVP = function(vpNum) {
    for (var i = 0; i < this.blocks.length; i++) {
      var b = this.blocks[i];
      if (vpNum >= b.range[0] && vpNum <= b.range[1]) {
        return b;
      }
    }
    return null;
  };

  /**
   * Get threads scheduled for a viewport
   * @param {number} vpNum - Viewport number
   * @returns {Array} Array of thread definitions
   */
  Runbook.prototype.getThreadsForVP = function(vpNum) {
    return this.threads.filter(function(t) {
      return t.schedule.some(function(s) {
        return s.vp === vpNum;
      });
    });
  };

  /**
   * Get all viewport numbers where a thread appears
   * @param {string} threadId - Thread ID
   * @returns {Array<number>} Array of viewport numbers
   */
  Runbook.prototype.getVPsForThread = function(threadId) {
    var thread = this.threads.find(function(t) { return t.id === threadId; });
    if (!thread) return [];
    return thread.schedule.map(function(s) { return s.vp; });
  };

  /**
   * Get thread by ID
   * @param {string} threadId - Thread ID
   * @returns {Object|null} Thread definition or null
   */
  Runbook.prototype.getThread = function(threadId) {
    return this.threads.find(function(t) { return t.id === threadId; }) || null;
  };

  /**
   * Add a thread
   * @param {Object} thread - Thread definition
   */
  Runbook.prototype.addThread = function(thread) {
    if (!thread.id) thread.id = 'thread-' + Date.now();
    if (!thread.schedule) thread.schedule = [];
    this.threads.push(thread);
  };

  /**
   * Export runbook as JSON
   * @returns {string} JSON string
   */
  Runbook.prototype.toJSON = function() {
    return JSON.stringify({
      id: this.id,
      title: this.title,
      blocks: this.blocks,
      threads: this.threads
    }, null, 2);
  };

  /**
   * Create runbook from JSON
   * @static
   * @param {string} json - JSON string
   * @returns {Runbook} New Runbook instance
   */
  Runbook.fromJSON = function(json) {
    return new Runbook(JSON.parse(json));
  };

  /**
   * Default 4-8-16-32 block hierarchy
   * @static
   * @returns {Array} Default block definitions
   */
  Runbook.defaultBlocks = function() {
    return [
      { id: 'A', label: 'Foundation', range: [1, 4],   role: 'introduce',  rgb: '59,130,246' },
      { id: 'B', label: 'Develop',    range: [5, 8],   role: 'reinforce',  rgb: '168,85,247' },
      { id: 'C', label: 'Integrate',  range: [9, 16],  role: 'recap',      rgb: '20,184,166' },
      { id: 'D', label: 'Synthesize', range: [17, 32], role: 'rollup',     rgb: '245,158,11' }
    ];
  };

  // ========================================
  // Tile Slot Calculator
  // ========================================

  /**
   * Calculate pixel dimensions for a tile slot
   * @param {number|string} slotOrW - Slot name or width in words
   * @param {number} [r] - Height in rows (if slotOrW is width)
   * @param {number} [gridSize=20] - Grid size in pixels
   * @returns {Object} { width, height, label }
   */
  function calculateTileSize(slotOrW, r, gridSize) {
    gridSize = gridSize || 20;
    var w, slot;

    if (typeof slotOrW === 'string') {
      slot = TILE_SLOTS[slotOrW];
      if (!slot) {
        throw new Error('Unknown tile slot: ' + slotOrW);
      }
      w = slot.w;
      r = slot.r;
    } else {
      w = slotOrW;
    }

    return {
      width: w * WORD_WIDTH * gridSize,
      height: r * gridSize,
      label: w + 'W×' + r + 'R',
      slot: slot || null
    };
  }

  /**
   * Get grid info for a DPI value
   * @param {number} dpi - Display DPI
   * @returns {Object} Grid configuration
   */
  function getGridForDPI(dpi) {
    if (dpi <= 72) return GRIDS[15];
    if (dpi <= 96) return GRIDS[20];
    return GRIDS[30];
  }

  /**
   * Detect optimal grid size based on device pixel ratio
   * @returns {Object} Grid configuration
   */
  function detectOptimalGrid() {
    var dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;
    var dpi = Math.round(96 * dpr);
    return getGridForDPI(dpi);
  };

  // ========================================
  // Module Export
  // ========================================

  var ViewportRegistryModule = {
    // Classes
    ViewportRegistry: ViewportRegistry,
    Runbook: Runbook,

    // Constants
    GRIDS: GRIDS,
    TILE_SLOTS: TILE_SLOTS,
    WORD_WIDTH: WORD_WIDTH,

    // Utility functions
    calculateTileSize: calculateTileSize,
    getGridForDPI: getGridForDPI,
    detectOptimalGrid: detectOptimalGrid,

    // Version
    version: '1.0.0'
  };

  // Export for different module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ViewportRegistryModule;
  } else if (typeof define === 'function' && define.amd) {
    define(function() { return ViewportRegistryModule; });
  } else {
    global.ViewportRegistry = ViewportRegistryModule;
  }

})(typeof window !== 'undefined' ? window : this);
