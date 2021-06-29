import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

// Alphabetically organized

import sigin from './sigin/reducer';
import signup from './signup/reducer';

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    sigin, signup
  })
export default rootReducer;
