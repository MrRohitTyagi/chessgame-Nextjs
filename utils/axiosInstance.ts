import axios from "axios";
import { getToken } from "./cookie";

const baseURL = process.env.NEXT_PUBLIC_BE_BASE_URL;
console.log("baseURL", baseURL);

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: getToken(),
  },
});

export default axiosInstance;
