import axios from "axios";
import Cookies from "js-cookie";

const axiosPrivate = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
});

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
      Cookies.remove("louish-token");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
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
