import React, { useEffect, useMemo, useLayoutEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";

// import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useStyles } from "./styles";
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
import { useDispatch, useSelector } from "react-redux";

// import { signOut } from "../../store3/modules/signin/actions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function MiniDrawer() {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();

  const classes = useStyles();
  // const theme = useTheme();
  const [open, setOpen] = useState(false);

  const [openmodal, setOpenmodal] = useState(false);

  const [openbackdrop, setOpenBackDrop] = useState(false);

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

  const [token, setTOKEN] = useState("");
  const OnchangeTOKEN = (v) => {
    setTOKEN(v.replace(/\D/g, ""));
  };
  const [cellphone, setCELLPHONE] = useState("");
  const OnchangeCELLPHONE = (v) => {
    setCELLPHONE(v);
  };

  const Logout = () => {
    // dispatch(signOut());
    localStorage.setItem("token", "");
    history.push("/signin");
  };

  const sendToken = async () => {
    setOpenBackDrop(true);
    const res = await sendTokenSms(token);
    if (res) {
      setOpenBackDrop(false);
      setOpenmodal(false);
      enqueueSnackbar("SMS validado com sucesso", {
        variant: "success",
      });
    } else {
      setOpenBackDrop(false);
      enqueueSnackbar(`${error}`, { variant: "error" });
    }
    const history = useHistory();

    // await sendTokenSms(token)
    //   .then((res) => {
    //     setOpenBackDrop(false);
    //     setOpenmodal(false);
    //     enqueueSnackbar("SMS validado com sucesso", { variant: "success" });
    //   })
    //   .catch((error) => {
    //     setOpenBackDrop(false);
    //     enqueueSnackbar(`${error}`, { variant: "error" });
    //   });
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
    sendValidationStatus()
      .then((res) => {
        setCELLPHONE("(**) ****-" + res.celular.toString().substring(7, 15));
        res.message === "SMS validado" || res.message === "SMS e Email validado"
          ? setOpenmodal(false)
          : setOpenmodal(true);
      })
      .catch((error) => {
        console.log(error);
        setOpenmodal(true);
      });
  }, []);

  return (
    <>
      <Backdrop className={classes.backdrop} open={openbackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        open={false}
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
      <Button onClick={() => history.push("/signin")}>Bolinha louca</Button>
    </>
  );
}
