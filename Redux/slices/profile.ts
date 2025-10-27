import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  name: string;
  phone?: string;
  address?: string;
  description?: string;
  avatar?: string;
  status?: boolean;
  isProfile: boolean;
}

const initialState: ProfileState = {
  name: "",
  phone: "",
  address: "",
  description: "",
  avatar: "",
  isProfile: false,
  status: true,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<ProfileState>) {
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
      state.description = action.payload.description;
      state.avatar = action.payload.avatar;
      state.status = action.payload.status;
      state.isProfile = action.payload.isProfile;
    },
    setStatus(state, action: PayloadAction<boolean>) {
      state.status = action.payload;
    },
  },
});

export const { setProfile, setStatus } = profileSlice.actions;
export default profileSlice.reducer;
