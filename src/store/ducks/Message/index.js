import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { resendTokenSms, changeCellphone, sendTokenSMS } from "./service";

export const resendSms = createAsyncThunk(
  "message/resendsms",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await resendTokenSms(token);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const editCellphone = createAsyncThunk(
  "message/changeCellphone",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await changeCellphone(body);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const confirmTokenSMS = createAsyncThunk(
  "message/confirmTokenSMS",
  async (tokens, { rejectWithValue }) => {
    try {
      const { data } = await sendTokenSMS(tokens);
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
  type: "",
};

const message = createSlice({
  name: "message",
  initialState,
  reducers: {
    clearMessageAndStatus: (state) => {
      return (state = { ...state, message: null, status: "idle", type: "" });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resendSms.pending, (state) => {
        return (state = { ...state, status: "pending", type: "SMS" });
      })
      .addCase(resendSms.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: "completed",
          message: action.payload?.message,
          type: "SMS",
        });
      })
      .addCase(resendSms.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
          message: action.payload?.message,
          type: "SMS",
        });
      })
      .addCase(editCellphone.pending, (state) => {
        return (state = {
          ...state,
          status: "pending",
          type: "editCellphone",
        });
      })
      .addCase(editCellphone.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: "completed",
          message: action.payload?.message,
          type: "editCellphone",
        });
      })
      .addCase(editCellphone.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
          message: action.payload?.message,
          type: "editCellphone",
        });
      })
      .addCase(confirmTokenSMS.pending, (state) => {
        return (state = {
          ...state,
          status: "pending",
          type: "confirmTokenSMS",
        });
      })
      .addCase(confirmTokenSMS.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: "completed",
          message: action.payload?.message,
          type: "confirmTokenSMS",
        });
      })
      .addCase(confirmTokenSMS.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
          message: action.payload?.message,
          type: "confirmTokenSMS",
        });
      });
  },
});

export const { clearMessageAndStatus } = message.actions;
export default message.reducer;
