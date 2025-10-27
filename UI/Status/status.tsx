"use client"

import classes from "./status.module.scss";
import { useState, useEffect } from "react";


import axios, { AxiosError } from "axios";

import { getCookie } from "cookies-next";
import notification from "@/hooks/useNotifications";

interface Status {
    url: string;
    urlGet: string
    activeWord?: string;
    deactivateWord?: string
}

export default function SWitchStatus({ url, urlGet, activeWord = "Activate", deactivateWord = "Deactivate" }: Status) {
    const [statusNow, setStatusNow] = useState(status || false);
    const token = getCookie("token");
    const [loading, setLoading] = useState(false)


    // get status
    const getStatus = async () => {
        try {
            setLoading(true)
            const response = await axios.get(urlGet, {
                headers: {
                    token: `${token}`
                }
            });
            const data = await response.data;
            console.log(data);
            setStatusNow(data.room.status);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

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
            setStatusNow(data.room.status);
            getStatus();

        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            console.log(err);
            notification(err.response?.data?.message || "Something went wrong", "error");
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getStatus();
    }, [])
    return (
        <form onSubmit={handelForm} className={`${classes.con} flex flex-col md:flex-row md:justify-between md:items-center`}>
            <h3 className={classes.title}>Status</h3>
            <p className={classes.export}>
                <div className="flex items-center justify-between gap-2">
                    <span className={`${classes.status} ${statusNow ? classes.online : ""} ${loading ? "animate-pulse" : ""}`}>{statusNow ? activeWord : deactivateWord}</span>
                    <button type="submit" className={`${classes.switch} ${statusNow ? classes.online : ""}`} onClick={() => setStatusNow(!statusNow)}>
                        <span className={`${classes.circle} ${statusNow ? classes.isOnline : ""}`}></span>
                    </button>
                </div>
            </p>
        </form>
    )
}