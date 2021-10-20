import { combineReducers } from "redux";

import signerReducer from "./ducks/Signer";
import emailReducer from "./ducks/Email";
import signupReducer from "./ducks/Signup";
import validationReducer from "./ducks/Validation";
import messageReducer from "./ducks/Message";
import userReducer from "./ducks/User";
import dashboardReducer from "./ducks/Dashboard";

const reducers = combineReducers({
  signer: signerReducer,
  validation: validationReducer,
  user: userReducer,
  email: emailReducer,
  signup: signupReducer,
  message: messageReducer,
  dashboard: dashboardReducer,
});

export default reducers;
