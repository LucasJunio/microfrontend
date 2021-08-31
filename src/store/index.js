// import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import reducers from "./reducers";
// import systemUserReducer from "./ducks/systemUser";
// import userReducer from "./ducks/User";
// import signerReducer from "./ducks/Signer";

// const reducers = combineReducers({
//   // systemUser: systemUserReducer,
//   user: userReducer,
//   signer: signerReducer,
// });

const persistConfig = {
  key: "vileveWay-Client",
  version: 1,
  storage,
  // blacklist: ["user", "group"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
