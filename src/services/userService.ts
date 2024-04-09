import axios from "axios";
import { API_URL } from "@/utils/utils";

const baseUrl = `${API_URL}/users`;
console.log(baseUrl);

export const userService = {
  createUser(userData: any) {
    return axios.post(baseUrl, userData);
  },

  getAllUsers() {
    return axios.get(baseUrl);
  },

  getUserById(id: string) {
    return axios.get(`${baseUrl}/${id}`);
  },

  updateUser(id: string, userData: any) {
    return axios.put(`${baseUrl}/${id}`, userData);
  },

  deleteUser(id: string) {
    return axios.delete(`${baseUrl}/${id}`);
  },
  findByEmail(email: string | null | undefined) {
    return axios.get(`${baseUrl}/email/${email}`);
  },
};
