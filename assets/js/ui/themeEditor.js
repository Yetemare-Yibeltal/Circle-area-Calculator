/**
 * Real-time CSS Custom Property Color Theme Editor
 */
export class ThemeEditor {
  /**
   * Update runtime root CSS custom variable
   * @param {string} variableName CSS token key
   * @param {string} color Hex color code
   */
  static applyCustomColor(variableName, color) {
    document.documentElement.style.setProperty(`--${variableName}`, color);
  }

  /**
   * Reset themes to default CSS variables
   */
  static resetToDefault() {
    document.documentElement.removeAttribute("style");
  }
}
