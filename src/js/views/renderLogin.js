import Views from "./views";

class RenderLogin extends Views {
  #signinContainer = document.querySelector(".login");
  #applicationContainer = document.querySelector(".application");
  #errorMessage = document.querySelector(".error-message");
  #signinButton = document.querySelector(".btn-sign-in");
  #usernameInput = document.getElementById("username");
  #passwordInput = document.getElementById("password");
  #users = [
    { username: "user1", password: "password1", displayName: "User One" },
    { username: "user2", password: "password2", displayName: "User Two" },
  ];

  constructor() {
    super();
  }

  getUsernameInputValue() {
    return this.#usernameInput.value;
  }

  getPasswordInputValue() {
    return this.#passwordInput.value;
  }

  authentication() {
    return new Promise((resolve, reject) => {
      const enteredUsername = this.getUsernameInputValue();
      const enteredPassword = this.getPasswordInputValue();

      // Simulating an asynchronous operation (e.g., API request)
      setTimeout(() => {
        // Check if the entered credentials match any user
        const user = this.#users.find(
          (u) =>
            u.username === enteredUsername && u.password === enteredPassword
        );

        if (user) {
          // Successful sign-in
          resolve(true);
        } else {
          // Failed sign-in
          this.#errorMessage.textContent =
            "Invalid username or password. Try Again!";
          resolve(false);
        }
      }, 1000);
    });
  }

  addHandlerLogin() {
    let tempLoggedIn = true;
    let tempSignInContainerHtml = this.#signinContainer.innerHTML;
    this.#signinContainer.addEventListener("click", async (event) => {
      event.preventDefault();
      if (event.target.matches(".btn-sign-in")) {
        this.renderSpinner(this.#signinContainer);

        if (await this.authentication()) {
          location.hash = "";
          location.hash = "dashboard";
          this.#signinContainer.classList.add("hidden");
          this.#applicationContainer.classList.remove("hidden");
          tempLoggedIn = true;
        } else {
          tempLoggedIn = false;
        }
        this.#signinContainer.innerHTML = tempSignInContainerHtml;
      }
    });
    return tempLoggedIn;
  }
}

export default new RenderLogin();
