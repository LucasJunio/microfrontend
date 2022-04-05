import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { emailValidationGet } from "./service";

export const emailValidation = createAsyncThunk(
  "email/emailValidation",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await emailValidationGet(token);
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
  message: ""
};
const email = createSlice({
  name: "email",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(emailValidation.pending, (state) => {
        return (state = { ...state, status: "loading" });
      })
      .addCase(emailValidation.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: "completed",
          message: action.payload?.message
        });
      })
      .addCase(emailValidation.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
          message: action.payload?.message
        });
      });
  },
});

export default email.reducer;
