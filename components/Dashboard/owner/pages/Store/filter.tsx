"use client"
import { useState, useEffect } from "react";

import classes from "./style.module.scss"

import axios, { AxiosError } from "axios";

import { AreaRoutes } from "@/config/routes";

import { IoFilterOutline } from "react-icons/io5";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { getCookie } from "cookies-next";

interface FilterStoresProps {
    setFilter: React.Dispatch<React.SetStateAction<string>>
    Filter: string
}

interface AreaFetch {
    _id: string
    nameArea: string
}

export default function FilterStores({ setFilter, Filter }: FilterStoresProps) {
    const [show, setShow] = useState(false);
    const [reHide, setReHide] = useState(true);
    const [Area, setArea] = useState<AreaFetch[]>([]);
    const [loading, setLoading] = useState(false)
    const handleList = () => {
        if (reHide) {
            setReHide(false);
            setShow(true);
        } else {
            setShow(false);
            setTimeout(() => {
                setReHide(true);
            }, 500);
        }
    }

    // get Area
    const GetArea = async () => {
        try {
            setLoading(true)
            const response = await axios.get(AreaRoutes.getAll, {
                headers: {
                    token: `${getCookie("token")}`
                }
            });
            const data = await response.data;
            setArea((prev) => {
                return data.map((item: AreaFetch) => {
                    return {
                        _id: item._id,
                        nameArea: item.nameArea
                    }
                })
            });
            console.log(data);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        GetArea();
    }, [show])

    return (
        <div className={classes.filterContainer}>
            <button className="flex items-center justify-center gap-1 transition-all px-3 text-2xl py-3 rounded-full bg-white text-[12px] hover:shadow cursor-pointer relative" onClick={handleList}><IoFilterOutline /></button>
            <div className={`${classes.filter} ${show ? classes.show : classes.hide} ${reHide ? classes.Re_Hide : ""}`}>
                <span className="absolute top-4 right-4 cursor-pointer md:hidden" onClick={handleList}><MdClose /></span>
                <h1 className={classes.title}>Filter</h1>
                <ul>
                    <li className={`${Filter === "All" ? classes.active : ""}`} onClick={() => setFilter("All")}><span className={classes.f}>All</span> <span className={classes.icon}><IoCheckmarkDoneOutline /></span></li>
                    <li className={`${Filter === "Rental Stores" ? classes.active : ""}`} onClick={() => setFilter("Rental Stores")}><span className={classes.f}>Rental Stores</span> <span className={classes.icon}><IoCheckmarkDoneOutline /></span></li>
                    <li className={`${Filter === "Not Rental Stores" ? classes.active : ""}`} onClick={() => setFilter("Not Rental Stores")}><span className={classes.f}>Not Rental Stores</span> <span className={classes.icon}><IoCheckmarkDoneOutline /></span></li>
                    <li className={`${Filter === "Stores Delete" ? classes.active : ""}`} onClick={() => setFilter("Stores Delete")}><span className={classes.f}>Stores Delete</span> <span className={classes.icon}><IoCheckmarkDoneOutline /></span></li>
                    <li className={`${Filter === "Stores Not Delete" ? classes.active : ""}`} onClick={() => setFilter("Stores Not Delete")}><span className={classes.f}>Stores Not Delete</span> <span className={classes.icon}><IoCheckmarkDoneOutline /></span></li>
                    <li className={`${Filter === "isStatus" ? classes.active : ""}`} onClick={() => setFilter("isStatus")}><span className={classes.f}>Activities Stores</span> <span className={classes.icon}><IoCheckmarkDoneOutline /></span></li>
                    <li className={`${Filter === "notIsStatus" ? classes.active : ""}`} onClick={() => setFilter("notIsStatus")}><span className={classes.f}> Not Activities Stores</span> <span className={classes.icon}><IoCheckmarkDoneOutline /></span></li>
                    <li className={`${Filter === "hasDiscount" ? classes.active : ""}`} onClick={() => setFilter("hasDiscount")}><span className={classes.f}> Has Discount Stores</span> <span className={classes.icon}><IoCheckmarkDoneOutline /></span></li>
                </ul>
                <h1 className={classes.title}>Areas</h1>
                {loading && (
                    <p className="text-center text-md text-[#097]">
                        waiting...
                    </p>
                )}
                {!loading && (
                    <ul>
                        {Area && Area.map((item) => {
                            return (
                                <li key={item._id} className={`${Filter === item._id ? classes.active : ""}`} onClick={() => setFilter(item._id)}><span className={classes.f}> {item.nameArea}</span> <span className={classes.icon}><IoCheckmarkDoneOutline /></span></li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </div>
    )
}