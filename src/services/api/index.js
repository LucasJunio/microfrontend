import axios from "axios";

const api = axios.create({
  baseURL: "https://vileveway-backend-lb-homolog.vileveway.com.br/api/v1",
});

const apiRecovery = axios.create({
  baseURL:
    "https://apirecoverypassword-backend-lb-develop.vileveway.com.br/api/v1",
});

export { api, apiRecovery };
