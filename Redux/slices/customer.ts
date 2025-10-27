import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CustomerSchemaType {
  money: number;
  sells: number;
  buys: number;
}

const initialState: CustomerSchemaType = {
  money: 0,
  sells: 0,
  buys: 0,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    customer(state, action: PayloadAction<CustomerSchemaType>) {
      state.money = action.payload.money;
      state.sells = action.payload.sells;
      state.buys = action.payload.buys;
    },
  },
});

export const { customer } = customerSlice.actions;
export default customerSlice.reducer;
