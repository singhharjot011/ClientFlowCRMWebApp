class RenderTopPanel {
  #applicationSection = document.querySelector(".application");
  #loginSection = document.querySelector(".login");
  #userInfoDD = document.querySelector(".user-info-dropdown");

  constructor() {
    this.triggerEventListeners();
  }

  controlDropdown(e) {
    if (!e.target.closest("button")) return;
    if (e.target.classList.contains("btn-logout")) {
      this.#applicationSection.classList.add("hidden");
      this.#loginSection.classList.remove("hidden");
      this.#userInfoDD.classList.add("hidden");
      location.hash = "login";
      localStorage.isLoggedIn = "false";
    }

    if (
      e.target.closest("button").classList.contains("btn-user-info-dropdown")
    ) {
      this.#userInfoDD.classList.toggle("hidden");
    }
  }

  controlFocusOut(e) {
    if (!e.relatedTarget) {
      this.#userInfoDD.classList.add("hidden");
    }
  }

  triggerEventListeners() {
    this.#applicationSection.addEventListener(
      "click",
      this.controlDropdown.bind(this)
    );
    this.#applicationSection.addEventListener(
      "focusout",
      this.controlFocusOut.bind(this)
    );
  }
}

export default new RenderTopPanel();
