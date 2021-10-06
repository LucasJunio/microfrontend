import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUsers,
  getRelatedGroups,
  getUserById,
  postUser,
  editUserById,
  uploadDocuments,
} from "./service";

export const userList = createAsyncThunk(
  "user/userList",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getUsers();
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const relatedGroups = createAsyncThunk(
  "user/relatedGroups",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await getRelatedGroups(userId);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await postUser(body);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOnlyUser = createAsyncThunk("user/getOnlyUser", async (id) => {
  const { data } = await getUserById(id);
  return data;
});

export const editUser = createAsyncThunk("user/editUserById", async (body) => {
  const { data } = await editUserById(body);
  return data;
});

export const persistDocuments = createAsyncThunk(
  "user/persistDocuments",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await uploadDocuments(body);
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
  relatedGroups: [],
  selectedRelatedGroups: [],
  newUser: [],
  currentUser: [
    {
      email: "",
      nome: "",
      cpf: "",
      status: "",
    },
  ],
  message: null,
  status: "idle",
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    addSelectedGroups(state, action) {
      return (state = { ...state, selectedRelatedGroups: action.payload });
    },
    clearSelectedGroups(state) {
      return (state = { ...state, selectedRelatedGroups: [] });
    },
    clearUser(state) {
      return (state = {
        ...state,
        newUser: [],
        message: "",
        relatedGroups: [],
        status: "idle",
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userList.pending, (state) => {
        return (state = { ...state, status: "loading" });
      })
      .addCase(userList.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: "completed",
          data: action.payload.message,
        });
      })
      .addCase(userList.rejected, (state, action) => {
        return (state = { ...state, status: "failed" });
      })
      .addCase(relatedGroups.pending, (state) => {
        return (state = { ...state, status: "loading" });
      })
      .addCase(relatedGroups.fulfilled, (state, action) => {
        return {
          ...state,
          relatedGroups: action.payload.message,
          status: "completed",
        };
      })
      .addCase(relatedGroups.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
          message: action.payload.message,
        });
      })
      .addCase(createUser.pending, (state) => {
        return (state = { ...state, status: "loading" });
      })
      .addCase(createUser.fulfilled, (state, action) => {
        if (!!action.payload) {
          return (state = {
            ...state,
            newUser: action.payload.message,
            status: "created",
          });
        }
        return (state = { ...state, status: "idle" });
      })
      .addCase(createUser.rejected, (state, action) => {
        return (state = {
          ...state,
          message: action.payload.message,
          status: "failed",
        });
      })
      .addCase(getOnlyUser.pending, (state) => {
        return (state = { ...state, status: "loading" });
      })
      .addCase(getOnlyUser.fulfilled, (state, action) => {
        return (state = {
          ...state,
          currentUser: action.payload.message,
          status: "idle",
        });
      })
      .addCase(getOnlyUser.rejected, (state) => {
        return (state = { ...state, status: "failed" });
      })
      .addCase(editUser.pending, (state) => {
        return (state = { ...state, status: "loading" });
      })
      .addCase(editUser.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: "completed",
          message: action.payload.message,
        });
      })
      .addCase(editUser.rejected, (state, action) => {
        return (state = {
          ...state,
          status: "failed",
          message: action.payload.message,
        });
      })
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

export const { addSelectedGroups, clearUser, clearSelectedGroups } =
  user.actions;

export default user.reducer;
