import axios from "axios";

const api = axios.create({
  baseURL: "https://vileveway-backend-lb-develop.vileveway.com.br/api/v1",
});

export default api;
