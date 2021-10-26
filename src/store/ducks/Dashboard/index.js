import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dashboardGet } from "./service";

export const getDashboard = createAsyncThunk(
  "dashboard/getDashboard",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await dashboardGet(body);
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
  chartMovingAverage:[
    {
      data: '11/02/1996',
      valor: 100,
      movel: 500,
    },
    {
      data: '11/02/1996',
      valor: 800,
      movel: 239,
    },
    {
      data: '11/02/1996',
      valor: 50,
      movel: 2000,
    },
    {
      data: '11/02/1996',
      valor: 1054,
      movel: 55,
    },
    {
      data: '11/02/1996',
      valor: 585,
      movel: 624,
    },
    {
      data: '11/02/1996',
      valor: 8,
      movel: 963,
    },
    {
      data: '11/02/1996',
      valor: 87,
      movel: 2414,
    },
    {
      data: '11/02/1996',
      valor: 77,
      movel: 98,
    },
    {
      data: '11/02/1996',
      valor: 5,
      movel: 1857,
    },
  ],
  chartTransactedAmount:[
    {
      bandeira: 'Mastercard',
      valor: 2500,
    },
    {
      bandeira: 'Amex',
      valor: 1500,
    },
    {
      bandeira: 'Visa',
      valor: 800,
    },
    {
      bandeira: 'Elo',
      valor: 100,
    },
  ],
  valuePeriod:"5,14",
  valueWay:"1,14"
};
const dashboard = createSlice({
  name: "dashboard",
  initialState,
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getDashboard.pending, (state) => {
  //       return (state = { ...state, status: "loading" });
  //     })
  //     .addCase(getDashboard.fulfilled, (state, action) => {
  //       return (state = {
  //         ...state,
  //         status: "completed",
  //         message: action.payload.message,
  //         chartCardFlag: action.payload.chartCardFlag, 
  //         chartMovingAverage: action.payload.chartMovingAverage, 
  //         valuePeriod: action.payload.valuePeriod, 
  //         valueWay: action.payload.valueWay, 
  //       });
  //     })
  //     .addCase(getDashboard.rejected, (state, action) => {
  //       return (state = {
  //         ...state,
  //         status: "failed",
  //         message: action.payload.message
  //       });
  //     });
  // },
});

export default dashboard.reducer;
