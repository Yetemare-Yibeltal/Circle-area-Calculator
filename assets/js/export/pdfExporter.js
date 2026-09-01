/**
 * Printable Technical Specification Report Exporter
 */
export class PDFExporter {
  /**
   * Open printable window report with geometric blueprint specs
   * @param {Object} metrics Circle metrics
   * @param {string} unit
   */
  static generatePrintableReport(metrics, unit = "px") {
    const reportWindow = window.open("", "_blank");
    reportWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Circle Engineering Blueprint Report</title>
                <style>
                    body { font-family: monospace; padding: 2rem; color: #000; }
                    h1 { border-bottom: 2px solid #000; padding-bottom: 0.5rem; }
                    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
                    th, td { border: 1px solid #000; padding: 8px; text-align: left; }
                </style>
            </head>
            <body>
                <h1>Circle Engineering Blueprint</h1>
                <p>Generated: ${new Date().toLocaleString()}</p>
                <table>
                    <tr><th>Parameter</th><th>Value</th></tr>
                    <tr><td>Radius</td><td>${metrics.radius.toFixed(4)} ${unit}</td></tr>
                    <tr><td>Diameter</td><td>${metrics.diameter.toFixed(4)} ${unit}</td></tr>
                    <tr><td>Circumference</td><td>${metrics.circumference.toFixed(4)} ${unit}</td></tr>
                    <tr><td>Surface Area</td><td>${metrics.area.toFixed(4)} ${unit}²</td></tr>
                </table>
            </body>
            </html>
        `);
    reportWindow.document.close();
    reportWindow.focus();
    setTimeout(() => reportWindow.print(), 250);
  }
}
