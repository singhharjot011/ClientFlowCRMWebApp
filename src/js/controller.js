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

const init = function () {
  // renderMenu.triggerEventListeners();

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
