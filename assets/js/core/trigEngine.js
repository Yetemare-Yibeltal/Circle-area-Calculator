/**
 * Trigonometric and Coordinate Conversion Utilities
 */
export class TrigEngine {
  /**
   * Convert Degrees to Radians
   * @param {number} deg
   * @returns {number} Radians
   */
  static degToRad(deg) {
    return (deg * Math.PI) / 180;
  }

  /**
   * Convert Radians to Degrees
   * @param {number} rad
   * @returns {number} Degrees
   */
  static radToDeg(rad) {
    return (rad * 180) / Math.PI;
  }

  /**
   * Get Cartesian coordinates on circle perimeter for a given angle
   * @param {number} cx Center X
   * @param {number} cy Center Y
   * @param {number} radius Circle radius
   * @param {number} angleDegrees Angle in degrees
   * @returns {{x: number, y: number}} Point coordinate
   */
  static getPointOnCircle(cx, cy, radius, angleDegrees) {
    const radians = this.degToRad(angleDegrees);
    return {
      x: cx + radius * Math.cos(radians),
      y: cy + radius * Math.sin(radians),
    };
  }

  /**
   * Compute central angle between two cartesian points on a circle
   * @param {number} cx Center X
   * @param {number} cy Center Y
   * @param {{x: number, y: number}} p1
   * @param {{x: number, y: number}} p2
   * @returns {number} Angle in degrees
   */
  static getAngleBetweenPoints(cx, cy, p1, p2) {
    const a1 = Math.atan2(p1.y - cy, p1.x - cx);
    const a2 = Math.atan2(p2.y - cy, p2.x - cx);
    let angle = this.radToDeg(a2 - a1);
    if (angle < 0) angle += 360;
    return angle;
  }
}
