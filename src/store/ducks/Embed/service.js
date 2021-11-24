import { api } from "../../../services/api/index";

const getEmbed = async () => {
  const res = await api.get(`/embed`);
  return res;
};

export { getEmbed };
