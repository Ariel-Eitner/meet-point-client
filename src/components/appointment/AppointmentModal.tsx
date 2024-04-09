import React, { ChangeEvent, FormEvent, useState } from "react";

import { es } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Appointment, AppointmentModalProps } from "@/interfaces";
import { appointmentService } from "@/services/appointmentService";
import useAppointmentService from "@/hooks/useAppointmentService";

export default function AppointmentModal({
  isModalOpen,
  setIsModalOpen,
  startTimeBlock,
  endTimeBlock,
  appointmentId,
  toggleFetchTrigger,
  userId,
  setAppointmentId,
}: AppointmentModalProps) {
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const { findAllAppointmentsByUser } = useAppointmentService();

  const formattedStartTime = formatTime(startTimeBlock);
  const formattedEndTime = formatTime(endTimeBlock);

  const [selectedDate, setSelectedDate] = useState(new Date(startTimeBlock));

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const [message, setMessage] = useState("");
  const [startTime, setStartTime] = useState(formattedStartTime);
  const [endTime, setEndTime] = useState(formattedEndTime);

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  const handleStartTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const startDateTime = new Date(selectedDate);
    startDateTime.setHours(
      parseInt(startTime.split(":")[0]),
      parseInt(startTime.split(":")[1])
    );

    const endDateTime = new Date(selectedDate);
    endDateTime.setHours(
      parseInt(endTime.split(":")[0]),
      parseInt(endTime.split(":")[1])
    );

    const appointmentData: Appointment = {
      professionalId: userId,
      startDate: startDateTime,
      endDate: endDateTime,
      message: message,
      isBlock: true,
    };
    try {
      let response;
      if (appointmentId) {
        response = await appointmentService.update(
          appointmentId,
          appointmentData
        );
        console.log("Cita actualizada exitosamente:", response.data);
        toggleFetchTrigger();
      } else {
        response = await appointmentService.create(appointmentData);
        console.log("Cita creada exitosamente:", response.data);
        toggleFetchTrigger();
      }
      alert(response.data.message);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error en la operación de la cita:", error);
    }
  };

  const handleDeleteAppointment = async (e: any, appointmentId: string) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await appointmentService.remove(appointmentId);
      console.log("Cita eliminada exitosamente.");
      toggleFetchTrigger();
      setIsModalOpen(false);
      setAppointmentId("");
    } catch (error) {
      console.error("Error al eliminar la cita:", error);
      // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario.
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-700 p-5 rounded-lg ">
        <h2 className="text-xl font-bold text-white text-center">
          Bloquea tus horarios
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="day"
              className="flex flex-col text-white text-sm font-bold my-2 gap-2 "
            >
              Día
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="EEEE d 'de' MMMM"
                locale={es}
                className="w-full p-2 rounded-md bg-gray-800 text-white"
              />
            </label>
            <label className="block text-white text-sm font-bold mb-2">
              Horario de inicio:
            </label>
            <input
              type="time"
              name="startTime"
              value={startTime}
              onChange={handleStartTimeChange}
              className="w-full p-2 rounded-md bg-gray-800 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Horario de finalización:
            </label>
            <input
              type="time"
              name="endTime"
              value={endTime}
              onChange={handleEndTimeChange}
              className="w-full p-2 rounded-md bg-gray-800 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Mensaje (opcional):
            </label>
            <textarea
              name="message"
              onChange={handleMessageChange}
              className="w-full p-2 rounded-md bg-gray-800 text-white"
              style={{ resize: "none", height: "6rem" }}
              maxLength={300}
              placeholder="Ingresa un mensaje para tus clientes (máx. 300 caracteres)"
            ></textarea>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className={`btn-primary ${appointmentId ? "w-2/3" : "w-full"}`}
            >
              {appointmentId ? "Modificar bloqueo" : "Confirmar bloqueo"}
            </button>
            {appointmentId && (
              <button
                onClick={(e) => handleDeleteAppointment(e, appointmentId)}
                className="btn-danger ml-2"
              >
                Eliminar
              </button>
            )}
            <button
              type="button"
              className="btn-secondary ml-2"
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
