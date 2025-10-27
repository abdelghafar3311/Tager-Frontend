import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  username: string;
  email: string;
  id: string;
}

const initialState: AuthState = {
  username: "",
  email: "",
  id: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth(
      state,
      action: PayloadAction<{
        username: string;
        email: string;
        id: string;
      }>
    ) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    logout(state) {
      state.username = "";
      state.email = "";
      state.id = "";
    },
  },
});

export const { auth, logout } = authSlice.actions;
export default authSlice.reducer;
