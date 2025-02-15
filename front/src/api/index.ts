import axios from "axios";
import { Keys } from "@/constants";

export const api = axios.create({
  baseURL: "http://localhost:5000/",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(Keys.AccessToken);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
