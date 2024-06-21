"use client";
import axios from "axios";
import { getAccessToken, getCurrentUser } from "../firebase";
import { parseCookies } from "nookies";

const useAxiosAuth = () => {
  const axiosAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  });

  axiosAuth.interceptors.request.use(
    async config => {
      if (!config.headers["Authorization"]) {
        const cookies = parseCookies();
        const token = cookies.accessToken || (await getAccessToken());
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );

  axiosAuth.interceptors.response.use(
    response => response,
    async error => {
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const token = (await getCurrentUser().catch(error => {}))?.accessToken;

        if (token) {
          prevRequest.headers["Authorization"] = `Bearer ${token}`;
          return axiosAuth(prevRequest);
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosAuth;
};

export default useAxiosAuth;
