import api from "@/api/api";
import { getMe } from "../auth";

export const registration = async (formData) => {
  const user_id = await getMe().then((response) => response.data.user.id);
  formData.user_id = user_id;

  const response = await api.post(`/user-forms`, formData);
  return response.data;
};