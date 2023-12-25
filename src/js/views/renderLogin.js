import Views from "./views";

class RenderLogin extends Views {
  _parentElement = document.querySelector(".login");
  _application = document.querySelector(".application");
  _errorMessage = `Something Went Wrong, Please Try Again Later`;
  _usernameTxtBox = document.getElementById("username");
  _passwordTxtBos = document.getElementById("password");
  _usernameValue;
  _passwordValue;

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) => {
      window.addEventListener(ev, handler);
    });
  }

  authentication(userCreds) {
    return new Promise((resolve, reject) => {
      // Check if the entered credentials match any user
      const user = (userCreds || []).find(
        (u) =>
          u.username === this._usernameValue &&
          u.password === this._passwordValue
      );
      if (user) {
        // Successful sign-in
        resolve(true);
      } else {
        // Failed sign-in
        resolve(false);
      }

      // Simulating an asynchronous operation (e.g., API request)
      // setTimeout(() => {}, 1000);
    });
  }

  addHandlerLogin(userCreds) {
    this._parentElement.addEventListener("click", async (e) => {
      e.preventDefault();
      if (
        !e.target.matches(".btn-sign-in") &&
        !e.target.matches("#username") &&
        !e.target.matches("#password")
      )
        return;
      if (e.target.matches(".btn-sign-in")) {
        this._usernameValue = e.target
          .closest("form")
          .querySelector(".username-input").value;
        this._passwordValue = e.target
          .closest("form")
          .querySelector(".password-input").value;
        const result = await this.authentication(userCreds);
        if (result) {
          location.hash = "dashboard";
          this._parentElement.classList.add("hidden");
          this._application.classList.remove("hidden");
          localStorage.setItem("isLoggedIn", true);
        }
      }
    });
  }

  _generateMarkup() {
    return `<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="${require(`../../img/logo-white.png`)}"
        alt="Tailwind Client Flow"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#">
        <div>
          <label
            for="username"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Username</label
          >
          <div class="mt-2">
            <input
              id="username"
              name="username"
              type="username"
              autocomplete="username"
              required
              class="username-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
            <!-- <div class="text-sm">
              <a
                href="#"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
                >Forgot password?</a
              >
            </div> -->
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="password-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
          </div>
        </div>

        <div>
          <button
            class="btn-sign-in flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
      <p class="error-message mt-10 text-center text-sm text-gray-500"></p>
      <p class="mt-10 text-center text-sm text-gray-500">
        Don't have an account? Contact your Manager.
      </p>
    </div>
  </div>`;
  }
}

export default new RenderLogin();
