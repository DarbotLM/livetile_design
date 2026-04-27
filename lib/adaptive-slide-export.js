/**
 * Adaptive Slide Export Module
 *
 * Converts BD viewport-grid livetiles to adaptive-slide format.
 * Supports exporting individual tiles, slides, and complete decks.
 *
 * @module adaptive-slide-export
 * @version 1.0.0
 * @requires viewport-registry
 */

(function(global) {
  'use strict';

  // ========================================
  // Constants
  // ========================================

  /**
   * Map BD tile slots to adaptive-slide grid positions
   */
  var SLOT_TO_GRID = {
    nano:   { columnSpan: 1, rowSpan: 1 },
    small:  { columnSpan: 2, rowSpan: 2 },
    medium: { columnSpan: 4, rowSpan: 4 },
    wide:   { columnSpan: 8, rowSpan: 4 },
    large:  { columnSpan: 8, rowSpan: 8 },
    xl:     { columnSpan: 12, rowSpan: 12 }
  };

  /**
   * Map BD runbook roles to adaptive-slide transitions
   */
  var ROLE_TO_TRANSITION = {
    introduces: 'fade',
    reinforces: 'slide-left',
    recaps: 'slide-up',
    rollup: 'zoom'
  };

  /**
   * Default slide background colors by page
   */
  var PAGE_BACKGROUNDS = {
    1: '#1a1a2e',
    2: '#120b1d',
    3: '#0a0a14',
    4: '#030312'
  };

  // ========================================
  // Livetile to Tile Converters
  // ========================================

  /**
   * Convert a livetile DOM element to adaptive tile
   * @param {HTMLElement} livetileEl - Livetile DOM element
   * @param {Object} options - Conversion options
   * @returns {Object} Adaptive tile object
   */
  function livetileToTile(livetileEl, options) {
    options = options || {};
    var tileId = livetileEl.id || generateId('tile');
    var titleEl = livetileEl.querySelector('.livetile-title');
    var valueEl = livetileEl.querySelector('.livetile-value');
    var unitEl = livetileEl.querySelector('.livetile-unit');
    var labelEl = livetileEl.querySelector('.livetile-label');
    var statusEl = livetileEl.querySelector('.livetile-status');

    // Determine tile type based on content
    var hasValue = valueEl && valueEl.textContent.trim();
    var hasStatus = statusEl;

    if (hasValue) {
      return createKPITile({
        id: tileId,
        title: titleEl ? titleEl.textContent.trim() : '',
        value: valueEl.textContent.trim(),
        unit: unitEl ? unitEl.textContent.trim() : '',
        label: labelEl ? labelEl.textContent.trim() : '',
        color: getComputedColor(livetileEl, '--tile-accent'),
        slot: detectSlot(livetileEl)
      });
    } else if (hasStatus) {
      return createStatusTile({
        id: tileId,
        title: titleEl ? titleEl.textContent.trim() : '',
        status: statusEl.dataset.status || 'online',
        slot: detectSlot(livetileEl)
      });
    } else {
      return createTextTile({
        id: tileId,
        title: titleEl ? titleEl.textContent.trim() : '',
        text: livetileEl.textContent.trim(),
        slot: detectSlot(livetileEl)
      });
    }
  }

  /**
   * Detect slot size from livetile classes
   * @param {HTMLElement} el - Livetile element
   * @returns {string} Slot name
   */
  function detectSlot(el) {
    var classList = el.className || '';
    if (classList.includes('tile--xl')) return 'xl';
    if (classList.includes('tile--large')) return 'large';
    if (classList.includes('tile--wide')) return 'wide';
    if (classList.includes('tile--medium')) return 'medium';
    if (classList.includes('tile--small')) return 'small';
    if (classList.includes('tile--nano')) return 'nano';
    // Default to small if no class found
    return 'small';
  }

  /**
   * Get computed CSS custom property value
   * @param {HTMLElement} el - Element
   * @param {string} prop - CSS property name
   * @returns {string} Property value
   */
  function getComputedColor(el, prop) {
    if (typeof getComputedStyle === 'undefined') return '#00d4ff';
    var style = getComputedStyle(el);
    return style.getPropertyValue(prop).trim() || '#00d4ff';
  }

  // ========================================
  // Tile Factory Functions
  // ========================================

  /**
   * Create a KPI (key performance indicator) tile
   * @param {Object} data - Tile data
   * @returns {Object} Adaptive tile
   */
  function createKPITile(data) {
    var gridPos = SLOT_TO_GRID[data.slot] || SLOT_TO_GRID.small;
    return {
      type: 'Container',
      id: data.id,
      style: 'emphasis',
      items: [
        {
          type: 'TextBlock',
          text: data.title,
          size: 'small',
          weight: 'bolder',
          color: 'accent',
          spacing: 'none'
        },
        {
          type: 'ColumnSet',
          spacing: 'small',
          columns: [
            {
              type: 'Column',
              width: 'auto',
              items: [
                {
                  type: 'TextBlock',
                  text: data.value,
                  size: 'extraLarge',
                  weight: 'bolder',
                  color: 'default',
                  spacing: 'none'
                }
              ]
            },
            {
              type: 'Column',
              width: 'stretch',
              verticalContentAlignment: 'bottom',
              items: [
                {
                  type: 'TextBlock',
                  text: data.unit,
                  size: 'small',
                  color: 'light',
                  spacing: 'none'
                }
              ]
            }
          ]
        },
        {
          type: 'TextBlock',
          text: data.label,
          size: 'small',
          color: 'light',
          spacing: 'small'
        }
      ],
      gridPosition: {
        column: 1,
        row: 1,
        columnSpan: gridPos.columnSpan,
        rowSpan: gridPos.rowSpan
      },
      selectAction: {
        type: 'Action.Submit',
        data: { tileId: data.id, action: 'select' }
      }
    };
  }

  /**
   * Create a status indicator tile
   * @param {Object} data - Tile data
   * @returns {Object} Adaptive tile
   */
  function createStatusTile(data) {
    var statusColors = {
      online: 'good',
      degraded: 'warning',
      offline: 'attention'
    };
    var statusLabels = {
      online: 'ONLINE',
      degraded: 'DEGRADED',
      offline: 'OFFLINE'
    };
    var gridPos = SLOT_TO_GRID[data.slot] || SLOT_TO_GRID.nano;

    return {
      type: 'Container',
      id: data.id,
      style: 'emphasis',
      items: [
        {
          type: 'TextBlock',
          text: data.title,
          size: 'small',
          weight: 'bolder',
          spacing: 'none'
        },
        {
          type: 'TextBlock',
          text: statusLabels[data.status] || data.status.toUpperCase(),
          size: 'medium',
          weight: 'bolder',
          color: statusColors[data.status] || 'default',
          spacing: 'small'
        }
      ],
      gridPosition: {
        column: 1,
        row: 1,
        columnSpan: gridPos.columnSpan,
        rowSpan: gridPos.rowSpan
      }
    };
  }

  /**
   * Create a text tile
   * @param {Object} data - Tile data
   * @returns {Object} Adaptive tile
   */
  function createTextTile(data) {
    var gridPos = SLOT_TO_GRID[data.slot] || SLOT_TO_GRID.medium;
    var items = [];

    if (data.title) {
      items.push({
        type: 'TextBlock',
        text: data.title,
        size: 'medium',
        weight: 'bolder',
        wrap: true
      });
    }

    if (data.text) {
      items.push({
        type: 'TextBlock',
        text: data.text,
        wrap: true,
        spacing: data.title ? 'small' : 'none'
      });
    }

    return {
      type: 'TextTile',
      id: data.id,
      body: items,
      gridPosition: {
        column: 1,
        row: 1,
        columnSpan: gridPos.columnSpan,
        rowSpan: gridPos.rowSpan
      }
    };
  }

  // ========================================
  // Slide Export
  // ========================================

  /**
   * Export a viewport page to an adaptive slide
   * @param {HTMLElement} pageEl - Page DOM element
   * @param {Object} vpEntry - Viewport registry entry
   * @param {Object} runbook - Runbook instance
   * @param {Object} options - Export options
   * @returns {Object} Adaptive slide
   */
  function pageToSlide(pageEl, vpEntry, runbook, options) {
    options = options || {};
    var pageNum = vpEntry ? vpEntry.pageNum : 1;
    var tiles = [];
    var livetiles = pageEl.querySelectorAll('.livetile');

    livetiles.forEach(function(lt, idx) {
      var tile = livetileToTile(lt, options);
      // Auto-position tiles in grid
      tile.gridPosition = tile.gridPosition || {};
      tile.gridPosition.column = (idx % 4) * 3 + 1;
      tile.gridPosition.row = Math.floor(idx / 4) * 3 + 1;
      tiles.push(tile);
    });

    // Determine transition from runbook role
    var transition = 'fade';
    if (runbook && vpEntry) {
      var threads = runbook.getThreadsForVP(pageNum);
      if (threads.length > 0) {
        var firstStop = threads[0].schedule.find(function(s) { return s.vp === pageNum; });
        if (firstStop) {
          transition = ROLE_TO_TRANSITION[firstStop.role] || 'fade';
        }
      }
    }

    return {
      type: 'AdaptiveSlide',
      id: vpEntry ? vpEntry.id : 'slide-' + pageNum,
      title: vpEntry ? vpEntry.name : 'Slide ' + pageNum,
      layout: {
        mode: 'grid',
        columns: 12,
        gap: 'default'
      },
      background: {
        color: PAGE_BACKGROUNDS[pageNum] || '#0a0a14'
      },
      transition: transition,
      body: tiles,
      actions: buildSlideActions(vpEntry)
    };
  }

  /**
   * Build navigation actions from viewport links
   * @param {Object} vpEntry - Viewport entry
   * @returns {Array} Action objects
   */
  function buildSlideActions(vpEntry) {
    var actions = [];

    if (!vpEntry) return actions;

    if (vpEntry.links.prev) {
      actions.push({
        type: 'Action.GoToSlide',
        title: 'Previous',
        targetSlideId: vpEntry.links.prev
      });
    }

    if (vpEntry.links.next) {
      actions.push({
        type: 'Action.GoToSlide',
        title: 'Next',
        targetSlideId: vpEntry.links.next
      });
    }

    if (vpEntry.links.left) {
      actions.push({
        type: 'Action.GoToSlide',
        title: 'Left',
        targetSlideId: vpEntry.links.left
      });
    }

    if (vpEntry.links.right) {
      actions.push({
        type: 'Action.GoToSlide',
        title: 'Right',
        targetSlideId: vpEntry.links.right
      });
    }

    return actions;
  }

  // ========================================
  // Deck Export
  // ========================================

  /**
   * Export all viewport pages to an adaptive deck
   * @param {Object} registry - ViewportRegistry instance
   * @param {Object} runbook - Runbook instance
   * @param {Object} options - Export options
   * @returns {Object} Adaptive deck
   */
  function exportDeck(registry, runbook, options) {
    options = options || {};
    var slides = [];
    var entries = registry.getAll();

    Object.keys(entries).sort(function(a, b) {
      return parseInt(a) - parseInt(b);
    }).forEach(function(pageNum) {
      var vpEntry = entries[pageNum];
      var pageEl = document.getElementById('page' + pageNum);
      if (pageEl) {
        slides.push(pageToSlide(pageEl, vpEntry, runbook, options));
      }
    });

    return {
      $schema: 'https://adaptive-slide.dev/schemas/deck.schema.json',
      type: 'AdaptiveDeck',
      id: options.deckId || 'deck-' + Date.now(),
      title: options.title || (runbook ? runbook.title : 'Exported Deck'),
      author: options.author || 'Viewport Grid Export',
      created: new Date().toISOString(),
      metadata: {
        source: 'viewport-grid',
        runbookId: runbook ? runbook.id : null,
        gridSize: registry._gridSize || 20
      },
      defaults: {
        layout: { mode: 'grid', columns: 12, gap: 'default' },
        transition: 'fade',
        background: { color: '#0a0a14' }
      },
      slides: slides
    };
  }

  /**
   * Export a single tile definition (without DOM)
   * @param {Object} tileDef - Tile definition object
   * @returns {Object} Adaptive tile
   */
  function exportTileDef(tileDef) {
    var slot = tileDef.slot || 'small';
    var gridPos = SLOT_TO_GRID[slot] || SLOT_TO_GRID.small;

    if (tileDef.type === 'kpi' || tileDef.value !== undefined) {
      return createKPITile({
        id: tileDef.id || generateId('tile'),
        title: tileDef.title || tileDef.label || '',
        value: String(tileDef.value || ''),
        unit: tileDef.unit || '',
        label: tileDef.description || '',
        color: tileDef.color || '#00d4ff',
        slot: slot
      });
    }

    if (tileDef.type === 'status' || tileDef.status !== undefined) {
      return createStatusTile({
        id: tileDef.id || generateId('tile'),
        title: tileDef.title || tileDef.label || '',
        status: tileDef.status || 'online',
        slot: slot
      });
    }

    return createTextTile({
      id: tileDef.id || generateId('tile'),
      title: tileDef.title || '',
      text: tileDef.text || tileDef.content || '',
      slot: slot
    });
  }

  // ========================================
  // Utility Functions
  // ========================================

  var _idCounter = 0;

  /**
   * Generate a unique ID
   * @param {string} prefix - ID prefix
   * @returns {string} Generated ID
   */
  function generateId(prefix) {
    return (prefix || 'id') + '-' + (++_idCounter) + '-' + Math.random().toString(36).substr(2, 6);
  }

  /**
   * Export to JSON string
   * @param {Object} deck - Deck object
   * @param {boolean} pretty - Pretty print
   * @returns {string} JSON string
   */
  function toJSON(deck, pretty) {
    return JSON.stringify(deck, null, pretty ? 2 : undefined);
  }

  /**
   * Download deck as JSON file
   * @param {Object} deck - Deck object
   * @param {string} filename - File name
   */
  function downloadDeck(deck, filename) {
    if (typeof document === 'undefined') return;
    filename = filename || 'deck-' + (deck.id || 'export') + '.json';
    var json = toJSON(deck, true);
    var blob = new Blob([json], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ========================================
  // Module Export
  // ========================================

  var AdaptiveSlideExport = {
    // Export functions
    livetileToTile: livetileToTile,
    pageToSlide: pageToSlide,
    exportDeck: exportDeck,
    exportTileDef: exportTileDef,

    // Tile factories
    createKPITile: createKPITile,
    createStatusTile: createStatusTile,
    createTextTile: createTextTile,

    // Utilities
    toJSON: toJSON,
    downloadDeck: downloadDeck,
    generateId: generateId,

    // Constants
    SLOT_TO_GRID: SLOT_TO_GRID,
    ROLE_TO_TRANSITION: ROLE_TO_TRANSITION,
    PAGE_BACKGROUNDS: PAGE_BACKGROUNDS,

    // Version
    version: '1.0.0'
  };

  // Export for different module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdaptiveSlideExport;
  } else if (typeof define === 'function' && define.amd) {
    define(function() { return AdaptiveSlideExport; });
  } else {
    global.AdaptiveSlideExport = AdaptiveSlideExport;
  }

})(typeof window !== 'undefined' ? window : this);
