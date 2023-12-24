import * as model from "./model.js";
import { isLoggedIn } from "./config.js";
import renderLogin from "./views/renderLogin.js";
import renderDashboard from "./views/renderDashboard";
import renderClients from "./views/renderClients.js";
import renderMyClients from "./views/renderMyClients.js";
import renderMenu from "./views/renderMenu.js";
import renderTasks from "./views/renderTasks.js";
import renderCases from "./views/renderCases.js";
import renderNewClient from "./views/renderNewClient.js";
import renderTopPanel from "./views/renderTopPanel.js";

import "core-js/stable"; //polifilling everything else
import "regenerator-runtime/runtime"; //Polifilling async await

const fetchData = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    renderClients.renderSpinner();
    renderMenu.triggerEventListeners();

    // 1.) Loading Clients

    // id is not relevant for model at this point yet

    await model.loadClients(id);

    const { clients } = model.state;

    await model.loadEmployees(id);
    const { employees } = model.state;

    await model.loadTasks(id);
    const { tasks } = model.state;

    // 2.) Rendering Main-Panel based on id
    id === "login" && renderLogin.addHandlerLogin();
    id === "dashboard" && renderDashboard.render(clients);
    id === "allClients" && renderClients.render(clients, employees);
    id === "myClients" && renderMyClients.render(clients, employees);
    id === "tasks" && renderTasks.render(clients, employees, tasks);
    id === "cases" && renderCases.render(clients, employees);
    id === "addNewClient" && renderNewClient.render();
  } catch (err) {
    renderClients.renderError();
    renderDashboard.renderError();
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
          phone: "+1 123-456-7890",
          createdBy: "E201",
          createdAt: "2023-12-12T09:30:00Z",
          consultant: "E201",
          cases: [
            {
              caseId: "C12345",
              status: "Approved",
              type: "Work Visa",
              startDate: "2022-06-15",
              endDate: "2023-06-15",
              assignedTo: "E201",
            },
            {
              caseId: "C12346",
              status: "Approved",
              type: "Permanent Residency",
              startDate: "2021-03-10",
              endDate: null,
              assignedTo: "E202",
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
          phone: "+1 987-654-3210",
          createdBy: "E204",
          createdAt: "2022-12-10T11:45:00Z",
          consultant: "E201",
          cases: [
            {
              caseId: "C67890",
              status: "Pending",
              type: "Student Visa",
              startDate: "2023-01-20",
              endDate: "2024-01-20",
              assignedTo: "E204",
            },
          ],
          appointments: [],
          isLead: true,
        },
        {
          id: "I103",
          name: "John B",
          email: "john.B@example.com",
          phone: "+1 905-456-7890",
          createdBy: "E201",
          createdAt: "2022-12-15T09:30:00Z",
          consultant: "E202",
          cases: [
            {
              caseId: "C12346",
              status: "Approved",
              type: "Work Visa",
              startDate: "2022-06-15",
              endDate: "2023-06-15",
              assignedTo: "E203",
            },
            {
              caseId: "C12347",
              status: "Approved",
              type: "Permanent Residency",
              startDate: "2021-03-10",
              endDate: null,
              assignedTo: "E202",
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
          name: "Pelu B",
          email: "pelu.B@example.com",
          phone: "+1 905-456-7890",
          createdBy: "E201",
          createdAt: "2023-12-23T09:30:00Z",
          consultant: "E202",
          isLead: true,
          cases: [],
          appointments: [],
        },
      ],
    },
    {
      employees: [
        {
          employeeId: "E201",
          name: "John Manager",
          position: "Manager",
        },
        {
          employeeId: "E202",
          name: "Anisha Lee",
          position: "Assistant Manager",
        },
        {
          employeeId: "E203",
          name: "Bob Consultant",
          position: "Consultant",
        },
        {
          employeeId: "E204",
          name: "Emma Consultant",
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
  ];

  const myData = JSON.stringify(tempData);
  localStorage.setItem("myData", myData);
};

const init = function () {
  saveDataInLocalStorage();

  // renderMenu.triggerEventListeners();
  location.hash = "";
  if (!renderLogin.addHandlerLogin()) {
    location.hash = "login";
  }
  if (renderLogin.addHandlerLogin(isLoggedIn)) {
    renderClients.addHandlerRender(fetchData);
    renderNewClient.addHandlerCreateNewClient();
    renderTopPanel.triggerEventListeners();
  }
};
init();
