# Circle Engine Studio — Advanced Geometric Computing & Physics Suite

An interactive, high-precision geometric computing suite, physics simulator, and vector export engine built with vanilla HTML5 Canvas, modern ES6 JavaScript, and custom CSS design tokens.

Designed as an advanced full-stack front-end engineering portfolio piece featuring real-time physics collisions, 3D spatial geometry extrapolations, reactive multi-theme color tools, web audio harmonic feedback, and comprehensive data exporters.

---

## Technical Architecture & File Directory Structure

The project relies on clean modular design principles without heavy third-party framework overhead or external compilation steps:

```text
Circle-Engine-Studio/
├── index.html                     # HTML5 Visual Layout Shell
├── README.md                      # Comprehensive Architecture Documentation
├── assets/
│   ├── css/                       # Modular Design System
│   │   ├── variables.css          # Root Design Tokens & CSS Custom Properties
│   │   ├── main.css               # Typography & Core Reset Rules
│   │   ├── layout.css             # Multi-Panel Grid & Responsive Flex Layouts
│   │   ├── controls.css           # Inputs, Sliders, & Buttons
│   │   ├── canvas.css             # Main Viewport Container Styles
│   │   ├── charts.css             # Analytics & Area-Curve Containers
│   │   ├── modals.css             # Dynamic Modal Dialog Overlays
│   │   ├── tooltips.css           # Mouse Hover Canvas Coordinate Tooltips
│   │   ├── editor.css             # Theme Palette Builder Stylesheet
│   │   └── themes.css             # Light & Dark Color Overrides
│   └── js/                        # Modular JavaScript Application Engine
│       ├── app.js                 # Central Application Bootstrapper & Controller
│       ├── core/                  # Core Math & Spatial Calculators
│       │   ├── circleMath.js      # Circle Trigonometry & Geometric Formulas
│       │   ├── trigEngine.js      # Angular & Radial Coordinate Conversions
│       │   ├── polygonEngine.js   # Inscribed/Circumscribed Regular Polygon Math
│       │   ├── geometry3D.js      # 3D Sphere, Cylinder, & Cone Extrapolators
│       │   ├── unitConverter.js   # Metric & Imperial Measurement Conversion
│       │   ├── formulaEvaluator.js# Text & LaTeX Display String Formatter
│       │   └── stateStore.js      # Reactive Central Application State Store
│       ├── physics/               # Real-Time Physics Engines
│       │   ├── collisionEngine.js # Elastic Boundary Particle Collision Simulator
│       │   └── gravitySim.js      # Orbital Satellite Velocity & Pendulum Math
│       ├── ui/                    # Viewport Renderers & Canvas Controllers
│       │   ├── canvasRenderer.js  # High-DPI HTML5 Canvas Render Loop
│       │   ├── sectorRenderer.js  # Dynamic Arc, Sector, & Segment Overlays
│       │   ├── animationController.js # Smooth Frame Lerp Animations
│       │   ├── metricsDashboard.js# Dynamic Real-time Metric Cards
│       │   ├── chartController.js # Radius-to-Area Exponential Graph Engine
│       │   ├── modalController.js # Central Dialog & Overlay Controller
│       │   ├── tooltipController.js # Mouse Tracking Viewport Tooltips
│       │   ├── themeEditor.js     # Live CSS Custom Variable Theme Editor
│       │   └── audioSynthesizer.js# Pitch-Mapped Web Audio API Feedback Engine
│       ├── utils/                 # Utilities & Storage Tracking
│       │   ├── presetLoader.js    # Pre-configured Case Study Profiles
│       │   ├── historyTracker.js  # LocalStorage Computation Log
│       │   └── soundSynthesizer.js# Control Feedback Acoustic Ticks
│       ├── features/              # Performance & Analytics Features
│       │   ├── performanceProfiler.js # Canvas Frame Rate (FPS) Benchmark Profiler
│       │   └── comparisonTool.js  # Dual Shape Variance & Delta Analytics
│       └── export/                # Multi-Format Data Export Suite
│           ├── exportEngine.js    # Vector SVG & Raster PNG Generator
│           ├── pdfExporter.js     # Printable Engineering Blueprint Reports
│           └── csvExporter.js     # Calculation History CSV Exporter
└── tests/                         # Zero-Dependency Test Suite
    ├── index.html                 # Visual Browser Unit Test Harness
    ├── assert.js                  # Standalone Assertion Library
    ├── circleMath.test.js         # Core Geometry Unit Tests
    ├── unitConverter.test.js      # Metric Unit Conversion Tests
    ├── polygonEngine.test.js      # Regular Polygon Computation Tests
    ├── geometry3D.test.js         # Spatial 3D Extrapolation Tests
    └── testRunner.js              # Aggregated Test Suite Runner
```
