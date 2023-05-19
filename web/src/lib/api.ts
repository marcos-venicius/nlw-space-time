import { getBrowserCookies } from "@/utils/get-browser-cookies";
import axios from "axios";

const baseApi = axios.create({
  baseURL: "http://localhost:3333/api",
});

const cookies = getBrowserCookies();

if (cookies["auth-token"]) {
  baseApi.defaults.headers.Authorization = `Bearer ${cookies["auth-token"]}`;
}

export const api = baseApi;
