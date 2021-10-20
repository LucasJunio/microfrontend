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
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
    { x: 4, y: 4 },
    { x: 5, y: 16 }
  ],
  chartMovingAverage:[
    { x: 1, y: -3 },
    { x: 2, y: 5 },
    { x: 3, y: 3 },
    { x: 4, y: 1 },
    { x: 5, y: -2 },
    { x: 6, y: -2 },
    { x: 7, y: 5 }
  ],
  valuePeriod:"5,14",
  valueWay:"5,14"
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
