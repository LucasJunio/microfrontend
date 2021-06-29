import { all } from 'redux-saga/effects';

// Alphabetically organized

import sigin from './sigin/sagas';
import signup from './signup/sagas';

export default function* rootSaga() {
  return yield all([
    sigin, signup
  ]);
}
