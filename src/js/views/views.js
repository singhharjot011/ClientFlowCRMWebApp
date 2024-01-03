export default class Views {
  _data;
  _application = document.querySelector(".application");

  render(data, employeeData, taskData, usersData) {
    if (this._parentElement.matches(".main-panel"))
      this._application.classList.remove("hidden");
    this._data = data;
    this._employeeData = employeeData;
    this._taskData = taskData;
    this._usersData = usersData;
    const markup = this._generateMarkup();

    this._clear();

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
  _filterCases() {
    const allCases = this._data.map((i) => i.cases).flat();
    return allCases;
  }

  formatPhoneNumber(phone) {
    const formattedPhone = [
      ...phone.slice(0, 3),
      "-",
      ...phone.slice(3, 6),
      "-",
      ...phone.slice(6),
    ].join("");
    return formattedPhone;
  }

  getCreatedById() {
    const loggedInUser = this._usersData.filter((u) => u.userLoggedIn);
    return loggedInUser[0].employeeId;
  }

  getConsultantId(empName) {
    console.log(empName);
    const consultant = this._employeeData.filter((u) => u.name === empName);
    return consultant[0].employeeId;
  }

  returnDateString(date) {
    const rawDate = new Date(date);
    const day = rawDate.getDate();
    const month = rawDate.getMonth();
    const year = rawDate.getFullYear();

    return `${month + 1}/${day}/${year}`;
  }

  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  returnDateTimeString(date) {
    const rawDate = new Date(date);
    const day = rawDate.getDate();
    const month = rawDate.getMonth();
    const year = rawDate.getFullYear();
    const hour = this.addZero(rawDate.getHours());
    const minutes = this.addZero(rawDate.getMinutes());

    return `${month + 1 + "/" + day + "/" + year +" "+ hour + ":" + minutes} `;
  }

  getInputElementValue(e, className) {
    return e.target.closest("form").querySelector(`.${className}`).value;
  }

  renderSpinner(parentEl) {
    const markup = `
        <div class="flex  h-96 justify-center items-center" role="status">
            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
        `;
    if (parentEl) {
      parentEl.innerHTML = "";
      parentEl.insertAdjacentHTML("afterbegin", markup);
    } else {
      this._parentElement.innerHTML = "";
      this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error flex justify-center items-center  h-96">
        <div class="w-min p-5">
          <img src="../img/error.png">
            
          </img>
        </div>
        <p>${message}</p>
      </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message shadow-lg flex justify-center items-center p-5 text-center w-1/2 h-96">
        <p class="text-xl">${message}</p>
      </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _employeeIdToName(assignedToId) {
    return this._employeeData
      .filter((i) => i.employeeId === assignedToId)
      .map((i) => i.name)
      .join("");
  }

  _employeeNameToId(assignedToName) {
    return this._employeeData
      .filter((e) => e.name === assignedToName)
      .map((e) => e.employeeId)
      .join("");
  }

  _clientNameToId(clientName) {
    return this._data
      .filter((c) => c.name === clientName)
      .map((c) => c.id)
      .join("");
  }
  _clientIdToName(clientId) {
    return this._data
      .filter((c) => c.id === clientId)
      .map((c) => c.name)
      .join("");
  }
}
