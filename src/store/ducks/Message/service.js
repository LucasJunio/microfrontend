import { api } from "../../../services/api";

const resendTokenSms = async (token) => {
  const res = await api.get(`/validation/resendsms`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

const changeCellphone = async (putCellphone) => {
  const { token, celular } = putCellphone;
  const res = await api.put(
    `/person/cellphone`,
    { celular },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

const sendTokenSMS = async (tokens) => {
  const { tokenSMS, token } = tokens;
  const res = await api.get(`/validation/sms/${tokenSMS}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export { resendTokenSms, changeCellphone, sendTokenSMS };
