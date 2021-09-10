import api from "../../../services/api";

const signinPost = async (body) => {
  const res = await api.post(`/signin`, body);
  api.defaults.headers.Authorization = `Bearer ${res.data.token}`;
  return res;
};

export { signinPost };

const sendValidationStatus = () => {
  // headers: {
  //   "Content-Type": "application/json",
  //   Authorization: "Bearer " + localStorage.getItem("token"),
  // },
  const res = await axios.get(`${url}/validation/status`);
  api.defaults.headers.Authorization = `Bearer ${res.data.token}`;
};
