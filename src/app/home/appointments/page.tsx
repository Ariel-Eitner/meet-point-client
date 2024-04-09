"use client";
import React, { useState, useEffect } from "react";

import { userService } from "@/services/userService";
import { useUser } from "@auth0/nextjs-auth0/client";
import { appointmentService } from "@/services/appointmentService";
import { CalendarEvent } from "@/interfaces";
import { format } from "date-fns";
import es from "date-fns/locale/es";

export default function AppointmentsPage() {
  const { user } = useUser();
  const [userId, setUserId] = useState<string>("");
  const [citas, setCitas] = useState<CalendarEvent[] | any>([]);

  useEffect(() => {
    // Fetch del ID del usuario
    const fetchUser = async () => {
      try {
        const userResponse = await userService.findByEmail(user?.email);
        const userId = userResponse.data.user._id;
        setUserId(userId);
      } catch (error) {
        console.error("Error al buscar los datos del usuario:", error);
      }
    };

    fetchUser();
  }, []); // Dependencias vacías para que se ejecute solo al montar el componente

  useEffect(() => {
    // Fetch de las citas del usuario
    const fetchAppointmentsByUser = async () => {
      if (!userId) return; // No hacer nada si userId no está establecido
      try {
        const response = await appointmentService.findAllByUser(userId);
        const citasTransformadas = response.data.map(
          (calendarEvent: CalendarEvent) => ({
            id: calendarEvent._id,
            title: calendarEvent.isBlock
              ? "Bloqueado: " + calendarEvent.message
              : calendarEvent.message,
            start: calendarEvent.startDate,
            end: calendarEvent.endDate,
            backgroundColor: calendarEvent.isBlock ? "#8B0000" : "#3788d8",
            borderColor: calendarEvent.isBlock ? "#ff0000" : "#0b5394",
            textColor: "#ffffff",
          })
        );
        setCitas(citasTransformadas);
      } catch (error) {
        console.error("Error al obtener las citas:", error);
      }
    };

    fetchAppointmentsByUser();
  }, [userId]); // Se ejecuta cuando userId cambia

  const handleRemove = (id: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta cita?")) {
      appointmentService
        .remove(id)
        .then(() => {
          // Actualiza el estado para eliminar la cita de la UI
          setCitas(citas.filter((cita: any) => cita.id !== id));
          alert("Cita eliminada con éxito");
        })
        .catch((error) => {
          console.error("Error al eliminar la cita", error);
          alert("No se pudo eliminar la cita");
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 ">
      {citas.length > 0 ? (
        citas.map((cita: any) => (
          <div
            key={cita.id}
            className="bg-white shadow-md rounded-lg overflow-hidden mb-4 text-black"
          >
            <div
              className={`p-4 ${cita.backgroundColor} flex justify-between `}
            >
              <h3 className="font-bold text-lg">{cita.title}</h3>
              <button
                onClick={() => handleRemove(cita.id)}
                className=" py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700 transition-colors duration-150"
              >
                Eliminar
              </button>
            </div>
            <div className="p-4">
              <p className="text-gray-800">
                <span className="font-semibold">Día:</span>{" "}
                {format(new Date(cita.start), "PPPP", { locale: es })}
              </p>
              <p className="text-gray-800">
                <span className="font-semibold">Inicio:</span>{" "}
                {format(new Date(cita.start), "p", { locale: es })}
              </p>
              <p className="text-gray-800">
                <span className="font-semibold">Fin:</span>{" "}
                {format(new Date(cita.end), "p", { locale: es })}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No hay citas programadas.</p>
      )}
    </div>
  );
}
