import { api } from "../../../services/api/index";
import { percentUploadImg } from "../User";

const uploadDocuments = async (body, dispatch) => {
  const res = await api.post(`shopkeepers/upload`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (data) => {
      dispatch(percentUploadImg(Math.round((100 * data.loaded) / data.total)));
    },
  });

  return res;
};

const getDocumentsByUser = async ({ id, token }) => {
  const res = await api.get(`documents/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

const getUserById = async (id) => {
  const res = await api.get(`shopkeepers/${id}`);
  return res;
};

const putEditUser = async (body) => {
  const res = await api.put(`shopkeepers`, body);
  return res;
};

export { uploadDocuments, getDocumentsByUser, getUserById, putEditUser };
