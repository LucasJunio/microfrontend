import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_END_POINT,
  timeout: 5000,
});

const apiRecovery = axios.create({
  baseURL: process.env.REACT_APP_RECOVERY,
  timeout: 5000,
});

export { api, apiRecovery };
