import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth";
import profileReducer from "../slices/profile";
import CustomerData from "../slices/customer";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    customer: CustomerData,
  },
});

// Tip: types inferred from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
