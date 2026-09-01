/**
 * Dynamic Dashboard Renderer for Analytical Circle Metrics
 */
export class MetricsDashboard {
  /**
   * @param {HTMLElement} containerElement Target DOM Node
   */
  constructor(containerElement) {
    this.container = containerElement;
  }

  /**
   * Update metric displays in real-time
   * @param {Object} metrics Computed circle metrics
   * @param {string} unit Selected unit of measure
   */
  update(metrics, unit = "px") {
    const { radius, diameter, circumference, area } = metrics;

    this.container.innerHTML = `
            <div class="metric-card">
                <div class="metric-label">Radius</div>
                <div class="metric-value">${radius.toFixed(2)} <small>${unit}</small></div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Diameter</div>
                <div class="metric-value">${diameter.toFixed(2)} <small>${unit}</small></div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Circumference</div>
                <div class="metric-value">${circumference.toFixed(2)} <small>${unit}</small></div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Area</div>
                <div class="metric-value">${area.toFixed(2)} <small>${unit}²</small></div>
            </div>
        `;
  }
}
