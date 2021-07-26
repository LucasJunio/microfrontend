import React from "react";
import { Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { SnackbarProvider, useSnackbar } from "notistack";
import store from "../store";
import Route from "./Route";
import history from "../services/history";

import Signup from "../pages/Signup";
import Home from "../pages/home";
import Email from "../pages/Email";

export default function Routes() {
  return (
    <>
      <Provider store={store}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact path="/" component={Home} isPrivate />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/email*" component={Email} />
            </Switch>
          </ConnectedRouter>
        </SnackbarProvider>
      </Provider>
    </>
  );
}
