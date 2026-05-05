import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// AUTO LOGOUT ON TOKEN EXPIRE
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;