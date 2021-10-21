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
  Card, CardContent, Link
} from "@material-ui/core";
import { PhoneIphone, Edit } from "@material-ui/icons";
import { VictoryChart, VictoryBar, VictoryTheme, VictoryLabel,  VictoryAnimation, VictoryLine, VictoryPie } from 'victory';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import PropTypes from 'prop-types';
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

  const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
          Z`;

  const colors = scaleOrdinal(schemeCategory10).range();

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  TriangleBar.propTypes = {
    fill: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  };

  return (
    <Page>
      <Backdrop className={classes.backdrop} open={openBackDrop}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid container alignItems="center" spacing={2}>                        
        <Grid item xs={12} lg={6}>
          <Paper elevation={4}> 
            <ResponsiveContainer width="99%" aspect={2}>
              <LineChart
                width={500}
                height={300}
                data={chartTransactedAmount}
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
            </ResponsiveContainer>
          </Paper>              
        </Grid>           
        
        <Grid item xs={12} lg={3}>
          <Paper elevation={4}>                 
              <ResponsiveContainer width="99%" aspect={.98}>
              <BarChart
                width={500}
                height={300}
                data={chartMovingAverage}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="female" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                  {chartMovingAverage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={3}>
          <Grid container direction='column' spacing={2} alignItems="">
            <Grid item >
              <Paper  elevation={4}> 
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Recent Deposits
                </Typography>
                <Typography component="p" variant="h4">
                  ${valuePeriod}
                </Typography>
                <Typography color="textSecondary" >
                  on 15 March, 2019
                </Typography>
                {/* <ResponsiveContainer width="99%" aspect={2}>
                  <Typography variant="h1" component="div" gutterBottom>
                    {valuePeriod}M
                  </Typography> 
                </ResponsiveContainer>              */}
              </Paper>  
            </Grid>
            <Grid item >
              <Paper  elevation={4}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Recent Deposits
                  </Typography>
                  <Typography component="p" variant="h4">
                    ${valuePeriod}
                  </Typography>
                  <Typography color="textSecondary" >
                    on 15 March, 2019
                  </Typography>
                {/* <ResponsiveContainer width="99%" aspect={2}>
                  <Typography variant="h1" component="div" gutterBottom>
                    {valueWay}%
                  </Typography>
                </ResponsiveContainer>              */}
              </Paper>         
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
