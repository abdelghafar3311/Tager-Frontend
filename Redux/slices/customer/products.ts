import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IProduct {
  _id: string;
  nameProduct: string;
  category: string;
  count: number;
  price: number;
  taxes: number;
  ads: number;
  gain: number;
  discount: number;
  Rental_Id: {
    _id: string;
    subscriptionState: "active" | "inactive" | string;
    isDeleted: boolean;
    isAccept: "accept" | "reject" | "pending" | string;
    Area_Id: string;
    Room_Id: {
      _id: string;
      nameRoom: string;
    };
    Owner_Id: string;
    Customer_Id: string;
    startDate: string;
    endDate: string;
    expires: string;
    pay: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProductsState {
  products: IProduct[];
  isCachingUpdate: boolean;
}

const initialState: ProductsState = {
  products: [],
  isCachingUpdate: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
      return state;
    },
    setIsCachingUpdate(state, action: PayloadAction<boolean>) {
      state.isCachingUpdate = action.payload;
      return state;
    },
  },
});

export const { setProducts, setIsCachingUpdate } = productsSlice.actions;
export default productsSlice.reducer;
