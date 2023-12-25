import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";
export const state = {
  clients: {},
  employees: {},
  tasks: {},
  users: {},
};


export const loadClients = async function (id) {
  try {
    const data = await getJSON(`${API_URL}`);
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
