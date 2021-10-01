import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Button, Grid, Tooltip } from "@material-ui/core";
// import { GroupAdd } from "@material-ui/icons";
// import { useStyles } from "./styles";
// import List from "../../pages/UserSystem/Group/ListView";
// import { GlobalPageStyles } from "../../../styles/GlobalPageStyles";

export const Page = ({ children, Icon, buttonRouter, title = "" }) => {
  //   const classes = useStyles();
  //   const classes = GlobalPageStyles();

  //   const pageTitle = "Lista de Grupos";
  return (
    <Container maxWidth="xl">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>{/* TODO: Implementar breadcrumb */}</Grid>
            <Grid item>
              <Tooltip title={title}>
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to={buttonRouter}
                >
                  <Icon />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>{children}</Grid>
      </Grid>
    </Container>
  );
};

export default Page;
