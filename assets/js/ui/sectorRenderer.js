/**
 * Graphics renderer for Arc, Sector, and Segment overlays
 */
export class SectorRenderer {
  /**
   * Render highlights for arc length and sector angle
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} cx Center X
   * @param {number} cy Center Y
   * @param {number} radius
   * @param {number} startAngleDegrees
   * @param {number} endAngleDegrees
   */
  static drawSector(ctx, cx, cy, radius, startAngleDegrees, endAngleDegrees) {
    const startRad = (startAngleDegrees * Math.PI) / 180;
    const endRad = (endAngleDegrees * Math.PI) / 180;

    ctx.save();

    // Draw Sector Wedge
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startRad, endRad);
    ctx.closePath();
    ctx.fillStyle = "rgba(234, 179, 8, 0.25)";
    ctx.fill();
    ctx.strokeStyle = "#eab308";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw Arc Line Highlight
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startRad, endRad);
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.restore();
  }
}
