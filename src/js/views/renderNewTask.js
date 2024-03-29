import Views from "./views";

class RenderNewTask extends Views {
  _parentElement = document.querySelector(".main-panel");
  _errorMessage = `Something Went Wrong, Please Try Again Later`;

  _generateMarkup() {
    // const taskData = this._taskData.filter(
    //   (i) => i.id === location.hash.split("#")[2]
    // );
    // console.log(taskData);

    return `<div class="p-5 flex ">
            <form class="w-full max-w-lg shadow-lg p-4">
              <div class="flex justify-between">
                <div class="flex space-x-2">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >
                    Task ID
                  </label>
                  <label
                    class="case-id-label-class block uppercase tracking-wide bg-gray-100 h-min px-1 rounded text-gray-700 text-xs font-bold mb-2"
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
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="flex justify-between items-center w-full px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase text-xs tracking-wide text-gray-700 font-bold "
                  >
                    Requested By
                  </label>
                  <label
                  class="block text-gray-700"
                >
                ${this._employeeIdToName(this._loggedInConsultant())}
                </label>
                </div>
              </div>
              <div class="flex  justify-between -mx-3 mb-6">
                <div class="flex justify-between items-center w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase text-xs tracking-wide text-gray-700 font-bold "
                  >
                    Assign To
                  </label>

                </div>
                <div class="relative w-1/2">
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
    
              
          
              
              <div class="flex flex-col mb-6">
                <label
                  for="description"
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >Task Objective</label
                >
                <textarea
                  id="description"
                  rows="1"
                  class="case-description-class block p-2.5 mb-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Provide a brief description of the assignment."
                 
                 ></textarea>
                
              </div>
              <div class="flex w-full space-x-3 justify-start">
                
                <button
                  class="btn-create-task bg-blue-500 hover:bg-blue-800 text-white font-semibold hover:text-white px-2 border hover:border-blue-500 active:bg-transparent active:text-blue-700 hover:border-transparent rounded-lg"
                >
                  Create Task
                </button>
                
              </div>
            </form>
            </div>`;
  }
}

export default new RenderNewTask();
