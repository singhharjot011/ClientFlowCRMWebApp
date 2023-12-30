import Views from "./views";

class RenderNewCase extends Views {
  _parentElement = document.querySelector(".main-panel");
  _errorMessage = `Something Went Wrong, Please Try Again Later`;
  clientSearchField;
  clientList;
  allClients;
  curClient;

  constructor() {
    super();

    this.addHandlerSearch();
  }

  createClientList() {
    // Clear existing options
    this.clientList.innerHTML = "";
    for (const c in this.allClients) {
      const optionElement = document.createElement("option");
      optionElement.value = this.allClients[c];
      this.clientList.appendChild(optionElement);
    }
  }

  getClientDetails(clientName) {
    if (!this._data.map((c) => c.name).includes(clientName)) return;
    console.log(clientName);
    console.log(this._data.filter((c) => c.name === clientName));
    return this._data.filter((c) => c.name === clientName);
  }

  addHandlerSearch() {
    this._parentElement?.addEventListener("keyup", (e) => {
      if (!e.target.classList.contains("client-search-class")) return;
      if (e.target.classList.contains("client-search-class")) {
        this.clientSearchField = e.target;
        this.curClient = this.getClientDetails(this.clientSearchField.value);
        this.clientList = e.target
          .closest("div")
          .querySelector(".client-list-class");
        if (this.curClient) {
          this.clientSearchField
            .closest("form")
            .querySelector(".client-email").textContent =
            this.curClient[0].email;
          this.clientSearchField
            .closest("form")
            .querySelector(".client-phone").textContent =
            this.formatPhoneNumber(this.curClient[0].phone);
          this.clientSearchField
            .closest("form")
            .querySelector(
              ".client-search-div"
            ).innerHTML = `<label id="current-client">${this.curClient[0].name} </label>`;
        }
      }
      this.createClientList();
    });

    this.clientList?.addEventListener("click", (e) => {
      console.log("this jiii");
    });
  }

  _generateMarkup() {
    this.allClients = this._data.map((c) => c.name);

    return `<div class="p-5 flex">
    <form class="w-full max-w-lg shadow-lg p-4">
      <div class="flex justify-between">
        <div class="flex space-x-2">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Case ID
          </label>
          <label
            class="block uppercase tracking-wide bg-gray-100 h-min px-1 rounded text-gray-700 text-xs font-bold mb-2"
            >TBD</label
          >
        </div>
        <button
          type="button"
          class="btn-close bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset active:ring-gray-300"
        >
          <span class="sr-only">Close menu</span>
          <!-- Heroicon name: outline/x -->
          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6 space-y-2">
        <div class="flex justify-between items-center w-full px-3 mb-6 md:mb-0">
          <label
          for="client-search"
            class="block uppercase text-xs tracking-wide text-gray-700 font-bold "
          >
            Client Name or Client ID
          </label>
        <div class="relative client-search-div">          
            <input class="shadow-sm text-gray-700 me-6 rounded px-2 client-search-class"
                id="client-search"
                placeholder="Search Name or ClientID"
                list="client-list"
                autocomplete="off"
                >
                <img src="${require(`../../img/search.png`)}" class="h-5 absolute right-0 top-1"></img>
            </input>
            <datalist class="client-list-class" id="client-list"></datalist>
        </div>
        </div>
        <div class="flex justify-between items-center w-full px-3 mb-6 md:mb-0">
          <label
            class="block uppercase text-xs tracking-wide text-gray-700 font-bold "
          >
            Email Address
          </label>
          <label
          class="block text-gray-700 client-email"
        >
        
        </label>
        </div>
        <div class="flex justify-between items-center w-full px-3 mb-6 md:mb-0">
          <label
            class="block uppercase text-xs tracking-wide text-gray-700 font-bold "
          >
            Phone
          </label>
          <label
          class="block text-gray-700 client-phone"
        >
        
        </label>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-case"
          >
            Case Type
          </label>
          <div class="relative">
            <select
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 px-1 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-case"
            >
              <option >General Inquiry</option>
              <option >Callback Request</option>
              <option >Update Request</option>
              <option >Payment Related</option>
              <option >Others</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-status"
          >
            Status
          </label>
          <div class="relative">
            <select
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 px-1 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-status"
            >
              <option >In Progress</option>
              <option >Pending</option>
              <option >Under Review</option>
              <option >Completed</option>
              <option >Referred</option>              
              <option>Cancelled</option>
              <option >Closed</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-consultant"
          >
            Consultant
          </label>
          <div class="relative">
            <select
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700  px-1 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-consultant"
            >
            ${this._employeeData.map((e) => `<option>` + e.name + `</option>`)}
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
  
      
      <div class="flex flex-col mb-6">
        <label
          for="note"
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >Note</label
        >
        <textarea
          id="note"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Comments..."
        ></textarea>
      </div>
      <div class="flex w-full space-x-3 justify-start">
        <button
          class="btn-save-case bg-blue-500 hover:bg-blue-800 text-white font-semibold hover:text-white px-2 border hover:border-blue-500 active:bg-transparent active:text-blue-700 hover:border-transparent rounded-lg"
        >
          Save
        </button>
        <button
        id="clear-case-button"
          class="bg-blue-500 hover:bg-blue-800 text-white font-semibold hover:text-white px-2 border hover:border-blue-500 active:bg-transparent active:text-blue-700 hover:border-transparent rounded-lg"
        >
          Clear
        </button>
      </div>
    </form>

  </div>`;
  }
}

export default new RenderNewCase();
