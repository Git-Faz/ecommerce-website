import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use((config) => {
  const devToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwidXNlcm5hbWUiOiJGYXoiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3Njg0MTg3OTEsImV4cCI6MTc2ODUwNTE5MX0.d2s2zrRWIpb_itKxyLRk7yGrla3mKHY33Joz5fIrxMlpdyDu_ZDguKGaPD9hrXTtKT1Y-CIRAeNTeoVbF8HmeQ";

  if (devToken && devToken.split(".").length === 3) {
    config.headers.Authorization = `Bearer ${devToken}`;
  }

  return config;
});

export default api;
