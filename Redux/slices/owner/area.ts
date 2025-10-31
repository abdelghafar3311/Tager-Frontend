import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AreaData {
  nameArea: string;
  address: string;
  maxRooms: number;
  _id: string;
  status: boolean;
  createdAt: string;
  isDeleted: boolean;
}

interface AreaDataState {
  area: AreaData[];
  isCachingUpdate: boolean;
}

const initialState: AreaDataState = {
  area: [],
  isCachingUpdate: false,
};

const areaSlice = createSlice({
  name: "area",
  initialState,
  reducers: {
    setArea(state, action: PayloadAction<AreaData[]>) {
      state.area = action.payload;
    },
    setIsCachingUpdate(state, action: PayloadAction<boolean>) {
      state.isCachingUpdate = action.payload;
      return state;
    },
  },
});

export const { setArea, setIsCachingUpdate } = areaSlice.actions;
export default areaSlice.reducer;
