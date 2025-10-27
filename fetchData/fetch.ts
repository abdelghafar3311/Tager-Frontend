"use client";

// routes
import { CustomerRoutes, OwnerRoutes } from "@/config/routes";

import { setProfile } from "@/Redux/slices/profile";
import { customer } from "@/Redux/slices/customer";
import { auth } from "@/Redux/slices/auth";
import { getCookie } from "cookies-next";
import { AppDispatch } from "@/Redux/store";

export const GetCustomer = async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(CustomerRoutes.get, {
      headers: {
        token: `${getCookie("token")}`,
      },
    });
    const data = await response.json();
    console.log("your fetch now test: ", data.customer);
    dispatch(
      customer({
        money: data.customer.money,
        sells: data.customer.sells,
        buys: data.customer.buys,
      })
    );
    dispatch(
      auth({
        username: data.customer.username,
        email: data.customer.email,
        id: data.customer._id,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const GetOwner = async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(OwnerRoutes.get, {
      headers: {
        token: `${getCookie("token")}`,
      },
    });
    const data = await response.json();
    dispatch(
      auth({
        username: data.username,
        email: data.email,
        id: data._id,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const GetProfile = async (
  role: "customer" | "owner",
  dispatch: AppDispatch
) => {
  const url =
    role === "customer" ? CustomerRoutes.profile : OwnerRoutes.profile;
  try {
    const response = await fetch(url.get, {
      headers: {
        token: `${getCookie("token")}`,
      },
    });
    const data = await response.json();
    console.log("your fetch now test: ", data.profile.status);
    if (data.profile) {
      dispatch(
        setProfile({
          name: data.profile.name,
          phone: data.profile.phone,
          address: data.profile.address,
          description: data.profile.description,
          avatar: data.profile.Avatar,
          status: data.profile.status,
          isProfile: true,
        })
      );
    }
  } catch (error) {
    dispatch(
      setProfile({
        name: "",
        phone: "",
        address: "",
        description: "",
        avatar: "",
        isProfile: false,
      })
    );
  }
};
