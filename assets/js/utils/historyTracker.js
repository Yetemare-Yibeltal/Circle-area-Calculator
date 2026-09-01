/**
 * History Tracker for Storing and Restoring Prior Computations
 */
export class HistoryTracker {
  constructor(storageKey = "circle_engine_history", maxItems = 25) {
    this.storageKey = storageKey;
    this.maxItems = maxItems;
  }

  /**
   * Add new entry to history log
   * @param {Object} item Computation payload
   */
  record(item) {
    const history = this.getHistory();
    const entry = {
      id: Date.now().toString(36),
      timestamp: new Date().toISOString(),
      ...item,
    };

    history.unshift(entry);
    if (history.length > this.maxItems) {
      history.pop();
    }

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(history));
    } catch (e) {
      console.warn("Unable to save calculation history to LocalStorage:", e);
    }
  }

  /**
   * Read recorded calculations from persistent storage
   * @returns {Array} Array of past calculations
   */
  getHistory() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn("Failed to retrieve stored history log:", e);
      return [];
    }
  }

  /**
   * Purge all recorded computation entries
   */
  clear() {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (e) {
      console.warn("Failed to clear local history log:", e);
    }
  }
}
