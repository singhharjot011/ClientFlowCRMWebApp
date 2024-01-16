import { all } from "micromatch";
import Views from "./views";

class RenderCases extends Views {
  _parentElement = document.querySelector(".main-panel");
  _errorMessage = `Something Went Wrong, Please Try Again Later`;
  _textArea = this._parentElement.getElementsByTagName("textarea");

  constructor() {
    super();
    this.openCreateNewCase();
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) => {
      window.addEventListener(ev, handler);
    });
  }

  openCreateNewCase() {
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      if (!e.target.closest("button") && !e.target.closest("a")) return;
      if (e.target.classList.contains("btn-create-case")) {
        localStorage.setItem("lastHash", location.hash);
        location.hash = `createNewCase`;
      }
    });
  }

  _generateMarkup() {
    return `<div class="flex flex-col w-full h-full">
    <div class=" flex w-full justify-end px-5 pt-5">
      <button class="btn-create-case bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white  px-2 border border-blue-500 active:bg-blue-800 active:text-white hover:border-transparent rounded-lg">
    + Create New Case
  </button>
      </div>
      <div class="overflow-x-auto shadow-md sm:rounded-lg p-5">
        <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead
          class=" bg-gray-50 dark:bg-zink-50 dark:text-zink-200 ">
          <tr>
            <th scope="col" class="px-6 py-3">Case ID #</th>
            <th scope="col" class="px-6 py-3">Client</th>
            <th scope="col" class="px-6 py-3">Description</th>
            <th scope="col" class="px-6 py-3">Type</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3">Case Created</th>
            <th scope="col" class="px-6 py-3">Assigned To</th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          ${this._filterCases()
            .sort((a, b) => a.caseId.slice(1) < b.caseId.slice(1) && -1)
            .map(
              (caseItem) => `<tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          ><th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <a class="case-anchor text-blue-500" href="#${caseItem.caseId.toLowerCase()}">${
                caseItem.caseId
              }</a>
            </th>
            <td class="px-6 py-4">${this._clientIdToName(
              caseItem.clientId
            )}</td>
            <td class="px-6 py-4">${caseItem.caseDescription}</td>
            <td class="px-6 py-4">${caseItem.caseType}</td>
            <td class="  text-white font-normal"><span class="${
              caseItem.caseStatus.toLowerCase() === "pending"
                ? "bg-yellow-500"
                : caseItem.caseStatus.toLowerCase() === "completed"
                ? "bg-green-500"
                : caseItem.caseStatus.toLowerCase() === "under review"
                ? "bg-blue-500"
                : caseItem.caseStatus.toLowerCase() === "cancelled"
                ? "bg-red-500"
                : caseItem.caseStatus.toLowerCase() === "in progress"
                ? "bg-purple-500"
                : caseItem.caseStatus.toLowerCase() === "issued"
                ? "bg-green-500"
                : caseItem.caseStatus.toLowerCase() === "closed"
                ? "bg-gray-500"
                : caseItem.caseStatus.toLowerCase() === "referred"
                ? "bg-yellow-500"
                : ""
            }  flex items-center rounded justify-center text-center h-min">${
                caseItem.caseStatus
              }</span></td>
            <td class="px-6 py-4">${this.returnDateString(
              caseItem.createdAt
            )}</td>

            <td class="px-6 py-4">
            ${this._employeeIdToName(caseItem.assignedTo)}
            </td>
          </tr>`
            )
            .join("")}
        </tbody>
        </table>
        </div>
        </div>`;
  }
}

export default new RenderCases();
