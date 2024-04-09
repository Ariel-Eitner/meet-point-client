import { useCallback } from "react";
import { appointmentService } from "@/services/appointmentService";

const useAppointmentService = () => {
  const createAppointment = useCallback(async (appointment) => {
    const response = await appointmentService.create(appointment);
    return response.data;
  }, []);

  const findAllAppointments = useCallback(async () => {
    const response = await appointmentService.findAll();
    return response.data;
  }, []);

  const findAllAppointmentsByUser = useCallback(async (userId) => {
    const response = await appointmentService.findAllByUser(userId);
    return response.data;
  }, []);

  const findAppointmentById = useCallback(async (id) => {
    const response = await appointmentService.findOne(id);
    return response.data;
  }, []);

  const updateAppointment = useCallback(async (id, appointment) => {
    const response = await appointmentService.update(id, appointment);
    return response.data;
  }, []);

  const deleteAppointment = useCallback(async (id) => {
    const response = await appointmentService.remove(id);
    return response.data;
  }, []);

  return {
    createAppointment,
    findAllAppointments,
    findAllAppointmentsByUser,
    findAppointmentById,
    updateAppointment,
    deleteAppointment,
  };
};

export default useAppointmentService;
