import React, { ChangeEvent, FormEvent, useState } from "react";

import { es } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Appointment, AppointmentModalProps } from "@/interfaces";
import { appointmentService } from "@/services/appointmentService";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import {
  updateAppointment,
  setAppointments,
  addAppointment,
} from "@/app/lib/features/appointments/appointmentsSlice";
import { formatTime } from "@/utils/utils";
import { useParams } from "next/navigation";

export default function AppointmentModal({
  isModalOpen,
  setIsModalOpen,
  startTimeBlock,
  endTimeBlock,
  appointmentId,
  setAppointmentId,
}: AppointmentModalProps) {
  const userInformation = useAppSelector((state) => state.user.userInformation);
  const dispatch = useAppDispatch();
  const formattedStartTime = formatTime(startTimeBlock);
  const formattedEndTime = formatTime(endTimeBlock);
  const [selectedDate, setSelectedDate] = useState(new Date(startTimeBlock));
  const [message, setMessage] = useState("");
  const [startTime, setStartTime] = useState(formattedStartTime);
  const [endTime, setEndTime] = useState(formattedEndTime);
  const id = useParams().id as string;
  let appointmentData: Appointment;
  const businessHours = useAppSelector((state) => state.businessHours);
  console.log(businessHours);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  const handleStartTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedTime = e.target.value;
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(
      parseInt(selectedTime.split(":")[0]),
      parseInt(selectedTime.split(":")[1])
    );

    const businessStartDateTime = new Date(selectedDate);
    businessStartDateTime.setHours(
      parseInt(businessHours.startTime.split(":")[0]),
      parseInt(businessHours.startTime.split(":")[1])
    );

    const businessEndDateTime = new Date(selectedDate);
    businessEndDateTime.setHours(
      parseInt(businessHours.endTime.split(":")[0]),
      parseInt(businessHours.endTime.split(":")[1])
    );

    if (
      selectedDateTime < businessStartDateTime ||
      selectedDateTime >= businessEndDateTime
    ) {
      alert(
        `Por favor, selecciona un horario de inicio dentro del horario de negocio: ${businessHours.startTime} a ${businessHours.endTime}.`
      );
      // Opcional: ajustar el valor a un límite permitido
      // setStartTime(businessHours.startTime);
    } else {
      setStartTime(selectedTime);
    }
  };

  const handleEndTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedTime = e.target.value;
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(
      parseInt(selectedTime.split(":")[0]),
      parseInt(selectedTime.split(":")[1])
    );

    const startDateTime = new Date(selectedDate);
    startDateTime.setHours(
      parseInt(startTime.split(":")[0]),
      parseInt(startTime.split(":")[1])
    );

    const businessEndDateTime = new Date(selectedDate);
    businessEndDateTime.setHours(
      parseInt(businessHours.endTime.split(":")[0]),
      parseInt(businessHours.endTime.split(":")[1])
    );

    if (
      selectedDateTime <= startDateTime ||
      selectedDateTime > businessEndDateTime
    ) {
      alert(
        `Por favor, selecciona un horario de finalización después del inicio y dentro del horario de negocio: ${businessHours.startTime} a ${businessHours.endTime}.`
      );
      // Opcional: ajustar el valor a un límite permitido
      // setEndTime(businessHours.endTime);
    } else {
      setEndTime(selectedTime);
    }
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

    if (userInformation.role === "professional") {
      appointmentData = {
        professionalId: userInformation._id,
        startDate: startDateTime,
        endDate: endDateTime,
        message: message,
        isBlock: true,
      };
    } else if (userInformation.role === "client") {
      appointmentData = {
        professionalId: id,
        startDate: startDateTime,
        endDate: endDateTime,
        message: message,
        isBlock: false,
        userId: userInformation._id,
      };
    }
    try {
      let response;
      if (appointmentId) {
        response = await appointmentService.update(
          appointmentId,
          appointmentData
        );
        dispatch(updateAppointment(response.data));
        const appointmentResponse = await appointmentService.findAllByUser(
          userInformation._id
        );
        if (appointmentResponse.data) {
          dispatch(setAppointments(appointmentResponse.data));
        }

        console.log("Cita actualizada exitosamente:", response.data);
      } else {
        response = await appointmentService.create(appointmentData);
        dispatch(addAppointment(response.data));
        console.log("Cita creada exitosamente:", response.data);
        const appointmentResponse = await appointmentService.findAllByUser(
          userInformation._id
        );
        if (appointmentResponse.data) {
          dispatch(setAppointments(appointmentResponse.data));
        }
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
      const appointmentResponse = await appointmentService.findAllByUser(
        userInformation._id
      );
      if (appointmentResponse.data) {
        dispatch(setAppointments(appointmentResponse.data));
      }

      setIsModalOpen(false);
      setAppointmentId("");
    } catch (error) {
      console.error("Error al eliminar la cita:", error);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-700 p-5 rounded-lg ">
        <h2 className="text-xl font-bold text-white text-center">
          {userInformation.role === "professional"
            ? "Bloquea tus horarios"
            : "Crea una cita"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="day"
              className="flex flex-col text-white text-sm font-bold my-2 gap-2"
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
              placeholder={
                userInformation.role === "professional"
                  ? "Ingresa un mensaje para tus clientes (máx. 300 caracteres)"
                  : "Ingresa tus preguntas o detalles sobre la cita (máx. 300 caracteres)"
              }
            ></textarea>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className={`btn-primary ${appointmentId ? "w-2/3" : "w-full"}`}
            >
              {appointmentId
                ? userInformation.role === "professional"
                  ? "Modificar bloqueo"
                  : "Modificar cita"
                : userInformation.role === "professional"
                ? "Confirmar bloqueo"
                : "Confirmar cita"}
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
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
