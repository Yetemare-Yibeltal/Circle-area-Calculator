/**
 * Inscribed & Circumscribed Regular Polygon Calculations
 */
export class PolygonEngine {
  /**
   * Compute inscribed polygon metrics for a circle radius
   * @param {number} radius
   * @param {number} sides Number of polygon sides (>= 3)
   */
  static getInscribedPolygon(radius, sides) {
    if (sides < 3) throw new Error("Polygon must have at least 3 sides");
    const sideLength = 2 * radius * Math.sin(Math.PI / sides);
    const perimeter = sides * sideLength;
    const area =
      0.5 * sides * Math.pow(radius, 2) * Math.sin((2 * Math.PI) / sides);
    const apothem = radius * Math.cos(Math.PI / sides);

    return { sides, sideLength, perimeter, area, apothem };
  }

  /**
   * Compute circumscribed polygon metrics for a circle radius
   * @param {number} radius
   * @param {number} sides
   */
  static getCircumscribedPolygon(radius, sides) {
    if (sides < 3) throw new Error("Polygon must have at least 3 sides");
    const apothem = radius;
    const sideLength = 2 * radius * Math.tan(Math.PI / sides);
    const perimeter = sides * sideLength;
    const area = sides * Math.pow(radius, 2) * Math.tan(Math.PI / sides);

    return { sides, sideLength, perimeter, area, apothem };
  }
}
