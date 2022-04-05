import React from "react";
import { NavLink as RouterLink } from "react-router-dom";

import { IconButton, Tooltip } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";

const ArrowNavigate = ({ linkTo, title }) => (
  <Tooltip title={title}>
    <IconButton component={RouterLink} to={linkTo} area-label="entrar">
      <ArrowForward />
    </IconButton>
  </Tooltip>
);

export default ArrowNavigate;
