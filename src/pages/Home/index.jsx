import React, { useEffect, useState } from "react";
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
  Card,
  CardContent,
  Link,
} from "@material-ui/core";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryLabel,
  VictoryAnimation,
  VictoryLine,
  VictoryPie,
} from "victory";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { getDashboard } from "../../store/ducks/Dashboard";
import Page from "../../components/Page";

export default function Dashboard() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    dashboard: {
      chartTransactedAmount,
      chartMovingAverage,
      valuePeriod,
      valueWay,
    },
  } = useSelector((state) => state);

  const [openBackDrop, setOpenBackDrop] = useState(false);
  let d = new Date();

  const [startDate, setStartDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    checkDateValidation(startDate, endDate);
  }, [startDate, endDate]);

  const checkDateValidation = (startDate, endDate) => {
    if (
      new Date(startDate) > new Date(endDate) ||
      new Date(endDate) < new Date(startDate)
    ) {
      enqueueSnackbar("Data inicial não pode ser maior que a data final", {
        variant: "error",
      });
    } else {
      dispatch(getDashboard({ startDate, endDate }));
    }
  };

  const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${
    x + width / 2
  }, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
    y + height
  } ${x + width}, ${y + height}
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

      <h3>Selecione um período:</h3>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <KeyboardDatePicker
            id="emissao"
            name="pessoa.emissao"
            variant="dialog"
            inputVariant="outlined"
            margin="normal"
            label="Data início"
            size="small"
            // className={classes.fieldCentralization}
            maxDate={new Date()}
            format="dd/MM/yyyy"
            value={startDate}
            onChange={setStartDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            invalidLabel="Date of purchase"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <KeyboardDatePicker
            id="emissao"
            name="pessoa.emissao"
            variant="dialog"
            inputVariant="outlined"
            margin="normal"
            label="Data fim"
            size="small"
            // className={classes.fieldCentralization}
            // maxDate={new Date}
            format="dd/MM/yyyy"
            value={endDate}
            onChange={setEndDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            invalidLabel="Date of purchase"
            fullWidth
            required
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} lg={4}>
          <div style={{ position: "absolute", paddingLeft: "10px" }}>
            <h3>Gráfico1</h3>
          </div>
          <Paper
            elevation={4}
            style={{
              width: "100%",
              height: "100%",
              padding: "10px",
              paddingTop: "30px",
            }}
          >
            <ResponsiveContainer width="99%">
              <BarChart
                data={chartTransactedAmount}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bandeira" />
                <YAxis />
                <Bar
                  dataKey="valor"
                  fill="#8884d8"
                  shape={<TriangleBar />}
                  label={{ position: "top" }}
                >
                  {chartTransactedAmount.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <div style={{ position: "absolute", paddingLeft: "10px" }}>
            <h3>Gráfico2</h3>
          </div>
          <Paper
            elevation={4}
            style={{
              width: "100%",
              height: "100%",
              padding: "10px",
              paddingTop: "50px",
            }}
          >
            <ResponsiveContainer width="99%">
              <ComposedChart
                data={chartMovingAverage}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="valor" barSize={30} fill="#413ea0" />
                <Line type="monotone" dataKey="movel" stroke="#ff7300" />
              </ComposedChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={2} xl={2}>
          <Grid container direction='column' spacing={2} >





            <Grid item >
              <Paper elevation={4} style={{ padding: '20px', borderLeft: '5px solid #27f227' }}>

                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Valor Total Transacionado
                </Typography>
                <Typography component="p" variant="h4">
                  R${valuePeriod}
                </Typography>
                <Typography color="textSecondary" >
                  No período
                </Typography>

              </Paper>
            </Grid>





            <Grid item >
              <Paper elevation={4} style={{ padding: '20px', borderLeft: '5px solid #fa2419' }} >

                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Billing
                </Typography>
                <Typography component="p" variant="h4">
                  R${valueWay}
                </Typography>
                <Typography color="textSecondary" >
                  Taxa cobrada
                </Typography>

              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
