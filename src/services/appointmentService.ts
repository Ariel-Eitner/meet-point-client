import axios from "axios";
import { API_URL } from "@/utils/utils";
import { Appointment } from "@/interfaces";
const baseUrl = `${API_URL}/appointments`;

export const appointmentService = {
  create(appointment: Appointment) {
    return axios.post(baseUrl, appointment);
  },
  findAll() {
    return axios.get(baseUrl);
  },
  findAllByUser(userId: string) {
    return axios.get(`${baseUrl}/by-user/${userId}`);
  },
  findOne(id: string) {
    return axios.get(`${baseUrl}/${id}`);
  },
  update(id: string, appointment: Appointment) {
    return axios.put(`${baseUrl}/${id}`, appointment);
  },
  remove(id: string) {
    return axios.delete(`${baseUrl}/${id}`);
  },
};
