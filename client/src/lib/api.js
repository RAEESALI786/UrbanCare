import axios from "axios";
import { auth } from "./firebase";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(async (config) => {
  if (auth?.currentUser) {
    const token = await auth.currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
