"use client"
import { useState, useEffect } from "react";
// next
import Link from "next/link";
// UI
import classes from "./style.module.scss"
import Content from "@/components/Dashbpoard Tools/ContentStyle/content";
import LoadingDashScreen from "@/components/loading-com/dash-load";
import SWitchStatus from "@/UI/Status/status";
import Alarm from "@/UI/Alarm/alarm";
import Modal from "@/UI/Modal/modal";
// icons
import { MdDelete, MdModeEditOutline, MdDeleteForever } from "react-icons/md";
// axios
import axios, { AxiosError } from "axios";
import { RoomRoutes } from "@/config/routes";
import { getCookie } from "cookies-next";
import notification from "@/hooks/useNotifications";
import Btn from "@/UI/BTN/Btn";

interface StoreValues {
    _id: string;
    nameRoom: string;
    NumberRoom: number;
    length: number;
    width: number;
    description: string;
    price: number;
    Discount: number;
    Duration: "M" | "d" | "y";
    RentalType: "null" | "rental" | "expire";
    status: boolean;
    isDeleted: boolean;
    Area_Id: {
        nameArea: string;
        address: string;
        maxRooms: number;
        _id: string;
        status: boolean;
        isDeleted: boolean;
    };
}

export default function ViewStore({ id }: { id: string }) {
    const [store, setStore] = useState<StoreValues>({
        _id: "",
        nameRoom: "",
        NumberRoom: 0,
        length: 0,
        width: 0,
        description: "",
        price: 0,
        Discount: 0,
        Duration: "M",
        RentalType: "null",
        status: false,
        isDeleted: false,
        Area_Id: {
            nameArea: "",
            address: "",
            maxRooms: 0,
            _id: "",
            status: false,
            isDeleted: false,
        },
    });
    const [openDelete, setOpenDelete] = useState(false);
    const [IdDe, setIdDe] = useState("");
    // load page
    const [loading, setLoading] = useState(true);
    const [stopClick, setStopClick] = useState(false)

    const openAndTakeId = (idItem: string) => {
        setOpenDelete(true);
        setIdDe(idItem);
    }
    // get store
    const GetStore = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${RoomRoutes.getOneFromOwner(id)}`, {
                headers: {
                    token: `${getCookie("token")}`
                }
            });
            const data = await response.data;
            console.log(data);
            setStore(data.room);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    const handelDelete = async () => {
        if (stopClick) return notification("Please wait, we are processing your request", "info");
        try {
            setStopClick(true)
            await axios.patch(RoomRoutes.delete(IdDe), {
                isDeleted: true
            }, {
                headers: {
                    token: `${getCookie("token")}`
                }
            });
            GetStore();
            setOpenDelete(false);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            console.log(err);
        } finally {
            setStopClick(false)
        }
    }

    // stop delete
    const handelStopDelete = async (id: string) => {
        if (stopClick) return notification("Please wait, we are processing your request", "info");
        try {
            setStopClick(true)
            await axios.put(RoomRoutes.update(id), {
                isDeleted: false
            }, {
                headers: {
                    token: `${getCookie("token")}`
                }
            });
            GetStore();
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            console.log(err);
        } finally {
            setStopClick(false)
        }
    }

    function Price() {
        if (store.Discount > 5) {
            if (store.Discount < store.price) {
                return (
                    <>
                        <span className="line-through">${store.price}</span>
                        <span className="font-bold text-black">${store.Discount}</span>
                    </>
                )
            }
            return (
                <span className="font-bold text-black">${store.Discount}</span>
            )
        }
        return (
            <span className="font-bold text-black">${store.price}</span>
        )
    }

    const GetDuration = (Dur: string) => {
        if (Dur === "W") {
            return "Week"
        }
        if (Dur === "M") {
            return "Month"
        }
        if (Dur === "d") {
            return "Day"
        }
        if (Dur === "y") {
            return "Year"
        }

    }

    useEffect(() => {
        GetStore()
    }, [])

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <LoadingDashScreen />
            </div>
        )
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Your Store Info</h1>
                <div className="flex items-center gap-2">
                    <Link href={`/owner_dashboard/stores/Edit/${id}`} className="p-[5px] flex justify-center items-center rounded-full border border-green-400 text-green-400 cursor-pointer"><MdModeEditOutline /></Link>
                    {!store.isDeleted && <span className="p-[5px] flex justify-center items-center rounded-full border border-red-400 text-red-400 cursor-pointer" onClick={() => openAndTakeId(store._id)}><MdDelete /></span>}
                    {store.isDeleted && <span className="p-[5px] flex justify-center items-center rounded-full border border-bule-400 text-blue-400 cursor-pointer" onClick={() => handelStopDelete(store._id)}><MdDeleteForever /></span>}
                </div>
            </div>
            <Content isLoading={false}>
                <div>
                    <div className={`${classes.con} flex flex-col md:flex-row md:justify-between md:items-center`}>
                        <h3 className={classes.title}>Store Name</h3>
                        <p className={classes.export}>
                            {store.nameRoom}
                        </p>
                    </div>
                    <div className={`${classes.con} flex flex-col md:flex-row md:justify-between md:items-center`}>
                        <h3 className={classes.title}>Number of Store</h3>
                        <p className={classes.export}>{store.NumberRoom}</p>
                    </div>
                    <div className={`${classes.con} flex flex-col md:flex-row md:justify-between md:items-center`}>
                        <h3 className={classes.title}>Hight</h3>
                        <p className={classes.export}>{store.length} meter</p>
                    </div>
                    <div className={`${classes.con} flex flex-col md:flex-row md:justify-between md:items-center`}>
                        <h3 className={classes.title}>Width</h3>
                        <p className={classes.export}>{store.width} meter</p>
                    </div>
                    <div className={`${classes.con} flex flex-col md:flex-row md:justify-between md:items-center`}>
                        <h3 className={classes.title}>Price</h3>
                        <p className={classes.export}>
                            <div className="flex items-center gap-2">
                                <Price />
                            </div>
                        </p>
                    </div>
                    <div className={`${classes.con} flex flex-col md:flex-row md:justify-between md:items-center`}>
                        <h3 className={classes.title}>Duration</h3>
                        <p className={classes.export}>{GetDuration(store.Duration)}</p>
                    </div>
                </div>
            </Content>
            <Content>
                {store.price ? <SWitchStatus urlGet={RoomRoutes.getOneFromOwner(id)} url={RoomRoutes.update(id)} /> : <Alarm type="error" IconsShow={false}>Please Edit and put Price To Can Actice</Alarm>}
                <div className={`${classes.con} flex flex-col md:flex-row md:justify-between md:items-center`}>
                    <h3 className={classes.title}>Rental Type</h3>
                    <p className={classes.export}>{store.RentalType === "null" && "no rental"} {store.RentalType === "rental" && "rental"} {store.RentalType === "expire" && "expire"}</p>
                </div>
                <div className={`${classes.con} flex flex-col md:flex-row md:justify-between md:items-center`}>
                    <h3 className={classes.title}>Area Name</h3>
                    <p className={classes.export}>{store.Area_Id.nameArea}</p>
                </div>
                <div className={`${classes.con} flex flex-col md:flex-row md:justify-between md:items-center`}>
                    <h3 className={classes.title}>Area Address</h3>
                    <p className={classes.export}>{store.Area_Id.address}</p>
                </div>
                <div className={`${classes.con} flex flex-col`}>
                    <h3 className={classes.title}>Description</h3>
                    <p className={classes.export}>{store.description}</p>
                </div>
            </Content>
            <Modal openState={{ isOpen: openDelete, setIsOpen: setOpenDelete }} header={{ title: "Delete Area", isClose: true }} footer={{ btn: <Btn BtnStatus="alarm" onClick={handelDelete} isLoading={stopClick}>Active Delete</Btn> }}>
                Do you sure want to delete this store
            </Modal>
        </div>
    )
}