import React from "react";
import { ThemeProvider } from "@material-ui/core";
import lightTheme from "./styles/themes/light";
import { SnackbarProvider } from "notistack";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { routes } from "./routes";
import Layout from "./components/Layout";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Email from "./pages/Email";
import Signin from "./pages/Signin";
const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Router>
          <Switch>
            {routes.map(({ path, component, private: privateRoute }) => {
              if (!privateRoute) {
                return (
                  <Route exact key={path} path={path} component={component} />
                );
              }
              return;
            })}
            {/* <Route exact path="/" component={Home} /> */}
            {/* <Route exact path="/signin" component={Signin} /> */}
            {/* <Route exact path="/signup" component={Signup} /> */}
            {/* <Route exact path="/email/:token" component={Email} /> */}
            <Layout />
          </Switch>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
