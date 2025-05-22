// src/api/axios.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://obscure-space-broccoli-97wjv747rvr439xpq-3000.app.github.dev/api", // Url del espacio de hosting donde está ejecutándose el backend
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default axiosInstance;
