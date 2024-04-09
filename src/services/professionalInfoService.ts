import axios from "axios";
import { API_URL } from "@/utils/utils";

const baseUrl = `${API_URL}/professional-info`;

export const professionalInfoService = {
  create(professionalInfo: any) {
    return axios.post(baseUrl, professionalInfo);
  },
  findAll() {
    return axios.get(baseUrl);
  },
  findOne(id: string) {
    return axios.get(`${baseUrl}/${id}`);
  },
  findOneByUserId(userId: string) {
    return axios.get(`${baseUrl}/by-user/${userId}`);
  },
  update(id: string, professionalInfo: any) {
    return axios.patch(`${baseUrl}/${id}`, professionalInfo);
  },
  remove(id: string) {
    return axios.delete(`${baseUrl}/${id}`);
  },
};
