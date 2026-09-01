/**
 * Canvas Render Loop FPS Counter & Execution Performance Profiler
 */
export class PerformanceProfiler {
  constructor() {
    this.fps = 0;
    this.frames = 0;
    this.lastTime = performance.now();
  }

  /**
   * Register render frame pass and recalculate FPS
   * @returns {number} Current frame rate
   */
  tick() {
    this.frames++;
    const now = performance.now();
    if (now - this.lastTime >= 1000) {
      this.fps = Math.round((this.frames * 1000) / (now - this.lastTime));
      this.frames = 0;
      this.lastTime = now;
    }
    return this.fps;
  }
}
