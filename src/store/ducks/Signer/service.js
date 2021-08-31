import api from "../../../services/api";

const signinPost = async (body) => {
  const res = await api.post(`/signin`, body);
  api.defaults.headers.Authorization = `Bearer ${res.data.token}`;
  return res;
};

export { signinPost };
