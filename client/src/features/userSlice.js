import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import signUpApi from "../api/signUp";
import loginApi from "../api/login";
import logoutApi from "../api/signout";

export const signUp = createAsyncThunk(
  "user/signUp",
  async (body, { rejectWithValue }) => {
    try {
      const response = await signUpApi(body);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (body, { rejectWithValue }) => {
    try {
      const response = await loginApi(body);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutApi();
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Sign-up failed";
      });

    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Login failed";
      });

    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout Failed";
      });
  },
});

export default userSlice.reducer;
