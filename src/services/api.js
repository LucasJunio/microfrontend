import axios from 'axios';

const api = axios.create({
  baseURL: 'http://18.204.215.95:3000',
});

export default api;
