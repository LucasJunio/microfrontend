import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
  IconButton,
  Button,
  Backdrop,
  CircularProgress,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  InputBase,
  Grid,
} from "@material-ui/core";
import ButtonTimer from "../ButtonTimer";
import { useStyles } from "./styles";
import { PhoneIphone, Edit } from "@material-ui/icons";
import {
  validationStatus,
  clearMessageAndStatus,
} from "../../store/ducks/Validation";
import { editCellphone, confirmTokenSMS } from "../../store/ducks/Message";

export const ModalValidateSms = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const {
    validation: { message, celular },
    message: { status: statusMessage, message: messageCellphone, type },
    signer: { token: tokenSigner },
    signup: { token: tokenSignup },
  } = useSelector((state) => state);

  const [openModal, setOpenModal] = useState(false);
  const [cellphone, setCELLPHONE] = useState("");
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [token, setTOKEN] = useState("");

  useEffect(() => {
    if (!!tokenSigner) {
      validateSMSandEmail(tokenSigner, message);
    } else if (!!tokenSignup) {
      validateSMSandEmail(tokenSignup, message);
    }
  }, [tokenSigner, message]);

  useEffect(() => {
    if (statusMessage === "loading" && type === "confirmTokenSMS") {
      setOpenBackDrop(true);
    } else if (statusMessage === "completed" && type === "confirmTokenSMS") {
      setOpenBackDrop(false);
      setOpenModal(false);
      enqueueSnackbar(messageCellphone, {
        variant: "success",
      });
      dispatch(clearMessageAndStatus());
    } else if (statusMessage === "failed" && type === "confirmTokenSMS") {
      setOpenBackDrop(false);
      let message = "Por favor, insira um token de SMS";
      if (!!messageCellphone) {
        message = messageCellphone;
      }
      enqueueSnackbar(message, {
        variant: "error",
      });
      dispatch(clearMessageAndStatus());
    }
  }, [statusMessage]);

  useEffect(() => {
    if (statusMessage === "loading" && type === "editCellphone") {
      setOpenBackDrop(true);
    } else if (statusMessage === "completed" && type === "editCellphone") {
      setOpenBackDrop(false);
      enqueueSnackbar(messageCellphone, {
        variant: "success",
      });
      dispatch(clearMessageAndStatus());
    } else if (statusMessage === "failed" && type === "editCellphone") {
      setOpenBackDrop(false);
      enqueueSnackbar(messageCellphone, {
        variant: "error",
      });
      dispatch(clearMessageAndStatus());
    }
  }, [statusMessage]);

  const validateSMSandEmail = (token, currentMessage) => {
    dispatch(validationStatus(token));
    setCELLPHONE(`(**) ****-${celular.toString().substring(7, 15)}`);
    if (currentMessage) {
      message === "SMS validado" || message === "SMS e Email validado"
        ? setOpenModal(false)
        : setOpenModal(true);
    }
  };

  const handleSendTokenSMS = () => {
    let tokens = { tokenSMS: token };
    if (!!tokenSigner) {
      tokens = { ...tokens, token: tokenSigner };
      dispatch(confirmTokenSMS(tokens));
    } else if (!!tokenSignup) {
      tokens = { ...tokens, token: tokenSignup };
      dispatch(confirmTokenSMS(tokens));
    }
  };

  const changeCell = async () => {
    let body = { celular: cellphone };
    if (!!tokenSigner) {
      body = { ...body, token: tokenSigner };
      dispatch(editCellphone(body));
    } else if (!!tokenSignup) {
      body = { ...body, token: tokenSignup };
      dispatch(editCellphone(body));
    }
  };

  const OnchangeCELLPHONE = (v) => {
    setCELLPHONE(v);
  };
  const OnchangeTOKEN = (v) => {
    setTOKEN(v.replace(/\D/g, ""));
  };
  return (
    <>
      <Backdrop className={classes.backdrop} open={openBackDrop}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={openModal}
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
          <Grid container>
            <Grid item>
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
            </Grid>
            <Grid item>
              <Paper
                component="form"
                className={classes.inputcell}
                elevation={5}
              >
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
            </Grid>
            <Grid item>
              <ButtonTimer style={{ float: "left" }} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSendTokenSMS}
            variant="contained"
            color="primary"
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalValidateSms;
