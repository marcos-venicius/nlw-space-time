import { getBrowserCookies } from "@/utils/get-browser-cookies";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333/api",
});
