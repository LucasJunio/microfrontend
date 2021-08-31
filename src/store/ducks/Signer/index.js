import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signinPost } from "./service";

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

const initialState = {
  token: "",
  signed: false,
  status: "idle",
  message: null,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        return (state = { ...state, status: "loading" });
        // state.status = "loading";
      })
      .addCase(signin.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: "completed",
          token: action.payload.token,
          signed: true,
          message: action.payload.message
        });
      })
      .addCase(signin.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
          message: action.payload.message,
        });
      });
  },
});

export const { logOut, clearMessage } = signer.actions;
// export const { increment, decrement } = systemUser.actions;

export default signer.reducer;
