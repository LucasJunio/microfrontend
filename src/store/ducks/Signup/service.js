import api from "../../../services/api";

const postCnpj = async (body) => {
  const res = await api.post(`signup/cnpj`, body);
  return res;
};

const postPf = async (body) => {
  const res = await api.post(`/signup/cpf`, body);
  return res;
};

const sendValidationStatus = async () => {
  const res = await api.get(`/validation/status`);
  api.defaults.headers.Authorization = `Bearer ${res.data.token}`;
};

export { postCnpj, postPf, sendValidationStatus };
