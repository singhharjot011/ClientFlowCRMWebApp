import Views from "./views";

class RenderClientDetails extends Views {
  _parentElement = document.querySelector(".main-panel");
  _errorMessage = `Something Went Wrong, Please Try Again Later`;
  _tempHash;
  _curFirstName;
  _curLastName;
  _curEmail;
  _curPhone;
  _curVisaType;
  _curClientNote;
  _curCity;
  _curProvince;
  _curPostalCode;
  _curConsultant;

  _newFirstName;
  _newLastName;
  _newPhone;
  _newEmail;
  _newVisaType;
  _newClientNote;
  _newCity;
  _newProvince;
  _newPostalCode;

  addHandlerUpdateClient(handler) {
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      if (!e.target.closest("button")) return;
      if (e.target.classList.contains("btn-update-client")) {
        this._clientIdValue = this.getInputElement(
          e,
          "client-id-label-class"
        ).textContent;
        let currentClient = this.getCurrentClientDetails(this._clientIdValue);

        //Saving Current Values before updating
        this._curFirstName = currentClient[0].name.split(" ")[0];
        this._curLastName = currentClient[0].name.split(" ")[1];

        this._curEmail = currentClient[0].email;
        this._curPhone = currentClient[0].phone;
        this._curVisaType = currentClient[0].visaType;
        this._curClientNote = currentClient[0].clientNote;
        this._curCity = currentClient[0].city;
        this._curProvince = currentClient[0].province;
        this._curPostalCode = currentClient[0].postalCode;
        this._curConsultant = currentClient[0].consultant;

        //Saving new Values
        this._newFirstName = this.getInputElementValue(e, `fname-input`);
        this._newLastName = this.getInputElementValue(e, `lname-input`);
        this._newPhone = this.getInputElementValue(e, `phone-input`);
        this._newEmail = this.getInputElementValue(e, `email-input`);
        this._newVisaType = this.getInputElementValue(e, `visa-input`);
        this._newClientNote = this.getInputElementValue(e, `note-input`);
        this._newCity = this.getInputElementValue(e, "city-input");
        this._newProvince = this.getInputElementValue(e, "province-input");
        this._newPostalCode = this.getInputElementValue(e, "postal-code-input");

        this._newConsultant = this._employeeNameToId(
          this.getInputElementValue(e, "consultant-input")
        );

        if (
          this._newFirstName === this._curFirstName &&
          this._newLastName === this._curLastName &&
          this._newPhone === this._curPhone &&
          this._newEmail === this._curEmail &&
          this._newVisaType === this._curVisaType &&
          this._newClientNote === this._curClientNote &&
          this._newCity === this._curCity &&
          this._newProvince === this._curProvince &&
          this._newPostalCode === this._curPostalCode &&
          this._newConsultant === this._curConsultant
        )
          return;

        const updatedClientObj = {
          ...currentClient[0],
          id: this._clientIdValue,
          lastUpdatedBy: this.getCurrentLoggedInId(),
          lastUpdatedAt: new Date().toISOString(),
          name: this._newFirstName + " " + this._newLastName,
          email: this._newEmail,
          phone: this._newPhone,
          clientNote: this._newClientNote,
          visaType: this._newVisaType,
          city: this._newCity,
          province: this._newProvince,
          postalCode: this._newPostalCode,
          consultant: this._newConsultant,
        };

        handler(updatedClientObj);
        this.renderMessage(`Client's Details have been Update `);
        setTimeout(function () {
          this._lastHashValue = localStorage.getItem("lastHash")?.slice(1);
          location.hash = this._lastHashValue;
        }, 2 * 1000);
      }
    });
  }

  _generateMarkup() {
    const clientData = this._data.filter(
      (c) => c.id === location.hash.split("#")[2]
    );

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
              class="client-id-label-class block uppercase tracking-wide bg-gray-100 h-min px-1 rounded text-gray-700 text-xs font-bold mb-2"
              >${clientData[0].id}</label
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
              value=${clientData[0].name.split(" ")[0]}
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
              value=${clientData[0].name.split(" ")[1]}
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
              value=${clientData[0].email}
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
              type="text"
              inputmode="numeric"
              placeholder="905-999-9999"
              value="${clientData[0].phone}"
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
                <option ${
                  clientData[0].visaType.startsWith(`Work`) && `selected`
                } >Work Permit</option>
                <option ${
                  clientData[0].visaType.startsWith(`Student`) && `selected`
                }>Student Visa</option>
                <option ${
                  clientData[0].visaType.startsWith(`Super`) && `selected`
                }>Super Visa</option>
                <option ${
                  clientData[0].visaType.startsWith(`Visitor`) && `selected`
                }>Visitor Visa</option>
                <option ${
                  clientData[0].visaType.startsWith(`Express`) && `selected`
                }>Express Entry / PR</option>
                <option ${
                  clientData[0].visaType.startsWith(`Family-Sponsorship`) &&
                  `selected`
                }>Family-Sponsorship</option>
                <option ${
                  clientData[0].visaType.startsWith(`TRV`) && `selected`
                }>TRV</option>
                <option ${
                  clientData[0].visaType.startsWith(`Others`) && `selected`
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
              ${this._employeeData.map(
                (e) =>
                  `<option ${
                    e.employeeId === clientData[0].consultant && `selected`
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
              value="${clientData[0].city}"
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
                <option ${
                  clientData[0].province === `ON` && `selected`
                }>ON</option>
                <option ${
                  clientData[0].province === `QC` && `selected`
                }>QC</option>
                <option ${
                  clientData[0].province === `NS` && `selected`
                }>NS</option>
                <option ${
                  clientData[0].province === `NB` && `selected`
                }>NB</option>
                <option ${
                  clientData[0].province === `MB` && `selected`
                }>MB</option>
                <option ${
                  clientData[0].province === `BC` && `selected`
                }>BC</option>
                <option ${
                  clientData[0].province === `PE` && `selected`
                }>PE</option>
                <option ${
                  clientData[0].province === `SK` && `selected`
                }>SK</option>
                <option ${
                  clientData[0].province === `AB` && `selected`
                }>AB</option>
                <option ${
                  clientData[0].province === `NL` && `selected`
                }>NL</option>
                <option ${
                  clientData[0].province.startsWith("NT") && `selected`
                }>NT (Territory)</option>
                <option ${
                  clientData[0].province.startsWith("YT") && `selected`
                }>YT (Territory)</option>
                <option ${
                  clientData[0].province.startsWith("NU") && `selected`
                }>NU (Territory)</option>
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
              value = "${clientData[0].postalCode}"
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
            placeholder="Comments..."
          >${clientData[0].clientNote}</textarea>
        </div>
        <div class="flex w-full space-x-3 justify-start">
          <button
            class="btn-update-client bg-blue-500 hover:bg-blue-800 text-white font-semibold hover:text-white px-2 border hover:border-blue-500 active:bg-transparent active:text-blue-700 hover:border-transparent rounded-lg"
          >
            Update
          </button>
          <span>  ${
            clientData[0].lastUpdatedAt
              ? "Last Updated:" +
                this.returnDateTimeString(clientData[0].lastUpdatedAt)
              : ""
          } </span>
         
        </div>
      </form>
    </div>
    `;
  }
}

export default new RenderClientDetails();
