import Views from "./views";

class RenderMyClients extends Views {
  _parentElement = document.querySelector(".main-panel");
  _errorMessage = `Something Went Wrong, Please Try Again Later`;

  _filterClients() {
    const allCases = this._data.map((i) => i.cases).flat();
    this._data.filter((el) => el.map((i) => i.cases).flat());
  }

  _loggedInConsultant() {
    const loggedInUser = this._usersData.filter((u) => u.userLoggedIn);
    return loggedInUser[0].employeeId;
  }

  _generateMarkup() {
    return `<div class="overflow-x-auto shadow-md sm:rounded-lg p-5">
    <table
    class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead
      class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">Client ID</th>
        <th scope="col" class="px-6 py-3">Client Name</th>
        <th scope="col" class="px-6 py-3">Phone Number</th>
        <th scope="col" class="px-6 py-3">Email Address</th>
        <th scope="col" class="px-6 py-3">Latest Case Number</th>
  
        <th scope="col" class="px-6 py-3">Upcoming Appointment</th>
        <th scope="col" class="px-6 py-3">Consultant</th>
      </tr>
    </thead>
    <tbody>
      ${this._data
        .map((client) =>
          client.consultant === `${this._loggedInConsultant()}`
            ? `<tr
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      ><th
          scope="row"
          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
        <a class="text-blue-500 client-anchor" href="#${client.id}">${
                client.id
              }</a>
        </th>
        <td class="px-6 py-4 ${
          this.isClientLead(client.id) ? "text-green-600 font-bold" : ""
        } ">${client.name}</td>
        <td class="px-6 py-4">${this.formatPhoneNumber(client.phone)}</td>
        <td class="px-6 py-4">${client.email}</td>
        <td class="px-6 py-4">
        ${
          client.cases[0] ? client.cases[client.cases.length - 1].caseId : "N/A"
        }
        </td>
        <td class="px-6 py-4">
        ${
          client.appointments[0]?.date
            ? client.appointments[0].date + " at " + client.appointments[0].time
            : "N/A"
        } 
        </td>
        <td class="px-6 py-4">${this._employeeIdToName(client.consultant)}</td>
      </tr>`
            : ""
        )
        .join("")}
    </tbody>
    </table>
    </div>`;
  }
}

export default new RenderMyClients();
