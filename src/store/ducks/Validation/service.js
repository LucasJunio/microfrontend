import { api } from "../../../services/api";

const sendValidationStatus = async (token) => {
  const res = await api.get(`/validation/status`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export { sendValidationStatus };
