/**
 * Lightweight Canvas Charting Engine for Linear and Radial Dynamics
 */
export class ChartController {
  /**
   * @param {HTMLElement} containerElement
   */
  constructor(containerElement) {
    this.container = containerElement;
    this.canvas = document.createElement("canvas");
    this.canvas.className = "chart-canvas";
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.resize();
  }

  /**
   * Resize chart canvas viewport
   */
  resize() {
    const rect = this.container.getBoundingClientRect();
    this.width = rect.width || 300;
    this.height = rect.height || 180;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  /**
   * Render linear progression curve of Area vs Radius
   * @param {number} currentRadius
   */
  renderAreaCurve(currentRadius) {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const padding = 25;
    const graphWidth = this.width - padding * 2;
    const graphHeight = this.height - padding * 2;

    // Axes
    this.ctx.strokeStyle = "#334155";
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(padding, padding);
    this.ctx.lineTo(padding, this.height - padding);
    this.ctx.lineTo(this.width - padding, this.height - padding);
    this.ctx.stroke();

    // Area Curve
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#3b82f6";
    this.ctx.lineWidth = 2;

    const maxR = Math.max(150, currentRadius * 1.5);
    for (let r = 0; r <= maxR; r += 2) {
      const normX = r / maxR;
      const area = Math.PI * r * r;
      const maxArea = Math.PI * maxR * maxR;
      const normY = area / maxArea;

      const px = padding + normX * graphWidth;
      const py = this.height - padding - normY * graphHeight;

      if (r === 0) this.ctx.moveTo(px, py);
      else this.ctx.lineTo(px, py);
    }
    this.ctx.stroke();

    // Active Value Node
    const activeNormX = currentRadius / maxR;
    const activeArea = Math.PI * currentRadius * currentRadius;
    const activeMaxArea = Math.PI * maxR * maxR;
    const activeNormY = activeArea / activeMaxArea;

    const activePx = padding + activeNormX * graphWidth;
    const activePy = this.height - padding - activeNormY * graphHeight;

    this.ctx.beginPath();
    this.ctx.arc(activePx, activePy, 5, 0, Math.PI * 2);
    this.ctx.fillStyle = "#eab308";
    this.ctx.fill();
  }
}
