import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "access_token";

// Simpan token
export const setAccessToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (err) {
    console.error("Gagal menyimpan token:", err);
  }
};

// Ambil token
export const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (err) {
    console.error("Gagal mengambil token:", err);
    return null;
  }
};

// Hapus token (Logout)
export const removeAccessToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (err) {
    console.error("Gagal menghapus token:", err);
  }
};
