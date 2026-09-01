/**
 * CSV Spreadsheet Data Exporter for Computation Sets
 */
export class CSVExporter {
  /**
   * Download mathematical history entries as CSV spreadsheet
   * @param {Array} historyEntries
   * @param {string} filename
   */
  static exportToCSV(historyEntries, filename = "circle-metrics-history.csv") {
    if (!historyEntries || !historyEntries.length) return;

    const headers = [
      "ID",
      "Timestamp",
      "Radius",
      "Diameter",
      "Circumference",
      "Area",
    ];
    const rows = historyEntries.map((e) => {
      const d = e.radius * 2;
      const c = 2 * Math.PI * e.radius;
      const a = Math.PI * e.radius * e.radius;
      return [
        e.id,
        e.timestamp,
        e.radius,
        d.toFixed(2),
        c.toFixed(2),
        a.toFixed(2),
      ];
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
