"use client";
import AppointmentModal from "@/components/appointment/AppointmentModal";
import { todayStr } from "@/utils/utils";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { businessHoursService } from "@/services/businessHoursService";
import { appointmentService } from "@/services/appointmentService";
import { BusinessHour, CalendarEvent } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { setBusinessHours } from "@/app/lib/features/businessHours/businessHoursSlice";
import {
  setAppointments,
  updateAppointment,
} from "@/app/lib/features/appointments/appointmentsSlice";

export default function ProfesionalCalendar() {
  const id = useParams().id as string;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startTimeblock, setStartTimeBlock] = useState<string>("");
  const [endTimeblock, setEndTimeBlock] = useState<string>("");
  const [appointmentId, setAppointmentId] = useState<string>("");

  const businessHours = useAppSelector((state) => state.businessHours);
  const dispatch = useAppDispatch();

  // const [businessHours, setBusinessHours] = useState<BusinessHour>();
  const appointments = useAppSelector(
    (state) => state.appointments.appointments
  );

  useEffect(() => {
    // Asegurarse de que id esté disponible (no será en el primer render)
    if (id) {
      businessHoursService
        .findByProfessionalId(id)
        .then((response) => {
          dispatch(setBusinessHours(response.data));
        })
        .catch((error) => {
          console.error("Error al obtener las horas de negocio:", error);
        });
      appointmentService
        .findAllByUser(id)
        .then((response) => {
          dispatch(setAppointments(response.data));
        })
        .catch((error) => {
          console.error("Error al obtener las horas de negocio:", error);
        });
    }
  }, [id, dispatch, appointments.length]);

  const citas = appointments.map((calendarEvent) => ({
    id: calendarEvent._id,
    title: calendarEvent.isBlock
      ? "Bloqueado: " + calendarEvent.message
      : calendarEvent.message,
    start: calendarEvent.startDate,
    end: calendarEvent.endDate,
    backgroundColor: calendarEvent.isBlock ? "#8B0000" : "#3788d8",
    borderColor: calendarEvent.isBlock ? "#ff0000" : "#0b5394",
    textColor: "#ffffff",
  }));

  const handleDateSelect = (selectInfo: any) => {
    setStartTimeBlock(selectInfo.startStr);
    setEndTimeBlock(selectInfo.endStr);

    let calendarApi = selectInfo.view.calendar;
    if (calendarApi.view.type === "timeGridDay") {
      const startTime = new Date(selectInfo.start);
      const endTime = new Date(selectInfo.end);

      // Construir objetos Date para las horas de negocio inicio y fin
      const businessHoursStart =
        businessHours && businessHours.startTime
          ? new Date(
              selectInfo.startStr.split("T")[0] + "T" + businessHours.startTime
            )
          : new Date(selectInfo.startStr);

      const businessHoursEnd =
        businessHours && businessHours.endTime
          ? new Date(
              selectInfo.endStr.split("T")[0] + "T" + businessHours.endTime
            )
          : new Date(selectInfo.endStr);

      // Verificar si el horario seleccionado está dentro de las horas de negocio
      const isStartTimeWithinBusinessHours = startTime >= businessHoursStart;
      const isEndTimeWithinBusinessHours = endTime <= businessHoursEnd;

      if (!isStartTimeWithinBusinessHours || !isEndTimeWithinBusinessHours) {
        alert(
          `El Profesional solo opera desde las ${businessHours?.startTime} hasta las ${businessHours?.endTime}. Por favor, selecciona un horario dentro de este rango.`
        );
        calendarApi.unselect(); // Deshace la selección actual
        return;
      }

      // Verificar los días no laborables
      const nonWorkingDays = businessHours?.daysOfWeek;
      const selectedDay = startTime.getDay(); // Obtiene el día de la semana de la fecha seleccionada

      if (nonWorkingDays && !nonWorkingDays.includes(selectedDay)) {
        alert("La selección está fuera de los días laborables.");
        calendarApi.unselect();
        return;
      }
      setIsModalOpen(true);
    } else {
      calendarApi.changeView("timeGridDay", selectInfo.startStr);
    }
  };

  const handleEventClick = (clickInfo: any) => {
    const { id, title, start, end, backgroundColor, borderColor, textColor } =
      clickInfo.event;

    console.log(
      {
        id,
        title,
        start: start.toISOString(),
        end: end.toISOString(),
        backgroundColor,
        borderColor,
        textColor,
      },
      "ahora see"
    );

    setAppointmentId(id);
    setIsModalOpen(true);
    setStartTimeBlock(start);
    setEndTimeBlock(end);
  };

  console.log(appointments);
  console.log(citas);
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
            left: "title",
            center:
              "prev,resourceTimelineWeek,dayGridMonth,timeGridWeek,next today",
            right: "",
          }}
          initialView="dayGridMonth"
          nowIndicator={true}
          editable={true}
          selectable={true}
          selectMirror={true}
          select={handleDateSelect}
          validRange={{
            start: todayStr,
          }}
          height={"100vh"}
          slotDuration={"01:00:00"}
          businessHours={businessHours}
          events={citas}
          eventClick={handleEventClick}
        />
        {isModalOpen && (
          <>
            <AppointmentModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              startTimeBlock={startTimeblock}
              endTimeBlock={endTimeblock}
              appointmentId={appointmentId}
              setAppointmentId={setAppointmentId}
            />
          </>
        )}
      </div>
    </>
  );
}
