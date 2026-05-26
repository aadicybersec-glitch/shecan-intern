import axios from "axios";

// Dynamically determine the backend API route. Falls back to port 5000.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatic interceptor injection to attach JWT token for secure admin dashboards
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("shecan_admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
