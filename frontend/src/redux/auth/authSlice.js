import { createSlice } from "@reduxjs/toolkit";

import {
  register,
  login,
  logout,
  updateUser,
  getImageFromGitHub,
} from "./authOperations";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      email: "",
      name: "",
      avatarURL: "",
      gitHub: "",
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
        state.user.gitHub = "";
        state.token = "";
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.user.name = payload.name;
        state.user.email = payload.email;
        state.user.gitHub = payload.gitHub;
        state.user.avatarURL = payload.avatarURL;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      })
      .addCase(getImageFromGitHub.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(getImageFromGitHub.fulfilled, (state, { payload }) => {
        state.user.avatarURL = payload;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(getImageFromGitHub.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      }),
});

export const authReducer = authSlice.reducer;
