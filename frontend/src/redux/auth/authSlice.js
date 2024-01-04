import { createSlice } from "@reduxjs/toolkit";

import { register, login, logout } from "./authOperations";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      email: "",
      name: "",
      avatarURL: "",
    },
    token: "",
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
  },

  extraReducers: (builder) =>
    builder
      .addCase(register.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.error = payload;
        state.isRefreshing = false;
      })
      .addCase(login.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.error = payload;
        state.isRefreshing = false;
      })
      .addCase(logout.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user.email = "";
        state.user.name = "";
        state.user.avatarURL = "";
        state.user.theme = "";
        state.user.boards = [];
        state.token = "";
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.error = null;
      }),
});

export const authReducer = authSlice.reducer;
