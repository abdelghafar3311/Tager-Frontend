"use client"
import React, { useState, useEffect } from "react"

// axios
import axios, { AxiosError } from "axios"
// cookies
import { getCookie } from "cookies-next"
// routes
import { RentalRoutes } from "@/config/routes"
// UI
import Card from "@/UI/Card/Card"
import Alarm from "@/UI/Alarm/alarm";
import LoadingDashScreen from "@/components/loading-com/dash-load"
import Modal from "@/UI/Modal/modal";
import SecurityTab from "@/UI/Security tab/security";
// hooks
import notification from "@/hooks/useNotifications"
// icons
import { FaPlus } from "react-icons/fa"
import { IoMdRefresh } from "react-icons/io"
import { TbContract } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import Link from "next/link"
import Btn from "@/UI/BTN/Btn"
// Redux Rentals
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks"
import { setRentals, setRequests, setIsCachingUpdate } from "@/Redux/slices/customer/rentals"
import { GetCustomer } from "@/fetchData/fetch"
interface Rental {
    _id: string;
    subscriptionState: string;
    isDeleted: boolean;
    isAccept: "accept" | "reject" | "pending";
    Area_Id: {
        _id: string;
        nameArea: string;
        address: string;
    };
    Room_Id: {
        _id: string;
        nameRoom: string;
        NumberRoom: number;
        Discount: number;
        price: number;
    };
    Owner_Id: {
        _id: string;
        username: string;
    };
    Customer_Id: {
        _id: string;
        username: string;
        money: number;
    };
    startDate: string;
    endDate: string;
    expires: string;
    pay: number;
}


interface Request {
    _id: string;
    time: string;
    pay: number;
    Rental_Id: string;
    Customer_Id: string;
    Room_Id: {
        _id: string;
        nameRoom: string;
        NumberRoom: number;
    };
    Owner_Id: string;
    willDelete: boolean;
    status: string;
    DeleteToken: string;
}


export default function MainRentalPage() {

    // redux
    const dispatch = useAppDispatch();
    const { rentals, requests, isCachingUpdate } = useAppSelector((state) => state.rentalsCustomer);

    const [renOrReq, setRenOrReq] = useState<"rentals" | "requests">("rentals");
    const [show, setShow] = useState<string>("all");
    const [reqShow, setReqShow] = useState<string>("all");
    // const [req, setReq] = useState<Request[]>([]);
    // const [rentals, setRental] = useState<Rental[]>([]);
    const [loadReq, setLoadReq] = useState<boolean>(true);

    // modal update rental
    const [updateModal, setUpdateModal] = useState<boolean>(false);
    const [updateId, setUpdateId] = useState<string>("");
    const [loadUpdate, setLoadUpdate] = useState<boolean>(false);
    const [updateData, setUpdateData] = useState<{
        timeNumber: number;
        timeType: string;
        nameRoom: string;
        price: number,
        money: number
    }>({
        timeNumber: 1,
        timeType: "m",
        nameRoom: "",
        price: 0,
        money: 0
    });

    // delete Rental
    const [loadDelete, setLoadDelete] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<string>("");
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    // update Rental
    const openUpdateModal = (id: string, data: { nameRoom: string; price: number, money: number }) => {
        setUpdateId(id);
        setUpdateData({
            nameRoom: data.nameRoom,
            timeNumber: 1,
            timeType: "m",
            price: data.price,
            money: data.money
        });
        setUpdateModal(true);
    }

    // open Delete Rental
    const openDeleteModal = (id: string) => {
        setDeleteId(id);
        setDeleteModal(true);
    }

    // filter data state
    const [filterData, setFilterData] = useState<Rental[]>([]);
    const [filterReq, setFilterReq] = useState<Request[]>([]);
    const getReqRentals = async () => {
        setLoadReq(true);
        const token = getCookie("token");
        try {
            const res = await axios.get(RentalRoutes.getAll, {
                headers: {
                    token: `${token}`,
                },
            });
            const data = await res.data;
            dispatch(setRentals(data.rentals));
            dispatch(setRequests(data.ReqRental));
            dispatch(setIsCachingUpdate(true));
            setFilterReq(data.ReqRental);
            setFilterData(data.rentals);
            await GetCustomer(dispatch);
            setLoadReq(false);
        } catch (error) {
            setLoadReq(false);
            console.log(error);
        }
    }


    const formatTime = (str: string) => {
        const mapK: { [key: string]: string } = { M: " month", m: " minutes", h: " hour", y: " year", d: " days" };
        return str.replace(/[Mmhyd]/g, c => mapK[c] || c);
    }

    const updateRental = async () => {
        const token = getCookie("token");
        if (loadUpdate) return notification("Please wait!", "info");
        try {
            setLoadUpdate(true);
            const res = await axios.patch(RentalRoutes.updateSubscription(updateId), {
                timeNumber: updateData.timeNumber,
                timeType: updateData.timeType
            }, {
                headers: {
                    token: `${token}`,
                },
            });
            const data = await res.data;
            notification(data.message, "success");
            setUpdateModal(false);
            getReqRentals();
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            notification(err.response?.data.message || "Something went wrong", "error");
            console.log(error);
        } finally {
            setLoadUpdate(false);
        }
    }

    // Delete Rental fun
    const deleteRental = async () => {
        const token = getCookie("token");
        if (loadDelete) return notification("Please wait!", "info");
        try {
            setLoadDelete(true);
            const res = await axios.delete(RentalRoutes.deleteCustomer(deleteId), {
                headers: {
                    token: `${token}`,
                },
            });
            const data = await res.data;
            notification(data.message, "success");
            setDeleteModal(false);
            getReqRentals();
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            notification(err.response?.data.message || "Something went wrong", "error");
            console.log(error);
        } finally {
            setLoadDelete(false);
        }
    }

    useEffect(() => {
        if (show === "all") {
            setFilterData(rentals);
        } else if (show === "expired") {
            const data = rentals.filter((item) => item.subscriptionState === "expired");
            setFilterData(data);
        } else if (show === "active") {
            const data = rentals.filter((item) => item.subscriptionState === "active");
            setFilterData(data);
        }

        if (reqShow === "all") {
            setFilterReq(requests);
        } else if (reqShow === "pending") {
            const data = requests.filter((item) => item.status === "pending");
            setFilterReq(data);
        } else if (reqShow === "reject") {
            const data = requests.filter((item) => item.status === "reject");
            setFilterReq(data);
        }
    }, [show, reqShow, requests, rentals, renOrReq])

    useEffect(() => {
        if (!isCachingUpdate) {
            getReqRentals();
        }
        if (isCachingUpdate) {
            setLoadReq(false);
        }
    }, [])

    if (loadReq) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingDashScreen />
            </div>
        )
    }

    return (
        <div>
            <div className="mb-4 flex justify-between">
                <h1 className="text-3xl font-extrabold">Rentals</h1>
                <div className="flex items-center gap-2">
                    <button className="flex items-center justify-center gap-1 transition-all px-3 text-2xl py-3 rounded-full bg-white text-[12px] hover:shadow cursor-pointer relative" onClick={() => getReqRentals()}><IoMdRefresh /></button>
                    <Link href={"/dashboard_customer/rentals/pay"} className="flex items-center justify-center gap-1 transition-all px-3 text-2xl py-3 rounded-full bg-white text-[12px] hover:shadow cursor-pointer relative"><FaPlus /></Link>
                </div>
            </div>
            <div className="flex gap-4 mt-4 justify-between items-center border-b border-gray-400 mb-2 p-2">
                <div className="flex gap-4 mt-4 justify-start items-center">
                    <div onClick={() => setRenOrReq("rentals")} className={`flex items-center justify-center gap-1 transition-all px-1 text-[12px] py-1 rounded border ${renOrReq == "rentals" ? "border-blue-600 text-blue-600" : "border-gray-400 text-gray-400"} text-[12px] hover:shadow cursor-pointer relative`}>
                        <span>Rentals</span>
                    </div>
                    <div onClick={() => setRenOrReq("requests")} className={`flex items-center justify-center gap-1 transition-all px-1 text-[12px] py-1 rounded border ${renOrReq == "requests" ? "border-blue-600 text-blue-600" : "border-gray-400 text-gray-400"} text-[12px] hover:shadow cursor-pointer relative`}>
                        <span>Requests</span>
                    </div>
                </div>
                <div className="flex gap-4 mt-4 justify-end items-center">
                    {renOrReq === "rentals" && <>
                        <div onClick={() => setShow("all")} className={`flex items-center justify-center gap-1 transition-all px-1 text-[12px] py-1 rounded ${show == "all" ? "border-blue-600 text-blue-600" : "border-gray-400 text-gray-400"} text-[12px] hover:shadow cursor-pointer relative`}>
                            <span>All</span>
                        </div>
                        <div onClick={() => setShow("active")} className={`flex items-center justify-center gap-1 transition-all px-1 text-[12px] py-1 rounded border ${show == "active" ? "border-blue-600 text-blue-600" : "border-gray-400 text-gray-400"} text-[12px] hover:shadow cursor-pointer relative`}>
                            <span>Active</span>
                        </div>
                        <div onClick={() => setShow("expired")} className={`flex items-center justify-center gap-1 transition-all px-1 text-[12px] py-1 rounded border ${show == "expired" ? "border-blue-600 text-blue-600" : "border-gray-400 text-gray-400"} text-[12px] hover:shadow cursor-pointer relative`}>
                            <span>Expire</span>
                        </div>
                    </>}
                    {renOrReq === "requests" && <>
                        <div onClick={() => setReqShow("all")} className={`flex items-center justify-center gap-1 transition-all px-1 text-[12px] py-1 rounded ${reqShow == "all" ? "border-blue-600 text-blue-600" : "border-gray-400 text-gray-400"} text-[12px] hover:shadow cursor-pointer relative`}>
                            <span>All</span>
                        </div>
                        <div onClick={() => setReqShow("pending")} className={`flex items-center justify-center gap-1 transition-all px-1 text-[12px] py-1 rounded border ${reqShow == "pending" ? "border-blue-600 text-blue-600" : "border-gray-400 text-gray-400"} text-[12px] hover:shadow cursor-pointer relative`}>
                            <span>Pending</span>
                        </div>
                        <div onClick={() => setReqShow("reject")} className={`flex items-center justify-center gap-1 transition-all px-1 text-[12px] py-1 rounded border ${reqShow == "reject" ? "border-blue-600 text-blue-600" : "border-gray-400 text-gray-400"} text-[12px] hover:shadow cursor-pointer relative`}>
                            <span>Reject</span>
                        </div>
                    </>}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {renOrReq === "rentals" && <>
                    {filterData && filterData.map((item: Rental) => (
                        <Card key={item._id} ClassName="flex items-start justify-start">
                            <div className="w-full">
                                {item.isDeleted && <Alarm subject="This will Delete after finish Rental" type="warning" ></Alarm>}
                                <div className="flex mt-3 items-center justify-between">
                                    <h1 className="font-bold text-2xl">{item.Room_Id.nameRoom}</h1>
                                    <div className="flex flex-row gap-2 items-center">
                                        {item.isAccept !== "pending" && item.isAccept !== "reject" && <>
                                            {item.subscriptionState == "expired" && <span className="p-[5px] flex justify-center items-center rounded-full border border-blue-400 text-blue-400 cursor-pointer" onClick={() => openUpdateModal(item._id, { nameRoom: item.Room_Id.nameRoom, price: item.Room_Id.Discount > 5 && item.Room_Id.Discount < item.Room_Id.price ? item.Room_Id.Discount : item.Room_Id.price, money: item.Customer_Id.money })}><TbContract /></span>}
                                            <span className="p-[5px] flex justify-center items-center rounded-full border border-red-400 text-red-400 cursor-pointer" onClick={() => openDeleteModal(item._id)}><MdDelete /></span>
                                        </>}
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row items-start md:justify-between">
                                    {item.isAccept !== "pending" && item.isAccept !== "reject" && <><div className="w-full p-2">
                                        <div className="flex items-center justify-between">
                                            <h3>Number Store</h3>
                                            <p className="text-gray-400">{item.Room_Id.NumberRoom}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <h3>Expired in</h3>
                                            <p className="text-gray-400">{item.endDate}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <h3>Subscription State</h3>
                                            <p className={`${item.subscriptionState == "active" ? "text-green-400" : item.subscriptionState == "expired" ? "text-red-400" : "text-gray-400"}`}>{item.subscriptionState}</p>
                                        </div>
                                    </div>
                                        <div className="w-full p-2">
                                            <div className="flex items-center justify-between">
                                                <h3>Money Pay</h3>
                                                <p className="text-gray-400">${item.pay}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <h3>Area Name</h3>
                                                <p className="text-gray-400">{item.Area_Id.nameArea}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <h3>Area Address</h3>
                                                <p className="text-gray-400">{item.Area_Id.address}</p>
                                            </div>
                                        </div></>}
                                    {(item.isAccept === "pending" || item.isAccept === "reject") && <>
                                        <div className="w-full p-2">
                                            <div className="flex items-center justify-between">
                                                <h3>Number Store</h3>
                                                <p className="text-gray-400">{item.Room_Id.NumberRoom}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <h3>Money Pay</h3>
                                                <p className="text-gray-400">${item.pay}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <h3>Subscription State</h3>
                                                <p className={`${item.isAccept == "pending" ? "text-gray-400" : "text-red-400"}`}>{item.isAccept}</p>
                                            </div>
                                        </div>
                                        <div className="w-full p-2">
                                            <div className="flex items-center justify-between">
                                                <h3>Area Name</h3>
                                                <p className="text-gray-400">{item.Area_Id.nameArea}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <h3>Area Address</h3>
                                                <p className="text-gray-400">{item.Area_Id.address}</p>
                                            </div>
                                        </div>
                                    </>}
                                </div>
                            </div>
                        </Card>
                    ))}
                    {Array.isArray(filterData) && filterData.length === 0 && (
                        <Alarm subject="No Rentals" type="warning" />
                    )}
                </>}
                {renOrReq === "requests" && <>
                    {filterReq && filterReq.map(item => (
                        <Card key={item._id} ClassName="flex items-start justify-start">
                            <div className="w-full">
                                <div className="flex mt-3 items-center justify-between">
                                    <h1 className="font-bold text-2xl">{item.Room_Id.nameRoom}</h1>
                                    <p className={`px-2 py-1 rounded-full ${item.status == "pending" ? "bg-gray-200 text-gray-600" : "bg-red-200 text-red-600"}`}>{item.status}</p>
                                </div>
                                <div className="flex flex-col md:flex-row items-start md:justify-between">
                                    <div>
                                        <div className="w-full p-2">
                                            <div className="flex items-center gap-2">
                                                <h3>Number Store</h3>
                                                <p className="text-gray-400">{item.Room_Id.NumberRoom}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <h3>money pay</h3>
                                                <p className="text-gray-400">{item.pay}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <h3>Time Rental</h3>
                                                <p className={`text-gray-400`}>{formatTime(item.time)}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                    {filterReq.length === 0 && <Alarm subject="No Requests" type="warning" ></Alarm>}
                </>}

            </div>


            <Modal
                openState={{
                    isOpen: updateModal,
                    setIsOpen: setUpdateModal,
                }}
                header={{
                    title: "update Rental",
                    isClose: true,
                }}
                footer={{
                    isClose: false,
                    btn: <Btn isLoading={loadUpdate} onClick={() => updateRental()}>Subscription</Btn>,
                }}
            >
                <h3 className="font-bold text-xl">Name Store: <span className="text-[#097]">{updateData.nameRoom}</span></h3>

                <div className="w-full flex items-center">
                    <div className="flex gap-2 items-center w-full">
                        {/* number input */}
                        <input
                            id="period-number"
                            type="number"
                            min="0"
                            className={`px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400`}
                            placeholder="Amount"
                            aria-label="Amount"
                            value={updateData.timeNumber.toString()}
                            onChange={(e) => setUpdateData({ ...updateData, timeNumber: +e.target.value })}
                        />

                        {/* select input */}
                        <div className="relative w-1/2 md:w-1/3">
                            <select
                                id="period-unit"
                                value={updateData.timeType}
                                onChange={(e) => setUpdateData({ ...updateData, timeType: e.target.value })}
                                className={`appearance-none w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                aria-label="Period unit"
                            >
                                <option value={""} disabled>no select</option>
                                <option value={"m"}>minutes</option>
                                <option value={"h"}>hours</option>
                                <option value={"d"}>days</option>
                                <option value={"M"}>month</option>
                                <option value={"y"}>year</option>
                            </select>
                            {/* chevron */}
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                                    <path d="M6 8l4 4 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <p className={`font-bold text-slate-600 mt-3 `}>Total : <span className={`font-bold ${(updateData.timeNumber * updateData.price > updateData.money ? "text-red-600" : "text-black")}`}>${updateData.price * updateData.timeNumber}</span></p>
            </Modal>

            <SecurityTab
                ACTIONS="fun"
                role="customer"
                openState={{
                    isOpen: deleteModal,
                    setIsOpen: setDeleteModal,
                }}
                TitleAction="Delete Rental"
                Fun={() => deleteRental()}
            />
        </div>
    )
}