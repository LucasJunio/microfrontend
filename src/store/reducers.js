import { combineReducers } from "redux";

import signerReducer from "./ducks/Signer";
import emailReducer from "./ducks/Email";
import signupReducer from "./ducks/Signup";
import validationReducer from "./ducks/Validation";
import messageReducer from "./ducks/Message";

const reducers = combineReducers({
  signer: signerReducer,
  validation: validationReducer,
  email: emailReducer,
  signup: signupReducer,
  message: messageReducer,
});

export default reducers;
