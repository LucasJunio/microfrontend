import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getGroups,
  postGroupRelationship,
  putGroupRelationShipById,
} from "./service";

export const listGroups = createAsyncThunk("group/listGroups", async () => {
  const { data } = await getGroups();
  return data;
});

export const createGroupRelationship = createAsyncThunk(
  "group/createGroupRelationship",
  async (body) => {
    const { data } = await postGroupRelationship(body);
    return data;
  }
);

export const editGroupRelationship = createAsyncThunk(
  "group/editGroupById",
  async (body) => {
    const { data } = await putGroupRelationShipById(body);
    return data;
  }
);

const initialState = {
  data: [],
  message: null,
  status: "idle",
};

const group = createSlice({
  name: "group",
  initialState,
  extraReducers: (build) => {
    build
      .addCase(listGroups.pending, (state) => {
        state.status = "loading";
      })
      .addCase(listGroups.fulfilled, (state, action) => {
        if (!!action.payload) state.data = action.payload?.message;
        state.status = "idle";
      })
      .addCase(listGroups.rejected, (state) => {
        return (state = { ...state, status: "failed" });
      })
      .addCase(createGroupRelationship.pending, (state, action) => {
        return (state = { ...state, status: "loading" });
      })
      .addCase(createGroupRelationship.fulfilled, (state, action) => {
        return (state = { ...state, status: "idle" });
      })
      .addCase(createGroupRelationship.rejected, (state, action) => {
        return (state = { ...state, status: "failed" });
      })
      .addCase(editGroupRelationship.pending, (state) => {
        return (state = { ...state, status: "loading" });
      })
      .addCase(editGroupRelationship.fulfilled, (state, action) => {
        return (state = { ...state, status: "completed" });
      })
      .addCase(editGroupRelationship.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
          message: action.payload?.message,
        });
      });
  },
});

export default group.reducer;
