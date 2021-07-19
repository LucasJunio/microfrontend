import { takeLatest, call, all, put } from 'redux-saga/effects';

import api from '../../../services/api';

import { returnSignupRequest } from './actions';

export function* Signup({ payload }) {
  try {

    console.log("Resultado do payload: ")  
    console.log(payload)  

    // const response = yield call(api.post, '/signup', payload);

    // const { token } = response.data;

    // api.defaults.headers.Authorization = `Bearer ${token}`;

    // yield put(returnSignupRequest(response.data))      

  } catch (error) {
    console.log(error.response.data);
  }
}


export default all([
    takeLatest('@signup/SIGNUP_REQUEST', Signup)
]);
