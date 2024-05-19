import Views from "./views";
// import { Calendar } from "@fullcalendar/core";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import listPlugin from "@fullcalendar/list";
// import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

class RenderCalendar extends Views {
  _parentElement = document.querySelector(".main-panel");
  _errorMessage = `Something Went Wrong, Please Try Again Later`;
  _container = document.createElement("div");

  constructor() {
    super();
    // this.initCalendar();
  }

  addHandlerRender(handler) {
    ["load"].forEach((ev) => {
      window.addEventListener(ev, handler);
    });
  }

  initCalendar() {
    var calendar = new FullCalendar.Calendar(this._container, {
      initialView: "dayGridMonth",
    });
    calendar.render();
    return this._container;
  }

  _generateMarkup() {
    const res = this.initCalendar();

    return res;
  }
}

export default new RenderCalendar();
