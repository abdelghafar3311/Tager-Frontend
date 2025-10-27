"use client"
import { useState, useEffect } from "react";

// axios
import axios, { AxiosError } from "axios";
// cookies
import { getCookie } from "cookies-next";
// routes
import { RentalRoutes } from "@/config/routes";
// notification
import notification from "@/hooks/useNotifications";

import { CiAlignLeft, CiViewTable } from "react-icons/ci";
import { IoMdRefresh } from "react-icons/io";

import Card from "@/UI/Card/Card";
import Table from "@/UI/Table/Table";
import LoadingDashScreen from "@/components/loading-com/dash-load";
import Pagination from "@/UI/pagination/pagination";
import Modal from "@/UI/Modal/modal";

import { MdDelete, MdDeleteForever } from "react-icons/md";
import Btn from "@/UI/BTN/Btn";

interface Rental {
    _id: string;
    subscriptionState: string;
    isDeleted: boolean;
    isAccept: string;
    Area_Id: { _id: string; nameArea: string, address: string };
    Room_Id: { _id: string; nameRoom: string; NumberRoom: number };
    Owner_Id: string;
    startDate: string;
    Customer_Id: { _id: string; username: string };
    endDate: string;
    pay: number;
}

export default function Rentals() {
    const [typeShow, setTypeShow] = useState("cards");

    // loading page
    const [loading, setLoading] = useState(true);
    const [rentals, setRentals] = useState<Rental[]>([]);

    // search data
    const [search, setSearch] = useState<string>("");
    // data after search
    const [searchData, setSearchData] = useState<Rental[]>([]);

    // state modal
    const [showModal, setShowModal] = useState(false);
    // load
    const [loadingBtn, setLoadingBtn] = useState(false);
    // id
    const [id, setId] = useState("");

    // search fun
    const searchFun = () => {
        if (!search) return setSearchData(rentals);
        const data = rentals.filter((item) => {
            return item.Room_Id.nameRoom.toLowerCase().includes(search.toLowerCase());
        });
        setSearchData(data);
    }

    // get Rentals
    const GetRentals = async () => {
        try {
            setLoading(true);
            const response = await axios.get(RentalRoutes.getAll, {
                headers: {
                    token: `${getCookie("token")}`
                }
            });
            const data = await response.data;
            setRentals(data);
            console.log("rentals: ", data);
            setLoading(false);
        } catch (error) {
            if (error instanceof AxiosError) {
                notification("error", error.response?.data.message);
            }
        }
    }

    const useSearchKey = (
        text: string,
        keywords: string
    ): React.ReactNode[] => {
        const keywordArray: string[] = keywords.toLowerCase().split("");

        return Array.from(text).map((char: string, index: number) => {
            const lowerChar = char.toLowerCase();

            if (keywordArray.includes(lowerChar)) {
                return (
                    <span key={index} className="bg-yellow-400">
                        {char}
                    </span>
                );
            }
            return <>{char}</>;
        });
    };



    // Delete and not Delete Rental
    const DeleteRental = async (id: string, del: boolean) => {
        if (loadingBtn) return notification("Please wait!", "info");
        try {
            setLoadingBtn(true);
            const response = await axios.patch(RentalRoutes.deleteOwner(id), {
                isDeleted: del
            }, {
                headers: {
                    token: `${getCookie("token")}`
                }
            });
            const data = await response.data;
            notification(data.message, "success");
            GetRentals();
            setShowModal(false);
        } catch (error) {
            if (error instanceof AxiosError) {
                notification(error.response?.data.message, "error");
            }
        } finally {
            setLoadingBtn(false);
        }
    }

    // fun open modal and take id
    const openModal = (id: string) => {
        setShowModal(true);
        setId(id);
    }

    useEffect(() => {
        searchFun();
    }, [search])

    useEffect(() => {
        GetRentals();
    }, [])

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <LoadingDashScreen />
            </div>
        )
    }

    return (
        <div>
            <div className="mb-4 flex justify-between">
                <h1 className="text-3xl font-extrabold">Rentals</h1>
                <div className="flex items-center gap-2">
                    <button className="flex items-center justify-center gap-1 transition-all px-3 text-2xl py-3 rounded-full bg-white text-[12px] hover:shadow cursor-pointer relative" onClick={() => GetRentals()}><IoMdRefresh /></button>
                </div>
            </div>

            <div className="flex gap-4 mt-4 justify-between items-center border-b border-gray-400 mb-2 p-2">
                <div className="flex gap-4">
                    <div onClick={() => setTypeShow("cards")} className={`flex items-center justify-center gap-1 transition-all px-1 text-[12px] py-1 rounded border ${typeShow == "cards" ? "border-blue-600 text-blue-600" : "border-gray-400 text-gray-400"} text-[12px] hover:shadow cursor-pointer relative`}>
                        <CiAlignLeft />
                        <span>Cards</span>
                    </div>
                    <div onClick={() => setTypeShow("table")} className={`flex items-center justify-center gap-1 transition-all px-1 text-[12px] py-1 rounded border ${typeShow == "table" ? "border-blue-600 text-blue-600" : "border-gray-400 text-gray-400"} text-[12px] hover:shadow cursor-pointer relative`}>
                        <CiViewTable />
                        <span>Table</span>
                    </div>
                </div>
                <div>
                    <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="px-1 py-1 border border-gray-400 rounded-md" />
                </div>
            </div>
            {searchData.length > 0 ? (
                <>
                    {typeShow == "cards" ? (
                        <>
                            <Pagination data={searchData} itemsPerPage={5}>
                                {(items: Rental[]) => (
                                    <div className="flex flex-col gap-2">
                                        {items.map((item: Rental) => (
                                            <Card key={item._id} ClassName="flex items-start justify-start">
                                                <div className="w-full">
                                                    <div className="flex items-center justify-between">
                                                        <h1 className="font-bold text-2xl">{useSearchKey(item.Room_Id.nameRoom, search)}</h1>
                                                        <div className="flex flex-row gap-2 items-center">
                                                            {!item.isDeleted && <span className="p-[5px] flex justify-center items-center rounded-full border border-red-400 text-red-400 cursor-pointer" onClick={() => openModal(item._id)}><MdDelete /></span>}
                                                            {item.isDeleted && <span className="p-[5px] flex justify-center items-center rounded-full border border-bule-400 text-blue-400 cursor-pointer" onClick={() => DeleteRental(item._id, false)}><MdDeleteForever /></span>}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col md:flex-row items-start md:justify-between">
                                                        <div className="w-full p-2">
                                                            <div className="flex items-center gap-2">
                                                                <h3>Store ID</h3>
                                                                <p className="text-gray-400">{item.Room_Id.NumberRoom}</p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <h3>Customer name</h3>
                                                                <p className="text-gray-400">{item.Customer_Id.username}</p>
                                                            </div>

                                                            <div className="flex items-center gap-2">
                                                                <h3>Money Pay</h3>
                                                                <p className="text-gray-400">${item.pay}</p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <h3>subscription</h3>
                                                                <p className={`py-[2px] px-[5px] text-sm ${item.subscriptionState == "active" ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"} rounded-3xl`}>{item.subscriptionState}</p>
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
                                                                <h3>Expire in</h3>
                                                                <p className="text-gray-400">{item.endDate}</p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <h3>Is will Delete</h3>
                                                                <p className={`py-[2px] px-[5px] text-sm ${item.isDeleted ? "bg-red-200 text-red-600" : "bg-green-200 text-green-600"} rounded-3xl`}>{item.isDeleted ? "Yes" : "No"}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                        {items.length <= 0 && <h1 className="text-center text-gray-400">No Rentals</h1>}
                                    </div>
                                )}
                            </Pagination>

                        </>
                    ) : (
                        <>
                            <Pagination data={searchData} itemsPerPage={5}>
                                {(items: Rental[]) => (
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Name Store</th>
                                                <th>Customer name</th>
                                                <th>Store ID</th>
                                                <th>Expire in</th>
                                                <th>Money Pay</th>
                                                <th>subscription</th>
                                                <th>Area Name</th>
                                                <th>Area Address</th>
                                                <th>Is will Delete</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((item: Rental) => (
                                                <tr key={item._id}>
                                                    <td>{useSearchKey(item.Room_Id.nameRoom, search)}</td>
                                                    <td>{item.Customer_Id.username}</td>
                                                    <td>{item.Room_Id.NumberRoom}</td>
                                                    <td>{item.endDate}</td>
                                                    <td>${item.pay}</td>
                                                    <td>
                                                        <p className={`py-[2px] px-[5px] text-sm ${item.subscriptionState == "active" ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"} rounded-3xl`}>{item.subscriptionState}</p>
                                                    </td>
                                                    <td>{item.Area_Id.nameArea}</td>
                                                    <td>{item.Area_Id.address}</td>
                                                    <td>
                                                        <p className={`py-[2px] px-[5px] text-sm ${item.isDeleted ? "bg-red-200 text-red-600" : "bg-green-200 text-green-600"} rounded-3xl`}>{item.isDeleted ? "Yes" : "No"}</p>
                                                    </td>
                                                    <td className="flex justify-center items-center">
                                                        <div className="flex flex-row gap-2 items-center">
                                                            {!item.isDeleted && <span className="p-[5px] flex justify-center items-center rounded-full border border-red-400 text-red-400 cursor-pointer" onClick={() => openModal(item._id)}><MdDelete /></span>}
                                                            {item.isDeleted && <span className="p-[5px] flex justify-center items-center rounded-full border border-bule-400 text-blue-400 cursor-pointer" onClick={() => DeleteRental(item._id, false)}><MdDeleteForever /></span>}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </Pagination>
                        </>
                    )}
                </>
            ) : (
                <>
                    {typeShow == "cards" &&
                        <>
                            <Pagination data={rentals} itemsPerPage={5}>
                                {(items: Rental[]) => (
                                    <div className="flex flex-col gap-2">
                                        {items.map((item: Rental) => (
                                            <Card key={item._id} ClassName="flex items-start justify-start">
                                                <div className="w-full">
                                                    <div className="flex items-center justify-between">
                                                        <h1 className="font-bold text-2xl">{item.Room_Id.nameRoom}</h1>
                                                        <div className="flex flex-row gap-2 items-center">
                                                            {!item.isDeleted && <span className="p-[5px] flex justify-center items-center rounded-full border border-red-400 text-red-400 cursor-pointer" onClick={() => openModal(item._id)}><MdDelete /></span>}
                                                            {item.isDeleted && <span className="p-[5px] flex justify-center items-center rounded-full border border-bule-400 text-blue-400 cursor-pointer" onClick={() => DeleteRental(item._id, false)}><MdDeleteForever /></span>}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col md:flex-row items-start md:justify-between">
                                                        <div className="w-full p-2">
                                                            <div className="flex items-center gap-2">
                                                                <h3>Store ID</h3>
                                                                <p className="text-gray-400">{item.Room_Id.NumberRoom}</p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <h3>Customer name</h3>
                                                                <p className="text-gray-400">{item.Customer_Id.username}</p>
                                                            </div>

                                                            <div className="flex items-center gap-2">
                                                                <h3>Money Pay</h3>
                                                                <p className="text-gray-400">${item.pay}</p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <h3>subscription</h3>
                                                                <p className={`py-[2px] px-[5px] text-sm ${item.subscriptionState == "active" ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"} rounded-3xl`}>{item.subscriptionState}</p>
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
                                                                <h3>Expire in</h3>
                                                                <p className="text-gray-400">{item.endDate}</p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <h3>Is will Delete</h3>
                                                                <p className={`py-[2px] px-[5px] text-sm ${item.isDeleted ? "bg-red-200 text-red-600" : "bg-green-200 text-green-600"} rounded-3xl`}>{item.isDeleted ? "Yes" : "No"}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                        {items.length <= 0 && <h1 className="text-center text-gray-400">No Rentals</h1>}
                                    </div>
                                )}
                            </Pagination>

                        </>
                    }
                    {typeShow == "table" &&
                        <>
                            <Pagination data={rentals} itemsPerPage={5}>
                                {(items: Rental[]) => (
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Name Store</th>
                                                <th>Customer name</th>
                                                <th>Store ID</th>
                                                <th>Expire in</th>
                                                <th>Money Pay</th>
                                                <th>subscription</th>
                                                <th>Area Name</th>
                                                <th>Area Address</th>
                                                <th>Is will Delete</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((item: Rental) => (
                                                <tr key={item._id}>
                                                    <td>{item.Room_Id.nameRoom}</td>
                                                    <td>{item.Customer_Id.username}</td>
                                                    <td>{item.Room_Id.NumberRoom}</td>
                                                    <td>{item.endDate}</td>
                                                    <td>${item.pay}</td>
                                                    <td>
                                                        <p className={`py-[2px] px-[5px] text-sm ${item.subscriptionState == "active" ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"} rounded-3xl`}>{item.subscriptionState}</p>
                                                    </td>
                                                    <td>{item.Area_Id.nameArea}</td>
                                                    <td>{item.Area_Id.address}</td>
                                                    <td>
                                                        <p className={`py-[2px] px-[5px] text-sm ${item.isDeleted ? "bg-red-200 text-red-600" : "bg-green-200 text-green-600"} rounded-3xl`}>{item.isDeleted ? "Yes" : "No"}</p>
                                                    </td>
                                                    <td className="flex justify-center items-center">
                                                        <div className="flex flex-row gap-2 items-center">
                                                            {!item.isDeleted && <span className="p-[5px] flex justify-center items-center rounded-full border border-red-400 text-red-400 cursor-pointer" onClick={() => openModal(item._id)}><MdDelete /></span>}
                                                            {item.isDeleted && <span className="p-[5px] flex justify-center items-center rounded-full border border-bule-400 text-blue-400 cursor-pointer" onClick={() => DeleteRental(item._id, false)}><MdDeleteForever /></span>}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </Pagination>
                        </>
                    }
                </>
            )}

            <Modal openState={{ isOpen: showModal, setIsOpen: setShowModal }} header={{ title: "Delete Rental", isClose: true }} footer={{ btn: <Btn BtnStatus="alarm" onClick={() => DeleteRental(id, true)} isLoading={loadingBtn}>Active Delete</Btn> }}>
                Do you sure want to delete this Rental
            </Modal>
        </div>
    )
}