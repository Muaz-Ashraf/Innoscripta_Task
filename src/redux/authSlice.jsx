import { createSlice } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";

const initialState = {
  isAuthenticated: false,

  username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    user: (state, { payload }) => {
      state.email = payload.email;
    },
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.email = null;
    },
  },
});

const encryptor = encryptTransform({
  secretKey: "scm",
  onError: function (error) {
    console.log(error);
  },
});

const persistConfig = {
  key: "auth",
  storage: storageSession,
  transforms: [encryptor],
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const { login, logout, user } = authSlice.actions;
export default persistedAuthReducer;
