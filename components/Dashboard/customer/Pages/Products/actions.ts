"use client";
/** 
  /// this actions for MainProducts section only and
  @include  
  1- sell one product
  2- sell count product
  3- delete product
  4- sell all product
*/

// axios
import axios, { AxiosError } from "axios";
// cookies
import { getCookie } from "cookies-next";
// routes
import { ProductRoutes, SellsRoutes } from "@/config/routes";
// notification
import notification from "@/hooks/useNotifications";

// sell one product
export const SellOneProduct = async (id: string) => {
  try {
    const token = getCookie("token");
    const response = await axios.post(
      `${SellsRoutes.sellProducts}`,
      {
        product_id: id,
        count: 1,
      },
      {
        headers: {
          token: `${token}`,
        },
      }
    );
    const data = await response.data;
    notification(data.message, "success");
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    console.log(err);
    notification(err.response?.data.message || "Something went wrong", "error");
  }
};

// sell count product
export const SellCountProduct = async (id: string, count: number) => {
  try {
    const token = getCookie("token");
    const response = await axios.post(
      `${SellsRoutes.sellProducts}`,
      {
        product_id: id,
        count: count,
      },
      {
        headers: {
          token: `${token}`,
        },
      }
    );
    const data = await response.data;
    console.log("the count send:  ", count);
    notification(data.message, "success");
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    console.log(err);
    notification(err.response?.data.message || "Something went wrong", "error");
  }
};

// sell all product
export const SellAllProduct = async (id: string) => {
  try {
    const token = getCookie("token");
    const response = await axios.delete(`${SellsRoutes.sellProduct(id)}`, {
      headers: {
        token: `${token}`,
      },
    });
    const data = await response.data;
    notification(data.message, "success");
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    console.log(err);
    notification(err.response?.data.message || "Something went wrong", "error");
  }
};

// Delete Product
export const DeleteProduct = async (id: string) => {
  try {
    const token = getCookie("token");
    const response = await axios.delete(`${ProductRoutes.delete(id)}`, {
      headers: {
        token: `${token}`,
      },
    });
    const data = await response.data;
    notification(data.message, "success");
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    console.log(err);
    notification(err.response?.data.message || "Something went wrong", "error");
  }
};
