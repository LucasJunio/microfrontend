import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.95.10.35:3000',
});

export default api;
