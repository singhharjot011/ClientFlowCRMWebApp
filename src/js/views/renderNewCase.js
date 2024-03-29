import Views from "./views";

class RenderNewCase extends Views {
  _parentElement = document.querySelector(".main-panel");
  _errorMessage = `Something Went Wrong, Please Try Again Later`;
  _clientSearchField;
  _clientList;
  _allClients;
  _curClient;
  _caseIdValue;
  _clientNameValue;
  _clientIdValue;
  _caseTypeValue;
  _caseStatusValue;
  _assignedToValue;
  _createdAtValue;
  _caseDescriptionValue;
  _caseNoteValue;

  constructor() {
    super();

    this.addHandlerSearch();
  }

  createClientList() {
    // Clear existing options
    this._clientList.innerHTML = "";
    for (const c in this._allClients) {
      const optionElement = document.createElement("option");
      optionElement.value = this._allClients[c];
      this._clientList.appendChild(optionElement);
    }
  }

  getClientDetails(clientName) {
    if (!this._data.map((c) => c.name).includes(clientName)) return;
    return this._data.filter((c) => c.name === clientName);
  }

  getLatestCase() {
    return (
      +this._filterCases()
        .map((c) => c.caseId)
        .sort((a, b) => {
          if (a.slice(1) < b.slice(1)) return -1;
        })
        .slice(-1)[0]
        .slice(1) + 1
    );
  }

  addHandlerSearch() {
    this._parentElement?.addEventListener("keyup", (e) => {
      if (!e.target.classList.contains("client-search-class")) return;
      if (e.target.classList.contains("client-search-class")) {
        this._clientSearchField = e.target;
        this._curClient = this.getClientDetails(this._clientSearchField.value);

        this._clientList = e.target
          .closest("div")
          .querySelector(".client-list-class");
        if (this._curClient) {
          this._clientSearchField
            .closest("form")
            .querySelector(".client-email").textContent =
            this._curClient[0].email;
          this._clientSearchField
            .closest("form")
            .querySelector(".client-phone").textContent =
            this.formatPhoneNumber(this._curClient[0].phone);
          this._clientSearchField
            .closest("form")
            .querySelector(
              ".client-search-div"
            ).innerHTML = `<label id="current-client">${this._curClient[0].name} </label>`;
        }
      }
      this.createClientList();
    });
  }

  addHandlerCreateNewCase(handler) {
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      if (!e.target.closest("button")) return;
      if (e.target.classList.contains("btn-save-case") && this._curClient) {
        this._caseIdValue = `C` + this.getLatestCase();
        this._clientIdValue = this._clientNameToId(this._curClient?.[0].name);
        this._clientNameValue = this._curClient?.[0].name;
        this._caseTypeValue = this.getInputElementValue(e, `case-type-class`);
        this._caseStatusValue = this.getInputElementValue(
          e,
          `case-status-class`
        );
        this._assignedToValue = this._employeeNameToId(
          this.getInputElementValue(e, `case-assigned-to-class`)
        );
        this._createdAtValue = new Date().toISOString();
        this._caseDescriptionValue = this.getInputElementValue(
          e,
          `case-description-class`
        );
        this._caseNoteValue = this.getInputElementValue(e, `case-note-class`);
        const caseObj = {
          caseId: this._caseIdValue,
          createdBy: this.getCurrentLoggedInId(),
          createdAt: new Date().toISOString(),
          caseType: this._caseTypeValue,
          caseStatus: this._caseStatusValue,
          assignedTo: this._assignedToValue,
          caseDescription: this._caseDescriptionValue,
          clientId: this._clientIdValue,
          note: [
            {
              note: this._caseNoteValue,
              writtenBy: this.getCurrentLoggedInId(),
              writtenAt: new Date().toISOString(),
            },
          ],
        };
        if (this._caseDescriptionValue.trim() === "")
          return alert("Case Description is Mandatory");

        handler(caseObj);
        this.renderMessage(`New Case Created for ${this._clientNameValue}`);
        setTimeout(function () {
          this._lastHashValue = localStorage.getItem("lastHash")?.slice(1);
          location.hash = this._lastHashValue;
        }, 2 * 1000);
      }
      if (e.target.classList.contains("btn-clear-case")) {
        location.reload();
      }
    });
  }

  _generateMarkup() {
    this._allClients = this._data.map((c) => c.name);

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
            Client Name
          </label>
        <div class="relative client-search-div">          
            <input class="shadow-sm text-gray-700 me-6 rounded px-2 client-search-class"
                id="client-search"
                placeholder="Search Name"
                list="client-list"
                autocomplete="off"
                >
                <img src="${require(`../../img/search.png`)}" class="h-5 absolute right-0 top-1"></img>
            </input>
            <datalist class="client-list-class" id="client-list"><option></option></datalist>
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
              class="case-type-class block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 px-1 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
              class=" case-status-class block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 px-1 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
              class="case-assigned-to-class block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700  px-1 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
          for="description"
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >Description</label
        >
        <textarea
          id="description"
          rows="1"
          class="case-description-class block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write a small Description.."
        ></textarea>
        <label
          for="note"
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >Note</label
        >
        <textarea
          id="note"
          rows="4"
          class="case-note-class block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          class="btn-clear-case bg-blue-500 hover:bg-blue-800 text-white font-semibold hover:text-white px-2 border hover:border-blue-500 active:bg-transparent active:text-blue-700 hover:border-transparent rounded-lg"
        >
          Clear
        </button>
      </div>
    </form>

  </div>`;
  }
}

export default new RenderNewCase();
