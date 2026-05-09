import axios from "axios";
import { clearAuth } from "./utils/auth";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.response.use(
  (res) => res,

  (error) => {
    if (error.response?.status === 401) {
      clearAuth();

      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default API;