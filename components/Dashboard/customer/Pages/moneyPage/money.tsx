"use client"
import { useState, useEffect } from "react";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
// routes
import { MoneyRoutes } from "@/config/routes";
// axios
import axios, { AxiosError } from "axios";
// UI
import Content from "@/components/Dashbpoard Tools/ContentStyle/content"
import Card from "@/UI/Card/Card"
import Btn from "@/UI/BTN/Btn"
import Modal from "@/UI/Modal/modal";
import Inp from "@/UI/input/Inp";
import Alarm from "@/UI/Alarm/alarm";
// component loader
import LoadingDashScreen from "@/components/loading-com/dash-load";
// notification
import notification from "@/hooks/useNotifications";
// icons
import { MdOutlineAttachMoney } from "react-icons/md";
import { LuArrowUpNarrowWide, LuArrowDownNarrowWide } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
// fetch
import { GetProfile, GetCustomer } from "@/fetchData/fetch";
import { getCookie } from "cookies-next";

export default function MoneyComponent() {
    const dispatch = useAppDispatch();
    const [LoadingPage, setLoadingPage] = useState(true);


    useEffect(() => {
        const fetchData = async () => {

            try {
                await Promise.all([
                    GetProfile("customer", dispatch),
                    GetCustomer(dispatch)
                ])
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingPage(false);
            }

        }
        fetchData();
        setInterval(fetchData, 60000);
    }, []);

    const { money, sells, buys } = useAppSelector((state) => state.customer);

    const [modal, setModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalClearSells, setModalClearSells] = useState(false);
    const [modalClearBuys, setModalClearBuys] = useState(false);

    const [pushMoney, setPushMoney] = useState(0);
    const [LoadingPush, setLoadingPush] = useState(false);
    const [LoadingSells, setLoadingSells] = useState(false);
    const [LoadingBuys, setLoadingBuys] = useState(false);

    const [EditMoney, setEditMoney] = useState({
        money: money,
        errorType: false,
        errorMsg: "",
    });
    const [LoadingEdit, setLoadingEdit] = useState(false);
    // handlers
    const pushMoneyHandler = async () => {
        setLoadingPush(true)
        try {
            const response = await axios.put(MoneyRoutes.push, {
                money: pushMoney,
            }, {
                headers: {
                    token: `${getCookie("token")}`
                }
            });
            const data = await response.data;
            notification(data.message, "success");
            GetCustomer(dispatch)
            setModal(false);
            setPushMoney(0);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            console.log(err);
            notification(err.response?.data?.message || "Something went wrong", "error");
        } finally {
            setLoadingPush(false)
        }
    };

    const EditMoneyHandler = async () => {
        if (EditMoney.money < 0) {
            setEditMoney({ ...EditMoney, errorType: true, errorMsg: "Money can't be negative" });
            return;
        }
        if (EditMoney.money > money) {
            setEditMoney({ ...EditMoney, errorType: true, errorMsg: "Money can't be more than your current money" });
            return;
        }
        setLoadingEdit(true)
        try {
            const response = await axios.put(MoneyRoutes.update, {
                money: EditMoney.money,
            }, {
                headers: {
                    token: `${getCookie("token")}`
                }
            });
            const data = await response.data;
            notification(data.message, "success");
            GetCustomer(dispatch)
            setModalEdit(false);
            setEditMoney({ money: money, errorType: false, errorMsg: "" });
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            console.log(err);
            notification(err.response?.data?.message || "Something went wrong", "error");
        } finally {
            setLoadingEdit(false)
        }
    };

    const clearSellsHandler = async () => {
        setLoadingSells(true)
        try {
            const response = await axios.put(MoneyRoutes.update, {
                sells: 0
            }, {
                headers: {
                    token: `${getCookie("token")}`
                }
            });
            const data = await response.data;
            notification(data.message, "success");
            GetCustomer(dispatch)
            setModalClearSells(false);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            console.log(err);
            notification(err.response?.data?.message || "Something went wrong", "error");
        } finally {
            setLoadingSells(false)
        }
    };

    const clearBuysHandler = async () => {
        setLoadingBuys(true)
        try {
            const response = await axios.put(MoneyRoutes.update, {
                buys: 0
            }, {
                headers: {
                    token: `${getCookie("token")}`
                }
            });
            const data = await response.data;
            notification(data.message, "success");
            GetCustomer(dispatch)
            setModalClearBuys(false);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            console.log(err);
            notification(err.response?.data?.message || "Something went wrong", "error");
        } finally {
            setLoadingBuys(false)
        }
    };



    // funs events
    function openEditMoney() {
        setEditMoney({ money: money, errorType: false, errorMsg: "" });
        setModalEdit(true)
    }

    if (LoadingPage) {
        return (
            <div className="h-screen">
                <LoadingDashScreen />
            </div>
        )
    }

    return (
        <div>
            <Content name="Info About Money" CustomColor Custom="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-600">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-around">
                    <div>
                        <Card
                            icon={<MdOutlineAttachMoney />}
                            title="Your Money"
                            ClassName="h-[5rem] md:h-[12rem] w-[17rem] items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-600"
                            color={{
                                text: "#fff"
                            }}
                        >
                            ${money}
                        </Card>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Card
                            icon={<LuArrowUpNarrowWide />}
                            title="Your Sells"
                            ClassName="h-[5rem] w-[17rem] items-center justify-center bg-gradient-to-r from-green-500 to-cyan-500"
                            color={{
                                text: "#fff"
                            }}
                        >
                            ${sells}
                        </Card>
                        <Card
                            icon={<LuArrowDownNarrowWide />}
                            title="Your Buys"
                            ClassName="h-[5rem] w-[17rem] items-center justify-center bg-gradient-to-r from-orange-400 via-pink-500 to-red-600"
                            color={{
                                text: "#fff"
                            }}
                        >
                            ${buys}
                        </Card>
                    </div>
                </div>
            </Content>
            <Content name="Controllers" caseName="sub">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">Add Money</h3>
                        <Btn className="w-[100px] md:w-[150px]" onClick={() => setModal(true)}><IoMdAdd /> Add</Btn>
                    </div>
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">Edit Money</h3>
                        <Btn isLight className="w-[100px] md:w-[150px]" onClick={() => openEditMoney()}><AiFillEdit /> Edit</Btn>
                    </div>
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">Clear Sells</h3>
                        <Btn className="w-[100px] md:w-[150px]" BtnStatus="alarm" onClick={() => setModalClearSells(true)}><MdDelete /> Clear</Btn>
                    </div>
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">Clear Buys</h3>
                        <Btn className="w-[100px] md:w-[150px]" BtnStatus="alarm" onClick={() => setModalClearBuys(true)}><MdDelete /> Clear</Btn>
                    </div>
                </div>
            </Content>
            <Modal
                openState={{ isOpen: modal, setIsOpen: setModal }}
                header={{ title: "Money", isClose: true }}
                footer={{ isClose: false, btn: <Btn isLoading={LoadingPush} onClick={pushMoneyHandler}>Save</Btn> }}
            >
                <div>
                    <Inp type="number" icon={"$"} placeholder="Enter Your Money" value={pushMoney.toString()} onChange={(e) => setPushMoney(+e.target.value)} />
                    <Alarm type="warning" ClassName="mt-4">
                        The maximum limit for money transfer is $5000.
                    </Alarm>
                </div>
            </Modal>
            <Modal
                openState={{ isOpen: modalEdit, setIsOpen: setModalEdit }}
                header={{ title: "Edit Money", isClose: true }}
                footer={{ isClose: false, btn: <Btn isLoading={LoadingEdit} onClick={EditMoneyHandler}>Edit</Btn> }}
            >
                <div>
                    <Inp type="number" icon={"$"} placeholder="Edit Your Money" value={EditMoney.money.toString()} onChange={(e) => setEditMoney({ ...EditMoney, money: +e.target.value })} msg={EditMoney.errorType ? { case: "error", msg: EditMoney.errorMsg } : { case: "", msg: "" }} />
                </div>
            </Modal>
            <Modal
                openState={{ isOpen: modalClearSells, setIsOpen: setModalClearSells }}
                header={{ title: "Clear Sells", isClose: true }}
                footer={{ isClose: false, btn: <Btn BtnStatus="alarm" isLoading={LoadingSells} onClick={clearSellsHandler}>Clear</Btn> }}
                size="sm"
            >
                <Alarm type="error">
                    Do you sure want to clear sells data
                </Alarm>
            </Modal>
            <Modal
                openState={{ isOpen: modalClearBuys, setIsOpen: setModalClearBuys }}
                header={{ title: "Clear Buys", isClose: true }}
                footer={{ isClose: false, btn: <Btn BtnStatus="alarm" isLoading={LoadingBuys} onClick={clearBuysHandler}>Clear</Btn> }}
                size="sm"
            >
                <Alarm type="error">
                    Do you sure want to clear buys data
                </Alarm>
            </Modal>
        </div>
    )
}