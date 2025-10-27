"use client";
import { useState, useEffect } from "react";
// axios
import axios, { AxiosError } from "axios";
import { getCookie } from "cookies-next";
import { NotificationRoutes } from "@/config/routes";

// styles
import classes from "./notification.module.scss";
// ui
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/UI/ContextMenu/context-menu";
// icons
import { IoNotificationsOutline } from "react-icons/io5";
import { MdClose, MdDelete, MdErrorOutline } from "react-icons/md";
import { AiFillNotification } from "react-icons/ai";
import { TbEyeCheck } from "react-icons/tb";
import { GoInfo } from "react-icons/go";
import { IoWarningOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { BiSelectMultiple } from "react-icons/bi";
import notification from "@/hooks/useNotifications";

interface Notification {
    _id: string;
    notifyType: "suc" | "err" | "warn" | "info";
    notifyTitle: string;
    notifyMessage: string;
    isRead: boolean;
    isDeleted: boolean;
    DateWillDelete: string;
}


// const notifications: NotificationMsg[] = [
//     // ===== TAB: ALL =====
//     {
//         id: "noRead-1",
//         subject: "Welcome Back!",
//         message: "You have successfully logged into your account.",
//         type: "suc",
//         tab: "noRead",
//     },
//     {
//         id: "noRead-2",
//         subject: "New Order Received",
//         message: "You received a new order from customer Ahmed Hassan.",
//         type: "info",
//         tab: "noRead",
//     },
//     {
//         id: "noRead-3",
//         subject: "Stock Running Low",
//         message: "The product 'Bluetooth Headset' is almost out of stock.",
//         type: "warn",
//         tab: "noRead",
//     },
//     {
//         id: "noRead-4",
//         subject: "Payment Failed",
//         message: "Transaction for order #4521 failed due to payment error.",
//         type: "err",
//         tab: "noRead",
//     },
//     {
//         id: "noRead-5",
//         subject: "New Review Added",
//         message: "Customer left a 5-star review on 'Smart Watch'.",
//         type: "info",
//         tab: "noRead",
//     },
//     {
//         id: "noRead-6",
//         subject: "Discount Activated",
//         message: "Your discount campaign 'Summer Sale' is now active.",
//         type: "suc",
//         tab: "noRead",
//     },

//     // ===== TAB: READ =====
//     {
//         id: "read-1",
//         subject: "Weekly Summary",
//         message: "Your weekly sales summary is now available.",
//         type: "info",
//         tab: "read",
//     },
//     {
//         id: "read-2",
//         subject: "Order Delivered",
//         message: "Order #7823 has been successfully delivered.",
//         type: "suc",
//         tab: "read",
//     },
//     {
//         id: "read-3",
//         subject: "Subscription Renewal",
//         message: "Your plan will renew automatically tomorrow.",
//         type: "warn",
//         tab: "read",
//     },
//     {
//         id: "read-4",
//         subject: "Invalid Address",
//         message: "Order #6594 failed due to invalid shipping address.",
//         type: "err",
//         tab: "read",
//     },
//     {
//         id: "read-5",
//         subject: "Profile Updated",
//         message: "You successfully updated your account information.",
//         type: "suc",
//         tab: "read",
//     },
//     {
//         id: "read-6",
//         subject: "New Feature",
//         message: "Check out our new analytics dashboard for detailed insights.",
//         type: "info",
//         tab: "read",
//     },

//     // ===== TAB: DELETE =====
//     {
//         id: "delete-1",
//         subject: "Product Deleted",
//         message: "The product 'Old Phone Model' has been removed from your store.",
//         type: "info",
//         tab: "delete",
//     },
//     {
//         id: "delete-2",
//         subject: "Customer Removed",
//         message: "Customer account 'mohamed_2001' has been deleted.",
//         type: "warn",
//         tab: "delete",
//     },
//     {
//         id: "delete-3",
//         subject: "Ad Campaign Ended",
//         message: "Your ad campaign 'Flash Deal' has expired and been removed.",
//         type: "info",
//         tab: "delete",
//     },
//     {
//         id: "delete-4",
//         subject: "Payment Record Deleted",
//         message: "Old payment record #A124 has been permanently removed.",
//         type: "err",
//         tab: "delete",
//     },
//     {
//         id: "delete-5",
//         subject: "Archived Message Removed",
//         message: "An archived support message has been deleted.",
//         type: "warn",
//         tab: "delete",
//     },
//     {
//         id: "delete-6",
//         subject: "Old Report Cleared",
//         message: "Your outdated sales reports were successfully cleared.",
//         type: "suc",
//         tab: "delete",
//     },
// ];


export default function Notification() {
    const [show, setShow] = useState(false);
    const [reHide, setReHide] = useState(true);

    // tabs select
    const [activeTab, setActiveTab] = useState<"noRead" | "read" | "delete">("noRead");

    // select status
    const [selectActive, setSelectActive] = useState<boolean>(false);
    const [selected, setSelected] = useState<string[]>([]);
    const [allIsSelected, setAllIsSelected] = useState<boolean>(false);
    // notify data
    const [notifications, setNotifications] = useState<Notification[]>([]);
    // state all
    const [noRead, setNoRead] = useState<Notification[]>([]);
    // state read
    const [read, setRead] = useState<Notification[]>([]);
    // state delete
    const [deleteMsg, setDeleteMsg] = useState<Notification[]>([]);

    // load notify
    const [loadNotify, setLoadNotify] = useState<boolean>(true);
    // stop action
    const [stopAction, setStopAction] = useState<boolean>(false);

    // const get notification
    const GetNotify = async () => {
        try {
            setLoadNotify(true);
            const response = await axios.get(NotificationRoutes.getAll, {
                headers: {
                    token: `${getCookie("token")}`
                }
            });
            const data = await response.data;
            console.log(data);
            setNotifications(data);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            console.log(err);
        } finally {
            setLoadNotify(false);
        }
    }

    const GetNotifyNoLoad = async () => {
        try {
            const response = await axios.get(NotificationRoutes.getAll, {
                headers: {
                    token: `${getCookie("token")}`
                }
            });
            const data = await response.data;
            console.log(data);
            setNotifications(data);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            console.log(err);
        }
    }

    const handleList = () => {
        GetNotifyNoLoad();
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

    // selected data
    const handleSelect = (id: string) => {
        setSelected((prev: string[]) => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            } else {
                return [...prev, id];
            }
        });

        setSelectActive(true);

        // عشان تشوف القيمة الجديدة بعد التحديث
        // استخدم useEffect بدل console.log هنا
    };


    // check all
    const handleCheckAll = () => {
        GetNotifyNoLoad();
        if (selected.length !== notifications.length) {
            setSelected(notifications.map((item) => item._id));
        } else {
            setSelected([]);
        }
    }

    // check if select is empty
    const checkDataIsFull = () => {
        if (selected.length === notifications.length) {
            setAllIsSelected(true);
        } else {
            setAllIsSelected(false);
        }
    }


    // operations single and selected
    const OperationSingle = async (id: string[], opt: "read" | "delete") => {
        const url = opt === "read" ? NotificationRoutes.read : NotificationRoutes.delete;
        if (stopAction) return;
        setStopAction(true);
        try {
            await axios.patch(url, id, {
                headers: {
                    token: `${getCookie("token")}`
                }
            });

            GetNotifyNoLoad();
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            console.log(err);
            notification(err.response?.data.message || "Something went wrong", "error");
        } finally {
            setStopAction(false);
        }
    }

    const OperationSelected = async (opt: "read" | "delete") => {
        const url = opt === "read" ? NotificationRoutes.read : NotificationRoutes.delete;
        if (stopAction) return;
        setStopAction(true);
        if (selected.length <= 0) return notification("Please select at least one notification", "warn");
        try {
            await axios.patch(url, selected, {
                headers: {
                    token: `${getCookie("token")}`
                }
            });

            GetNotifyNoLoad();
            setSelected([]);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            console.log(err);
            notification(err.response?.data.message || "Something went wrong", "error");
        } finally {
            setStopAction(false);
        }
    }


    // update fun after 1 minute
    function preciseInterval() {
        const start = Date.now();
        GetNotifyNoLoad();
        const elapsed = Date.now() - start;
        const delay = Math.max(0, 60000 - elapsed);
        setTimeout(preciseInterval, delay);
    }

    useEffect(() => {
        GetNotify()
        preciseInterval();

    }, []);

    useEffect(() => {
        const filteredNoRead = notifications.filter((item) => !item.isRead && !item.isDeleted);
        const filteredRead = notifications.filter((item) => item.isRead && !item.isDeleted);
        const filteredDelete = notifications.filter((item) => item.isDeleted);
        setNoRead(filteredNoRead);
        setRead(filteredRead);
        setDeleteMsg(filteredDelete);
    }, [notifications]);

    useEffect(() => {
        console.log(selected);
        checkDataIsFull();
    }, [selected])


    if (loadNotify) {
        return (
            <div className={classes.NotificationContainer}>
                <div className={classes.iconOpen} onClick={handleList}>
                    <IoNotificationsOutline />
                </div>
                <div className={`${classes.notification} ${show ? classes.show : classes.hide} ${reHide ? classes.Re_Hide : ""}`}>
                    <div className="flex justify-end items-center mb-2 md:hidden">
                        <span className="cursor-pointer text-slate-600 hover:text-slate-800 p-[5px] rounded-full transition hover:bg-slate-200 hover:backdrop-opacity-5" onClick={handleList}><MdClose /></span>
                    </div>
                    <div className={`flex justify-between items-center ${classes.header}`}>
                        <button className={`${activeTab === "delete" ? classes.act : ""}`}><MdDelete /></button>
                        <button className={`${activeTab === "read" ? classes.act : ""}`}><TbEyeCheck /></button>
                        <button className={`${activeTab === "noRead" ? classes.act : ""}`}><AiFillNotification /></button>
                    </div>
                    <ul>
                        <div className="h-[360px] flex justify-center items-center">
                            <span className={classes.loader}></span>
                        </div>
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <div className={classes.NotificationContainer}>
            <div className={classes.iconOpen} onClick={handleList}>
                <IoNotificationsOutline />
                {noRead.length > 0 && <span className={classes.badge}>+{noRead.length}</span>}
            </div>
            <div className={`${classes.notification} ${show ? classes.show : classes.hide} ${reHide ? classes.Re_Hide : ""}`}>
                <div className="flex justify-end items-center mb-2 md:hidden">
                    <span className="cursor-pointer text-slate-600 hover:text-slate-800 p-[5px] rounded-full transition hover:bg-slate-200 hover:backdrop-opacity-5" onClick={handleList}><MdClose /></span>
                </div>
                <div className={`flex justify-between items-center ${classes.header}`}>
                    <button className={`${activeTab === "delete" ? classes.act : ""}`} onClick={() => { setActiveTab("delete"); setSelectActive(false); setSelected([]) }}><MdDelete /></button>
                    <button className={`${activeTab === "read" ? classes.act : ""}`} onClick={() => { setActiveTab("read"); setSelectActive(false); setSelected([]) }}><TbEyeCheck /></button>
                    <button className={`${activeTab === "noRead" ? classes.act : ""}`} onClick={() => { setActiveTab("noRead"); setSelectActive(false); setSelected([]) }}><AiFillNotification /></button>
                </div>
                {
                    selectActive && (activeTab === "noRead" || activeTab === "read") && (
                        <div className={`flex justify-between items-center ${classes.header}`}>
                            <div className="flex gap-2">
                                <button onClick={() => OperationSelected("delete")}><MdDelete /></button>
                                {
                                    activeTab === "noRead" && (
                                        <button onClick={() => OperationSelected("read")}><TbEyeCheck /></button>

                                    )}
                                <button onClick={() => { setSelected([]); setSelectActive(false) }}><MdClose /></button>
                            </div>
                            <div>
                                <input type="checkbox" checked={allIsSelected} onChange={handleCheckAll} />
                            </div>
                        </div>
                    )
                }

                <ul>
                    {
                        activeTab === "noRead" && noRead.map((item) => (
                            <ContextMenu>
                                <ContextMenuTrigger className="">
                                    <li key={item._id} onClick={() => { selectActive && handleSelect(item._id) }} className={`${classes[item.notifyType]} ${selectActive && selected.includes(item._id) ? classes.selected : ""}`}>
                                        <div className={classes.iconList}>
                                            {
                                                item.notifyType === "suc" && <FaRegCheckCircle />
                                            }
                                            {
                                                item.notifyType === "err" && <MdErrorOutline />
                                            }
                                            {
                                                item.notifyType === "warn" && <IoWarningOutline />
                                            }
                                            {
                                                item.notifyType === "info" && <GoInfo />
                                            }
                                        </div>
                                        <div className={classes.info}>
                                            <h3>{item.notifyTitle}</h3>
                                            <p>{item.notifyMessage}</p>
                                        </div>
                                    </li>
                                </ContextMenuTrigger>
                                {!selectActive && (
                                    <ContextMenuContent style={{ zIndex: 999 }}>
                                        <ContextMenuItem onClick={() => OperationSingle([item._id], "read")} ><TbEyeCheck /> is Looked</ContextMenuItem>
                                        <ContextMenuItem onClick={() => OperationSingle([item._id], "delete")} ><MdDelete /> Delete</ContextMenuItem>
                                        <ContextMenuItem onClick={() => handleSelect(item._id)}><BiSelectMultiple /> select</ContextMenuItem>
                                    </ContextMenuContent>
                                )}
                            </ContextMenu>
                        ))
                    }

                    {
                        activeTab === "read" && read.map((item) => (
                            <ContextMenu>
                                <ContextMenuTrigger className="">
                                    <li key={item._id} onClick={() => { selectActive && handleSelect(item._id) }} className={`${classes[item.notifyType]} ${selectActive && selected.includes(item._id) ? classes.selected : ""}`}>
                                        <div className={classes.iconList}>
                                            {
                                                item.notifyType === "suc" && <FaRegCheckCircle />
                                            }
                                            {
                                                item.notifyType === "err" && <MdErrorOutline />
                                            }
                                            {
                                                item.notifyType === "warn" && <IoWarningOutline />
                                            }
                                            {
                                                item.notifyType === "info" && <GoInfo />
                                            }
                                        </div>
                                        <div className={classes.info}>
                                            <h3>{item.notifyTitle}</h3>
                                            <p>{item.notifyMessage}</p>
                                        </div>
                                    </li>
                                </ContextMenuTrigger>
                                {!selectActive && (
                                    <ContextMenuContent style={{ zIndex: 999 }}>
                                        <ContextMenuItem onClick={() => OperationSingle([item._id], "delete")} ><MdDelete /> Delete</ContextMenuItem>
                                        <ContextMenuItem onClick={() => handleSelect(item._id)}><BiSelectMultiple /> select</ContextMenuItem>
                                    </ContextMenuContent>
                                )}
                            </ContextMenu>
                        ))
                    }

                    {
                        activeTab === "delete" && deleteMsg.map((item) => (
                            <li key={item._id} className={classes[item.notifyType]}>
                                <div className={classes.iconList}>
                                    {
                                        item.notifyType === "suc" && <FaRegCheckCircle />
                                    }
                                    {
                                        item.notifyType === "err" && <MdErrorOutline />
                                    }
                                    {
                                        item.notifyType === "warn" && <IoWarningOutline />
                                    }
                                    {
                                        item.notifyType === "info" && <GoInfo />
                                    }
                                </div>
                                <div className={classes.info}>
                                    <h3>{item.notifyTitle}</h3>
                                    <p>{item.notifyMessage}</p>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}