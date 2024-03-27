"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function Calendar() {
  const handleDateSelect = (selectInfo: any) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      // Crear el evento con la información recogida
      const newEvent = {
        id: Date.now().toString(), // Ejemplo sencillo de generación de ID
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        // location, // Si decides recoger más información como la ubicación
      };

      calendarApi.addEvent(newEvent);

      // Mostrar en consola la información del evento creado
      console.log("Evento creado:", newEvent);
    }
  };
  return (
    <>
      <div className="calendar-container bg-gray-700">
        <FullCalendar
          plugins={[
            resourceTimelinePlugin,
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
          ]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "resourceTimelineWeek,dayGridMonth,timeGridWeek",
          }}
          initialView="dayGridMonth"
          nowIndicator={true}
          editable={true}
          selectable={true}
          selectMirror={true}
          select={handleDateSelect}
          resources={[
            { id: "a", title: "Auditorium A" },
            // { id: "b", title: "Auditorium B", eventColor: "green" },
            // { id: "c", title: "Auditorium C", eventColor: "orange" },
          ]}
          initialEvents={[
            { title: "nice event", start: new Date(), resourceId: "a" },
          ]}
        />
      </div>
    </>
  );
}
