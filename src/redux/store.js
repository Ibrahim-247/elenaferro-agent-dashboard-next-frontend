import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
