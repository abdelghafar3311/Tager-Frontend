import { AppDispatch } from "@/Redux/store";
// config routes
import {
  ProductRoutes,
  RentalRoutes,
  AreaRoutes,
  RoomRoutes,
  ReportRoutes,
} from "@/config/routes";
// Redux states
/// Customer states
import {
  setIsCachingUpdate as ProductCache,
  setProducts,
} from "@/Redux/slices/customer/products";
import {
  setIsCachingUpdate as RentalCache,
  setRentals as setRentalsCustomer,
  setRequests,
} from "@/Redux/slices/customer/rentals";
import {
  setIsCachingUpdate as ReportsCache,
  setReports,
} from "@/Redux/slices/customer/reports";

/// Owner states
import {
  setIsCachingUpdate as AreaCache,
  setArea,
} from "@/Redux/slices/owner/area";
import {
  setIsCachingUpdate as StoreCache,
  setStores,
} from "@/Redux/slices/owner/store";
import {
  setIsCachingUpdate as RentalOwnerCache,
  setRentals as setRentalsOwner,
} from "@/Redux/slices/owner/rentals";
import {
  setReqRental,
  setIsCachingUpdate as setReqRentalCache,
} from "@/Redux/slices/owner/reqRentals";
// utils
import { getCookie } from "cookies-next";

export const updateProductsCache = async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(ProductRoutes.getAll, {
      headers: {
        token: `${getCookie("token")}`,
      },
    });
    const data = await response.json();
    dispatch(setProducts(data));
    dispatch(ProductCache(true));
  } catch (error) {
    dispatch(ProductCache(false));
  }
};
export const updateRentalCustomerCache = async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(RentalRoutes.getAll, {
      headers: {
        token: `${getCookie("token")}`,
      },
    });
    const data = await response.json();
    dispatch(setRentalsCustomer(data.rentals));
    dispatch(setRequests(data.ReqRental));
    dispatch(RentalCache(true));
  } catch (error) {
    dispatch(RentalCache(false));
  }
};
export const updateReportsCache = async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(ReportRoutes.getAll, {
      headers: {
        token: `${getCookie("token")}`,
      },
    });
    const data = await response.json();
    dispatch(setReports(data));
    dispatch(ReportsCache(true));
  } catch (error) {
    dispatch(ReportsCache(false));
  }
};
export const updateAreaCache = async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(AreaRoutes.getAll, {
      headers: {
        token: `${getCookie("token")}`,
      },
    });
    const data = await response.json();
    dispatch(setArea(data));
    dispatch(AreaCache(true));
    console.log("area data: ", data);
  } catch (error) {
    dispatch(AreaCache(false));
  }
};
export const updateStoreCache = async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(RoomRoutes.getOwnerRooms, {
      headers: {
        token: `${getCookie("token")}`,
      },
    });
    const data = await response.json();
    dispatch(setStores(data.rooms));
    dispatch(StoreCache(true));
    console.log("stores data: ", data);
  } catch (error) {
    dispatch(StoreCache(false));
  }
};

export const updateRentalOwnerCache = async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(RentalRoutes.getAll, {
      headers: {
        token: `${getCookie("token")}`,
      },
    });
    const data = await response.json();
    dispatch(setRentalsOwner(data));
    dispatch(RentalOwnerCache(true));
    console.log("rentals data: ", data);
  } catch (error) {
    dispatch(RentalOwnerCache(false));
  }
};

export const updateReqRentalCache = async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(RentalRoutes.getRequests, {
      headers: {
        token: `${getCookie("token")}`,
      },
    });
    const data = await response.json();
    dispatch(setReqRental(data));
    dispatch(setReqRentalCache(true));
  } catch (error) {
    dispatch(setReqRentalCache(false));
  }
};
