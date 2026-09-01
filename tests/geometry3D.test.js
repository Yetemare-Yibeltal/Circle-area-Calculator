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
import { Assert } from "./assert.js";
import { Geometry3D } from "../assets/js/core/geometry3D.js";

export function runGeometry3DTests() {
  const results = [];

  const test = (name, fn) => {
    try {
      fn();
      results.push({ name, status: "PASSED" });
    } catch (err) {
      results.push({ name, status: "FAILED", error: err.message });
    }
  };

  test("Geometry3D.computeSphere returns accurate volume for radius 5", () => {
    const sphere = Geometry3D.computeSphere(5);
    Assert.assertCloseTo(sphere.volume, 523.598, 0.001, "Sphere volume check");
    Assert.assertCloseTo(
      sphere.surfaceArea,
      314.159,
      0.001,
      "Sphere surface area check",
    );
  });

  return results;
}