import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StoreData {
  _id: string;
  nameRoom: string;
  NumberRoom: number;
  length: number;
  width: number;
  description: string;
  price: number;
  Discount: number;
  Duration: "M" | "d" | "y";
  RentalType: "null" | "rental" | "expire";
  status: boolean;
  isDeleted: boolean;
  Area_Id: {
    nameArea: string;
    address: string;
    maxRooms: number;
    _id: string;
    status: boolean;
    isDeleted: boolean;
  };
}

interface StoreState {
  store: StoreData[];
  isCachingUpdate: boolean;
}

const Store: StoreState = {
  store: [],
  isCachingUpdate: false,
};

const StoreSlice = createSlice({
  name: "store",
  initialState: Store,
  reducers: {
    setStores(state, action: PayloadAction<StoreData[]>) {
      state.store = action.payload;
      return state;
    },
    setIsCachingUpdate(state, action: PayloadAction<boolean>) {
      state.isCachingUpdate = action.payload;
      return state;
    },
  },
});

export const { setStores, setIsCachingUpdate } = StoreSlice.actions;
export default StoreSlice.reducer;
