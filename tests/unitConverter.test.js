import { Assert } from "./assert.js";
import { UnitConverter } from "../assets/js/core/unitConverter.js";

export function runUnitConverterTests() {
  const results = [];

  const test = (name, fn) => {
    try {
      fn();
      results.push({ name, status: "PASSED" });
    } catch (err) {
      results.push({ name, status: "FAILED", error: err.message });
    }
  };

  test("UnitConverter.convertDistance converts meters to centimeters correctly", () => {
    const result = UnitConverter.convertDistance(5, "m", "cm");
    Assert.assertEquals(result, 500, "5 meters to cm conversion");
  });

  test("UnitConverter.convertDistance converts inches to meters correctly", () => {
    const result = UnitConverter.convertDistance(10, "in", "m");
    Assert.assertCloseTo(
      result,
      0.254,
      0.0001,
      "10 inches to meters conversion",
    );
  });

  test("UnitConverter.convertArea converts square meters to square centimeters", () => {
    const result = UnitConverter.convertArea(2, "m", "cm");
    Assert.assertEquals(
      result,
      20000,
      "2 square meters to square cm conversion",
    );
  });

  test("UnitConverter throws error on unsupported measurement units", () => {
    Assert.assertThrows(
      () => UnitConverter.convertDistance(10, "invalid", "m"),
      "Invalid unit conversion handling",
    );
  });

  return results;
}
