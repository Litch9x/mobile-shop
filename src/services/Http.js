import axios from "axios";
import { BASE_API } from "../shared/constant/App";
import { updateToken } from "../redux-setup/reducers/auth";
import { store } from "../redux-setup/store";
import { refreshToken } from "./Api";
import { useEffect } from "react";

export const Http = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add access token to header Authorization
Http.interceptors.request.use(
  async (config) => {
    const login = store.getState().auth?.infoCustomer;
    if (login.loggedIn) {
      const accessToken = login.currentCustomer.accessToken;
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    // console.log("config", config);
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

// Run API refreshtoken to get new accesstoken
Http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const response = error.response;
    const login = store.getState().auth?.infoCustomer;

    if (
      response?.status === 401 &&
      response?.data?.message === "Token Expired" &&
      login.loggedIn
    ) {
      if (originalRequest._retry) return Promise.reject(error);
      originalRequest._retry = true;

      try {
        const { data } = await refreshToken();
        const newAccessToken = data.accessToken;

        store.dispatch(updateToken(newAccessToken));
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // ✅ RETURN request gốc với token mới
        return Http(originalRequest);
      } catch (refreshError) {
        console.error("🔴 Refresh token failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
