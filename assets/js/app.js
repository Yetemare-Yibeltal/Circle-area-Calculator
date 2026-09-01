/**
 * Application Core Bootstrapper & Event Integration
 */
import { StateStore } from "./core/stateStore.js";
import { CircleMath } from "./core/circleMath.js";
import { CanvasRenderer } from "./ui/canvasRenderer.js";
import { SectorRenderer } from "./ui/sectorRenderer.js";
import { MetricsDashboard } from "./ui/metricsDashboard.js";
import { ChartController } from "./ui/chartController.js";
import { ModalController } from "./ui/modalController.js";
import { PresetLoader } from "./utils/presetLoader.js";
import { HistoryTracker } from "./utils/historyTracker.js";
import { ExportEngine } from "./export/exportEngine.js";

class App {
  constructor() {
    this.store = new StateStore();
    this.history = new HistoryTracker();
    this.modal = new ModalController();

    this.initDOMReferences();
    this.initComponents();
    this.bindEvents();

    // Initial application state render
    this.render(this.store.getState());
  }

  initDOMReferences() {
    this.canvasEl = document.getElementById("geometryCanvas");
    this.metricsEl = document.getElementById("metricsDisplay");
    this.inputSection = document.getElementById("inputSection");
    this.presetSection = document.getElementById("presetSection");
    this.chartSection = document.getElementById("chartSection");
    this.themeToggleBtn = document.getElementById("themeToggle");
    this.exportBtn = document.getElementById("exportBtn");
    this.historyBtn = document.getElementById("historyBtn");
  }

  initComponents() {
    this.canvasRenderer = new CanvasRenderer(this.canvasEl);
    this.metricsDashboard = new MetricsDashboard(this.metricsEl);

    // Inject Chart Wrapper
    this.chartSection.innerHTML = `
            <div class="control-label">Area Scale Analytics</div>
            <div id="chartContainer" class="chart-container"></div>
        `;
    this.chartController = new ChartController(
      document.getElementById("chartContainer"),
    );

    // Inject Input Controls
    this.inputSection.innerHTML = `
            <div class="control-group">
                <label class="control-label" for="radiusInput">Radius Parameter</label>
                <div class="input-slider-wrapper">
                    <input type="range" id="radiusSlider" class="range-input" min="5" max="250" value="100">
                    <input type="number" id="radiusInput" value="100" min="1" max="500" style="width: 70px;">
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="angleSlider">Arc Angle (Degrees)</label>
                <div class="input-slider-wrapper">
                    <input type="range" id="angleSlider" class="range-input" min="1" max="360" value="90">
                    <span id="angleValueDisplay" style="font-family: monospace;">90°</span>
                </div>
            </div>
        `;

    // Inject Presets Controls
    const presets = PresetLoader.getPresets();
    let presetButtons = presets
      .map(
        (p) => `
            <button class="btn btn-secondary preset-btn" data-preset="${p.id}" style="margin-bottom: 0.5rem; width: 100%;">
                ${p.name}
            </button>
        `,
      )
      .join("");

    this.presetSection.innerHTML = `
            <div class="control-label" style="margin-bottom: 0.5rem;">Quick Presets</div>
            ${presetButtons}
        `;
  }

  bindEvents() {
    // Subscribe store listener
    this.store.subscribe((newState) => this.render(newState));

    // Slider & Numerical Input Binding
    const radiusSlider = document.getElementById("radiusSlider");
    const radiusInput = document.getElementById("radiusInput");
    const angleSlider = document.getElementById("angleSlider");
    const angleValueDisplay = document.getElementById("angleValueDisplay");

    const updateRadius = (val) => {
      const radius = Math.max(1, parseFloat(val) || 1);
      radiusSlider.value = radius;
      radiusInput.value = radius;
      this.store.setState({ radius });
      this.history.record({ radius, timestamp: new Date().toISOString() });
    };

    radiusSlider.addEventListener("input", (e) => updateRadius(e.target.value));
    radiusInput.addEventListener("change", (e) => updateRadius(e.target.value));

    angleSlider.addEventListener("input", (e) => {
      const angle = parseInt(e.target.value, 10);
      angleValueDisplay.textContent = `${angle}°`;
      this.store.setState({ angle });
    });

    // Theme Switcher Binding
    this.themeToggleBtn.addEventListener("click", () => {
      const currentTheme = this.store.getState().theme;
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      document.body.className = newTheme === "light" ? "theme-light" : "";
      this.store.setState({ theme: newTheme });
    });

    // Preset Selections Binding
    this.presetSection.addEventListener("click", (e) => {
      if (e.target.classList.contains("preset-btn")) {
        const presetId = e.target.getAttribute("data-preset");
        const preset = PresetLoader.getPresetById(presetId);
        if (preset) {
          updateRadius(preset.radius);
          angleSlider.value = preset.angle;
          angleValueDisplay.textContent = `${preset.angle}°`;
          this.store.setState({ angle: preset.angle, unit: preset.unit });
        }
      }
    });

    // Export Actions Binding
    this.exportBtn.addEventListener("click", () => {
      const { radius, unit } = this.store.getState();
      const metrics = CircleMath.computeFromRadius(radius);

      const exportMenuHtml = `
                <p style="margin-bottom: 1rem; color: var(--text-secondary);">Select preferred vector or raster output format:</p>
                <div style="display: flex; gap: 1rem;">
                    <button id="downloadPngBtn" class="btn btn-primary" style="flex: 1;">Export PNG Image</button>
                    <button id="downloadSvgBtn" class="btn btn-secondary" style="flex: 1;">Export SVG Vector</button>
                </div>
            `;
      this.modal.open("Export Calculation Output", exportMenuHtml);

      document
        .getElementById("downloadPngBtn")
        .addEventListener("click", () => {
          ExportEngine.exportToPNG(this.canvasEl);
          this.modal.close();
        });

      document
        .getElementById("downloadSvgBtn")
        .addEventListener("click", () => {
          ExportEngine.exportToSVG(metrics, unit);
          this.modal.close();
        });
    });

    // History Dialog Binding
    this.historyBtn.addEventListener("click", () => {
      const records = this.history.getHistory();
      const historyRows =
        records
          .map(
            (r) => `
                <div style="padding: 0.5rem 0; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between;">
                    <span>Radius: <strong>${r.radius}</strong></span>
                    <small style="color: var(--text-secondary);">${new Date(r.timestamp).toLocaleTimeString()}</small>
                </div>
            `,
          )
          .join("") ||
        '<p style="color: var(--text-secondary);">No history recorded yet.</p>';

      this.modal.open(
        "Calculation History",
        `<div style="max-height: 250px; overflow-y: auto;">${historyRows}</div>`,
      );
    });
  }

  render(state) {
    const { radius, angle, unit } = state;
    const metrics = CircleMath.computeFromRadius(radius);

    // Update Viewport Graphics
    this.canvasRenderer.clear();
    this.canvasRenderer.drawGrid();
    this.canvasRenderer.drawCircle(radius);

    if (angle < 360) {
      const cx = this.canvasRenderer.width / 2;
      const cy = this.canvasRenderer.height / 2;
      SectorRenderer.drawSector(
        this.canvasRenderer.ctx,
        cx,
        cy,
        radius,
        0,
        angle,
      );
    }

    // Update Dashboard Cards & Analytics
    this.metricsDashboard.update(metrics, unit);
    this.chartController.renderAreaCurve(radius);
  }
}

// Instantiate application when DOM is parsed
document.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
});
