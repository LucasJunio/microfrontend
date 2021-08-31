import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

// Alphabetically organized
import account from './account/reducer';
import address from './address/reducer';
import enterprise from './enterprise/reducer';
import person from './person/reducer';
import signin from './signin/reducer';
import signup from './signup/reducer';
import user from './user/reducer';

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    account, address, enterprise, person, user, signin, signup
  })
export default rootReducer;
