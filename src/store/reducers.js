import { combineReducers } from "redux";

import signerReducer from "./ducks/Signer";
import emailReducer from "./ducks/Email";

const reducers = combineReducers({
  signer: signerReducer,
  email: emailReducer,
});

export default reducers;
