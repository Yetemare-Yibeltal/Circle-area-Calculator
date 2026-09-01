import { Assert } from "./assert.js";
import { PolygonEngine } from "../assets/js/core/polygonEngine.js";

export function runPolygonEngineTests() {
  const results = [];

  const test = (name, fn) => {
    try {
      fn();
      results.push({ name, status: "PASSED" });
    } catch (err) {
      results.push({ name, status: "FAILED", error: err.message });
    }
  };

  test("PolygonEngine.getInscribedPolygon calculates square inside radius 10", () => {
    const poly = PolygonEngine.getInscribedPolygon(10, 4);
    Assert.assertCloseTo(poly.sideLength, 14.142, 0.001, "Square side length");
    Assert.assertCloseTo(poly.area, 200, 0.001, "Square inscribed area");
  });

  test("PolygonEngine throws error for polygon with fewer than 3 sides", () => {
    Assert.assertThrows(
      () => PolygonEngine.getInscribedPolygon(10, 2),
      "Invalid sides boundary check",
    );
  });

  return results;
}
