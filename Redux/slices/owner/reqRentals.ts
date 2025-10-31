import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReqRental {
  _id: string;
  nameRoom: string;
  NumberRoom: number;
  status: boolean;
  length: number;
  width: number;
  description: string;
  price: number;
  Duration: string;
  Discount: number;
  RentalType: string;
  Area_Id: string;
  isDeleted: boolean;
  requests: {
    _id: string;
    time: string;
    pay: number;
    Rental_Id: {
      _id: string;
      isAccept: string;
    };
    Customer_Id: {
      _id: string;
      username: string;
    };
    Room_Id: string;
    Owner_Id: string;
    willDelete: boolean;
    status: string;
  }[];
}

interface ReqRentalState {
  reqRental: ReqRental[];
  isCachingUpdate: boolean;
}

const initialState: ReqRentalState = {
  reqRental: [],
  isCachingUpdate: false,
};

const reqRentalSlice = createSlice({
  name: "reqRental",
  initialState,
  reducers: {
    setReqRental: (state, action: PayloadAction<ReqRental[]>) => {
      state.reqRental = action.payload;
    },
    setIsCachingUpdate: (state, action: PayloadAction<boolean>) => {
      state.isCachingUpdate = action.payload;
    },
  },
});

export const { setReqRental, setIsCachingUpdate } = reqRentalSlice.actions;
export default reqRentalSlice.reducer;
