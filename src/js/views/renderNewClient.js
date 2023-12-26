import Views from "./views";

class RenderNewClient extends Views {
  _parentElement = document.querySelector(".main-panel");
  _errorMessage = `Something Went Wrong, Please Try Again Later`;
  _clientId;
  _firstNameValue;
  _lastNameValue;
  _emailAddressValue;
  _phoneValue;
  _visaTypeValue;
  _consultantValue;
  _cityValue;
  _provinceValue;
  _postalCodeValue;
  _noteValue;

  constructor() {
    super();
    this.addHandlerCreateNewClient;
  }

  getInputElement(e, className) {
    return e.target.closest("form").querySelector(`.${className}`).value;
  }

  addHandlerCreateNewClient(handler) {
    console.log("this occurred");
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      if (!e.target.closest("button")) return;
      if (e.target.classList.contains("btn-save")) {
        this._clientId = `I${
          +this._data
            .map((i) => i.id)
            .slice(-1)[0]
            .slice(1) + 1
        }`;
        this._firstNameValue = this.getInputElement(e, `fname-input`);
        this._lastNameValue = this.getInputElement(e, `lname-input`);
        this._emailAddressValue = this.getInputElement(e, `email-input`);
        this._phoneValue = this.getInputElement(e, `phone-input`);
        this._visaTypeValue = this.getInputElement(e, `visa-input`);
        this._consultantValue = this.getInputElement(e, `consultant-input`);
        this._cityValue = this.getInputElement(e, `city-input`);
        this._provinceValue = this.getInputElement(e, `province-input`);
        this._postalCodeValue = this.getInputElement(e, `postal-code-input`);
        this._noteValue = this.getInputElement(e, `note-input`);

        const clientObj = {
          id: this._clientId,
          name: this._firstNameValue.trim() + " " + this._lastNameValue.trim(),
          email: this._emailAddressValue,
          phone: this._phoneValue,
          createdBy: "E201",
          createdAt: new Date().toISOString(),
          consultant: "E201",
          cases: [],
          appointments: [],
          clientNote: this._noteValue,
          isLead: true,
        };
        handler(clientObj);

        // this.renderMessage(`New Client has been Added to the system`);
        // setTimeout(function () {
        //   location.hash = `allClients`;
        // }, 2 * 1000);
      }
      if (e.target.classList.contains("btn-clear")) {
        console.log("Clear");
        console.log(this._parentElement.getElementsByTagName("form"));
        this._parentElement.getElementsByTagName("form")[0].reset();
      }
      if (e.target.closest("button").classList.contains("btn-close")) {
        location.hash = `allClients`;
      }
    });
  }

  _generateMarkup() {
    return `
<div class="p-5">
  <form class="w-full max-w-lg shadow-lg p-4">
    <div class="flex justify-between">
      <div class="flex space-x-2">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          Client ID
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
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-first-name"
        >
          First Name
        </label>
        <input
          class="fname-input appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-first-name"
          type="text"
          placeholder="Jane"
        />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-last-name"
        >
          Last Name
        </label>
        <input
          class="lname-input appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-last-name"
          type="text"
          placeholder="Doe"
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-email"
        >
          Email Address
        </label>
        <input
          class="email-input appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-email"
          type="text"
          placeholder="janedoe@gmail.com"
        />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-phone"
        >
          Phone
        </label>
        <input
          class="phone-input appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-phone"
          type="number"
          placeholder="905-999-9999"
        />
      </div>
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
            class="visa-input block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
            class="consultant-input block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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

    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-city"
        >
          City
        </label>
        <input
          class="city-input appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-city"
          type="text"
          placeholder="Toronto"
        />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-province"
        >
          Province
        </label>
        <div class="relative">
          <select
            class="province-input block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-province"
          >
            <option>ON</option>
            <option>QC</option>
            <option>NS</option>
            <option>NB</option>
            <option>MB</option>
            <option>BC</option>
            <option>PE</option>
            <option>SK</option>
            <option>AB</option>
            <option>NL</option>
            <option>NT (Territory)</option>
            <option>YT (Territory)</option>
            <option>NU (Territory)</option>
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
          for="grid-postalcode"
        >
          Postal Code
        </label>
        <input
          class="postal-code-input appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-postalcode"
          type="text"
          placeholder="L6P 0Z0"
        />
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
        class="note-input block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your thoughts here..."
      ></textarea>
    </div>
    <div class="flex w-full space-x-3 justify-start">
      <button
        class="btn-save bg-blue-500 hover:bg-blue-800 text-white font-semibold hover:text-white px-2 border hover:border-blue-500 active:bg-transparent active:text-blue-700 hover:border-transparent rounded-lg"
      >
        Save
      </button>
      <button
        class="btn-clear bg-blue-500 hover:bg-blue-800 text-white font-semibold hover:text-white px-2 border hover:border-blue-500 active:bg-transparent active:text-blue-700 hover:border-transparent rounded-lg"
      >
        Clear
      </button>
    </div>
  </form>
</div>
`;
  }
}

export default new RenderNewClient();
