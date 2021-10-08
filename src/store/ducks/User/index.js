import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadDocuments } from "./service";

export const persistDocuments = createAsyncThunk(
  "user/persistDocuments",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await uploadDocuments(body, dispatch);
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
  percentUploadImg: 0,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    percentUploadImg: (state, action) => {
      return (state = { ...state, percentUploadImg: action.payload });
    },
    clearImgUpload: (state) => {
      return (state = { ...state, percentUploadImg: 0 });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(persistDocuments.pending, (state) => {
        return (state = { ...state, status: "loading" });
      })
      .addCase(persistDocuments.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: "completed",
          message: action.payload.message,
        });
      })
      .addCase(persistDocuments.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
          message: action.payload.message,
        });
      });
  },
});

export const { percentUploadImg, clearImgUpload } = user.actions;

// export const { addSelectedGroups, clearUser, clearSelectedGroups } =
//   validation.actions;

export default user.reducer;
