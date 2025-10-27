"use client"

import { useState, useEffect } from "react"

import Content from "@/components/Dashbpoard Tools/ContentStyle/content"
import Table from "@/UI/Table/Table";
import Btn from "@/UI/BTN/Btn";
import Modal from "@/UI/Modal/modal";
import LoadingDashScreen from "@/components/loading-com/dash-load";
// axios
import axios, { AxiosError } from "axios";
// routes
import { RentalRoutes } from "@/config/routes";
// cookies
import { getCookie } from "cookies-next";
// notification
import notification from "@/hooks/useNotifications";
// icons
import { CiAlignLeft, CiViewTable } from "react-icons/ci"
import { IoMdRefresh } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { MdClose } from "react-icons/md";


interface ReqRental {
    _id: string;
    nameRoom: string;
    NumberRoom: number;
    status: boolean;
    length: number;
    width: number;
    description: string;
    price: number;
    Duration: string;
    Discount: number;
    RentalType: string;
    Area_Id: string;
    isDeleted: boolean;
    requests: {
        _id: string;
        time: string;
        pay: number;
        Rental_Id: {
            _id: string;
            isAccept: string;
        };
        Customer_Id: {
            _id: string;
            username: string;
        };
        Room_Id: string;
        Owner_Id: string;
        willDelete: boolean;
        status: string;
    }[];
}

interface Requests {
    _id: string;
    time: string;
    pay: number;
    Rental_Id: {
        _id: string;
        isAccept: string;
    };
    Customer_Id: {
        _id: string;
        username: string;
    };
    Room_Id: string;
    Owner_Id: string;
    willDelete: boolean;
    status: string;
}

export default function ReqRental() {
    const [typeShow, setTypeShow] = useState("cards");

    // state Req
    const [reqRental, setReqRental] = useState<ReqRental[]>([]);
    // state modal
    const [showModal, setShowModal] = useState(false);
    const [showModalReject, setShowModalReject] = useState(false);
    // id
    const [id, setId] = useState("");
    // loading btn
    const [loadingBtn, setLoadingBtn] = useState(false);
    // load
    const [loading, setLoading] = useState(true);
    // get cookie
    const token = getCookie("token");

    // get data
    const fetchData = async () => {
        try {
            setLoading(true)
            console.log("loading fetch ...")
            const response = await axios.get(RentalRoutes.getRequests, {
                headers: {
                    token: `${token}`
                }
            });
            const data = await response.data;
            console.log(data);
            setReqRental(data);
            setLoading(false)
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            console.log(err);
        }
    }

    const formatTime = (str: string) => {
        const mapK: { [key: string]: string } = { M: " month", m: " minutes", h: " hour", y: " year", d: " days" };
        return str.replace(/[Mmhyd]/g, c => mapK[c] || c);
    }

    const openModal = (id: string) => {
        setId(id);
        setShowModal(true);
    }

    const openModalReject = (id: string) => {
        setId(id);
        setShowModalReject(true);
    }

    const acceptReq = async () => {
        if (loadingBtn) return;
        setLoadingBtn(true);
        try {
            const response = await axios.patch(RentalRoutes.acceptOrReject(id), { isAccept: "accept" }, {
                headers: {
                    token: `${token}`
                }
            });
            const data = await response.data;
            notification(data.message, "success");
            setShowModal(false);
            fetchData();
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            notification(err.response?.data.message || "Something went wrong", "error");
            console.log(err);
        } finally {
            setLoadingBtn(false);
        }
    }

    const rejectReq = async () => {
        if (loadingBtn) return;
        setLoadingBtn(true);
        try {
            const response = await axios.patch(RentalRoutes.acceptOrReject(id), { isAccept: "reject" }, {
                headers: {
                    token: `${token}`
                }
            });
            const data = await response.data;
            notification(data.message, "success");
            setShowModalReject(false);
            fetchData();
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            notification(err.response?.data.message || "Something went wrong", "error");
            console.log(err);
        } finally {
            setLoadingBtn(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (<div className="w-full h-screen flex justify-center items-center">
            <LoadingDashScreen />
        </div>)
    }

    return (
        <div>
            <div className="mb-4 flex justify-between">
                <h1 className="text-3xl font-extrabold">Rental Requests</h1>
                <div className="flex items-center gap-2">
                    <button className="flex items-center justify-center gap-1 transition-all px-3 text-2xl py-3 rounded-full bg-white text-[12px] hover:shadow cursor-pointer relative" onClick={fetchData}><IoMdRefresh /></button>
                </div>
            </div>

            <div className="flex gap-4 mt-4 justify-start items-center border-b border-gray-400 mb-2 p-2">
                <div onClick={() => setTypeShow("cards")} className={`flex items-center justify-center gap-1 transition-all px-1 text-[12px] py-1 rounded border ${typeShow == "cards" ? "border-blue-600 text-blue-600" : "border-gray-400 text-gray-400"} text-[12px] hover:shadow cursor-pointer relative`}>
                    <CiAlignLeft />
                    <span>Cards</span>
                </div>
                <div onClick={() => setTypeShow("table")} className={`flex items-center justify-center gap-1 transition-all px-1 text-[12px] py-1 rounded border ${typeShow == "table" ? "border-blue-600 text-blue-600" : "border-gray-400 text-gray-400"} text-[12px] hover:shadow cursor-pointer relative`}>
                    <CiViewTable />
                    <span>Table</span>
                </div>
            </div>

            {typeShow == "cards" && (
                <div className="flex flex-col">
                    {reqRental.length == 0 && (
                        <p className="text-gray-400 text-md text-center">No rental requests yet.</p>
                    )}
                    {reqRental.map((room: ReqRental) => (
                        <Content key={room._id}>

                            <h2 className="text-xl font-bold mb-2">{room.nameRoom}</h2>
                            <p className="font-semibold flex gap-1 mb-4">Price:  <p className="text-gray-400">${room.Discount > 5 ? room.Discount < room.price ? (<><span className="line-through text-gray-400">{room.price}</span> <span className="text-blue-400">{room.Discount}</span> </>) : room.Discount : room.price ? room.price : "Not Set Price"}</p></p>

                            <h3 className="font-semibold text-blue-600 mb-2">
                                Rental Requests:
                            </h3>

                            {room.requests.some((req: Requests) => req.Rental_Id.isAccept === "accept") ? (
                                <div>
                                    <p className="text-gray-400 text-sm text-center">
                                        The Store is Rental
                                    </p>
                                </div>
                            ) : (
                                <>
                                    {room.requests.length > 0 ? (
                                        room.requests.map((req: Requests) => (
                                            <>
                                                {req.status === "reject" ? <>
                                                    <div
                                                        key={req._id}
                                                        className="bg-gray-50 p-3 rounded-xl border border-gray-200 mb-2 hover:shadow-sm"
                                                    >
                                                        <div className="flex justify-between items-center">
                                                            <span className="font-medium">{req.Customer_Id.username}</span>
                                                        </div>
                                                        <p className="text-sm text-gray-700 mt-1">
                                                            Payment: <b>${req.pay}</b>
                                                        </p>
                                                        <p className="text-sm text-gray-700 mt-1">
                                                            Duration: <b>{formatTime(req.time)}</b>
                                                        </p>
                                                        <div className="flex justify-end gap-2 items-center text-slate-500">
                                                            is Rejected
                                                        </div>
                                                    </div>
                                                </> : <>
                                                    <div
                                                        key={req._id}
                                                        className="bg-gray-50 p-3 rounded-xl border border-gray-200 mb-2 hover:shadow-sm"
                                                    >
                                                        <div className="flex justify-between items-center">
                                                            <span className="font-medium">{req.Customer_Id.username}</span>
                                                        </div>
                                                        <p className="text-sm text-gray-700 mt-1">
                                                            Payment: <b>${req.pay}</b>
                                                        </p>
                                                        <p className="text-sm text-gray-700 mt-1">
                                                            Duration: <b>{formatTime(req.time)}</b>
                                                        </p>
                                                        <div className="flex justify-end gap-2 items-center">
                                                            <Btn onClick={() => openModal(req._id)}>
                                                                <FaCheck />
                                                            </Btn>
                                                            <Btn onClick={() => openModalReject(req._id)} BtnStatus="alarm">
                                                                <MdClose />
                                                            </Btn>
                                                        </div>
                                                    </div>
                                                </>}
                                            </>
                                        ))
                                    ) : (
                                        <p className="text-gray-400 text-sm">No rental requests yet.</p>
                                    )}

                                </>
                            )}

                        </Content>
                    ))}
                </div>
            )}
            {typeShow == "table" && (
                <div>
                    {reqRental.map((room: ReqRental) => (
                        <Content key={room._id}>
                            <h1 className="text-2xl font-bold mb-2">{room.nameRoom}</h1>
                            <p className="font-semibold flex gap-1 mb-4">Price: <p className="text-gray-400">${room.Discount > 5 ? room.Discount < room.price ? (<><span className="line-through text-gray-400">{room.price}</span> <span className="text-blue-400">{room.Discount}</span> </>) : room.Discount : room.price ? room.price : "Not Set Price"}</p></p>
                            <p className="h-[1px] bg-gray-400 mb-2"></p>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Money Pay</th>
                                        <th>Duration</th>
                                        <th>...Operations</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {room.requests.some((req: Requests) => req.Rental_Id.isAccept === "accept") ? (
                                        <tr>
                                            <td colSpan={4} className="text-center text-gray-400">
                                                The Store is Rental
                                            </td>
                                        </tr>
                                    ) : (
                                        room.requests.map((req: Requests) => (
                                            <>
                                                {req.status === "reject" ? <>
                                                    <tr key={req._id}>
                                                        <td>{req.Customer_Id.username}</td>
                                                        <td>${req.pay}</td>
                                                        <td>{formatTime(req.time)}</td>
                                                        <td className="flex gap-2 justify-center items-center text-slate-500">
                                                            is Rejected
                                                        </td>
                                                    </tr>
                                                </> : <>
                                                    <tr key={req._id}>
                                                        <td>{req.Customer_Id.username}</td>
                                                        <td>${req.pay}</td>
                                                        <td>{formatTime(req.time)}</td>
                                                        <td className="flex gap-2 justify-center items-center">
                                                            <Btn onClick={() => openModal(req._id)}>
                                                                <FaCheck />
                                                            </Btn>
                                                            <Btn onClick={() => openModalReject(req._id)} BtnStatus="alarm">
                                                                <MdClose />
                                                            </Btn>
                                                        </td>
                                                    </tr>
                                                </>}
                                            </>
                                        ))
                                    )}
                                </tbody>
                            </Table>
                        </Content>
                    ))}
                    {reqRental.length == 0 && (
                        <p className="text-gray-400 text-md text-center">No rental requests yet.</p>
                    )}
                </div>
            )}


            <Modal
                openState={{ isOpen: showModal, setIsOpen: setShowModal }}
                header={{ title: "Accept For Rental", isClose: true }}
                footer={{ btn: <Btn onClick={acceptReq} isLoading={loadingBtn}>Accept</Btn>, isClose: false }}
            >
                Do you sure accept for this customer?
            </Modal>

            <Modal
                openState={{ isOpen: showModalReject, setIsOpen: setShowModalReject }}
                header={{ title: "Reject For Rental", isClose: true }}
                footer={{ btn: <Btn onClick={rejectReq} isLoading={loadingBtn} BtnStatus="alarm">Reject</Btn>, isClose: false }}
            >
                Do you sure reject for this customer?
            </Modal>

        </div>
    )
}