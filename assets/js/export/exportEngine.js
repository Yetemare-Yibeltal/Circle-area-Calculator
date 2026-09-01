/**
 * Vector (SVG) and Raster (PNG) Rendering and Download Engine
 */
export class ExportEngine {
  /**
   * Download the active Canvas element as a PNG image
   * @param {HTMLCanvasElement} canvas
   * @param {string} filename
   */
  static exportToPNG(canvas, filename = "circle-geometry.png") {
    const imageURI = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = filename;
    link.href = imageURI;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Generate dynamic SVG Markup from circle metrics and trigger download
   * @param {Object} metrics
   * @param {string} unit
   * @param {string} filename
   */
  static exportToSVG(metrics, unit = "px", filename = "circle-vector.svg") {
    const { radius } = metrics;
    const size = Math.max(300, radius * 2.4);
    const center = size / 2;

    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <style>
        .circle-bg { fill: #0f172a; }
        .circle-fill { fill: rgba(59, 130, 246, 0.15); stroke: #3b82f6; stroke-width: 3; }
        .circle-axis { stroke: #334155; stroke-width: 1; stroke-dasharray: 4 4; }
        .radius-line { stroke: #eab308; stroke-width: 2; stroke-dasharray: 6 4; }
        .center-node { fill: #f8fafc; }
        .label-text { fill: #94a3b8; font-family: monospace; font-size: 12px; }
    </style>
    <rect width="100%" height="100%" class="circle-bg"/>
    <line x1="${center}" y1="0" x2="${center}" y2="${size}" class="circle-axis" />
    <line x1="0" y1="${center}" x2="${size}" y2="${center}" class="circle-axis" />
    <circle cx="${center}" cy="${center}" r="${radius}" class="circle-fill" />
    <line x1="${center}" y1="${center}" x2="${center + radius}" y2="${center}" class="radius-line" />
    <circle cx="${center}" cy="${center}" r="4" class="center-node" />
    <text x="${center + radius / 2 - 10}" y="${center - 8}" class="label-text">r = ${radius.toFixed(2)} ${unit}</text>
</svg>`;

    const blob = new Blob([svgContent], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = filename;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
