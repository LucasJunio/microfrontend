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
  Typography, 
  Container, 
  Card, CardContent
} from "@material-ui/core";
import { PhoneIphone, Edit } from "@material-ui/icons";
import { VictoryChart, VictoryBar, VictoryTheme, VictoryLabel,  VictoryAnimation, VictoryLine, VictoryPie } from 'victory';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from "react-redux";
import ButtonTimer from "../../components/ButtonTimer";
import { validationStatus } from "../../store/ducks/Validation";
import { editCellphone, confirmTokenSMS } from "../../store/ducks/Message";
import Page from "../../components/Page";

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
    dashboard: { chartTransactedAmount, chartMovingAverage, valuePeriod, valueWay },
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

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  

  return (
    <Page>
      <Backdrop className={classes.backdrop} open={openBackDrop}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid container direction='column' style={{ backgroundColor: "#F6F6F6" }} spacing={2} alignItems="center" >
        <Grid item>
          <Grid container direction='row' spacing={3}>                        
            <Grid item xs={12} lg={8}>
              <Card >
                <CardContent>
                  {/* <ResponsiveContainer width="100%" height="100%"> */}
                    <LineChart
                      width={500}
                      height={300}
                      data={data}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >          
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                  {/* </ResponsiveContainer> */}
                </CardContent>
              </Card>
              
            </Grid>           

            <Grid item xs={12} lg={4}>
              {/* <Card >
                <CardContent> */}
                  <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={{ x: 15 }}
                    height={250}
                  >
                    <VictoryLine
                      data={chartMovingAverage}
                    />
                 </VictoryChart>
                {/* </CardContent>
              </Card> */}
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction='row' spacing={3}>
            <Grid item xs={12} lg={6}>
              <Card >
                <CardContent>
                  <Typography variant="h1" component="div" gutterBottom>
                    {valuePeriod}M
                  </Typography>              
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Card >
                <CardContent>
                  <Typography variant="h1" component="div" gutterBottom>
                    {valueWay}%
                  </Typography>
                </CardContent>
              </Card>              
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
    </Page>
  );
}
