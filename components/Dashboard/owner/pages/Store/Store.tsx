"use client"
import { useState, useEffect } from "react";
// Next
import Link from "next/link";
// UI
import Card from "@/UI/Card/Card";
import Table from "@/UI/Table/Table";
import Pagination from "@/UI/pagination/pagination";
import Alarm from "@/UI/Alarm/alarm";
// import Modal from "@/UI/Modal/modal";
import SecurityTab from "@/UI/Security tab/security";
// icons
import { FaPlus } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { CiAlignLeft, CiViewTable } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { MdDelete, MdModeEditOutline, MdDeleteForever } from "react-icons/md";
// fetch
import { GetOwnerInfo } from "@/fetchData/fetch";
// routes of store
import { RoomRoutes } from "@/config/routes";
// axios
import axios, { AxiosError } from "axios";
// cooks
import { getCookie } from "cookies-next";
// components
import FilterStores from "./filter";
import LoadingDashScreen from "@/components/loading-com/dash-load";
// hooks
import notification from "@/hooks/useNotifications";
// redux
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setStores, setIsCachingUpdate } from "@/Redux/slices/owner/store";

interface StoresValues {
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

export default function StoreMain() {
    // redux
    const { store, isCachingUpdate } = useAppSelector((state) => state.stores);
    const dispatch = useAppDispatch();
    // states
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState<"cards" | "table">("cards");
    const [Filter, setFilter] = useState<string>("All");
    const [FilterData, setFilterData] = useState<StoresValues[]>([]);

    const [openDelete, setOpenDelete] = useState(false);
    const [IdDe, setIdDe] = useState("");

    const [stopClick, setStopClick] = useState(false)

    const openAndTakeId = (idItem: string) => {
        setOpenDelete(true);
        setIdDe(idItem);
    }


    const GetStores = async () => {
        try {
            setLoading(true)
            const response = await axios.get(RoomRoutes.getOwnerRooms, {
                headers: {
                    token: `${getCookie("token")}`
                }
            });
            const data = await response.data;
            dispatch(setStores(data.rooms));
            dispatch(setIsCachingUpdate(true));
            GetOwnerInfo(dispatch);
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
            GetStores();
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
            GetStores();
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            console.log(err);
        } finally {
            setStopClick(false)
        }
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
        if (Filter === "All") {
            setFilterData(store);
        } else if (Filter === "Rental Stores") {
            setFilterData(store.filter((item: StoresValues) => item.RentalType === "rental" || item.RentalType === "expire"));
        } else if (Filter === "Not Rental Stores") {
            setFilterData(store.filter((item: StoresValues) => item.RentalType === "null"));
        } else if (Filter === "Stores Delete") {
            setFilterData(store.filter((item: StoresValues) => item.isDeleted === true));
        } else if (Filter === "Stores Not Delete") {
            setFilterData(store.filter((item: StoresValues) => item.isDeleted === false));
        } else if (Filter === "isStatus") {
            setFilterData(store.filter((item: StoresValues) => item.status === true));
        } else if (Filter === "notIsStatus") {
            setFilterData(store.filter((item: StoresValues) => item.status === false));
        } else if (Filter === "hasDiscount") {
            setFilterData(store.filter((item: StoresValues) => item.Discount >= 5));
        } else {
            setFilterData(store.filter((item: StoresValues) => item.Area_Id._id === Filter));
        }
    }, [store, Filter]);

    useEffect(() => {
        if (!isCachingUpdate) {
            GetStores()
        }
        if (isCachingUpdate) {
            setLoading(false)
        }
    }, []);



    if (loading) {
        return (
            <div className="flex items-center justify-center flex-col gap-2 min-h-[calc(100vh-55px)]">
                <LoadingDashScreen />
            </div>
        )
    }

    return (
        <div>
            <div className="mb-4 flex justify-between">
                <h1 className="text-3xl font-extrabold">Stores</h1>
                <div className="flex items-center gap-2">
                    <FilterStores setFilter={setFilter} Filter={Filter} />
                    <button className="flex items-center justify-center gap-1 transition-all px-3 text-2xl py-3 rounded-full bg-white text-[12px] hover:shadow cursor-pointer relative" onClick={() => GetStores()}><IoMdRefresh /></button>
                    <Link href="/owner_dashboard/stores/New" className="flex items-center justify-center gap-1 transition-all px-3 text-2xl py-3 rounded-full bg-white text-[12px] hover:shadow cursor-pointer relative"><FaPlus /></Link>
                </div>
            </div>
            <div className="flex gap-4 mt-4 justify-start items-center border-b border-gray-400 mb-2 p-2">
                <div onClick={() => setShow("cards")} className={`flex items-center justify-center gap-1 transition-all px-1 text-[12px] py-1 rounded border ${show == "cards" ? "border-blue-600 text-blue-600" : "border-gray-400 text-gray-400"} text-[12px] hover:shadow cursor-pointer relative`}>
                    <CiAlignLeft />
                    <span>Cards</span>
                </div>
                <div onClick={() => setShow("table")} className={`flex items-center justify-center gap-1 transition-all px-1 text-[12px] py-1 rounded border ${show == "table" ? "border-blue-600 text-blue-600" : "border-gray-400 text-gray-400"} text-[12px] hover:shadow cursor-pointer relative`}>
                    <CiViewTable />
                    <span>Table</span>
                </div>
            </div>
            <Pagination data={FilterData} itemsPerPage={8}>
                {(currentItems: StoresValues[]) => (
                    <>
                        {show == "cards" && <div className="flex flex-col gap-2">
                            {currentItems && currentItems.map((item: StoresValues) => (
                                <Card key={item._id} ClassName="flex items-start justify-start">
                                    <div className="w-full">
                                        <div className="flex items-center justify-between">
                                            <h1 className="font-bold text-2xl">{item.nameRoom}</h1>
                                            <div className="flex flex-row gap-2 items-center">
                                                <Link href={`/owner_dashboard/stores/Edit/${item._id}`} className="p-[5px] flex justify-center items-center rounded-full border border-green-400 text-green-400 cursor-pointer"><MdModeEditOutline /></Link>
                                                <Link href={`/owner_dashboard/stores/View/${item._id}`} className="p-[5px] flex justify-center items-center rounded-full border border-blue-400 text-blue-400 cursor-pointer"><FaEye /></Link>
                                                {!item.isDeleted && <span className="p-[5px] flex justify-center items-center rounded-full border border-red-400 text-red-400 cursor-pointer" onClick={() => openAndTakeId(item._id)}><MdDelete /></span>}
                                                {item.isDeleted && <span className="p-[5px] flex justify-center items-center rounded-full border border-bule-400 text-blue-400 cursor-pointer" onClick={() => handelStopDelete(item._id)}><MdDeleteForever /></span>}
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row items-start md:justify-between">
                                            <div className="w-full p-2">
                                                <div className="flex items-center gap-2">
                                                    <h3>Store ID</h3>
                                                    <p className="text-gray-400">{item.NumberRoom}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <h3>Price</h3>
                                                    <p className="text-gray-400">{item.Discount > 5 ? item.Discount < item.price ? (<><span className="line-through text-gray-400">{item.price}</span> <span className="text-blue-400">{item.Discount}</span> </>) : item.Discount : item.price ? item.price : "Not Set Price"}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <h3>Duration</h3>
                                                    <p className="text-gray-400">in {GetDuration(item.Duration)}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <h3>Rental</h3>
                                                    <p className="text-gray-400">{item.RentalType === "null" && "no rental"} {item.RentalType === "rental" && "rental"} {item.RentalType === "expire" && "expire"}</p>
                                                </div>
                                            </div>
                                            <div className="w-full p-2">
                                                <div className="flex items-center gap-2">
                                                    <h3>Area Name</h3>
                                                    <p className="text-gray-400">{item.Area_Id.nameArea}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <h3>Area Address</h3>
                                                    <p className="text-gray-400">{item.Area_Id.address}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <h3>Status</h3>
                                                    <p className="text-gray-400">{item.status ? "Active" : "Not Active"}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <h3>Is will Delete</h3>
                                                    <p className="text-gray-400">{item.isDeleted ? "yes" : "no"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                            {currentItems.length <= 0 && <Alarm type="warning" subject="Not Found Stores" IconsShow={true}></Alarm>}
                        </div>}
                        {show == "table" && <Table>
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>Id</th>
                                    <th>status</th>
                                    <th>price</th>
                                    <th>Duration</th>
                                    <th>Area Name</th>
                                    <th>Area Address</th>
                                    <th>Rental</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems && currentItems.map((item: StoresValues) => (
                                    <tr key={item._id}>
                                        <td>{item.nameRoom}</td>
                                        <td>{item.NumberRoom}</td>
                                        <td>{item.status ? "Active" : "Not Active"}</td>
                                        <td>{item.Discount > 5 ? item.Discount < item.price ? (<><span className="line-through text-gray-400">{item.price}</span> <span className="text-blue-400">{item.Discount}</span> </>) : item.Discount : item.price ? item.price : "Not Set Price"}</td>
                                        <td>{GetDuration(item.Duration)}</td>
                                        <td>{item.Area_Id.nameArea}</td>
                                        <td>{item.Area_Id.address}</td>
                                        <td>{item.RentalType === "null" && "no rental"} {item.RentalType === "rental" && "rental"} {item.RentalType === "expire" && "expire"}</td>
                                        <td>
                                            <div className="flex flex-row gap-2 items-center">
                                                <Link href={`/owner_dashboard/stores/Edit/${item._id}`} className="p-[5px] flex justify-center items-center rounded-full border border-green-400 text-green-400 cursor-pointer"><MdModeEditOutline /></Link>
                                                <Link href={`/owner_dashboard/stores/View/${item._id}`} className="p-[5px] flex justify-center items-center rounded-full border border-blue-400 text-blue-400 cursor-pointer"><FaEye /></Link>
                                                {!item.isDeleted && <span className="p-[5px] flex justify-center items-center rounded-full border border-red-400 text-red-400 cursor-pointer" onClick={() => openAndTakeId(item._id)}><MdDelete /></span>}
                                                {item.isDeleted && <span className="p-[5px] flex justify-center items-center rounded-full border border-bule-400 text-blue-400 cursor-pointer" onClick={() => handelStopDelete(item._id)}><MdDeleteForever /></span>}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {currentItems.length <= 0 && <tr><td colSpan={9} className="text-center">Not Found Stores</td></tr>}
                            </tbody>
                        </Table>}
                    </>
                )}
            </Pagination>
            {!store && <Alarm type="warning" IconsShow={false}>Not Found Stores</Alarm>}
            {/* <Modal openState={{ isOpen: openDelete, setIsOpen: setOpenDelete }} header={{ title: "Delete Store", isClose: true }} footer={{ btn: <Btn BtnStatus="alarm" onClick={handelDelete} isLoading={stopClick}>Active Delete</Btn> }}>
                Do you sure want to delete this store
            </Modal> */}
            <SecurityTab
                openState={{ isOpen: openDelete, setIsOpen: setOpenDelete }}
                ACTIONS="fun"
                Fun={handelDelete}
                TitleAction="Delete Store"
                role="owner"
            />
        </div>
    )
}