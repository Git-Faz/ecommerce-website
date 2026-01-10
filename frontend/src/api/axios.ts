import axios from "axios";

const api = axios.create(
    {baseURL : "http://localhost:8080/api"}
)

api.interceptors.request.use((config) => {
  // Replace with your actual JWT token
  const devToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJGYXoiLCJpYXQiOjE3Njc3OTk5NzIsInJvbGUiOiJBRE1JTiIsImV4cCI6MTc2Nzg4NjM3Mn0._ExdeC_h3gPAHZeNvuut3mABKqa4D9zmxMRdetd7xIumrk4Q-rmvENyrqHPLvIWrCdevf50uElXONRtZCh1MWg"; 
  config.headers.Authorization = `Bearer ${devToken}`;
  return config;
});

export {api};