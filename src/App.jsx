import React, { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core";
import lightTheme from "./styles/themes/light";
import { SnackbarProvider } from "notistack";
import { api } from "./services/api";
import { useSelector } from "react-redux";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { routes } from "./routes";
import ptBR from "date-fns/locale/pt-BR";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Layout from "./components/Layout";
const App = () => {
  const { signed, token } = useSelector((state) => {
    return state.signer;
  });

  useEffect(() => {
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, []);
  return (
    <ThemeProvider theme={lightTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
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
              {signed ? <Layout /> : <Redirect to="/signin" />}
            </Switch>
          </Router>
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default App;
