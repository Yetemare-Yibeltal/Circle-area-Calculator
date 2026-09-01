/**
 * Animation loop manager for dynamic transition smoothing
 */
export class AnimationController {
  /**
   * @param {Function} updateCallback Frame render callback
   */
  constructor(updateCallback) {
    this.updateCallback = updateCallback;
    this.animating = false;
    this.currentValue = 0;
    this.targetValue = 0;
    this.lerpFactor = 0.1;
  }

  /**
   * Animate numeric value towards target smoothly
   * @param {number} target
   */
  animateTo(target) {
    this.targetValue = target;
    if (!this.animating) {
      this.animating = true;
      this.loop();
    }
  }

  /**
   * Core animation frame loop
   */
  loop() {
    if (!this.animating) return;

    const delta = this.targetValue - this.currentValue;
    if (Math.abs(delta) < 0.01) {
      this.currentValue = this.targetValue;
      this.updateCallback(this.currentValue);
      this.animating = false;
      return;
    }

    this.currentValue += delta * this.lerpFactor;
    this.updateCallback(this.currentValue);
    requestAnimationFrame(() => this.loop());
  }
}
