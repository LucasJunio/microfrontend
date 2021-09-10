import React, { useState } from "react";
import {
  AppBar,
  Badge,
  Hidden,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  Menu,
  AccountCircle,
  Mail,
  Notifications,
  MoreVert,
} from "@material-ui/icons";
import { useStyles } from "./style";
import { useTheme } from "@material-ui/core/styles";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { routes } from "../../../../routes";
import logo from "../../../../assets/images/logo_vileve_way.png";
import AppBarAction from "../../../AppBarActions";
import NavItens from "./NavItem";

function NavBar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = (value) => {
    setMobileMoreAnchorEl(value);
  };

  const handleAnchorEl = (value) => {
    setAnchorEl(value);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            VileveWay Cliente
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <Mail />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <Notifications />
              </Badge>
            </IconButton> */}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreVert />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <AppBarAction
        menuId={menuId}
        mobileMenuId={mobileMenuId}
        handleMobileMoreAnchorEl={handleMobileMenuClose}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        anchorEl={anchorEl}
        isMenuOpen={isMenuOpen}
        handleAnchorEl={handleAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      {/* <BrowserRouter> */}
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <NavItens />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <div
              className={
                // eslint-disable-next-line no-sequences
                (classes.toolbar, classes.header)
              }
            >
              <img src={logo} alt="Logo vileveWay" className={classes.logo} />
            </div>
            <NavItens />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          {routes.map((route) => {
            if (route.private) {
              return (
                <Route
                  exact
                  path={route.path}
                  component={route.component}
                  key={route.path}
                />
              );
            }
            return;
          })}
        </Switch>
      </main>
      {/* </BrowserRouter> */}
    </>
  );
}

export default NavBar;
