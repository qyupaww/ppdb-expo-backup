import { createContext, useState, useEffect, useContext } from "react";
import { usePathname, useRouter } from "expo-router";
import { getAccessToken, setAccessToken, removeAccessToken } from "@/utils/storage";
import { getMe, login } from "@/api/auth";
import { Platform } from "react-native";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await getAccessToken();

      if (token) {
        try {
          const response = await getMe("/auth/me");
          setUser(response.data.user);
          if (!pathname.startsWith("/screen")) {
            router.replace("/screen/home");
          }
        } catch (error) {
          console.log("Token invalid, redirecting to login.");
          await authLogout();
        }
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  const authLogin = async (email, password) => {
    try {
      const response = await login(email, password);
      await setAccessToken(response.data.access_token);
      setUser(response.data.user);
      if (Platform.OS === "web") {
        window.location.href = "/screen";
      } else {
        router.replace("/screen");
      }
    } catch (error) {
      console.log("Login error:", error.response?.data);
      throw error;
    }
  };

  const authLogout = async () => {
    await removeAccessToken();
    setUser(null);
    router.replace("/login");
  };

  const value = {
    user,
    authLogin,
    authLogout,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);