import { apiBaseRoute } from "@/config/apiBaseRoute";
import axios from "axios";

export const api = axios.create({
  baseURL: apiBaseRoute
});