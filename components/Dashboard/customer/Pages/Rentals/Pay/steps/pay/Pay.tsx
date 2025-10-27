"use client"
import { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { GetCustomer } from "@/fetchData/fetch";


import Content from "@/components/Dashbpoard Tools/ContentStyle/content"
import Table from "@/UI/Table/Table";
import Inp from "@/UI/input/Inp";
import Btn from "@/UI/BTN/Btn";
import LoadingDashScreen from "@/components/loading-com/dash-load";

// context
import { usePayContext } from "../../context/context"
import { MdArrowBackIos } from "react-icons/md";
export default function Pay() {
    const dispatch = useAppDispatch();
    const { setStepName, setProgress, data, setReq } = usePayContext();
    const { money } = useAppSelector(state => state.customer);

    const [LoadingPage, setLoadingPage] = useState(true);

    const [pay, setPay] = useState<{
        Time: number,
        Date: "M" | "d" | "y" | "h" | "m",
        pay: number
    }>({
        Time: 1,
        Date: "M",
        pay: 0
    });

    const pushData = (flied: string, value: string) => {
        setPay(prev => ({
            ...prev,
            [flied]: value
        }))
    }

    const PayMoney = () => {
        return +data.relPrice * +pay.Time;
    }
    console.table(data)
    useEffect(() => {
        const fetchData = async () => {

            try {
                await Promise.all([
                    GetCustomer(dispatch)
                ])
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingPage(false);
            }

        }
        fetchData();
    }, []);

    useEffect(() => {
        setPay(prev => ({
            ...prev,
            pay: +data.relPrice * +prev.Time
        }));


    }, [pay.Time, data.relPrice]);


    if (LoadingPage) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingDashScreen />
            </div>
        )
    }

    return (
        <div>
            <div className="mt-4">
                <button onClick={() => { setStepName("home"); setProgress(0) }} className="flex items-center justify-center gap-1 transition-all px-3 py-1 rounded border border-gray-300 text-[12px] hover:bg-gray-100 cursor-pointer"><span><MdArrowBackIos /></span>Back</button>
            </div>
            <Content>
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-3xl font-extrabold">{data.nameRoom}</h1>
                    <p className="text-sm text-gray-500">${data.relPrice} / {data.Duration === "d" ? "Day" : data.Duration === "M" ? "Month" : "Year"}</p>
                </div>
                <Table>
                    <tbody>
                        <tr>
                            <th>Number of Store</th>
                            <td>{data.NumberRoom}</td>
                        </tr>
                        <tr>
                            <th>Hight</th>
                            <td>{data.length} m</td>
                        </tr>
                        <tr>
                            <th>Width</th>
                            <td>{data.width} m</td>
                        </tr>
                        <tr>
                            <th>Area name</th>
                            <td>{data.Area_Id.nameArea}</td>
                        </tr>
                        <tr>
                            <th>Area Address</th>
                            <td>{data.Area_Id.address}</td>
                        </tr>
                        <tr>
                            <th>Owner Name</th>
                            <td>{data.ownerName}</td>
                        </tr>
                    </tbody>
                </Table>
            </Content>
            <Content>
                <div>
                    <h1 className="text-3xl font-extrabold">Select Rental Duration</h1>
                    <div className="flex items-center justify-center gap-2 w-full mt-4">
                        <Inp type="number" value={pay.Time.toString()} name="Time" onChange={(e) => pushData(e.target.name, e.target.value)} classMainContainer="flex-8" />
                        <select name="Date" value={pay.Date} onChange={(e) => pushData(e.target.name, e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-[#097] focus:border-[#097] block px-[5px] py-[10px] flex-2">
                            <option value={""} disabled>select</option>
                            <option value={"m"}>Minute</option>
                            <option value={"h"}>Hour</option>
                            <option value={"d"}>Day</option>
                            <option value={"M"}>Month</option>
                            <option value={"y"}>Year</option>
                        </select>
                    </div>
                    <div>
                        <h3>Total: <span className={`${money < PayMoney() ? "text-red-600" : "text-[#097]"}`}>${PayMoney()} / {money}</span></h3>
                    </div>
                    <div className="mt-4">
                        <Btn className="w-full" onClick={() => { setReq(pay); setStepName("fin"); setProgress(100) }}>Continue</Btn>
                    </div>
                </div>
            </Content>
        </div>
    )
}