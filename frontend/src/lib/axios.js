import axios from "axios";
import { getGuestId } from "./guest";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080/api" : "/api";

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
    config.headers["x-guest-id"] = getGuestId();
    return config;
});

export default api;