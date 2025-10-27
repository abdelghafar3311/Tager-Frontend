import classes from "./style.module.scss";
import { useState } from "react";

import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { setStatus } from "@/Redux/slices/profile";

import axios, { AxiosError } from "axios";
import { CustomerRoutes, OwnerRoutes } from "@/config/routes";

import { getCookie } from "cookies-next";
import notification from "@/hooks/useNotifications";

interface Status {
    role: "customer" | "owner"
}

export default function Status({ role }: Status) {
    const { status } = useAppSelector((state) => state.profile);
    const dispatch = useAppDispatch();
    const [statusNow, setStatusNow] = useState(status || false);
    const token = getCookie("token");
    const [loading, setLoading] = useState(false)

    const url = role === "customer" ? CustomerRoutes.profile.update : OwnerRoutes.profile.update

    const handelForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return notification("Please wait, we are processing your request", "info");
        try {
            setLoading(true)
            const response = await axios.put(url, {
                status: statusNow
            }, {
                headers: {
                    token: `${token}`
                }
            });

            const data = await response.data;
            console.log("fetch: ", data)
            dispatch(setStatus(data.profile.status));
            setLoading(false)

        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            console.log(err);
            notification(err.response?.data?.message || "Something went wrong", "error");
        } finally {
            setLoading(false)
        }
    }
    return (
        <form onSubmit={handelForm} className={`${classes.con} flex flex-col md:flex-row md:justify-between md:items-center`}>
            <h3 className={classes.title}>Status</h3>
            <p className={classes.export}>
                <div className="flex items-center justify-between gap-2">
                    <span className={`${classes.status} ${status ? classes.online : ""}`}>{status ? "Online" : "Offline"}</span>
                    <button type="submit" className={`${classes.switch} ${status ? classes.online : ""}`} onClick={() => setStatusNow(!statusNow)}>
                        <span className={`${classes.circle} ${status ? classes.isOnline : ""}`}></span>
                    </button>
                </div>
            </p>
        </form>
    )
}