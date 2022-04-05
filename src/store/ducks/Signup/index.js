import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postCnpj, postPf } from "./service";
import { signed } from "../Signer";

export const createCnpj = createAsyncThunk(
  "signup/createCnpj",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await postCnpj(body);
      dispatch(signed({ token: data.token, id: data.id }));
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPf = createAsyncThunk(
  "signup/createPf",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await postPf(body);
      dispatch(signed({ token: data.token, id: data.id }));
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
};
const signup = createSlice({
  name: "signup",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createCnpj.pending, (state) => {
        return (state = { ...state, status: "loading" });
      })
      .addCase(createCnpj.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: "completed",
          token: action.payload?.token,
          signed: true,
          message: action.payload?.message,
        });
      })
      .addCase(createCnpj.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
          message: action.payload?.message,
        });
      })
      .addCase(createPf.pending, (state) => {
        return (state = { ...state, status: "loading" });
      })
      .addCase(createPf.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: "completed",
          token: action.payload?.token,
          signed: true,
          message: action.payload?.message,
        });
      })
      .addCase(createPf.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
          message: action.payload?.message,
        });
      });
  },
});

// export const { logOut, clearMessage } = signer.actions;
// export const { increment, decrement } = systemUser.actions;

export default signup.reducer;
