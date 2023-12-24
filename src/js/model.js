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


