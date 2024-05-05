import * as model from "./model.js";
import renderLogin from "./views/renderLogin.js";
import renderDashboard from "./views/renderDashboard";
import renderClients from "./views/renderClients.js";
import renderMyClients from "./views/renderMyClients.js";
import renderMenu from "./views/renderMenu.js";
import renderTasks from "./views/renderTasks.js";
import renderCases from "./views/renderCases.js";
import renderNewClient from "./views/renderNewClient.js";
import renderClientDetails from "./views/renderClientDetails.js";
import renderCaseDetails from "./views/renderCaseDetails.js";
import renderNewCase from "./views/renderNewCase.js";
import renderTaskDetails from "./views/renderTaskDetails.js";
import renderNewTask from "./views/renderNewTask.js";

import "core-js/stable"; //polifilling everything else
import "regenerator-runtime/runtime"; //Polifilling async await
import renderTopPanel from "./views/renderTopPanel.js";
import renderCalendar from "./views/renderCalendar.js";

const fetchData = async function () {
  try {
    const id = window.location.hash.slice(1);

    renderClients.renderSpinner();
    renderMenu.triggerEventListeners();

    // 1.) Loading Clients

    // id is not relevant for model at this point yet

    await model.loadClients();
    const { clients } = model.state;

    await model.loadEmployees();
    const { employees } = model.state;

    await model.loadTasks();
    const { tasks } = model.state;

    await model.loadUsers();
    const { users } = model.state;

    // 2.) Rendering Main-Panel based on id
    renderTopPanel.render(clients, employees, tasks, users);
    id === "login" &&
      (renderLogin.render(clients, employees, tasks, users),
      renderLogin.addHandlerLogin(users, setUserLoggedIn));
    id === "dashboard" && renderDashboard.render(clients);
    id === "calendar" &&
      renderCalendar.render(clients, employees, tasks, users);
    id === "allClients" && renderClients.render(clients, employees);
    id === "myClients" &&
      renderMyClients.render(clients, employees, tasks, users);
    id === "tasks" && renderTasks.render(clients, employees, tasks, users);
    id === "cases" && renderCases.render(clients, employees);
    id === "addNewClient" &&
      renderNewClient.render(clients, employees, tasks, users);
    id === "createNewCase" &&
      renderNewCase.render(clients, employees, tasks, users);
    id === "createNewTask" &&
      renderNewTask.render(clients, employees, tasks, users);
    id.startsWith("clientid?") &&
      renderClientDetails.render(clients, employees, tasks, users);
    id.startsWith("caseid?") &&
      renderCaseDetails.render(clients, employees, tasks, users);
    id.startsWith("taskid?") &&
      renderTaskDetails.render(clients, employees, tasks, users);
  } catch (err) {
    renderClients.renderError(err);
  }
};

const saveDataInLocalStorage = () => {
  const tempData = [
    {
      clients: [
        {
          id: "I101",
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "6478500369",
          createdBy: "E201",
          createdAt: "2023-12-12T09:30:00Z",
          clientNote: "Client is out of Country until next month",
          visaType: "Work Permit",
          city: "Toronto",
          province: "ON",
          postalCode: "L6P0P0",
          consultant: "E201",
          cases: [
            {
              caseId: "C12345",
              caseType: "General Inquiry",
              caseStatus: "In Progress",
              caseDescription: "Question regarding Express Entry Draw",
              createdAt: "2023-05-15T08:30:00.000Z",
              assignedTo: "E201",
              clientId: "I101",
              note: [
                {
                  note: "Please Callback Client asap",
                  writtenBy: "E202",
                  writtenAt: "2024-01-15T03:18:58.079Z",
                },
              ],
            },
            {
              caseId: "C12346",
              caseType: "Update Request",
              caseStatus: "Completed",
              createdAt: "2023-08-27T16:45:00.000Z",
              caseDescription: "Client asking for an Update",
              assignedTo: "E202",
              clientId: "I101",
              note: [
                {
                  note: "Provided Update, Closing Case",
                  writtenBy: "E201",
                  writtenAt: "2024-01-15T03:18:58.079Z",
                },
              ],
            },
          ],
          appointments: [
            {
              appointmentId: "A98765",
              date: "2022-12-01",
              time: "15:30",
              location: "123 Main St, City",
              description: "Client consultation",
              host: "E203",
            },
          ],

          isLead: false,
        },
        {
          id: "I102",
          name: "Jane Smith",
          email: "jane.smith@example.com",
          phone: "9876543210",
          createdBy: "E204",
          createdAt: "2022-12-10T11:45:00Z",
          clientNote: "",
          visaType: "Work Permit",
          city: "Toronto",
          province: "ON",
          postalCode: "L6P0P0",
          consultant: "E201",
          cases: [
            {
              caseId: "C12347",
              caseType: "Payment Related",
              caseStatus: "Completed",
              createdAt: "2023-11-10T12:15:00.000Z",
              caseDescription: "Email regarding pending payment",
              assignedTo: "E204",
              clientId: "I102",
              note: [],
            },
          ],
          appointments: [],
          isLead: false,
        },
        {
          id: "I103",
          name: "John B",
          email: "john.B@example.com",
          phone: "9054567890",
          createdBy: "E201",
          createdAt: "2022-12-15T09:30:00Z",
          clientNote: "",
          visaType: "Work Permit",
          city: "Toronto",
          province: "ON",
          postalCode: "L6P0P0",
          consultant: "E202",
          cases: [
            {
              caseId: "C12348",
              caseType: "Update Request",
              caseStatus: "Pending",
              createdAt: "2023-11-10T12:15:00.000Z",
              caseDescription: "Documents Updated",
              assignedTo: "E203",
              clientId: "I103",
              note: [],
            },
            {
              caseId: "C12349",
              caseType: "Payment Related",
              caseStatus: "Under Review",
              createdAt: "2023-11-10T12:15:00.000Z",
              caseDescription: "Payment Cleared",
              assignedTo: "E202",
              clientId: "I103",
              note: [],
            },
          ],
          appointments: [
            {
              appointmentId: "A98766",
              date: "2022-12-01",
              time: "15:30",
              location: "123 Main St, City",
              description: "Client consultation",
              host: "E203",
            },
          ],
          isLead: false,
        },
        {
          id: "I104",
          name: "Shirley Johnson",
          email: "shirley011@example.com",
          phone: "9054567890",
          createdBy: "E201",
          createdAt: "2022-12-15T09:30:00Z",
          clientNote: "",
          visaType: "Student Visa",
          city: "Toronto",
          province: "ON",
          postalCode: "L6P0P0",
          consultant: "E202",
          cases: [],
          appointments: [],
          isLead: true,
        },
      ],
    },
    {
      employees: [
        {
          employeeId: "E201",
          name: "Shawna Stewart",
          position: "Manager",
        },
        {
          employeeId: "E202",
          name: "Anisha Lee",
          position: "Assistant Manager",
        },
        {
          employeeId: "E203",
          name: "Bob Gonsalves",
          position: "Consultant",
        },
        {
          employeeId: "E204",
          name: "Emma Schneider",
          position: "Consultant",
        },
      ],
    },
    {
      tasks: [
        {
          id: "T100",
          description: "Case Update Requested",
          requestedBy: "E201",
          notes: "string",
          status: "Pending",
          due: "2023-12-25",
          completed: false,
          deleted: false,
          hidden: false,
          assignedTo: "E202",
        },
        {
          id: "T101",
          description: "Case Update Requested",
          requestedBy: "E202",
          notes: "string",
          status: "Pending",
          due: "2023-12-25",
          completed: false,
          deleted: false,
          hidden: false,
          assignedTo: "E203",
        },
      ],
    },
    {
      users: [
        {
          username: "ss",
          password: "passwordss",
          displayName: "Shawna Stewart",
          employeeId: "E201",
          position: "manager",
          userLoggedIn: "false",
        },
        {
          username: "al",
          password: "passwordal",
          displayName: "Anisha Lee",
          employeeId: "E202",
          position: "assistant manager",
          userLoggedIn: "false",
        },
        {
          username: "bg",
          password: "passwordbg",
          displayName: "Bob Gonsalves",
          employeeId: "E203",
          position: "consultant",
          userLoggedIn: "false",
        },
        {
          username: "es",
          password: "passwordes",
          displayName: "Emma Schneider",
          employeeId: "E204",
          position: "consultant",
          userLoggedIn: "false",
        },
      ],
    },
  ];
  const myData = JSON.stringify(tempData);
  if (!localStorage.myData) {
    localStorage.setItem("myData", myData);
  }

  // Assuming isLoggedIn is initially false
  if (!localStorage.isLoggedIn) localStorage.setItem("isLoggedIn", "false");
};

const controlAddClient = function (newClient) {
  model.createClientObject(newClient);
};

const controlCreateCase = function (newCase) {
  model.createCase(newCase);
};

const controlUpdateCase = function (updatedCase) {
  model.updateCase(updatedCase);
};

const controlUpdateClient = function (updatedClient) {
  model.updateClient(updatedClient);
};

const setUserLoggedIn = function (username = "", logOutFlag) {
  model.state.users.map((u) =>
    u.username === username ? (u.userLoggedIn = true) : (u.userLoggedIn = false)
  );
  if (logOutFlag) model.state.users.map((u) => u.userLoggedIn === false);
  model.addToLocalStorage();
};

const init = function () {
  saveDataInLocalStorage();
  if (localStorage.isLoggedIn === "false") {
    location.hash = "login";
    renderLogin.addHandlerRender(fetchData);
    renderNewClient.addHandlerCreateNewClient(controlAddClient);
    renderNewCase.addHandlerCreateNewCase(controlCreateCase);
    renderCaseDetails.addHandlerUpdateCase(controlUpdateCase);

    renderClientDetails.addHandlerUpdateClient(controlUpdateClient);
    renderTopPanel.triggerEventListeners();
  }
  if (localStorage.isLoggedIn === "true") {
    renderDashboard.addHandlerRender(fetchData);
    renderNewClient.addHandlerCreateNewClient(controlAddClient);
    renderNewCase.addHandlerCreateNewCase(controlCreateCase);
    renderCaseDetails.addHandlerUpdateCase(controlUpdateCase);

    renderClientDetails.addHandlerUpdateClient(controlUpdateClient);
    renderTopPanel.addHandlerRender(fetchData);
    renderTopPanel.triggerEventListeners();

    if (location.hash === "") location.hash = "dashboard";
  }
};
init();
