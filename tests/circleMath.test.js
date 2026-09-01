import { Assert } from "./assert.js";
import { CircleMath } from "../assets/js/core/circleMath.js";

export function runCircleMathTests() {
  const results = [];

  const test = (name, fn) => {
    try {
      fn();
      results.push({ name, status: "PASSED" });
    } catch (err) {
      results.push({ name, status: "FAILED", error: err.message });
    }
  };

  test("CircleMath.computeFromRadius computes valid metrics for radius 10", () => {
    const metrics = CircleMath.computeFromRadius(10);
    Assert.assertEquals(metrics.diameter, 20, "Diameter calculation");
    Assert.assertCloseTo(
      metrics.circumference,
      62.8318,
      0.001,
      "Circumference calculation",
    );
    Assert.assertCloseTo(metrics.area, 314.159, 0.001, "Area calculation");
  });

  test("CircleMath.computeFromRadius throws error when given negative radius", () => {
    Assert.assertThrows(
      () => CircleMath.computeFromRadius(-5),
      "Negative radius boundary check",
    );
  });

  test("CircleMath.calculateArcLength calculates correct length for 90 degree arc", () => {
    const arc = CircleMath.calculateArcLength(10, 90);
    Assert.assertCloseTo(arc, 15.7079, 0.001, "90 degree arc length");
  });

  test("CircleMath.calculateSectorArea calculates correct sector area for 90 degrees", () => {
    const sector = CircleMath.calculateSectorArea(10, 90);
    Assert.assertCloseTo(sector, 78.5398, 0.001, "90 degree sector area");
  });

  return results;
}
