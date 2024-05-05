import Views from "./views";

class RenderTopPanel extends Views {
  _parentElement = document.querySelector(".top-panel");
  #applicationSection = document.querySelector(".application");
  #loginSection = document.querySelector(".login");
  // #userInfoDD = document.querySelector(".user-info-dropdown");
  // #userNameLoggedIn = document.querySelector(".username-logged-in");

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) => {
      window.addEventListener(ev, handler);
    });
  }

  controlDropdown(e) {
    if (!e.target.closest("button")) return;
    if (e.target.classList.contains("btn-logout")) {
      this.#applicationSection.classList.add("hidden");
      this.#loginSection.classList.remove("hidden");
      this._parentElement
        .querySelector(".user-info-dropdown")
        .classList.add("hidden");
      // this.#userInfoDD.classList.add("hidden");
      location.hash = "login";
      localStorage.isLoggedIn = "false";
    }

    if (
      e.target.closest("button").classList.contains("btn-user-info-dropdown")
    ) {
      this._parentElement
        .querySelector(".user-info-dropdown")
        .classList.toggle("hidden");
    }
  }

  controlFocusOut(e) {
    if (!e.relatedTarget) {
      this._parentElement
        .querySelector(".user-info-dropdown")
        .classList.add("hidden");
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

  _generateMarkup() {
    let imageSource = "anisha";

    const loggedInUser = this._usersData.find((u) => u.userLoggedIn);

    const imageName = loggedInUser
      ? loggedInUser.displayName.split(" ")[0].toLowerCase()
      : "anisha";

    const imgAnisha = `${require(`../../img/avatar/avatar-anisha.png`)}`;
    const imgBob = `${require(`../../img/avatar/avatar-bob.png`)}`;
    const imgShawna = `${require(`../../img/avatar/avatar-shawna.png`)}`;
    const imgEmma = `${require(`../../img/avatar/avatar-emma.png`)}`;

    imageName === "anisha" ? (imageSource = imgAnisha) : "";
    imageName === "bob" ? (imageSource = imgBob) : "";
    imageName === "shawna" ? (imageSource = imgShawna) : "";
    imageName === "emma" ? (imageSource = imgEmma) : "";

    return `<div class="search-bar flex w-1/2">
    <form
      class="search flex w-full justify-evenly m-3 p-2 rounded-xl shadow-inner"
    >
      <input
        class="w-3/4 rounded-xl p-1"
        type="text"
        class="search__field"
        placeholder="Search..."
      />
      <button class="btn search__btn">
        <span class="flex"
          ><img
            class="h-5"
            src="${require(`../../img/search.png`)}"
            alt="Magnifier Icon"
        /></span>
      </button>
    </form>
  </div>
  <div class="user-options flex w-1/2 justify-end items-center gap-3">
    <a href="#settings"
      ><img class="h-7" src="${require(`../../img/settings.png`)}" alt="Gear Icon"
    /></a>
    <a href="#notifications"
      ><img class="h-7" src="${require(`../../img/bell.png`)}" alt="Bell Icon"
    /></a>
    <img class="h-5" src="${require(`../../img/dots.png`)}" alt="3 Dots Icon" />
    <div
      class="user-info flex flex-col items-center font-semibold gap-2 relative"
    >
      <div class="flex items-center me-10 z-10">
        <img
          class="w-10 h-10 rounded-full"
          src="${imageSource}"
          alt="Profile Picture"
        />
        <span class="username-logged-in">${
          this._usersData.filter((u) => u.userLoggedIn)[0].displayName
        }</span>
        <button class="btn-user-info-dropdown hover:scale-125">
          <img src="${require(`../../img/arrowDown.png`)}" alt="Arrow" />
        </button>
      </div>
      <div
        tabindex="0"
        class="user-info-dropdown absolute translate-y-10 right-0 transform z-50 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul
          class="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDelayButton"
        >
          <li>
            <button
              class="btn-profile w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Profile
            </button>
          </li>
          <li>
            <button
              class="btn-logout w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>`;
  }
}

export default new RenderTopPanel();
