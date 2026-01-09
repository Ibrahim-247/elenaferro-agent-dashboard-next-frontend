import { getLocalStorage, removeLocalStorage } from "@/utils/localStorage";
import {
  getSessionStorage,
  removeSessionStorage,
} from "@/utils/sessionStorage";
import axios from "axios";
import { toast } from "sonner";

const axiosPrivate = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token =
      getSessionStorage("elena_access_token") ||
      getLocalStorage("elena_access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// REQUEST INTERCEPTOR
axiosPrivate.interceptors.response.use(
  (response) => response,

  async (error) => {
    const { response } = error;

    // Network Error
    if (!response) {
      toast.error("Network error — please check your connection.");
      return Promise.reject(error);
    }

    const status = response.status;

    // 401 Unauthorized
    if (status === 401) {
      toast.error("Session expired. Please log in again.");
      removeLocalStorage("elena_access_token");
      removeSessionStorage("elena_access_token");
      if (window.location.pathname !== "/auth/login") {
        window.location.href = "/auth/login";
      }

      return Promise.reject(error);
    }

    // 403 Forbidden
    if (status === 403) {
      toast.error("You don’t have permission to access this resource.");
      return Promise.reject(error);
    }

    // 400 Bad Request
    if (status === 400) {
      toast.error(response.data?.message || "Invalid request.");
      return Promise.reject(error);
    }

    // 404 Not Found
    if (status === 404) {
      toast.error("Requested resource not found.");
      return Promise.reject(error);
    }

    // 429 Too Many Requests
    if (status === 429) {
      toast.error("Too many requests — please slow down.");
      return Promise.reject(error);
    }

    // 500+ Server Error
    if (status >= 500) {
      toast.error("Server error — please try again later.");
      return Promise.reject(error);
    }

    // Default
    toast.error(response.data?.message || "Something went wrong.");
    return Promise.reject(error);
  }
);

export default axiosPrivate;
