import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import $ from "jquery";
import clsx from "clsx";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import { useSnackbar } from "notistack";

import {
  Backdrop,
  CircularProgress,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  InputBase,
} from "@material-ui/core";

import {
  Menu,
  ChevronLeft,
  ChevronRight,
  ExitToApp,
  Home,
  AssignmentInd,
  PhoneIphone,
  Edit,
  Apps,
} from "@material-ui/icons";

import Alert from "@material-ui/lab/Alert";
import logotipo from "../../assets/images/logo-vileve-pay-cor-140px.png";
import ButtonTimer from "../../components/ButtonTimer";

import {
  sendTokenSms,
  sendValidationStatus,
  changeCellphone,
} from "../../services/api/api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logotipo: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  backdrop: { zIndex: 9999 },

  inputcell: {
    padding: "2px 4px",
    display: "flex",
    float: "left",
    marginLeft: 5,
    // alignItems: "center",
    width: 210,
  },
}));

export default function MiniDrawer() {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [openmodal, setOpenmodal] = React.useState(false);

  const [openbackdrop, setOpenBackDrop] = React.useState(false);

  const handleClickOpen = () => {
    setOpenmodal(true);
  };

  const handleClose = () => {
    //sendtokensms();
  };

  const getIconRender = (i) => {
    if (i === 0) return <HomeIcon />;
    if (i === 1) return <AssignmentIndIcon />;
    if (i === 2) return <AppsIcon />;
  };

  const [token, setTOKEN] = React.useState("");
  const OnchangeTOKEN = (v) => {
    setTOKEN(v.replace(/\D/g, ""));
  };
  const [cellphone, setCELLPHONE] = React.useState("");
  const OnchangeCELLPHONE = (v) => {
    setCELLPHONE(v.replace(/\D/g, ""));
  };

  const Logout = () => {
    localStorage.setItem("token", "");
    history.push("/signup");
  };

  const sendToken = async () => {
    setOpenBackDrop(true);
    await sendTokenSms(token)
      .then((res) => {
        setOpenBackDrop(false);
        enqueueSnackbar("SMS validado com sucesso", { variant: "success" });
      })
      .catch((error) => {
        setOpenBackDrop(false);
        enqueueSnackbar(`${error}`, { variant: "error" });
      });
  };

  const changeCell = async () => {
    setOpenBackDrop(true);
    await changeCellphone(cellphone)
      .then((res) => {
        setOpenBackDrop(false);
        enqueueSnackbar("Celular alterado com sucesso", { variant: "success" });
      })
      .catch((error) => {
        setOpenBackDrop(false);
        enqueueSnackbar(`${error}`, { variant: "error" });
      });
  };

  useEffect(() => {
    const getValidationStatus = async () => {
      await sendValidationStatus()
        .then((res) => {
          res == "SMS validado" || res == "SMS e Email validado"
            ? setOpenmodal(false)
            : setOpenmodal(true);
        })
        .catch((error) => {
          setOpenmodal(true);
        });
    };

    getValidationStatus();
  });

  return (
    <>
      <Backdrop className={classes.backdrop} open={openbackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={openmodal}
        aria-labelledby="form-dialog-title"
        data-keyboard="false"
        data-backdrop="static"
      >
        <DialogTitle id="form-dialog-title">
          Informe o Token enviado por SMS
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Informe o token enviado para seu celular para que confirme sua conta
            no gateway de pagamentos Vileve.
          </DialogContentText>

          <TextField
            style={{ float: "left", width: 90 }}
            autoFocus
            // margin="dense"
            id="name"
            label="Token"
            type="text"
            autoComplete="off"
            variant="outlined"
            inputProps={{
              maxLength: 6,
              onChange: (e) => OnchangeTOKEN(e.target.value),
              value: token,
            }}
            // fullWidth
          />

          <Paper component="form" className={classes.inputcell}>
            <IconButton className={classes.iconButton} aria-label="menu">
              <PhoneIphone />
            </IconButton>
            <InputBase
              placeholder="********"
              inputProps={{
                maxLength: 11,
                onChange: (e) => OnchangeCELLPHONE(e.target.value),
                value: cellphone,
              }}
            />
            <IconButton
              type="button"
              onClick={changeCell}
              className={classes.iconButton}
              aria-label="celular"
            >
              <Edit />
            </IconButton>
          </Paper>

          <ButtonTimer style={{ float: "left" }} />
        </DialogContent>

        <DialogActions>
          <Button onClick={sendToken} variant="contained" color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>

      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" noWrap>
              Bem Vindo ao Gateway de Pagamentos Vileve
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <div className={classes.logotipo}>
              <img src={logotipo} width="100px"></img>
            </div>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </div>
          <Divider />

          <List>
            <Link to="/">
              <ListItem button>
                <ListItemIcon>
                  {" "}
                  <Home />{" "}
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>

            <Link to="/form">
              <ListItem button>
                <ListItemIcon>
                  {" "}
                  <AssignmentInd />{" "}
                </ListItemIcon>
                <ListItemText primary="Cadastro" />
              </ListItem>
            </Link>

            <Link to="/products">
              <ListItem button>
                <ListItemIcon>
                  {" "}
                  <Apps />{" "}
                </ListItemIcon>
                <ListItemText primary="Produtos" />
              </ListItem>
            </Link>
          </List>

          <Divider />

          <Link to="#" onClick={Logout}>
            <List>
              <ListItem button>
                <ListItemIcon>
                  {" "}
                  <ExitToApp />{" "}
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Link>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <h3>Gateway de Pagamentos Vileve Pay</h3>
          <Typography paragraph>
            {/* <Typography variant="h5" gutterBottom>Gateway de Pagamentos Vileve Pay</Typography> */}
            Seja bem vindo à área de administração do seu gateway de pagamentos
            vileve.
          </Typography>

          <div className={classes.root}>
            <Alert severity="warning">
              <b>Atenção:</b> Complete seu cadastro!{" "}
              <a href="#">Clique aqui para acessar o formulário!</a>{" "}
            </Alert>
          </div>
        </main>
      </div>
    </>
  );
}
