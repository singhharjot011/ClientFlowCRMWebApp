import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";
export const state = {
  clients: {},
  employees: {},
  tasks: {},
  users: {},
};

export const addToLocalStorage = function () {
  const myDataArray = [
    { clients: state.clients },
    { employees: state.employees },
    { tasks: state.tasks },
    { users: state.users },
  ];
  localStorage.setItem("myData", JSON.stringify(myDataArray));
};

export const createClientObject = function (data) {
  state.clients.push(data);
  addToLocalStorage();
};

export const createCase = function (caseData) {
  const curClient = state.clients.filter((c) => c.id === caseData.clientId);
  curClient[0].cases.push(caseData);
  addToLocalStorage();
};

export const updateCase = function (updatedCase) {
  const curClient = state.clients.find((c) => c.id === updatedCase.clientId);

  if (curClient) {
    const index = curClient.cases.findIndex(
      (c) => c.caseId === updatedCase.caseId
    );

    if (index !== -1) {
      // Update the existing case
      curClient.cases[index] = updatedCase;
      addToLocalStorage();
    } else {
      console.error(`Case with ID ${updatedCase.caseId} not found.`);
    }
  } else {
    console.error(`Client with ID ${updatedCase.clientId} not found.`);
  }
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
