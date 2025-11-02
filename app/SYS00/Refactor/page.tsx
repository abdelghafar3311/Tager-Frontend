"use client"
import { useState } from "react";
// ui
import Modal from "@/UI/Modal/modal";
import Btn from "@/UI/BTN/Btn";
import Table from "@/UI/Table/Table";
// axios
import axios, { AxiosError } from "axios"
// route
import { SysRoutes } from "../../../config/routes"
// cookies
import { getCookie, deleteCookie } from "cookies-next"
// notification hook
import notification from "@/hooks/useNotifications";

export interface SysControllerDetailsResponse {
    customers: number;
    customerProfiles: number;
    owners: number;
    ownerProfiles: number;
    products: number;
    reports: number;
    rentals: number;
    reqRentals: number;
    rooms: number;
    areas: number;
    notifications: number;
}


export default function Refactor() {

    // data
    const [data, setData] = useState<SysControllerDetailsResponse>({
        customers: 0,
        customerProfiles: 0,
        owners: 0,
        ownerProfiles: 0,
        products: 0,
        reports: 0,
        rentals: 0,
        reqRentals: 0,
        rooms: 0,
        areas: 0,
        notifications: 0
    });

    // modal : we have tow modal , first is for details data and second is for refactor
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    // load
    const [isLoading, setIsLoading] = useState(false);
    // get data
    const getData = async () => {
        try {
            setIsLoading(true);
            const token = getCookie("sysToken");
            const response = await axios.get(SysRoutes.details, {
                headers: {
                    token: `${token}`,
                },
            });
            setData(response.data);
            setIsModalOpen(true);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.response?.data?.message || "Request failed");
                notification(error.response?.data?.message || "Request failed", "error");
            } else {
                console.error("Something went wrong");
                notification("Something went wrong", "error");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // refactor
    const refactor = async () => {
        try {
            setIsLoading(true);
            const token = getCookie("sysToken");
            const response = await axios.delete(SysRoutes.refactor, {
                headers: {
                    token: `${token}`,
                },
            });
            const d = await response.data;
            notification(d.message, "success");
            setIsModalOpen2(false);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.response?.data?.message || "Request failed");
                notification(error.response?.data?.message || "Request failed", "error");
            } else {
                console.error("Something went wrong");
                notification("Something went wrong", "error");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // logout
    const logout = () => {
        deleteCookie("sysToken");
        window.location.href = "/SYS00";
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            <h1 className="text-4xl font-bold mb-6">Refactor</h1>

            <p className="text-gray-300 text-center max-w-md mb-8">
                Welcome to your admin refactor panel. Here you can reset, clean, or reconfigure your platform securely.
            </p>

            <div className="flex md:flex-row flex-col items-center gap-4">
                <button onClick={getData} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-2xl shadow-md hover:opacity-90 transition duration-300 cursor-pointer">
                    Details Data
                </button>

                <button onClick={() => setIsModalOpen2(true)} className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-2xl shadow-md hover:opacity-90 transition duration-300 cursor-pointer">
                    Run Refactor
                </button>

                <button onClick={logout} className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold rounded-2xl shadow-md hover:opacity-90 transition duration-300 cursor-pointer">
                    Logout
                </button>

            </div>
            {/* first modal */}
            <Modal
                openState={{ isOpen: isModalOpen, setIsOpen: setIsModalOpen }}
                header={{ title: <h1 className="text-black">Details</h1>, isClose: true }}
                footer={{ isClose: false }}
            >
                <Table>
                    <thead>
                        <tr>
                            <th>Entity</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody className="text-black">
                        <tr>
                            <th>customers</th>
                            <td>{data.customers}</td>
                        </tr>
                        <tr>
                            <th>customerProfiles</th>
                            <td>{data.customerProfiles}</td>
                        </tr>
                        <tr>
                            <th>owners</th>
                            <td>{data.owners}</td>
                        </tr>
                        <tr>
                            <th>ownerProfiles</th>
                            <td>{data.ownerProfiles}</td>
                        </tr>
                        <tr>
                            <th>products</th>
                            <td>{data.products}</td>
                        </tr>
                        <tr>
                            <th>reports</th>
                            <td>{data.reports}</td>
                        </tr>
                        <tr>
                            <th>rentals</th>
                            <td>{data.rentals}</td>
                        </tr>
                        <tr>
                            <th>reqRentals</th>
                            <td>{data.reqRentals}</td>
                        </tr>
                        <tr>
                            <th>rooms</th>
                            <td>{data.rooms}</td>
                        </tr>
                        <tr>
                            <th>areas</th>
                            <td>{data.areas}</td>
                        </tr>
                        <tr>
                            <th>notifications</th>
                            <td>{data.notifications}</td>
                        </tr>
                    </tbody>
                </Table>
            </Modal>
            {/* second modal */}
            <Modal
                openState={{ isOpen: isModalOpen2, setIsOpen: setIsModalOpen2 }}
                header={{ title: <h1 className="text-black">Refactor</h1>, isClose: true }}
                footer={{ isClose: false, btn: <Btn BtnStatus="alarm" isLoading={isLoading} onClick={refactor}>Run Refactor</Btn> }}
            >
                <p className="text-black">Do you sure you want to refactor your data?</p>
            </Modal>
        </div>

    )
}