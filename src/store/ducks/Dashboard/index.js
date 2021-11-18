import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dashboardGet } from "./service";
import { api } from "../../../services/api";


export const getDashboard = createAsyncThunk(
  "dashboard/getDashboard",
  async (body, { rejectWithValue }) => {
    try {
      // const { startDate, endDate } = body;

      // const {data} = await api.get(`/dashboard?startdate=${startDate.toISOString().split('T')[0]}&enddate=${endDate.toISOString().split('T')[0]}`);

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
  chartMovingAverage: [{
    data: '',
    valor: 0,
    movel: 0,
  },],
  chartTransactedAmount: [
    {
      bandeira: '',
      valor: 0,
    },

  ],
  valuePeriod: "",
  valueWay: ""
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
          chartTransactedAmount: action.payload?.message[0].chartTransactedAmount,
          chartMovingAverage: action.payload?.message[0].chartMovingAverage,
          valuePeriod: action.payload?.message[0].valuePeriod,
          valueWay: action.payload?.message[0].valueWay,
        });
      })
      .addCase(getDashboard.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
        });
      });
  },
});

console.log(initialState.chartMovingAverage);

export default dashboard.reducer;
