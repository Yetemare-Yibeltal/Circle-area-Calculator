/**
 * Application Core Bootstrapper & Event Integration
 */
import { StateStore } from "./core/stateStore.js";
import { CircleMath } from "./core/circleMath.js";
import { PolygonEngine } from "./core/polygonEngine.js";
import { Geometry3D } from "./core/geometry3D.js";

import { CanvasRenderer } from "./ui/canvasRenderer.js";
import { SectorRenderer } from "./ui/sectorRenderer.js";
import { MetricsDashboard } from "./ui/metricsDashboard.js";
import { ChartController } from "./ui/chartController.js";
import { ModalController } from "./ui/modalController.js";
import { TooltipController } from "./ui/tooltipController.js";
import { ThemeEditor } from "./ui/themeEditor.js";
import { AudioSynthesizer } from "./ui/audioSynthesizer.js";

import { CollisionEngine } from "./physics/collisionEngine.js";
import { PerformanceProfiler } from "./features/performanceProfiler.js";
import { ComparisonTool } from "./features/comparisonTool.js";

import { PresetLoader } from "./utils/presetLoader.js";
import { HistoryTracker } from "./utils/historyTracker.js";

import { ExportEngine } from "./export/exportEngine.js";
import { PDFExporter } from "./export/pdfExporter.js";
import { CSVExporter } from "./export/csvExporter.js";

class App {
  constructor() {
    this.store = new StateStore();
    this.history = new HistoryTracker();
    this.modal = new ModalController();
    this.profiler = new PerformanceProfiler();
    this.audioSynth = new AudioSynthesizer();
    this.physicsEnabled = false;

    this.initDOMReferences();
    this.initComponents();
    this.bindEvents();
    this.startRenderLoop();

    this.render(this.store.getState());
  }

  initDOMReferences() {
    this.canvasEl = document.getElementById("geometryCanvas");
    this.canvasContainer = document.getElementById("canvasContainer");
    this.metricsEl = document.getElementById("metricsDisplay");
    this.polygonEl = document.getElementById("polygonDisplay");
    this.geometry3dEl = document.getElementById("geometry3dDisplay");
    this.inputSection = document.getElementById("inputSection");
    this.presetSection = document.getElementById("presetSection");
    this.chartSection = document.getElementById("chartSection");
    this.themeToggleBtn = document.getElementById("themeToggle");
    this.customThemeBtn = document.getElementById("customThemeBtn");
    this.exportBtn = document.getElementById("exportBtn");
    this.historyBtn = document.getElementById("historyBtn");
    this.fpsCounterEl = document.getElementById("fpsCounter");
    this.cursorCoordsEl = document.getElementById("cursorCoords");
    this.toggleParticlesBtn = document.getElementById("toggleParticlesBtn");
  }

  initComponents() {
    this.canvasRenderer = new CanvasRenderer(this.canvasEl);
    this.metricsDashboard = new MetricsDashboard(this.metricsEl);
    this.tooltip = new TooltipController(this.canvasContainer);

    // Inject Chart Canvas Wrapper
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
                    <input type="range" id="radiusSlider" class="range-input" min="5" max="200" value="100">
                    <input type="number" id="radiusInput" value="100" min="1" max="400" style="width: 70px;">
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="angleSlider">Arc Angle (Degrees)</label>
                <div class="input-slider-wrapper">
                    <input type="range" id="angleSlider" class="range-input" min="1" max="360" value="90">
                    <span id="angleValueDisplay" style="font-family: monospace;">90°</span>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="polygonSidesInput">Polygon Sides (Inscribed)</label>
                <input type="number" id="polygonSidesInput" value="6" min="3" max="32">
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

    // Physics Engine setup
    this.collisionEngine = new CollisionEngine(100, {
      x: this.canvasRenderer.width / 2,
      y: this.canvasRenderer.height / 2,
    });
    for (let i = 0; i < 12; i++) {
      this.collisionEngine.addParticle(
        this.canvasRenderer.width / 2 + (Math.random() * 40 - 20),
        this.canvasRenderer.height / 2 + (Math.random() * 40 - 20),
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
      );
    }
  }

  bindEvents() {
    this.store.subscribe((newState) => this.render(newState));

    const radiusSlider = document.getElementById("radiusSlider");
    const radiusInput = document.getElementById("radiusInput");
    const angleSlider = document.getElementById("angleSlider");
    const angleValueDisplay = document.getElementById("angleValueDisplay");
    const polygonSidesInput = document.getElementById("polygonSidesInput");

    const updateRadius = (val) => {
      const radius = Math.max(1, parseFloat(val) || 1);
      radiusSlider.value = radius;
      radiusInput.value = radius;
      this.store.setState({ radius });
      this.audioSynth.playRadiusPitch(radius);
      this.history.record({ radius, timestamp: new Date().toISOString() });
    };

    radiusSlider.addEventListener("input", (e) => updateRadius(e.target.value));
    radiusInput.addEventListener("change", (e) => updateRadius(e.target.value));

    angleSlider.addEventListener("input", (e) => {
      const angle = parseInt(e.target.value, 10);
      angleValueDisplay.textContent = `${angle}°`;
      this.store.setState({ angle });
    });

    polygonSidesInput.addEventListener("change", (e) => {
      const sides = Math.max(3, parseInt(e.target.value, 10) || 3);
      this.store.setState({ polygonSides: sides });
    });

    // Toggle Physics Particles
    this.toggleParticlesBtn.addEventListener("click", () => {
      this.physicsEnabled = !this.physicsEnabled;
      this.toggleParticlesBtn.textContent = this.physicsEnabled
        ? "Disable Elastic Particles"
        : "Enable Elastic Particles";
    });

    // Theme Switcher
    this.themeToggleBtn.addEventListener("click", () => {
      const currentTheme = this.store.getState().theme;
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      document.body.className = newTheme === "light" ? "theme-light" : "";
      this.store.setState({ theme: newTheme });
    });

    // Custom Theme Palette Editor Modal
    this.customThemeBtn.addEventListener("click", () => {
      const paletteHtml = `
                <div class="theme-editor-panel">
                    <div class="color-picker-group">
                        <label>Primary Highlight</label>
                        <input type="color" id="primaryColorPicker" class="color-input" value="#3b82f6">
                    </div>
                    <div class="color-picker-group">
                        <label>Card Background</label>
                        <input type="color" id="bgCardPicker" class="color-input" value="#1e293b">
                    </div>
                </div>
                <button id="resetThemeBtn" class="btn btn-secondary" style="width: 100%; margin-top: 1rem;">Reset Theme Defaults</button>
            `;
      this.modal.open("Custom Palette Editor", paletteHtml);

      document
        .getElementById("primaryColorPicker")
        .addEventListener("input", (e) => {
          ThemeEditor.applyCustomColor("primary-color", e.target.value);
        });
      document.getElementById("bgCardPicker").addEventListener("input", (e) => {
        ThemeEditor.applyCustomColor("bg-card", e.target.value);
      });
      document.getElementById("resetThemeBtn").addEventListener("click", () => {
        ThemeEditor.resetToDefault();
        this.modal.close();
      });
    });

    // Canvas Tooltip & Coordinates Hover Event
    this.canvasEl.addEventListener("mousemove", (e) => {
      const rect = this.canvasEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = this.canvasRenderer.width / 2;
      const cy = this.canvasRenderer.height / 2;

      const dx = x - cx;
      const dy = y - cy;
      const distance = Math.sqrt(dx * dx + dy * dy).toFixed(1);

      this.cursorCoordsEl.textContent = `Rel: (${dx.toFixed(0)}, ${dy.toFixed(0)}) | Dist: ${distance}px`;
      this.tooltip.show(e.clientX, e.clientY, `Dist: ${distance}px`);
    });

    this.canvasEl.addEventListener("mouseleave", () => {
      this.tooltip.hide();
    });

    // Presets Click Event
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

    // Advanced Export Options
    this.exportBtn.addEventListener("click", () => {
      const { radius, unit } = this.store.getState();
      const metrics = CircleMath.computeFromRadius(radius);

      const exportMenuHtml = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                    <button id="downloadPngBtn" class="btn btn-primary">Export PNG Image</button>
                    <button id="downloadSvgBtn" class="btn btn-secondary">Export SVG Vector</button>
                    <button id="downloadPdfBtn" class="btn btn-secondary">Print Blueprint PDF</button>
                    <button id="downloadCsvBtn" class="btn btn-secondary">Export History CSV</button>
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

      document
        .getElementById("downloadPdfBtn")
        .addEventListener("click", () => {
          PDFExporter.generatePrintableReport(metrics, unit);
          this.modal.close();
        });

      document
        .getElementById("downloadCsvBtn")
        .addEventListener("click", () => {
          CSVExporter.exportToCSV(this.history.getHistory());
          this.modal.close();
        });
    });

    // History Modal Display
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

  startRenderLoop() {
    const loop = () => {
      const fps = this.profiler.tick();
      this.fpsCounterEl.textContent = `FPS: ${fps}`;

      if (this.physicsEnabled) {
        const { radius } = this.store.getState();
        const cx = this.canvasRenderer.width / 2;
        const cy = this.canvasRenderer.height / 2;

        this.collisionEngine.circleRadius = radius;
        this.collisionEngine.center = { x: cx, y: cy };
        this.collisionEngine.update();

        this.render(this.store.getState());
      }

      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  render(state) {
    const { radius, angle, unit, polygonSides = 6 } = state;
    const metrics = CircleMath.computeFromRadius(radius);
    const polygon = PolygonEngine.getInscribedPolygon(radius, polygonSides);
    const sphere = Geometry3D.computeSphere(radius);

    // Update Canvas Viewport
    this.canvasRenderer.clear();
    this.canvasRenderer.drawGrid();
    this.canvasRenderer.drawCircle(radius);

    const cx = this.canvasRenderer.width / 2;
    const cy = this.canvasRenderer.height / 2;

    if (angle < 360) {
      SectorRenderer.drawSector(
        this.canvasRenderer.ctx,
        cx,
        cy,
        radius,
        0,
        angle,
      );
    }

    // Draw Inscribed Polygon Overlay
    this.canvasRenderer.ctx.save();
    this.canvasRenderer.ctx.beginPath();
    for (let i = 0; i < polygonSides; i++) {
      const a = (i * 2 * Math.PI) / polygonSides;
      const px = cx + radius * Math.cos(a);
      const py = cy + radius * Math.sin(a);
      if (i === 0) this.canvasRenderer.ctx.moveTo(px, py);
      else this.canvasRenderer.ctx.lineTo(px, py);
    }
    this.canvasRenderer.ctx.closePath();
    this.canvasRenderer.ctx.strokeStyle = "#10b981";
    this.canvasRenderer.ctx.lineWidth = 1.5;
    this.canvasRenderer.ctx.stroke();
    this.canvasRenderer.ctx.restore();

    // Render Particle Simulations
    if (this.physicsEnabled) {
      this.canvasRenderer.ctx.save();
      this.canvasRenderer.ctx.fillStyle = "#ef4444";
      this.collisionEngine.particles.forEach((p) => {
        this.canvasRenderer.ctx.beginPath();
        this.canvasRenderer.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.canvasRenderer.ctx.fill();
      });
      this.canvasRenderer.ctx.restore();
    }

    // Update Metrics Dashboard & Sidebar Panels
    this.metricsDashboard.update(metrics, unit);

    this.polygonEl.innerHTML = `
            <div class="control-label">${polygonSides}-Sided Polygon</div>
            <div style="font-size: 0.85rem; margin-top: 0.25rem;">
                <div>Apothem: <strong>${polygon.apothem.toFixed(2)}</strong></div>
                <div>Area: <strong>${polygon.area.toFixed(2)}</strong></div>
            </div>
        `;

    this.geometry3dEl.innerHTML = `
            <div class="control-label">3D Sphere Projection</div>
            <div style="font-size: 0.85rem; margin-top: 0.25rem;">
                <div>Volume: <strong>${sphere.volume.toFixed(2)}</strong></div>
                <div>Surface: <strong>${sphere.surfaceArea.toFixed(2)}</strong></div>
            </div>
        `;

    this.chartController.renderAreaCurve(radius);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
});
