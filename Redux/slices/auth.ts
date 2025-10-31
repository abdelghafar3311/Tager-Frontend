import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  username: string;
  email: string;
  id: string;
  role: string;
}

const initialState: AuthState = {
  username: "",
  email: "",
  id: "",
  role: "",
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
        role: string;
      }>
    ) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.role = action.payload.role;
    },
    logout(state) {
      state.username = "";
      state.email = "";
      state.id = "";
      state.role = "";
    },
    setRole(state, action: PayloadAction<string>) {
      state.role = action.payload;
    },
  },
});

export const { auth, logout, setRole } = authSlice.actions;
export default authSlice.reducer;
