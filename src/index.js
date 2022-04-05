import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./store";

let persistor = persistStore(store);

// TODO: Limpar o store quando isReload for do tipo "reload"
// const [isReload] = performance
//   .getEntriesByType("navigation")
//   .map((nav) => nav.type);
// console.log(isReload);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
