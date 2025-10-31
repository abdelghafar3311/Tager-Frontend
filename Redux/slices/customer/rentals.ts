import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Rental {
  _id: string;
  subscriptionState: string;
  isDeleted: boolean;
  isAccept: "accept" | "reject" | "pending";
  Area_Id: {
    _id: string;
    nameArea: string;
    address: string;
  };
  Room_Id: {
    _id: string;
    nameRoom: string;
    NumberRoom: number;
    Discount: number;
    price: number;
  };
  Owner_Id: {
    _id: string;
    username: string;
  };
  Customer_Id: {
    _id: string;
    username: string;
    money: number;
  };
  startDate: string;
  endDate: string;
  expires: string;
  pay: number;
}

interface Request {
  _id: string;
  time: string;
  pay: number;
  Rental_Id: string;
  Customer_Id: string;
  Room_Id: {
    _id: string;
    nameRoom: string;
    NumberRoom: number;
  };
  Owner_Id: string;
  willDelete: boolean;
  status: string;
  DeleteToken: string;
}

interface RenDataState {
  rentals: Rental[];
  requests: Request[];
  isCachingUpdate: boolean;
}

const initialState: RenDataState = {
  rentals: [],
  requests: [],
  isCachingUpdate: false,
};

const rentalsSlice = createSlice({
  name: "rentals",
  initialState,
  reducers: {
    setRentals: (state, action: PayloadAction<Rental[]>) => {
      state.rentals = action.payload;
      return state;
    },
    setRequests: (state, action: PayloadAction<Request[]>) => {
      state.requests = action.payload;
      return state;
    },
    setIsCachingUpdate: (state, action: PayloadAction<boolean>) => {
      state.isCachingUpdate = action.payload;
      return state;
    },
  },
});

export const { setRentals, setRequests, setIsCachingUpdate } =
  rentalsSlice.actions;
export default rentalsSlice.reducer;
