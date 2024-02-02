import Views from "./views";

class RenderTasks extends Views {
  _parentElement = document.querySelector(".main-panel");
  _errorMessage = `Something Went Wrong, Please Try Again Later`;

  constructor() {
    super();
    this.openCreateNewTask();
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) => {
      window.addEventListener(ev, handler);
    });
  }

  openCreateNewTask() {
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      if (!e.target.closest("button") && !e.target.closest("a")) return;
      if (e.target.classList.contains("btn-create-task")) {
        localStorage.setItem("lastHash", location.hash);
        location.hash = `createNewTask`;
      }
    });
  }

  _generateMarkup() {
    // console.log(this._loggedInConsultant());
    return `<div class="flex flex-col w-full h-full">
    <div class=" flex w-full justify-end px-5 pt-5">
      <button class="btn-create-task bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white  px-2 border border-blue-500 active:bg-blue-800 active:text-white hover:border-transparent rounded-lg">
    + Create New Task
  </button>
  </div>
  <div class="overflow-x-auto shadow-md sm:rounded-lg p-5">  
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Task ID</th>
          <th scope="col" class="px-6 py-3">Task Description</th>
          <th scope="col" class="px-6 py-3">Requested By</th>
          <th scope="col" class="px-6 py-3">Completed</th>
          <th scope="col" class="px-6 py-3">Assigned To</th>
        </tr>
      </thead>
      <tbody>
        ${this._taskData
          .map((task) =>
            task.assignedTo === `${this._loggedInConsultant()}`
              ? `<tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        ><th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            
            <a class="text-blue-500 task-anchor" href="#${task.id}">${
                  task.id
                }</a>
          </th>
          <td class="px-6 py-4">${task.description}</td>
          <td class="px-6 py-4">${this._employeeIdToName(task.requestedBy)}</td>
          <td class="px-6 py-4">${task.completed}</td>
          <td class="px-6 py-4">
          ${this._employeeIdToName(task.assignedTo)} 
          </td>
        </tr>`
              : ""
          )
          .join("")}
      </tbody>
      </table>
      </div>
      </div>`;
  }
}

export default new RenderTasks();
