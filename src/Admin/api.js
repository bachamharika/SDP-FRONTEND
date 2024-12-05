import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9999/admin', // Your backend base URL
});

export default api;
