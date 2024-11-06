import axios from "axios";
import { getLocalStorage } from "./LocalStorage";

const axiosInstance = axios.create({
  // baseURL: `http://localhost:8000/api`,
  // baseURL: `https://cliniccarebackend.onrender.com/api`,
  baseURL: `https://cliniccare.surajsingh.online/api`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getLocalStorage("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401 && error.response.data.message === "Token has expired") {
      //   toast.error("Token Expired Please Login again");
      setTimeout(() => {
        localStorage.clear();
        window.location.href = "/auth/login";
      }, 2000);
    }
    if (error.response && error.response.status === 401 && error.response.data.message === "Unauthorized request: Token is invalid due to a new login session") {
      setTimeout(() => {
        localStorage.clear();
        window.location.href = "/auth/login";
      }, 2000);

      //   toast.error("Token Expired Please Login again");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
