import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@/utils/localStorage";
import {
  getSessionStorage,
  removeSessionStorage,
  setSessionStorage,
} from "@/utils/sessionStorage";
import { createSlice } from "@reduxjs/toolkit";

const getInitialToken = () => {
  return (
    getSessionStorage("elena_access_token") ||
    getLocalStorage("elena_access_token") ||
    null
  );
};

const initialState = {
  user: null,
  token: getInitialToken(),
  remember: Boolean(getLocalStorage("elena_access_token")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user, token, remember } = action.payload;
      state.user = user;
      state.token = token;
      state.remember = remember;
      if (remember) {
        setLocalStorage("elena_access_token", token);
        removeSessionStorage("elena_access_token");
      } else {
        setSessionStorage("elena_access_token", token);
        removeLocalStorage("elena_access_token");
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.remember = false;
      removeSessionStorage("elena_access_token");
      removeLocalStorage("elena_access_token");
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAuth, logout, setUser } = authSlice.actions;

export default authSlice.reducer;
