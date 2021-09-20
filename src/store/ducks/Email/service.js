import api from "../../../services/api";

const emailValidationGet = async (token) => {
  const res = await api.get(`/validation/email/${token}`);
  return res;
};

export { emailValidationGet };
