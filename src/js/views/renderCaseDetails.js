import Views from "./views";

class RenderCaseDetails extends Views {
  _parentElement = document.querySelector(".main-panel");
  _errorMessage = `Something Went Wrong, Please Try Again Later`;
  _textArea = this._parentElement.getElementsByTagName("textarea");

  _filterCases() {
    const allCases = this._data.map((i) => i.cases).flat();
    return allCases;
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) => {
      window.addEventListener(ev, handler);
    });
  }

  _generateMarkup() {
    const caseData = this._filterCases().filter(
      (c) => c.caseId.toLowerCase() === location.hash.split("#")[2]
    );
    console.log(caseData[0]);
    const clientData = this._data.filter((c) => c.id === caseData[0].clientId);
    console.log(clientData);

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
            >${caseData[0].caseId}</label
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
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="flex justify-between items-center w-full px-3 mb-6 md:mb-0">
          <label
            class="block uppercase text-xs tracking-wide text-gray-700 font-bold "
          >
            Client Name
          </label>
          <label
          class="block text-gray-700"
        >
          ${clientData[0].name}
        </label>
        </div>
        <div class="flex justify-between items-center w-full px-3 mb-6 md:mb-0">
          <label
            class="block uppercase text-xs tracking-wide text-gray-700 font-bold "
          >
            Email Address
          </label>
          <label
          class="block text-gray-700"
        >
        ${clientData[0].email ? clientData[0].email : ""}
        </label>
        </div>
        <div class="flex justify-between items-center w-full px-3 mb-6 md:mb-0">
          <label
            class="block uppercase text-xs tracking-wide text-gray-700 font-bold "
          >
            Phone
          </label>
          <label
          class="block text-gray-700"
        >
        ${this.formatPhoneNumber(clientData[0].phone)}
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
              id="grid-visa"
            >
              <option ${
                caseData[0].caseType.startsWith("General") && `selected`
              }>General Inquiry</option>
              <option ${
                caseData[0].caseType.startsWith("Callback") && `selected`
              }>Callback Request</option>
              <option ${
                caseData[0].caseType.startsWith("Update") && `selected`
              }>Update Request</option>
              <option ${
                caseData[0].caseType.startsWith("Payment") && `selected`
              }>Payment Related</option>
              <option ${
                caseData[0].caseType.startsWith("Others") && `selected`
              }>Others</option>              
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
              <option ${
                caseData[0].caseType.startsWith("Pending") && `selected`
              }>Pending</option>
              <option ${
                caseData[0].caseType.startsWith("Under") && `selected`
              }>Under Review</option>
              <option ${
                caseData[0].caseType.startsWith("Approved") && `selected`
              }>Approved</option>
              <option ${
                caseData[0].caseType.startsWith("Denied") && `selected`
              }>Denied</option>
              <option ${
                caseData[0].caseType.startsWith("Processing") && `selected`
              }>Processing</option>
              <option ${
                caseData[0].caseType.startsWith("Issued") && `selected`
              }>Issued</option>
              <option ${
                caseData[0].caseType.startsWith("Expired") && `selected`
              }>Expired</option>
              <option ${
                caseData[0].caseType.startsWith("Cancelled") && `selected`
              }>Cancelled/Revoked</option>
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
            ${this._employeeData.map(
              (e) =>
                `<option ${
                  e.employeeId === caseData[0].assignedTo && `selected`
                }>` +
                e.name +
                `</option>`
            )}
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
          class="case-note-class block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Comments..."
          
        ></textarea>
      </div>
      <div class="flex w-full space-x-3 justify-start">
        <button
          class="bg-blue-500 hover:bg-blue-800 text-white font-semibold hover:text-white px-2 border hover:border-blue-500 active:bg-transparent active:text-blue-700 hover:border-transparent rounded-lg"
        >
          Save
        </button>
        
      </div>
    </form>
  ${caseData[0].note.map(
    (n) => `<div class="flex flex-col  w-full shadow-lg">
      <div class="flex self-start space-x-2"><span class="font-bold text-sm">${this._employeeIdToName(
          n.writtenBy
        )} </span>
        <span class="font-bold text-sm">${this.returnDateTimeString(
          n.writtenAt
        )}</span> </div>
        <div class="flex w-2/3 self-end"><p>${n.note}</p></div>
      </div>`
        )}`;
  }
}

export default new RenderCaseDetails();
