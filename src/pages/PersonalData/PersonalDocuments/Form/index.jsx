import React from "react";
import Upload from "./Upload";
import { useStyles } from "./styles";
import { Grid } from "@material-ui/core";

export const Form = () => {
  const classes = useStyles();
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Upload />
      </Grid>
    </Grid>
  );
};

export default Form;
