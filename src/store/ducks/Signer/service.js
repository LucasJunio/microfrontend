import { api, apiRecovery } from "../../../services/api";

const signinPost = async (body) => {
  const res = await api.post(`/signin`, body);
  api.defaults.headers.Authorization = `Bearer ${res.data.token}`;
  return res;
};

const recoverPassword = async (body) => {
  const res = await apiRecovery.put("/password", body);
  return res;
};

const sendEmailRecover = async (body) => {
  const res = await apiRecovery.post("/recovery", body);
  return res;
};

export { signinPost, recoverPassword, sendEmailRecover};
