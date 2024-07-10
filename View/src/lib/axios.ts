import Axios from "axios";
import { env } from "./env";
import { parseCookies } from "nookies";

const { "taskmanagement.token": token } = parseCookies();

export const axios = Axios.create({
  baseURL: `${env.VITE_BASE_URL}/api`,
  timeout: 10000
});

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});