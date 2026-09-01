# Circle Engine Studio

An interactive, high-precision geometry calculation engine built with vanilla HTML5, CSS3, and modern ES6 JavaScript. Designed for high performance, dynamic visualizations, vector export capabilities, and analytical scale modeling.

## Architecture & Modular Design

The application follows a clean separation of concerns without external build tools or framework dependencies:

```text
├── index.html                  # HTML5 Application Shell
├── README.md                   # Technical Documentation
├── assets/
│   ├── css/                    # Modular Style Sheets
│   │   ├── variables.css       # Design Tokens & Custom Properties
│   │   ├── main.css            # Typography & Reset Rules
│   │   ├── layout.css          # App Grid & Responsive Structure
│   │   ├── controls.css        # Interactive Inputs & Buttons
│   │   ├── canvas.css          # Graphics Viewport Container
│   │   ├── charts.css          # Metric Analytics Layout
│   │   ├── modals.css          # Overlay Modal Dialogs
│   │   └── themes.css          # Light/Dark Theme Overrides
│   ├── js/                     # Application JavaScript Engine
│   │   ├── app.js              # Entrypoint & Component Wiring
│   │   ├── core/               # Math & State Engines
│   │   │   ├── circleMath.js   # Geometric & Trigonometric Algorithms
│   │   │   ├── trigEngine.js   # Coordinate & Angle Conversions
│   │   │   ├── unitConverter.js# Imperial & Metric Conversions
│   │   │   ├── formulaEvaluator.js # LaTeX & Text Formula Builders
│   │   │   └── stateStore.js   # Reactive State Management
│   │   ├── ui/                 # Viewport & UI Renderers
│   │   │   ├── canvasRenderer.js# Interactive HTML5 Canvas Render Pipeline
│   │   │   ├── sectorRenderer.js# Arc, Sector, and Segment Graphic Highlights
│   │   │   ├── animationController.js # Frame Animation Lerp Loops
│   │   │   ├── metricsDashboard.js # Real-time Metrics Card Displays
│   │   │   ├── chartController.js  # Area-to-Radius Analytics Plotter
│   │   │   └── modalController.js  # Dynamic Dialog & Overlay Handler
│   │   ├── utils/              # Utility Modules
│   │   │   ├── presetLoader.js # Pre-configured Test Profiles
│   │   │   ├── historyTracker.js # LocalStorage Computation Log
│   │   │   └── soundSynthesizer.js # Web Audio API Synthesizer Feedback
│   │   └── export/             # Data Export Engine
│   │       └── exportEngine.js # Dynamic SVG & Canvas PNG Generator
└── tests/                      # Zero-Dependency Test Suite
    ├── index.html              # Visual Web Harness Dashboard
    ├── assert.js               # Assertion Utilities
    ├── circleMath.test.js      # Core Geometry Tests
    ├── unitConverter.test.js   # Unit Conversion Tests
    └── testRunner.js           # Test Suite Execution Aggregator
```
