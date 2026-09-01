/**
 * Lightweight Zero-Dependency Assertion Framework
 */
export class Assert {
  static assertEquals(actual, expected, message = "") {
    if (actual !== expected) {
      throw new Error(
        `Assertion Failed: ${message} (Expected: ${expected}, Got: ${actual})`,
      );
    }
  }

  static assertCloseTo(actual, expected, precision = 0.001, message = "") {
    if (Math.abs(actual - expected) > precision) {
      throw new Error(
        `Assertion Failed: ${message} (Expected ~${expected}, Got: ${actual})`,
      );
    }
  }

  static assertThrows(fn, message = "") {
    try {
      fn();
    } catch (e) {
      return;
    }
    throw new Error(
      `Assertion Failed: ${message} (Expected function to throw error)`,
    );
  }
}
