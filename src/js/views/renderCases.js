import { all } from "micromatch";
import Views from "./views";

class RenderCases extends Views {
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
    return `<div class="overflow-x-auto shadow-md sm:rounded-lg p-5">
        <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Case ID</th>
            <th scope="col" class="px-6 py-3">Type</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3">Case Created</th>
            <th scope="col" class="px-6 py-3">Last Updated</th>
            <th scope="col" class="px-6 py-3">Assigned To</th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          ${this._filterCases()
            .map(
              (caseItem) => `<tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          ><th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <a href=#${caseItem.caseId.toLowerCase()}>${caseItem.caseId}</a>
            </th>
            <td class="px-6 py-4">${caseItem.type}</td>
            <td class="px-6 py-4">${caseItem.status}</td>
            <td class="px-6 py-4">${caseItem.startDate}</td>
            <td class="px-6 py-4">
            ${caseItem.endDate}
            </td>
            <td class="px-6 py-4">
            ${this._employeeIdToName(caseItem.assignedTo)}
            </td>
          </tr>`
            )
            .join("")}
        </tbody>
        </table>
        </div>`;
  }

  _generateCaseMarkup(caseId) {
    return `<div class="p-5">
    <form class="w-full max-w-lg shadow-lg p-4">
      <div class="flex justify-between">
        <div class="flex space-x-2">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            ${caseId}
          </label>
          <label
            class="block uppercase tracking-wide bg-gray-100 h-min px-1 rounded text-gray-700 text-xs font-bold mb-2"
            >I458</label
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
          Name will go here
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
          Email will go here
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
          Phone will go here
        </label>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-visa"
          >
            Visa Type
          </label>
          <div class="relative">
            <select
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 px-1 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-visa"
            >
              <option>Work Permit</option>
              <option>Student Visa</option>
              <option>Super Visa</option>
              <option>Visitor Visa</option>
              <option>Express Entry / PR</option>
              <option>Family-Sponsorship</option>
              <option>TRV</option>
              <option>Others</option>
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
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
              <option>John B</option>
              <option>Tom C</option>
              <option>Paul D</option>
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
          placeholder="Write your thoughts here..."
        ></textarea>
      </div>
      <div class="flex w-full space-x-3 justify-start">
        <button
          class="bg-blue-500 hover:bg-blue-800 text-white font-semibold hover:text-white px-2 border hover:border-blue-500 active:bg-transparent active:text-blue-700 hover:border-transparent rounded-lg"
        >
          Save
        </button>
        <button
        id="clear-button"
          class="bg-blue-500 hover:bg-blue-800 text-white font-semibold hover:text-white px-2 border hover:border-blue-500 active:bg-transparent active:text-blue-700 hover:border-transparent rounded-lg"
        >
          Clear
        </button>
      </div>
    </form>
  </div>`;
  }
}

export default new RenderCases();
