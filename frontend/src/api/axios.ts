import axios from "axios";

const api = axios.create(
    {baseURL : "http://localhost:8080/api"}
)

api.interceptors.request.use((config) => {
  // Replace with your actual JWT token
  const devToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwidXNlcm5hbWUiOiJGYXoiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NjgwNzM5ODQsImV4cCI6MTc2ODE2MDM4NH0.U2Rs0ZmbGL2Xe_84QxL08t4y0ncX-0j97tjBmnH6JoUzeId44pcIly1UqHsc_aA9IwEpcLhKb9Y-PEK6oqp3Pg"; 
  config.headers.Authorization = `Bearer ${devToken}`;
  return config;
});

export {api};