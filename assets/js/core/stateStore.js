/**
 * Reactive State Store for Circle Engine Data Model
 */
export class StateStore {
  constructor(initialState = {}) {
    this.state = {
      radius: 100,
      angle: 90,
      unit: "px",
      theme: "dark",
      mode: "radius",
      history: [],
      ...initialState,
    };
    this.listeners = [];
  }

  /**
   * Subscribe to state change notifications
   * @param {Function} listener
   * @returns {Function} Unsubscribe callback
   */
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  /**
   * Retrieve current snapshot of state
   * @returns {Object} Immutable state copy
   */
  getState() {
    return { ...this.state };
  }

  /**
   * Update state and notify subscribers
   * @param {Object} partialState
   */
  setState(partialState) {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...partialState };
    this.notify(prevState);
  }

  /**
   * Notify registered listeners of state mutation
   * @param {Object} prevState
   */
  notify(prevState) {
    this.listeners.forEach((listener) => listener(this.state, prevState));
  }
}
