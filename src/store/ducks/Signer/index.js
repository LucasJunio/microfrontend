import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signinPost, sendEmailRecover, recoverPassword } from "./service";

export const signin = createAsyncThunk(
  "signer/signin",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await signinPost(body);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const recoveryPassword = createAsyncThunk(
  "signer/recoveryPassword",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await recoverPassword(body);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendEmailRecovery = createAsyncThunk(
  "signer/sendEmailRecovery",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await sendEmailRecover(body);
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
  token: "",
  signed: false,
  status: "idle",
  message: null,
  statusMessage: null,
  userName: null,
  userId: null,
  type: null,
  cnpj: null,
};
const signer = createSlice({
  name: "signer",
  initialState,
  reducers: {
    logOut(state) {
      return (state = {});
    },
    clearMessage(state) {
      return (state = { ...state, message: null });
    },
    signed(state, action) {
      return (state = {
        ...state,
        token: action.payload.token,
        signed: true,
        userId: action.payload.id,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        return (state = { ...state, status: "loading" });
      })
      .addCase(signin.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: "completed",
          token: action.payload.token,
          signed: true,
          statusMessage: action.payload.name,
          message: action.payload.message,
          userName: action.payload.userName,
          userId: action.payload.userId,
          cnpj: action.payload.cnpj,
        });
      })
      .addCase(signin.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
          message: action.payload.message,
          statusMessage: action.payload.name,
        });
      })
      .addCase(recoveryPassword.pending, (state) => {
        return (state = { ...state, status: "loading" });
      })
      .addCase(recoveryPassword.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: "completed",
          message: action.payload.message,
          statusMessage: action.payload.name,
          type: "recoveryPassword",
        });
      })
      .addCase(recoveryPassword.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
          message: action.payload.message,
          statusMessage: action.payload.name,
        });
      })
      .addCase(sendEmailRecovery.pending, (state) => {
        return (state = { ...state, status: "loading" });
      })
      .addCase(sendEmailRecovery.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: "completed",
          message: action.payload.message,
          statusMessage: action.payload.name,
        });
      })
      .addCase(sendEmailRecovery.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
          message: action.payload.message,
          statusMessage: action.payload.name,
        });
      });
  },
});

export const { logOut, clearMessage, signed } = signer.actions;
// export const { increment, decrement } = systemUser.actions;

export default signer.reducer;
