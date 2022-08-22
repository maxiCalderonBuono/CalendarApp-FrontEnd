import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking",
    isSubmitting: false,
    user: {},
    errorMsg: undefined,
  },
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.isSubmitting = true;
      state.user = {};
      state.errorMsg = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.isSubmitting = false;
      state.user = payload;
      state.errorMsg = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = "non-authenticated";
      state.isSubmitting = false;
      state.user = {};
      state.errorMsg = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMsg = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } =
  authSlice.actions;
