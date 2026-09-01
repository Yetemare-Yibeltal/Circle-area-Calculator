/**
 * Pre-configured Geometric Test Profiles and Case Studies
 */
export const GEOMETRIC_PRESETS = [
  {
    id: "unit-circle",
    name: "Unit Circle",
    description: "Standard unit circle with radius equal to 1",
    radius: 1,
    angle: 360,
    unit: "m",
  },
  {
    id: "quarter-sector",
    name: "Quadrant Sector",
    description: "90-degree right angle circular quadrant",
    radius: 50,
    angle: 90,
    unit: "cm",
  },
  {
    id: "semicircle",
    name: "Semicircle Arc",
    description: "180-degree half circle calculations",
    radius: 75,
    angle: 180,
    unit: "mm",
  },
  {
    id: "standard-canvas",
    name: "Default Viewport",
    description: "Standard responsive canvas view preset",
    radius: 120,
    angle: 45,
    unit: "px",
  },
];

export class PresetLoader {
  /**
   * Fetch all available presets
   * @returns {Array} List of preset configurations
   */
  static getPresets() {
    return GEOMETRIC_PRESETS;
  }

  /**
   * Load preset configuration by identifier
   * @param {string} id
   * @returns {Object|null} Selected preset configuration
   */
  static getPresetById(id) {
    return GEOMETRIC_PRESETS.find((p) => p.id === id) || null;
  }
}
