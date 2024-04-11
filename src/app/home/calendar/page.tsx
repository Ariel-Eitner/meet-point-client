"use client";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import { todayStr } from "@/utils/utils";
import { businessHoursService } from "@/services/businessHoursService";
import { BusinessHour, CalendarEvent } from "@/interfaces";
import { userService } from "@/services/userService";
import { useUser } from "@auth0/nextjs-auth0/client";
import AppointmentModal from "@/components/appointment/AppointmentModal";
import { appointmentService } from "@/services/appointmentService";

export default function Calendar() {
  const { user } = useUser();
  const [businessHours, setBusinessHours] = useState<BusinessHour>();
  const [fetchTrigger, setFetchTrigger] = useState(false);

  const [userId, setUserId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startTimeblock, setStartTimeBlock] = useState<string>("");
  const [endTimeblock, setEndTimeBlock] = useState<string>("");
  const [appointmentId, setAppointmentId] = useState<string>("");

  const handleDateSelect = (selectInfo: any) => {
    setStartTimeBlock(selectInfo.startStr);
    setEndTimeBlock(selectInfo.endStr);

    let calendarApi = selectInfo.view.calendar;
    if (calendarApi.view.type === "timeGridDay") {
      const startTime = new Date(selectInfo.start);
      const endTime = new Date(selectInfo.end);
      const businessHoursStart =
        businessHours && businessHours.startTime
          ? parseInt(businessHours.startTime.split(":")[0], 10)
          : 0;
      const businessHoursEnd =
        businessHours && businessHours.endTime
          ? parseInt(businessHours.endTime.split(":")[0], 10)
          : 24;

      const startHour = startTime.getHours();
      const endHour = endTime.getHours();

      const isWithinBusinessHours =
        startHour >= businessHoursStart &&
        endHour <= businessHoursEnd &&
        endHour > startHour;
      const nonWorkingDays = businessHours?.daysOfWeek;
      const selectedDay = new Date(selectInfo.start).getDay();

      if (!isWithinBusinessHours) {
        alert(
          `El Profesional solo opera desde las ${businessHours?.startTime} hasta las ${businessHours?.endTime}`
        );
        calendarApi.unselect();
        return;
      }
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

  const fetchData = async () => {
    if (!user?.email) {
      return;
    }

    try {
      const userResponse = await userService.findByEmail(user.email);
      const userId = userResponse.data.users[0]._id;
      setUserId(userId);

      const businessHourResponse =
        await businessHoursService.findByProfessionalId(userId);
      if (businessHourResponse.data) {
        setBusinessHours(businessHourResponse.data);
      }
    } catch (error) {
      console.log(
        "Error al buscar los datos del usuario o las horas de negocio:",
        error
      );
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchData();
    }
  }, [user, userService, businessHoursService]);
  useEffect(() => {
    const fetchDataForTrigger = async () => {
      await fetchData();
    };

    fetchDataForTrigger();
  }, [fetchTrigger]);
  const toggleFetchTrigger = () => {
    setFetchTrigger(!fetchTrigger);
  };

  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const fetchAppointmentsByUser = async () => {
      try {
        const response = await appointmentService.findAllByUser(userId);
        console.log(response);
        setCitas(
          response.data.map((calendarEvent: CalendarEvent) => ({
            id: calendarEvent._id,
            title: calendarEvent.isBlock
              ? "Bloqueado: " + calendarEvent.message
              : calendarEvent.message,
            start: calendarEvent.startDate,
            end: calendarEvent.endDate,
            backgroundColor: calendarEvent.isBlock ? "#8B0000" : "#3788d8",
            borderColor: calendarEvent.isBlock ? "#ff0000" : "#0b5394",
            textColor: "#ffffff",
          }))
        );
      } catch (error) {
        console.error("Error al obtener las citas:", error);
      }
    };

    fetchAppointmentsByUser();
  }, [userId, fetchTrigger]);

  const handleEventClick = (clickInfo: any) => {
    const { id, title, start, end, backgroundColor, borderColor, textColor } =
      clickInfo.event;

    console.log({
      id,
      title,
      start: start.toISOString(),
      end: end.toISOString(),
      backgroundColor,
      borderColor,
      textColor,
    });
    setAppointmentId(id);
    setIsModalOpen(true);
    setStartTimeBlock(start);
    setEndTimeBlock(end);
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
              toggleFetchTrigger={toggleFetchTrigger}
              userId={userId}
              setAppointmentId={setAppointmentId}
            />
          </>
        )}
      </div>
    </>
  );
}
