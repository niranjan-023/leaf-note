import axios from "axios";
import { clearAuth } from "./utils/auth";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      clearAuth();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;