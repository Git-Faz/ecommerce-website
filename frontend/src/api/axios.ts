import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      
      if(isTokenExpired(token)) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "/auth";
        return Promise.reject(new Error("Token expired"));
      }
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}




export default api;
