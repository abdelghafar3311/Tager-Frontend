// axios
import axios from "axios";
// routes
import { RentalRoutes, ProductRoutes, ReportRoutes } from "@/config/routes";
// cookies
import { getCookie } from "cookies-next";

// fetcher get renters and requests
export const fetcherRentals = async (
  setData: React.Dispatch<React.SetStateAction<{ ReqRental: []; rentals: [] }>>
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

// fetcher get renters and requests
export const fetcherProducts = async (
  setData: React.Dispatch<React.SetStateAction<[]>>
) => {
  const token = getCookie("token");
  const response = await axios.get(`${ProductRoutes.getAll}`, {
    headers: {
      token: `${token}`,
    },
  });
  const dataBase = await response.data;
  console.log("fetch products : ", dataBase);
  setData(dataBase);
};

// Get Reports
export const fetcherReports = async (
  setData: React.Dispatch<React.SetStateAction<[]>>
) => {
  const token = getCookie("token");
  const response = await axios.get(`${ReportRoutes.getAll}`, {
    headers: {
      token: `${token}`,
    },
  });
  const dataBase = await response.data;
  console.log("fetch reports : ", dataBase);
  setData(dataBase);
};
