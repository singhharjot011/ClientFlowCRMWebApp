import Views from "./views";

class RenderDashboard extends Views {
  _parentElement = document.querySelector(".main-panel");
  _errorMessage = `Something Went Wrong, Please Try Again Later`;

  _newLeadsLastWeek() {
    return this._data.filter((i) => {
      return (
        Math.ceil(
          (Date.now() - new Date(i.createdAt).getTime()) /
            (24 * 60 * 60 * 1000) <
            8
        ) && i.cases.length === 0
      );
    }).length;
  }

  _newClientsLastWeek() {
    return this._data.filter((i) => {
      return (
        Math.ceil(
          (Date.now() - new Date(i.createdAt).getTime()) /
            (24 * 60 * 60 * 1000) <
            8
        ) && i.cases.length > 0
      );
    }).length;
  }

  _calculatePendingCases() {
    const pendingCases = this._data
      .map((i) => i.cases)
      .flat()
      .filter(
        (item) =>
          item.caseStatus !== "Completed" &&
          item.caseStatus !== "Closed" &&
          item.caseStatus !== "Cancelled"
      );
    return pendingCases.length;
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) => {
      window.addEventListener(ev, handler);
    });
  }

  _generateMarkup() {
    return `
      <div class="">
        <div
          class="analysis flex flex-wrap gap-10 p-10 text-neutral-200 shadow-sm"
        >
          <div
            class="flex flex-col rounded-xl h-40 w-64 p-5 justify-between bg-gradient-to-r from-fuchsia-600 to-pink-600 relative"
          >
            <img
              class="absolute top-5 right-5 opacity-60 h-16"
              src=${require(`../../img/white-pngs/allClients.png`)}
              alt=""
            />
            <span class="text-3xl">${this._newClientsLastWeek()}</span>
            <span class="text-2xl">New Clients </span
            ><span>Last 7 Days</span>
          </div>
          <div
            class="flex flex-col rounded-xl h-40 w-64 p-5 justify-between bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-red-500 to-red-700 relative"
          >
            <img
              class="absolute top-5 right-5 opacity-60 h-16"
              src=${require(`../../img/white-pngs/cases.png`)}
              alt=""
            />
            <span class="text-3xl">${this._calculatePendingCases()}</span
            ><span class="text-2xl">Open Cases</span
            ><span></span>
          </div>
          <div
            class="flex flex-col rounded-xl h-40 w-64 p-5 justify-between bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500 to-lime-700 relative"
          >
            <img
              class="absolute top-5 right-5 opacity-60 h-16"
              src=${require(`../../img/white-pngs/leads.png`)}
              alt=""
            />
            <span class="text-3xl">${this._newLeadsLastWeek()}</span
            ><span class="text-2xl">New Leads</span><span>Last 7 Days</span>
          </div>
        </div>
        <div class="alerts flex flex-col p-10">
          <h3 class="text-2xl font-semibold p-2">Alerts</h3>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table
              class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="px-6 py-3">Alert Type</th>
                  <th scope="col" class="px-6 py-3">Date and Time</th>
                  <th scope="col" class="px-6 py-3">Client and Case ID</th>
                  <th scope="col" class="px-6 py-3">Description</th>
                  <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Case Updated
                  </th>
                  <td class="px-6 py-4">Dec 7,2023</td>
                  <td class="px-6 py-4">C21547</td>
                  <td class="px-6 py-4">Case has been updated</td>
                  <td class="px-6 py-4 text-right">
                    <a
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >Open</a
                    >
                  </td>
                </tr>
                <tr
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Appointment Reminder
                  </th>
                  <td class="px-6 py-4">Today</td>
                  <td class="px-6 py-4">N/A</td>
                  <td class="px-6 py-4">Team Meeting</td>
                  <td class="px-6 py-4 text-right">
                    <a
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >Open</a
                    >
                  </td>
                </tr>
                <tr
                  class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    New Case Assigned
                  </th>
                  <td class="px-6 py-4">2 Days Ago</td>
                  <td class="px-6 py-4">C21058</td>
                  <td class="px-6 py-4">Study Visa Case Assigned</td>
                  <td class="px-6 py-4 text-right">
                    <a
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >Open</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>`;
  }
}

export default new RenderDashboard();
