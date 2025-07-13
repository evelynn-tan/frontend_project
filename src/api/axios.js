// src/api/axios.js
import axios from "axios";
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
// 1. Interceptor untuk MENAMBAHKAN token ke setiap request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// 2. Interceptor untuk MENANGANI error pada setiap response
apiClient.interceptors.response.use(
  (response) => {
    // Jika response sukses, langsung kembalikan
    return response;
  },
  (error) => {
    // Cek jika error adalah 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      // Hapus token yang sudah tidak valid
      localStorage.removeItem("token");
      
      // Tampilkan pesan ke pengguna
      alert("Sesi Anda telah berakhir. Silakan login kembali.");
      
      // Redirect ke halaman login. `window.location.href` digunakan untuk
      // me-refresh total aplikasi dan membersihkan semua state.
      window.location.href = "/login";
    }
    
    // Kembalikan error agar bisa ditangani juga di tempat lain jika perlu
    return Promise.reject(error);
  }
);
export default apiClient;
