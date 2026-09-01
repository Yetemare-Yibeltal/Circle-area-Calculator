/**
 * Core Mathematical Engine for Circle Computations
 */
export class CircleMath {
  /**
   * Compute full metrics suite for a given radius
   * @param {number} radius
   * @returns {Object} Calculated circle dimensions
   */
  static computeFromRadius(radius) {
    if (radius < 0) throw new Error("Radius cannot be negative");

    const diameter = radius * 2;
    const circumference = 2 * Math.PI * radius;
    const area = Math.PI * Math.pow(radius, 2);

    return {
      radius,
      diameter,
      circumference,
      area,
    };
  }

  /**
   * Compute arc length for a given central angle in degrees
   * @param {number} radius
   * @param {number} angleDegrees
   * @returns {number} Arc length
   */
  static calculateArcLength(radius, angleDegrees) {
    return (angleDegrees / 360) * (2 * Math.PI * radius);
  }

  /**
   * Compute sector area for a given central angle in degrees
   * @param {number} radius
   * @param {number} angleDegrees
   * @returns {number} Sector area
   */
  static calculateSectorArea(radius, angleDegrees) {
    return (angleDegrees / 360) * (Math.PI * Math.pow(radius, 2));
  }

  /**
   * Compute circular segment area given radius and central angle
   * @param {number} radius
   * @param {number} angleDegrees
   * @returns {number} Segment area
   */
  static calculateSegmentArea(radius, angleDegrees) {
    const rad = (angleDegrees * Math.PI) / 180;
    const sector = this.calculateSectorArea(radius, angleDegrees);
    const triangle = 0.5 * Math.pow(radius, 2) * Math.sin(rad);
    return sector - triangle;
  }
}
