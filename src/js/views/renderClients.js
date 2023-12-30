import Views from "./views";

class RenderClients extends Views {
  _parentElement = document.querySelector(".main-panel");
  _errorMessage = `Something Went Wrong, Please Try Again Later`;

  constructor() {
    super();
    this.openAddNewClient();
  }

  returnDateString(date) {
    const rawDate = new Date(date);
    const day = rawDate.getDate();
    const month = rawDate.getMonth();
    const year = rawDate.getFullYear();
    return `${month + 1}/${day}/${year}`;
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  openAddNewClient() {
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      if (!e.target.closest("button") && !e.target.closest("a")) return;
      if (e.target.classList.contains("btn-add")) {
        localStorage.setItem("lastHash", location.hash);
        location.hash = `addNewClient`;
      }
      if (e.target.closest("a")?.classList?.contains("client-anchor")) {
        localStorage.setItem("lastHash", location.hash);
        location.hash =
          `clientid?` + e.target.closest("a").getAttribute("href");
      }
      if (e.target.closest("a")?.classList?.contains("case-anchor")) {
        localStorage.setItem("lastHash", location.hash);
        location.hash = `caseid?` + e.target.closest("a").getAttribute("href");
      }
    });
  }

  _generateMarkup() {
    return `<div class="flex flex-col w-full h-full">
    <div class=" flex w-full justify-end px-5 pt-5">
      <button class="btn-add bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white  px-2 border border-blue-500 active:bg-blue-800 active:text-white hover:border-transparent rounded-lg">
    + Add New Client
  </button>
      </div><div class="overflow-x-auto shadow-md sm:rounded-lg p-5">
      <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Client ID</th>
          <th scope="col" class="px-6 py-3">Client Name</th>
          <th scope="col" class="px-6 py-3">Phone Number</th>
          <th scope="col" class="px-6 py-3">Email Address</th>
          <th scope="col" class="px-6 py-3">Created</th>
          <th scope="col" class="px-6 py-3">Latest Case Number</th>
          <th scope="col" class="px-6 py-3">Upcoming Appointment</th>
          <th scope="col" class="px-6 py-3">Consultant</th>

        </tr>
      </thead>
      <tbody>
        ${this._data
          .map(
            (client) => `<tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        ><th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <a class="text-blue-500 client-anchor" href="#${client.id}">${
              client.id
            }</a>
          </th>
          <td class="px-6 py-4">${client.name}</td>
          <td class="px-6 py-4">${this.formatPhoneNumber(client.phone)}</td>
          <td class="px-6 py-4">${client.email}</td>
          <td class="px-6 py-4">${this.returnDateString(client.createdAt)}</td>

          <td class="px-6 py-4">
          ${
            client.cases[0]
              ? client.cases[client.cases.length - 1].caseId
              : "N/A"
          }
          </td>
          <td class="px-6 py-4">
          ${
            client.appointments[0]?.date
              ? client.appointments[0].date +
                " at " +
                client.appointments[0].time
              : "N/A"
          }
          </td>
          <td class="px-6 py-4">${this._employeeIdToName(
            client.consultant
          )}</td>

        </tr>`
          )
          .join("")}
      </tbody>
      </table>
      </div></div>`;
  }
}

export default new RenderClients();
