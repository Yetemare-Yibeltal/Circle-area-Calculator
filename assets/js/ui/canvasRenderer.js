/**
 * Interactive HTML5 Canvas Renderer & Graphics Engine
 */
export class CanvasRenderer {
  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.dpr = window.devicePixelRatio || 1;
    this.gridSize = 20;

    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  /**
   * Handle high-DPI canvas resizing
   */
  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  /**
   * Clear viewport canvas
   */
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  /**
   * Draw background Cartesian grid
   */
  drawGrid() {
    this.ctx.save();
    this.ctx.strokeStyle = "#1e293b";
    this.ctx.lineWidth = 1;

    for (let x = 0; x < this.width; x += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }

    for (let y = 0; y < this.height; y += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }
    this.ctx.restore();
  }

  /**
   * Draw target circle with radius and center indicators
   * @param {number} radius
   * @param {string} [color='#3b82f6']
   */
  drawCircle(radius, color = "#3b82f6") {
    const cx = this.width / 2;
    const cy = this.height / 2;

    this.ctx.save();

    // Draw Fill Glow
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = "rgba(59, 130, 246, 0.15)";
    this.ctx.fill();

    // Draw Perimeter Stroke
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 3;
    this.ctx.stroke();

    // Draw Center Point
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    this.ctx.fillStyle = "#f8fafc";
    this.ctx.fill();

    // Draw Radius Line Indicator
    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy);
    this.ctx.lineTo(cx + radius, cy);
    this.ctx.strokeStyle = "#94a3b8";
    this.ctx.setLineDash([4, 4]);
    this.ctx.stroke();

    this.ctx.restore();
  }
}
