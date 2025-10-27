// axios
import axios from "axios";
// routes
import {
  AreaRoutes,
  RoomRoutes,
  RentalRoutes,
  OwnerRoutes,
} from "@/config/routes";
// cookies
import { getCookie } from "cookies-next";
// Get Profile
export const fetcherOwnerProfile = async (
  setData: React.Dispatch<React.SetStateAction<number>>
) => {
  const token = getCookie("token");
  const response = await axios.get(`${OwnerRoutes.profile.get}`, {
    headers: {
      token: `${token}`,
    },
  });
  const dataBase = await response.data;
  console.log("fetch profile : ", dataBase);
  setData(dataBase.profile.money);
};
// Get Stores
export const fetcherStores = async (
  setData: React.Dispatch<React.SetStateAction<[]>>
) => {
  const token = getCookie("token");
  const response = await axios.get(`${RoomRoutes.getOwnerRooms}`, {
    headers: {
      token: `${token}`,
    },
  });
  const dataBase = await response.data;
  console.log("fetch rooms : ", dataBase);
  setData(dataBase.rooms);
};
// Get Rentals
export const fetcherRentals = async (
  setData: React.Dispatch<React.SetStateAction<[]>>
) => {
  const token = getCookie("token");
  const response = await axios.get(`${RentalRoutes.getAll}`, {
    headers: {
      token: `${token}`,
    },
  });
  const dataBase = await response.data;
  console.log("fetch rentals : ", dataBase);
  setData(dataBase);
};

// get req rentals
export const fetcherReqRentals = async (
  setData: React.Dispatch<React.SetStateAction<[]>>
) => {
  const token = getCookie("token");
  const response = await axios.get(`${RentalRoutes.getRequests}`, {
    headers: {
      token: `${token}`,
    },
  });
  const dataBase = await response.data;
  console.log("fetch req rentals : ", dataBase);
  setData(dataBase);
};

// Get Areas
export const fetcherAreas = async (
  setData: React.Dispatch<React.SetStateAction<[]>>
) => {
  const token = getCookie("token");
  const response = await axios.get(`${AreaRoutes.getAll}`, {
    headers: {
      token: `${token}`,
    },
  });
  const dataBase = await response.data;
  console.log("fetch areas : ", dataBase);
  setData(dataBase);
};
