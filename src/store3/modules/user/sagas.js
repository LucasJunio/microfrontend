import { takeLatest, call, all, put } from "redux-saga/effects";

import { api } from "../../../services/api/api";

export function* AddAccount({ payload, resolve }) {
  try {
    const response = yield call(api.post, "/account", payload);
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* ReadAccount() {
  try {
    let response = yield call(api.get, "/account");
  } catch (error) {
    console.log(error.response.data.rows);
  }
}

export function* UpdateAccount({ payload, resolve }) {
  try {
    const response = yield call(api.put, "/account", payload);

    console.log(response.data);
  } catch (error) {
    console.log(error.response.data);
  }
}

export default all([
  takeLatest("@account/ADD_ACCOUNT", AddAccount),
  takeLatest("@account/READ_ACCOUNT", ReadAccount),
  takeLatest("@account/UPDATE_ACCOUNT", UpdateAccount),
]);
