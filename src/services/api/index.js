import axios from "axios";
// const url = "http://3.233.0.255:3001/api/v1";

const api = axios.create({
  baseURL: process.env.REACT_APP_END_POINT,
});

const apiRecovery = axios.create({
  baseURL: process.env.REACT_APP_RECOVERY,
});

export { api, apiRecovery };
