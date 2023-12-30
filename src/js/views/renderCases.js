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
              <a class="case-anchor" href="#${caseItem.caseId.toLowerCase()}">${
                caseItem.caseId
              }</a>
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
}

export default new RenderCases();
