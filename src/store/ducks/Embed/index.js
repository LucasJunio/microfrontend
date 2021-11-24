import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getEmbed } from "./service";

export const getEmbedCode = createAsyncThunk(
  "embed/getEmbed",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getEmbed();
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

const embed = createSlice({
  name: "embed",
  initialState,
  extraReducers: (build) => {
    build
      .addCase(getEmbedCode.pending, (state) => {
        return (state = { ...state, status: "loading", type: "embed" });
      })
      .addCase(getEmbedCode.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: "completed",
          type: "embed",
          data: action.payload?.message,
        });
      })
      .addCase(getEmbedCode.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
          type: "embed",
          message: action.payload?.message,
        });
      });
  },
});

export default embed.reducer;
