import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";
export const state = {
  clients: {},
  employees: {},
  tasks: {},
  users: {},
};

const addToLocalStorage = function () {
  const myDataArray = [
    { clients: state.clients },
    { employees: state.employees },
    { tasks: state.tasks },
    { users: state.users },
  ];
  localStorage.setItem("myData", JSON.stringify(myDataArray));
};

export const createClientObject = function (data) {
  console.log(data);
  console.log(state);
  state.clients.push(data);
  console.log(state);
  // console.log(state);
  addToLocalStorage();
};

export const loadClients = async function (id) {
  try {
    const data = await getJSON(`${API_URL}`);
    console.log(data);
    const { clients } = data[0];
    state.clients = clients;
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
  } catch (err) {
    // Temp err handling
    console.error(`${err}💣💣💣💣`);
    throw err;
  }
};

export const loadUsers = async function (id) {
  try {
    const data = await getJSON(`${API_URL}`);
    const { users } = data[3];
    state.users = users;
  } catch (err) {
    // Temp err handling
    console.error(`${err}💣💣💣💣`);
    throw err;
  }
};

export const createNewClient = function () {};
