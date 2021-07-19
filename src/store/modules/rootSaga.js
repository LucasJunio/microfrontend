import { all } from 'redux-saga/effects';

// Alphabetically organized
import account from './account/sagas';
import address from './address/sagas';
import enterprise from './enterprise/sagas';
import person from './person/sagas';
import signin from './signin/sagas';
import signup from './signup/sagas';
import user from './user/sagas';

export default function* rootSaga() {
  return yield all([
    account, address, enterprise, person, user, signin, signup
  ]);
}
