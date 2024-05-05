import Views from "./views";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

class RenderCalendar extends Views {
  _parentElement = document.querySelector(".main-panel");
  _errorMessage = `Something Went Wrong, Please Try Again Later`;

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) => {
      window.addEventListener(ev, handler);
    });
  }

  _generateMarkup() {
    const container = document.createElement("div");
    container.style.padding = "4rem";

    this._parentElement.appendChild(container);

    const calendar = new Calendar(container, {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
      initialView: "dayGridMonth",
      // weekends: false,
      // events: [{ title: "Meeting", start: new Date() }],
      events: [
        {
          title: "All Day Event",
          start: "2024-05-04",
        },
        {
          title: "Long Event",
          start: "2024-05-08",
          end: "2024-05-12",
        },
        {
          id: 999,
          title: "Repeating Event",
          start: "2024-05-05T16:00:00",
        },
        {
          id: 998,
          title: "Repeating Event",
          start: "2024-05-21T16:00:00",
        },
      ],
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,listWeek",
      },
    });

    calendar.render();

    return container.outerHTML;
  }
}

export default new RenderCalendar();
