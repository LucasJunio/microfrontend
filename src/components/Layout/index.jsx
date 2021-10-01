import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "./AppLayout/NavBar";
import { useStyles } from "./styles";

function Layout() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
    </div>
  );
}

export default Layout;
