import axios from "axios";
import { getToken } from "./cookie";

const baseURL = process.env.NEXT_PUBLIC_BE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: getToken(),
  },
});

export default axiosInstance;
