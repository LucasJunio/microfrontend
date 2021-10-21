import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dashboardGet } from "./service";

export const getDashboard = createAsyncThunk(
  "dashboard/getDashboard",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await dashboardGet(token);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  status: "idle",
  message: "",
  chartTransactedAmount:[
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
  ],
  chartMovingAverage:[
    {
      name: 'Mastercard',
      uv: 4000,
      female: 2400,
      male: 2400,
    },
    {
      name: 'Visa',
      uv: 3000,
      female: 1398,
      male: 2210,
    },
    {
      name: 'Amex',
      uv: 2000,
      female: 9800,
      male: 2290,
    },
    {
      name: 'Pix',
      uv: 2780,
      female: 3908,
      male: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      female: 4800,
      male: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      female: 3800,
      male: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      female: 4300,
      male: 2100,
    },
  ],
  valuePeriod:"5,14",
  valueWay:"1,14"
};
const dashboard = createSlice({
  name: "dashboard",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getDashboard.pending, (state) => {
        return (state = { ...state, status: "loading" });
      })
      .addCase(getDashboard.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: "completed",
          message: action.payload.message,
          chartCardFlag: action.payload.chartCardFlag, 
          chartMovingAverage: action.payload.chartMovingAverage, 
          valuePeriod: action.payload.valuePeriod, 
          valueWay: action.payload.valueWay, 
        });
      })
      .addCase(getDashboard.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
          message: action.payload.message
        });
      });
  },
});

export default dashboard.reducer;
