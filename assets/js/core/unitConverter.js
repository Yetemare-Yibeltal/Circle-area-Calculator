/**
 * Measurement System and Dimensional Unit Converter
 */
export class UnitConverter {
  static CONVERSION_RATES = {
    mm: 0.001,
    cm: 0.01,
    m: 1.0,
    km: 1000.0,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
  };

  /**
   * Convert linear distance between arbitrary units
   * @param {number} value
   * @param {string} fromUnit
   * @param {string} toUnit
   * @returns {number} Converted distance
   */
  static convertDistance(value, fromUnit, toUnit) {
    if (!this.CONVERSION_RATES[fromUnit] || !this.CONVERSION_RATES[toUnit]) {
      throw new Error(
        `Unsupported unit conversion from ${fromUnit} to ${toUnit}`,
      );
    }
    const meters = value * this.CONVERSION_RATES[fromUnit];
    return meters / this.CONVERSION_RATES[toUnit];
  }

  /**
   * Convert area measurement between square units
   * @param {number} value
   * @param {string} fromUnit
   * @param {string} toUnit
   * @returns {number} Converted area
   */
  static convertArea(value, fromUnit, toUnit) {
    const rateFrom = Math.pow(this.CONVERSION_RATES[fromUnit], 2);
    const rateTo = Math.pow(this.CONVERSION_RATES[toUnit], 2);
    const squareMeters = value * rateFrom;
    return squareMeters / rateTo;
  }
}
