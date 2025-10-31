import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Info {
  money: number;
  isDeleted: boolean;
  isCached: boolean;
}

const initialState: Info = {
  money: 0,
  isDeleted: false,
  isCached: false,
};

const ownerInfoSlice = createSlice({
  name: "ownerInfo",
  initialState,
  reducers: {
    setOwnerInfo: (state, action: PayloadAction<Info>) => {
      state.money = action.payload.money;
      state.isDeleted = action.payload.isDeleted;
      state.isCached = action.payload.isCached;
    },
  },
});

export const { setOwnerInfo } = ownerInfoSlice.actions;
export default ownerInfoSlice.reducer;
