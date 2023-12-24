import Views from "./views";

class RenderLogin extends Views {
  #signinContainer = document.querySelector(".login");
  #applicationContainer = document.querySelector(".application");
  #errorMessage = document.querySelector(".error-message");
  #signinButton = document.querySelector(".btn-sign-in");
  #usernameInput = document.getElementById("username");
  #passwordInput = document.getElementById("password");

  authentication(userCreds) {
    return new Promise((resolve, reject) => {
      const enteredUsername = this.#usernameInput.value;
      const enteredPassword = this.#passwordInput.value;

      // Check if the entered credentials match any user

      const user = userCreds.find(
        (u) => u.username === enteredUsername && u.password === enteredPassword
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

      // Simulating an asynchronous operation (e.g., API request)
      // setTimeout(() => {}, 1000);
    });
  }

  addHandlerLogin(userCreds) {
    let tempLoggedIn = true;
    let tempSignInContainerHtml = this.#signinContainer.innerHTML;
    this.#signinContainer.addEventListener("click", async (event) => {
      event.preventDefault();
      if (event.target.matches(".btn-sign-in")) {
        this.renderSpinner(this.#signinContainer);

        if (await this.authentication(userCreds)) {
          location.hash = "";
          location.hash = "dashboard";
          this.#signinContainer.classList.add("hidden");
          this.#applicationContainer.classList.remove("hidden");
          this.#signinContainer.innerHTML = tempSignInContainerHtml;
          tempLoggedIn = true;
        } else {
          console.log("this");
          this.#signinContainer.innerHTML = `<div class="flex justify-center items-center text-xl h-screen w-screen">Incorrect Credentials Please try Again</div>`;
          setTimeout(() => {
            this.#signinContainer.innerHTML = tempSignInContainerHtml;
          }, 2000);
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      }
    });
    return tempLoggedIn;
  }
}

export default new RenderLogin();
