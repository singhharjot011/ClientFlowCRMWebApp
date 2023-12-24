import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";
export const state = {
  clients: {},
  employees: {},
  tasks: {},
};

const persistData = function () {
  localStorage.setItem("myData", JSON.stringify(state));
};

// export const addClient = function () {
//   return {
//     id: "I106",
//     name: "Pelu B",
//     email: "pelu.B@example.com",
//     phone: "+1 905-456-7890",
//     createdBy: "E201",
//     createdAt: "2023-12-23T09:30:00Z",
//     consultant: "E202",
//     isLead: true,
//     cases: [],
//     appointments: [],
//   };
// };

// export const addEmployee = function () {
//   return {
//     employeeId: "E202",
//     name: "Anisha Lee",
//     position: "Assistant Manager",
//   };
// };

// export const addTask = function () {
//   return {
//     id: "T100",
//     description: "Case Update Requested",
//     requestedBy: "E201",
//     notes: "string",
//     status: "Pending",
//     due: "2023-12-25",
//     completed: false,
//     deleted: false,
//     hidden: false,
//     assignedTo: "E202",
//   };
// };

export const loadClients = async function (id) {
  try {
    const data = await getJSON(`${API_URL}`);
    const { clients } = data[0];
    state.clients = clients;
    // state.clients.push(addClient());
    // persistData();
  } catch (err) {
    // Temp err handling
    console.error(`${err}💣💣💣💣`);
    throw err;
  }
};

export const loadEmployees = async function (id) {
  try {
    const data = await getJSON(`${API_URL}`);
    const { employees } = data[1];
    state.employees = employees;
    // state.employees.push(addEmployee());
    // persistData();
  } catch (err) {
    // Temp err handling
    console.error(`${err}💣💣💣💣`);
    throw err;
  }
};

export const loadTasks = async function (id) {
  try {
    const data = await getJSON(`${API_URL}`);
    const { tasks } = data[2];
    state.tasks = tasks;
    // state.tasks.push(addTask());
    // persistData();
  } catch (err) {
    // Temp err handling
    console.error(`${err}💣💣💣💣`);
    throw err;
  }
};
