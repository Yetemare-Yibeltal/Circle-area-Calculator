import { runCircleMathTests } from "./circleMath.test.js";
import { runUnitConverterTests } from "./unitConverter.test.js";

export function executeAllSuites() {
  const circleSuite = runCircleMathTests();
  const converterSuite = runUnitConverterTests();

  const summary = {
    total: circleSuite.length + converterSuite.length,
    passed: [...circleSuite, ...converterSuite].filter(
      (t) => t.status === "PASSED",
    ).length,
    failed: [...circleSuite, ...converterSuite].filter(
      (t) => t.status === "FAILED",
    ).length,
    details: [
      { suite: "Circle Mathematics", tests: circleSuite },
      { suite: "Unit Conversion Engine", tests: converterSuite },
    ],
  };

  return summary;
}
