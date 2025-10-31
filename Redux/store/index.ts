import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth";
import profileReducer from "../slices/profile";
import CustomerData from "../slices/customer";
import OwnerInfoData from "../slices/ownerInfo";

// main reducers
/// owner
import AreaReducer from "../slices/owner/area";
import StoresReducer from "../slices/owner/store";
import RentalReducerOfOwner from "../slices/owner/rentals";
import ReqRentalReducer from "../slices/owner/reqRentals";
/// customer
import ProductReducer from "../slices/customer/products";
import RentalCustomerReducer from "../slices/customer/rentals";
import ReportsReducer from "../slices/customer/reports";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    customer: CustomerData,
    ownerInfo: OwnerInfoData,
    areas: AreaReducer,
    stores: StoresReducer,
    rentalsOwner: RentalReducerOfOwner,
    reqRental: ReqRentalReducer,
    products: ProductReducer,
    rentalsCustomer: RentalCustomerReducer,
    reports: ReportsReducer,
  },
});

// Tip: types inferred from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
