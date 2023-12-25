class RenderMenu {
  #menu = document.querySelector(".menu");
  #toggleBtn = document.querySelector(".toggle");
  #initialHash = location.hash;

  constructor() {
    this.#menu.addEventListener("click", this.selectMenuItem.bind(this));
    this.#toggleBtn.addEventListener("click", this.toggleMenu.bind(this));
  }

  

  // 1. Highlight Selected Tab
  selectMenuItem(e) {
    if (!e) return;
    if (e.target.classList.contains("menu", "elipsis")) return;
    const siblings = e.target.closest(".menu").children;
    if (e.target.classList.contains("menu-item")) {
      for (const node of siblings) {
        node.classList.remove("bg-blue-500");
      }
      e.target.classList.add("bg-blue-500");
      location.hash = e.target.closest(".menu-item").querySelector("a").hash;
    } else {
      for (const node of siblings) {
        node.classList.remove("bg-blue-500");
      }
      e.target.closest("div").classList.add("bg-blue-500");
      location.hash = e.target.closest(".menu-item").querySelector("a").hash;
    }
  }

  toggleMenu(e) {
    if (e.target.closest("div").classList.contains("elipsis")) {
      const tabs = [...e.target.closest(".side-panel").children[1].children];
      tabs.forEach((tab) => tab.querySelector("a").classList.toggle("hidden"));
      e.target.nextElementSibling.classList.toggle("hidden");
      e.target.closest(".side-panel").classList.toggle("min-w-max");
    }
  }

  triggerEventListeners() {
    this.#initialHash = location.hash;
    const menuItems = this.#menu.children;
    for (const txt of menuItems) {
      txt.classList.remove("bg-blue-500");
      txt.dataset.tab === this.#initialHash.slice(1) &&
        txt.classList.add("bg-blue-500");
    }
  }
}

export default new RenderMenu();
