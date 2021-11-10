import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_END_POINT,
});

const apiRecovery = axios.create({
  baseURL: process.env.REACT_APP_RECOVERY,
});

export { api, apiRecovery };
