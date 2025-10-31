import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RentalsData {
  _id: string;
  subscriptionState: string;
  isDeleted: boolean;
  isAccept: string;
  Area_Id: { _id: string; nameArea: string; address: string };
  Room_Id: { _id: string; nameRoom: string; NumberRoom: number };
  Owner_Id: string;
  startDate: string;
  Customer_Id: { _id: string; username: string };
  endDate: string;
  pay: number;
}

interface RentalsState {
  rentals: RentalsData[];
  isCachingUpdate: boolean;
}

const initialState: RentalsState = {
  rentals: [],
  isCachingUpdate: false,
};

const rentalsSlice = createSlice({
  name: "rentals",
  initialState,
  reducers: {
    setRentals: (state, action: PayloadAction<RentalsData[]>) => {
      state.rentals = action.payload;
      return state;
    },
    setIsCachingUpdate: (state, action: PayloadAction<boolean>) => {
      state.isCachingUpdate = action.payload;
      return state;
    },
  },
});

export const { setRentals, setIsCachingUpdate } = rentalsSlice.actions;
export default rentalsSlice.reducer;
