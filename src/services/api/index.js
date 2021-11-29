import axios from "axios";
// const url = "http://3.233.0.255:3001/api/v1";

const api = axios.create({
  baseURL: process.env.REACT_APP_END_POINT,
  // withCredentials: false,
  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  // },
});

const apiRecovery = axios.create({
  baseURL: process.env.REACT_APP_RECOVERY,
  // withCredentials: false,
  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  // },
});

export { api, apiRecovery };
