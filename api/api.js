import axios from "axios";
import { getAccessToken } from "@/utils/storage";
import { Alert, Platform } from "react-native";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 detik timeout
});

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API Error:", error);
    if (
      (error.response && error.response.status >= 500 && error.response.status < 600) ||
      error.message === "Network Error"
    ) {
      if (Platform.OS === "web") {
        window.alert("Terjadi kesalahan pada server. Silakan coba lagi nanti.");
      } else {
        Alert.alert(
          "Server Error",
          "Terjadi kesalahan pada server. Silakan coba lagi nanti."
        );
      }
    }
    return Promise.reject(error);
  }
);


export default api;
