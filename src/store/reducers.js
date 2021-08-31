import { combineReducers } from "redux";

import signerReducer from "./ducks/Signer";

const reducers = combineReducers({
  signer: signerReducer,
});

export default reducers;
