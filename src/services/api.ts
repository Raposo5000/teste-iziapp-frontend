import axios from 'axios';

const apiUrl = import.meta.env.REACT_APP_API_URL || "http://localhost:5002"

const api = axios.create({
  baseURL: apiUrl,
});

const token = localStorage.getItem("token")

api.defaults.headers.common.Authorization = `Bearer ${token}`

api.interceptors.response.use(
  response => {
    return response;
  },
  
  error => {
    if (!error.response || error.response.status === 401) {
      window.location.href = "/login"
      localStorage.clear()
    }
    return Promise.reject(error);
  }
);

export default api;