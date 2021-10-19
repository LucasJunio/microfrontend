import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useStyles } from "./styles";
import { useSnackbar } from "notistack";
import {
  Backdrop,
  CircularProgress,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  InputBase,
  Grid,
  Typography
} from "@material-ui/core";
import { PhoneIphone, Edit } from "@material-ui/icons";
import ButtonTimer from "../../components/ButtonTimer";
import { validationStatus } from "../../store/ducks/Validation";
import { editCellphone, confirmTokenSMS } from "../../store/ducks/Message";
import { useDispatch, useSelector } from "react-redux";
import { VictoryChart, VictoryBar, VictoryTheme, VictoryLabel,  VictoryAnimation, VictoryLine, VictoryPie } from 'victory';

export default function Dashboard() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    validation: { message, celular },
    signer: { token: tokenSigner },
    signup: { token: tokenSignup },
    message: { status: statusMessage, message: messageCellphone, type },
  } = useSelector((state) => state);

  const [openModal, setOpenModal] = useState(false);
  const [openBackDrop, setOpenBackDrop] = useState(false);

  useEffect(() => {
    if (!!tokenSigner) {
      validateSMSandEmail(tokenSigner);
    } else if (!!tokenSignup) {
      validateSMSandEmail(tokenSignup);
    }
  }, [tokenSigner, message, celular]);

  useEffect(() => {
    if (statusMessage === "loading" && type === "confirmTokenSMS") {
      setOpenBackDrop(true);
    } else if (statusMessage === "completed" && type === "confirmTokenSMS") {
      setOpenBackDrop(false);
      setOpenModal(false);
      enqueueSnackbar(messageCellphone, {
        variant: "success",
      });
    } else if (statusMessage === "failed" && type === "confirmTokenSMS") {
      setOpenBackDrop(false);
      let message = "Por favor, insira um token de SMS";
      if (!!messageCellphone) {
        message = messageCellphone;
      }
      enqueueSnackbar(message, {
        variant: "error",
      });
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
    } else if (statusMessage === "failed" && type === "editCellphone") {
      setOpenBackDrop(false);
      enqueueSnackbar(messageCellphone, {
        variant: "error",
      });
    }
  }, [statusMessage]);

  const [token, setTOKEN] = useState("");
  const OnchangeTOKEN = (v) => {
    setTOKEN(v.replace(/\D/g, ""));
  };
  const [cellphone, setCELLPHONE] = useState("");
  const OnchangeCELLPHONE = (v) => {
    setCELLPHONE(v);
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

  const validateSMSandEmail = (token) => {
    dispatch(validationStatus(token));
    setCELLPHONE(`(**) ****-${celular.toString().substring(7, 15)}`);
    message === "SMS validado" || message === "SMS e Email validado"
      ? setOpenModal(false)
      : setOpenModal(true);
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={openBackDrop}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid container direction='column' spacing={4}>
        <Grid item>
          <Grid container direction='row' spacing={4}>
            <Grid item xs={12} lg={6}>
              <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={{ x: 10 }}
                style={{
                  fill: "hsl(355, 20%, 90%)",
                  fontSize: 11
                }}
                height={250}
                horizontal
              >
                <VictoryBar
                  barRatio={0.35}
                  style={{
                    data: { fill: "#005882" }                    
                  }}
                  data={[
                    { x: 1, y: 2 },
                    { x: 2, y: 3 },
                    { x: 3, y: 5 },
                    { x: 4, y: 4 },
                    { x: 5, y: 16 }
                  ]}
                />
              </VictoryChart>
            </Grid>
            <Grid item xs={12} lg={6}>
              <VictoryChart
                  theme={VictoryTheme.material}
                  domainPadding={{ x: 15 }}
                  height={250}
                >
                  <VictoryLine
                    data={[
                      { x: 1, y: -3 },
                      { x: 2, y: 5 },
                      { x: 3, y: 3 },
                      { x: 4, y: 1 },
                      { x: 5, y: -2 },
                      { x: 6, y: -2 },
                      { x: 7, y: 5 }
                    ]}
                  />
                </VictoryChart>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction='row' spacing={4}>
            <Grid item xs={12} lg={6}>
              <Typography variant="h1" component="div" gutterBottom>
                5,14M
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
              <VictoryChart
                  theme={VictoryTheme.material}
                  domainPadding={{ x: 15 }}
                >
                <VictoryBar
                  barRatio={0.8}
                  style={{
                    data: { fill: "#c43a31" }
                  }}
                  // data={sampleData}
                />
              </VictoryChart>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

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
}
