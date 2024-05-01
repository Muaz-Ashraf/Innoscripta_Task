import { configureStore } from "@reduxjs/toolkit";

import { persistStore } from "redux-persist";
import persistedAuthReducer from "./authSlice";

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
});

export default store;
export const persistor = persistStore(store);
