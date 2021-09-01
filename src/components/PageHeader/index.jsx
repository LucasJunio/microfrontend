import React from "react";
// import type { FC } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";

import { Breadcrumbs, Button, Grid, Link, Typography } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import clsx from "clsx";
// import { routeExists } from "routes/app.routes";

import { useStyles } from "./styles";

/**
 * Interface to define the map between route -> Breadcrumb Name
 * @example
 * const breadcrumbNameMap: BreadcrumbNameMap = {
    '/app': 'Início',
    '/app/equipment': 'Equipamentos',
    '/app/equipment/location': 'Posições',
    '/app/equipment/location/create': 'Cadastro de Posições',
  };
 */
// export interface BreadcrumbNameMap {
//   [key: string]: string;
// }

// interface LinkRouterProps extends LinkProps {
//   to: string;
// }

// /**
//  * Interface for creation of Button(s) Action in the header
//  */
// export interface ButtonsAction {
//   /**
//    * Route Path to redirect when button clicked
//    */
//   to: string;
//   /**
//    * Button Title
//    */
//   title: string;
//   /**
//    * Button Variant
//    * @options 'text' | 'outlined' | 'contained'
//    */
//   variant?: "text" | "outlined" | "contained";
// }

// interface PageHeaderProps {
//   className?: string;
//   locationPath: string;
//   title: string;
//   buttons?: ButtonsAction[];
//   breadcrumbNameMap: BreadcrumbNameMap;
// }

const LinkRouter = (props) => (
  <Link variant="body1" color="inherit" {...props} component={RouterLink} />
);

const PageHeader = (props) => {
  const { className, locationPath, title, buttons, breadcrumbNameMap } = props;

  const classes = useStyles();
  const history = useHistory();

  const handleGoBack = () => {
    history.go(-1);
  };

  const pathnames = locationPath.split("/").filter((x) => x);

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justify="space-between"
      spacing={3}
    >
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;

            if (last) {
              return (
                <Typography color="textPrimary" key={to}>
                  {breadcrumbNameMap[to]}
                </Typography>
              );
            }
            // if (routeExists(to)) {
            //   return (
            //     <LinkRouter color="inherit" to={to} key={to}>
            //       {breadcrumbNameMap[to]}
            //     </LinkRouter>
            //   );
            // }
            return (
              <Typography color="textPrimary" key={to}>
                {breadcrumbNameMap[to]}
              </Typography>
            );
          })}
        </Breadcrumbs>
        <Typography variant="h3" color="textPrimary" className={classes.title}>
          {title}
        </Typography>
      </Grid>
      <Grid item>
        {buttons &&
          buttons.map((button) => {
            if (button.to.trim()) {
              return (
                <Button
                  key={button.to}
                  component={RouterLink}
                  variant={button.variant || "text"}
                  to={button.to}
                  className={classes.button}
                >
                  {button.title}
                </Button>
              );
            }
            return (
              <Button
                key={button.title.replace(" ", "_")}
                variant={button.variant || "text"}
                onClick={handleGoBack}
                className={classes.button}
              >
                {button.title}
              </Button>
            );
          })}
      </Grid>
    </Grid>
  );
};

export default PageHeader;
