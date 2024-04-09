import { API_URL } from "@/utils/utils";
import axios from "axios";
import { BusinessHour } from "@/interfaces";

const baseUrl = `${API_URL}/business-hours`;

export const businessHoursService = {
  create(businessHour: BusinessHour) {
    return axios.post(baseUrl, businessHour);
  },
  findAll() {
    return axios.get(baseUrl);
  },
  findOne(id: string) {
    return axios.get(`${baseUrl}/${id}`);
  },
  update(id: string, businessHour: BusinessHour) {
    return axios.put(`${baseUrl}/${id}`, businessHour);
  },
  delete(id: string) {
    return axios.delete(`${baseUrl}/${id}`);
  },
  findByProfessionalId(professionalId: string) {
    return axios.get(`${baseUrl}/by-professional/${professionalId}`);
  },
};
