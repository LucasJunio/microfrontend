import { api } from "../../../services/api/api";

const getGroups = async () => {
  try {
    const res = await api.get("/group");
    return res;
  } catch (error) {
    const res = error.response.data;
    return res;
  }
};

const postGroupRelationship = async (body) => {
  try {
    const res = await api.post("/group/user-group", body);
    return res;
  } catch (error) {
    return error.response.data.message;
  }
};

const putGroupRelationShipById = async (body) => {
  const { id, putBody } = body;
  const res = await api.put(`group/user-group/${id}`, putBody);
  return res;
};

export { getGroups, postGroupRelationship, putGroupRelationShipById };
