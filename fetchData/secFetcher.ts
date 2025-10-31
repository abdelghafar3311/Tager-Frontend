// @server-only
import { getCookie } from "cookies-next";
import { CustomerRoutes, OwnerRoutes } from "@/config/routes";

export const CheckUserIsLoginOrExpire = async (role: "customer" | "owner") => {
  const token = getCookie("token");
  const roleCookie = getCookie("role");

  if (!roleCookie || !token || roleCookie !== role) return false;

  const url =
    role === "customer" ? CustomerRoutes.profile.get : OwnerRoutes.profile.get;
  const res = await fetch(url, { headers: { token: `${token}` } });

  return [200, 201].includes(res.status);
};

export const CheckForAllDetails = async (
  role: "customer" | "owner"
): Promise<{
  access: boolean;
  err: "role_Cookie" | "token" | "role_Not_Match" | "status_Not_Match" | "";
}> => {
  const token = getCookie("token");
  const roleCookie = getCookie("role");

  if (!roleCookie) return { access: false, err: "role_Cookie" };
  if (!token) return { access: false, err: "token" };
  if (roleCookie !== role) return { access: false, err: "role_Not_Match" };

  const url =
    role === "customer" ? CustomerRoutes.profile.get : OwnerRoutes.profile.get;
  const res = await fetch(url, { headers: { token: `${token}` } });

  if (!res.ok) return { access: false, err: "status_Not_Match" };

  return { access: true, err: "" };
};
