//src/services/authService.js
import apiClient from "../api/axios";
export const authService = {
  async login(email, password) {
    // Mengirim permintaan login ke server
    try {
      const response = await apiClient.post("/login", { email, password });
      return response.data; // Mengembalikan data pengguna yang berhasil login
    } catch (error) {
      throw new Error(
        "Gagal login: " + (error.response?.data?.message || "Terjadi kesalahan")
      );
    }
  },
  async logout() {
    try {
      const response = await apiClient.post("/logout");
      return response.data; // Mengembalikan data logout yang berhasil
    } catch (error) {
      throw new Error(
        "Gagal logout: " + (error.response?.data?.message || "Terjadi kesalahan")
      );
    }
  }
}
