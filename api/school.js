import api from "@/api/api";

export const getSchools = async () => {
  const response = await api.get("/school");
  return response.data;
};