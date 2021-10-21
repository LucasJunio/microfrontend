import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadDocuments, getDocumentsByUser, getUserById } from "./service";

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

export const documentsByUser = createAsyncThunk(
  "user/documentsByUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await getDocumentsByUser(id);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const userById = createAsyncThunk(
  "user/userById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await getUserById(id);
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
  imgData: [],
  dataUser: {},
  type: "",
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    percentUploadImg: (state, action) => {
      return (state = { ...state, percentUploadImg: action.payload });
    },
    clearImgUpload: (state) => {
      return (state = { ...state, percentUploadImg: 0, imgData: [] });
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
      })
      .addCase(documentsByUser.pending, (state) => {
        return (state = { ...state, status: "loading" });
      })
      .addCase(documentsByUser.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: "completed",
          imgData: action.payload.message,
        });
      })
      .addCase(documentsByUser.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
          imgData: action.payload.message,
        });
      })
      .addCase(userById.pending, (state) => {
        return (state = { ...state, status: "loading", type: "userById" });
      })
      .addCase(userById.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: "completed",
          dataUser: action.payload.message,
          type: "userById",
        });
      })
      .addCase(userById.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
          message: action.payload.message,
          type: "userById",
        });
      });
  },
});

export const { percentUploadImg, clearImgUpload } = user.actions;

export default user.reducer;
