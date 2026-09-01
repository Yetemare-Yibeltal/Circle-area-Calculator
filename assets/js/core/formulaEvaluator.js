/**
 * Formula String Builder and LaTeX Expressions Generator
 */
export class FormulaEvaluator {
  /**
   * Format a mathematical equation with step-by-step substitution
   * @param {string} type
   * @param {number} radius
   * @param {number} [angle=360]
   * @returns {Object} LaTeX and plain text representations
   */
  static getStepByStepFormula(type, radius, angle = 360) {
    const r = radius.toFixed(2);

    switch (type) {
      case "area":
        return {
          latex: `A = \\pi r^2 = \\pi \\times ${r}^2`,
          plain: `A = π × ${r}² = ${(Math.PI * radius * radius).toFixed(2)}`,
        };
      case "circumference":
        return {
          latex: `C = 2\\pi r = 2 \\times \\pi \\times ${r}`,
          plain: `C = 2 × π × ${r} = ${(2 * Math.PI * radius).toFixed(2)}`,
        };
      case "sector":
        const sectorArea = ((angle / 360) * Math.PI * radius * radius).toFixed(
          2,
        );
        return {
          latex: `A_s = \\frac{\\theta}{360^\\circ} \\pi r^2 = \\frac{${angle}}{360} \\times \\pi \\times ${r}^2`,
          plain: `Sector Area = (${angle} / 360) × π × ${r}² = ${sectorArea}`,
        };
      default:
        throw new Error("Invalid formula type request");
    }
  }
}
