/**
 * Floating Dynamic Canvas Coordinate and Measurement Tooltip
 */
export class TooltipController {
  /**
   * @param {HTMLElement} parentWrapper Canvas container element
   */
  constructor(parentWrapper) {
    this.tooltip = document.createElement("div");
    this.tooltip.className = "canvas-tooltip hidden";
    parentWrapper.appendChild(this.tooltip);
  }

  /**
   * Position and display coordinate data
   * @param {number} x Mouse viewport X
   * @param {number} y Mouse viewport Y
   * @param {string} text Display value
   */
  show(x, y, text) {
    this.tooltip.textContent = text;
    this.tooltip.style.left = `${x}px`;
    this.tooltip.style.top = `${y}px`;
    this.tooltip.classList.remove("hidden");
  }

  /**
   * Hide active hover tooltip
   */
  hide() {
    this.tooltip.classList.add("hidden");
  }
}
