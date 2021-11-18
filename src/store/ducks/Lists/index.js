import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getListByWhereClause } from "./service";

export const getListWhereClause = createAsyncThunk(
  "lists/getListByWhereClause",
  async (whereClause, { rejectWithValue }) => {
    try {
      const { data } = await getListByWhereClause(whereClause);
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
  data: [],
  message: null,
  status: "idle",
  type: "",
};

const lists = createSlice({
  name: "lists",
  initialState,
  extraReducers: (build) => {
    build
      .addCase(getListWhereClause.pending, (state) => {
        return (state = { ...state, status: "loading", type: "list" });
      })
      .addCase(getListWhereClause.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: "completed",
          type: "list",
          data: action.payload?.message,
        });
      })
      .addCase(getListWhereClause.rejected, (state) => {
        return (state = {
          ...state,
          status: "failed",
          type: "list",

          message: action.payload?.message,
        });
      });
  },
});

export default lists.reducer;
