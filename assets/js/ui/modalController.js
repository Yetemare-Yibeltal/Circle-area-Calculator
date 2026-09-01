/**
 * General Purpose Overlay and Dialog Modal Controller
 */
export class ModalController {
  constructor() {
    this.modalContainer = null;
    this.init();
  }

  /**
   * Inject Modal Wrapper Markup into DOM
   */
  init() {
    if (document.getElementById("appModal")) return;

    const modalMarkup = `
            <div id="appModal" class="modal-backdrop hidden">
                <div class="modal-card">
                    <header class="modal-header">
                        <h3 id="modalTitle">Dialog Title</h3>
                        <button id="modalCloseBtn" class="modal-close-btn">&times;</button>
                    </header>
                    <div id="modalBody" class="modal-body"></div>
                </div>
            </div>
        `;
    document.body.insertAdjacentHTML("beforeend", modalMarkup);
    this.modalContainer = document.getElementById("appModal");

    document
      .getElementById("modalCloseBtn")
      .addEventListener("click", () => this.close());
    this.modalContainer.addEventListener("click", (e) => {
      if (e.target === this.modalContainer) this.close();
    });
  }

  /**
   * Display modal dialog with custom inner HTML
   * @param {string} title
   * @param {string} contentHtml
   */
  open(title, contentHtml) {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalBody").innerHTML = contentHtml;
    this.modalContainer.classList.remove("hidden");
  }

  /**
   * Dismiss active modal
   */
  close() {
    if (this.modalContainer) {
      this.modalContainer.classList.add("hidden");
    }
  }
}
