"use client"
import { useState, useEffect } from "react";
// UI
import Msg from "@/UI/message/Msg";
import Card from "@/UI/Card/Card";
import Modal from "@/UI/Modal/modal";
import Btn from "@/UI/BTN/Btn";
import Alarm from "@/UI/Alarm/alarm";
import Content from "@/components/Dashbpoard Tools/ContentStyle/content";
import Table from "@/UI/Table/Table";
import SecurityTab from "@/UI/Security tab/security";
// icons
import { FaPlus } from "react-icons/fa6";
import { MdModeEditOutline, MdDelete, MdDeleteForever } from "react-icons/md";
import { PiMapPinAreaBold } from "react-icons/pi";
import { IoMdRefresh } from "react-icons/io";
import { CiAlignLeft, CiViewTable } from "react-icons/ci";
// form 
import FormAddBuilder from "./formAdd";
import FormEditBuilder from "./formEdit";
// axios
import axios, { AxiosError } from "axios";
// Area route
import { AreaRoutes } from "@/config/routes";
// cookies
import { getCookie } from "cookies-next";
// notification
import notification from "@/hooks/useNotifications";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setArea, setIsCachingUpdate } from "@/Redux/slices/owner/area";

export default function Area() {
    // redux
    const dispatch = useAppDispatch();
    const { area, isCachingUpdate } = useAppSelector(state => state.areas);
    // states
    /// type show (table or cards)
    const [typeShow, setTypeShow] = useState<"cards" | "table">("cards");
    /// modal 
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    // loading && security
    const [stopClick, setStopClick] = useState(false)
    /// id
    const [Id, setId] = useState("");
    const [IdDe, setIdDe] = useState("");
    // functions
    const openAndTakeId = (idItem: string) => {
        setOpenDelete(true);
        setIdDe(idItem);
    }
    // get data
    const fetchData = async () => {
        try {
            const response = await axios.get(AreaRoutes.getAll, {
                headers: {
                    token: `${getCookie("token")}`
                }
            });
            const data = await response.data;
            dispatch(setArea(data));
            dispatch(setIsCachingUpdate(true))
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            console.log(err);
        }
    }
    // Handlers
    /// update status
    const handelStatus = async (id: string, status: boolean) => {
        if (stopClick) return notification("Please wait, we are processing your request", "info");
        try {
            setStopClick(true)
            await axios.put(AreaRoutes.update(id), {
                status: status
            }, {
                headers: {
                    token: `${getCookie("token")}`
                }
            });
            fetchData();
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            console.log(err);
        } finally {
            setStopClick(false)
        }
    }
    /// delete
    const handelDelete = async () => {
        if (stopClick) return notification("Please wait, we are processing your request", "info");
        try {
            setStopClick(true)
            await axios.patch(AreaRoutes.delete(IdDe), {
                isDeleted: true
            }, {
                headers: {
                    token: `${getCookie("token")}`
                }
            });
            fetchData();
            setOpenDelete(false);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            console.log(err);
        } finally {
            setStopClick(false)
        }

    }
    /// stop delete
    const handelStopDelete = async (id: string) => {
        if (stopClick) return notification("Please wait, we are processing your request", "info");
        try {
            setStopClick(true)
            await axios.put(AreaRoutes.update(id), {
                isDeleted: false
            }, {
                headers: {
                    token: `${getCookie("token")}`
                }
            });
            fetchData();
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            console.log(err);
        } finally {
            setStopClick(false)
        }

    }
    // useEffect

    useEffect(() => {
        if (!isCachingUpdate) {
            fetchData();
        }
    }, [])

    useEffect(() => {
        fetchData();
    }, [open, openEdit])

    return (
        <div>
            <div className="mb-4 flex justify-between">
                <h1 className="text-3xl font-extrabold">Areas</h1>
                <div className="flex items-center gap-2">
                    <button className="flex items-center justify-center gap-1 transition-all px-3 text-2xl py-3 rounded-full bg-white text-[12px] hover:shadow cursor-pointer relative" onClick={() => fetchData()}><IoMdRefresh /></button>
                    <button className="flex items-center justify-center gap-1 transition-all px-3 text-2xl py-3 rounded-full bg-white text-[12px] hover:shadow cursor-pointer relative" onClick={() => setOpen(true)}><FaPlus /></button>
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
            {typeShow == "cards" && <div className="flex flex-col gap-2">
                {area?.map(item => (
                    <>
                        <Card ClassName="flex items-start justify-start">
                            <div className="w-[100%] flex items-start justify-between gap-2">
                                <div>
                                    <h1 className="font-bold text-2xl flex items-start gap-1"><span className="flex items-center gap-0.5"><PiMapPinAreaBold /> {item.nameArea}</span> <span title={item.status ? "Click to Not Active" : "Click to Active"} className={`${item.status ? "bg-green-200 text-black" : "bg-red-200 text-black"} text-[10px] py-[3px] px-[4px] font-extralight rounded-full cursor-pointer`} onClick={() => handelStatus(item._id, !item.status)}>{item.status ? "Active" : "Not Active"}</span></h1>
                                    <p className="mt-2 text-sm text-gray-500">Address: <span>{item.address}</span></p>                                    <p className="text-[12px] text-gray-500">Date: <span>{new Date(item.createdAt).toDateString()}</span></p>
                                </div>
                                <div className="flex flex-col md:flex-row gap-2 items-center">
                                    <span className="p-[5px] flex justify-center items-center rounded-full border border-green-400 text-green-400 cursor-pointer" onClick={() => { setId(item._id); setOpenEdit(true) }}><MdModeEditOutline /></span>
                                    {!item.isDeleted && <span className="p-[5px] flex justify-center items-center rounded-full border border-red-400 text-red-400 cursor-pointer" onClick={() => openAndTakeId(item._id)}><MdDelete /></span>}
                                    {item.isDeleted && <span className="p-[5px] flex justify-center items-center rounded-full border border-bule-400 text-blue-400 cursor-pointer" onClick={() => handelStopDelete(item._id)}><MdDeleteForever /></span>}
                                </div>
                            </div>
                        </Card>
                    </>
                ))}
                {!area && <Alarm IconsShow={false} type="error">Not Found Areas</Alarm>}
            </div>}
            {typeShow == "table" &&
                <Table>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>Address</th>
                            <th>Date</th>
                            <th>status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {area?.map(item => (
                            <tr key={item._id}>
                                <td>{item.nameArea}</td>
                                <td>{item.address}</td>
                                <td>{new Date(item.createdAt).toDateString()}</td>
                                <td><span title={item.status ? "Click to Not Active" : "Click to Active"} className={`${item.status ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"} text-[10px] py-[3px] px-[4px] font-extralight rounded-full cursor-pointer`} onClick={() => handelStatus(item._id, !item.status)}>{item.status ? "Active" : "Not Active"}</span></td>
                                <td className="flex flex-row gap-2 items-center">
                                    <span className="p-[5px] flex justify-center items-center rounded-full border border-green-400 text-green-400 cursor-pointer" onClick={() => { setId(item._id); setOpenEdit(true) }}><MdModeEditOutline /></span>
                                    {!item.isDeleted && <span className="p-[5px] flex justify-center items-center rounded-full border border-red-400 text-red-400 cursor-pointer" onClick={() => openAndTakeId(item._id)}><MdDelete /></span>}
                                    {item.isDeleted && <span className="p-[5px] flex justify-center items-center rounded-full border border-bule-400 text-blue-400 cursor-pointer" onClick={() => handelStopDelete(item._id)}><MdDeleteForever /></span>}
                                </td>
                            </tr>
                        ))}
                        {!area && <tr><td colSpan={6} className="text-center">Not Found Areas</td></tr>}
                    </tbody>
                </Table>
            }
            {/* Modals */}
            <Modal openState={{ isOpen: open, setIsOpen: setOpen }} header={{ title: "Add Area", isClose: true }}>
                <FormAddBuilder setClose={setOpen} />
            </Modal>
            {/* <Modal openState={{ isOpen: openEdit, setIsOpen: setOpenEdit }} header={{ title: "Edit Area", isClose: true }}>
                <FormEditBuilder id={Id} setClose={setOpenEdit} />
            </Modal> */}
            <SecurityTab
                openState={{ isOpen: openEdit, setIsOpen: setOpenEdit }}
                role="owner"
                ACTIONS="design"
                TitleAction="Edit Area"
            >
                <FormEditBuilder id={Id} setClose={setOpenEdit} />
            </SecurityTab>

            {/* <Modal openState={{ isOpen: openDelete, setIsOpen: setOpenDelete }} header={{ title: "Delete Area", isClose: true }} footer={{ btn: <Btn BtnStatus="alarm" onClick={handelDelete} isLoading={stopClick}>Active Delete</Btn> }}>
                Do you sure want to delete this area
            </Modal> */}
            <SecurityTab
                openState={{ isOpen: openDelete, setIsOpen: setOpenDelete }}
                ACTIONS={"fun"}
                Fun={handelDelete}
                role={"owner"}
                TitleAction={"Delete Area"}
            />
        </div>
    )
}