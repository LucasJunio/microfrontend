import React from "react";
import { useHistory } from "react-router";
import { Menu, MenuItem, IconButton, Badge } from "@material-ui/core";
import {
  AccountCircle,
  ExitToApp,
  Mail,
  Notifications,
} from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/ducks/Signer";

export const AppBarActions = ({
  menuId,
  mobileMenuId,
  mobileMoreAnchorEl,
  handleMobileMoreAnchorEl,
  anchorEl,
  handleAnchorEl,
  isMenuOpen,
  isMobileMenuOpen,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const [anchorEl, setAnchorEl] = useState(null);
  //   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  // const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    handleMobileMoreAnchorEl(null);
    // setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    handleAnchorEl(null);
    // setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    dispatch(logOut());
    history.push("/signin");
    // handleAnchorEl(null);
    // // setAnchorEl(null);
    // handleMobileMenuClose();
  };

  const handleProfileMenuOpen = (event) => {
    handleAnchorEl(event.currentTarget);
  };

  //   const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>
        <IconButton
          aria-label="logout"
          aria-controls="primary-logout"
          aria-haspopup="true"
          color="inherit"
        >
          <ExitToApp />
        </IconButton>
        <p>Sair</p>
      </MenuItem>
      {/* <MenuItem onClick={handleMenuClose}>Configurações</MenuItem> */}
      {/* <MenuItem onClick={handleLogout}>My account</MenuItem> */}
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <Mail />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <Notifications />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
    <div>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default AppBarActions;
