import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendValidationStatus } from "./service";

export const validationStatus = createAsyncThunk(
  "validation/validationStatus",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await sendValidationStatus(token);
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
  message: null,
  status: "idle",
  celular: 0,
};

const validation = createSlice({
  name: "validation",
  initialState,
  reducers: {
    clearMessageAndStatus: (state) => {
      return (state = { ...state, message: null, status: "idle" });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validationStatus.pending, (state) => {
        return (state = { ...state, status: "pending" });
      })
      .addCase(validationStatus.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: "completed",
          message: action.payload.message,
          celular: action.payload.celular,
        });
      })
      .addCase(validationStatus.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
          message: action.payload.message,
        });
      });
  },
});

export const { clearMessageAndStatus } = validation.actions;

export default validation.reducer;
