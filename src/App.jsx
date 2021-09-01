import React from "react";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

import Layout from "./components/Layout"
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Email from "./pages/Email";
import Signin from "./pages/Signin";
const App = () => {
  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/layout" component={Layout} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/email/:token" component={Email} />
          </Switch>
        </Router>
      </SnackbarProvider>
    </>
  );
};

export default App;
