import { takeLatest, call, all, put } from 'redux-saga/effects';

import history from '../../../services/history';
import api from '../../../services/api';

import { returnSignupRequest } from './actions';

export function* Signup({ payload }) {
  try {

    const response = yield call(api.post, '/signup', payload);

    const { token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(returnSignupRequest(response.data))
    
    history.push('/');

  } catch (error) {
    console.log(error.response.data);
  }
}


export default all([
    takeLatest('@signup/SIGNUP_REQUEST', Signup)
]);
