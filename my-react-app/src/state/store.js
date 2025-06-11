import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./profile/UserSlice";
import authReducer from "./Authentification/authSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});
