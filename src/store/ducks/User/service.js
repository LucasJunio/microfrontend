import { api } from "../../../services/api/index";

const getUsers = async () => {
  const res = await api.get("/user");
  return res;
};

const getRelatedGroups = async (userId) => {
  const res = await api.get(`/group/user-group/${userId}`);
  return res;
};

const postUser = async (body) => {
  const res = await api.post("/user/user-admin", body);
  return res;
};

const getUserById = async (id) => {
  const res = await api.get(`/user/${id}`);
  return res;
};

const editUserById = async (body) => {
  const { id, ...putBody } = body;
  const res = await api.put(`/user/${id}`, putBody);
  return res;
};

const uploadDocuments = async (body) => {
  console.log(body);
  const res = await api.post(`shopkeepers/upload`, body, {
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
  });

  return res;
};

export {
  getUsers,
  getRelatedGroups,
  postUser,
  getUserById,
  editUserById,
  uploadDocuments,
};
