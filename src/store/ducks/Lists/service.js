import { api } from "../../../services/api/index";

const getListByWhereClause = async (whereClause) => {
  const res = await api.get(`/lists?tipo=${whereClause}`);
  return res;
};

export { getListByWhereClause };
