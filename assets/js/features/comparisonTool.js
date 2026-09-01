/**
 * Comparative Delta Analytics for Dual Geometric Shapes
 */
export class ComparisonTool {
  /**
   * Compute comparative percentage and value variances between two shapes
   * @param {Object} metricsA Shape A dimensions
   * @param {Object} metricsB Shape B dimensions
   */
  static compareShapes(metricsA, metricsB) {
    const areaDelta = metricsB.area - metricsA.area;
    const areaRatio = metricsA.area > 0 ? (areaDelta / metricsA.area) * 100 : 0;

    const circumferenceDelta = metricsB.circumference - metricsA.circumference;
    const circumferenceRatio =
      metricsA.circumference > 0
        ? (circumferenceDelta / metricsA.circumference) * 100
        : 0;

    return {
      areaDelta,
      areaRatio,
      circumferenceDelta,
      circumferenceRatio,
    };
  }
}
