import api from "@/api/api";
import { removeAccessToken } from "@/utils/storage";

export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const logout = async () => {
  await removeAccessToken();
};

export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
}

export const verifyCode = async (data) => {
  const response = await api.post("/auth/verify-code", data);
  return response.data;
}

export const resetPassword = async (data) => {
  const response = await api.post("/auth/reset-password", data);
  return response.data;
}

export const getMe = async () => {
  const response = await api.post("/auth/me");
  return response.data;
}