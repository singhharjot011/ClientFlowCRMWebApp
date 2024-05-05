import Views from "./views";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

class RenderCalendar extends Views {
  _parentElement = document.querySelector(".main-panel");
  _errorMessage = `Something Went Wrong, Please Try Again Later`;

  addHandlerRender(handler) {
    ["hashchange", "load", "click"].forEach((ev) => {
      window.addEventListener(ev, handler);
    });
  }

  _generateMarkup() {
    const container = document.createElement("div");

    this._parentElement.appendChild(container);

    window.addEventListener("resize", (e) => {
      this.renderSpinner();
      (() => {
        setTimeout(() => {
          location.reload();
        }, 1000);
      })();
    });

    const calendar = new Calendar(container, {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      initialView: "dayGridMonth",
      // weekends: false,
      // events: [{ title: "Meeting", start: new Date() }],
      droppable: true,
      dateClick: function (info) {
        alert("Clicked on: " + info.dateStr);
        alert("Coordinates: " + info.jsEvent.pageX + "," + info.jsEvent.pageY);
        alert("Current view: " + info.view.type);
        // change the day's background color just for fun
        info.dayEl.style.backgroundColor = "red";
      },
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
