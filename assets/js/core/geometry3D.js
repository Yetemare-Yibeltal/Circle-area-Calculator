/**
 * 3D Geometry Surface Area & Volume Extrapolator
 */
export class Geometry3D {
  /**
   * Compute 3D Sphere calculations from radius
   * @param {number} radius
   */
  static computeSphere(radius) {
    const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
    const surfaceArea = 4 * Math.PI * Math.pow(radius, 2);
    return { volume, surfaceArea };
  }

  /**
   * Compute Cylinder calculations from circle radius and height
   * @param {number} radius
   * @param {number} height
   */
  static computeCylinder(radius, height) {
    const baseArea = Math.PI * Math.pow(radius, 2);
    const lateralArea = 2 * Math.PI * radius * height;
    const totalArea = 2 * baseArea + lateralArea;
    const volume = baseArea * height;

    return { baseArea, lateralArea, totalArea, volume };
  }

  /**
   * Compute Cone calculations from circle radius and height
   * @param {number} radius
   * @param {number} height
   */
  static computeCone(radius, height) {
    const slantHeight = Math.sqrt(Math.pow(radius, 2) + Math.pow(height, 2));
    const baseArea = Math.PI * Math.pow(radius, 2);
    const lateralArea = Math.PI * radius * slantHeight;
    const totalArea = baseArea + lateralArea;
    const volume = (1 / 3) * baseArea * height;

    return { slantHeight, baseArea, lateralArea, totalArea, volume };
  }
}
