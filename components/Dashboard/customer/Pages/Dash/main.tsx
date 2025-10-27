"use client"
import { useState, useEffect } from "react";

import Card from "@/UI/Card/Card";
import Content from "@/components/Dashbpoard Tools/ContentStyle/content";
import LoadingDashScreen from "@/components/loading-com/dash-load";

import { IoMdRefresh } from "react-icons/io";

import ReportLineChart from "./reportLineChart";
import ReportCircleCharts from "./reportCircleChart";
import UserVisited from "./UsersVisit";

import { GetProfile, GetCustomer } from "@/fetchData/fetch";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";


import { fetcherProducts, fetcherRentals, fetcherReports } from "./fetchers";
export default function CustomerDash() {
    // redux
    const dispatch = useAppDispatch();
    const { money, sells, buys } = useAppSelector(state => state.customer);

    // LOAD DATA
    const [loading, setLoading] = useState(true);
    // state fetchers
    const [Product, setProduct] = useState<[]>([]);
    const [Reports, setReports] = useState<[]>([]);
    const [ren, setRen] = useState<{ ReqRental: [], rentals: [] }>({ ReqRental: [], rentals: [] });

    const FetcherLoad = async () => {
        setLoading(true);
        try {
            await Promise.all([
                GetCustomer(dispatch),
                GetProfile("customer", dispatch),
                fetcherProducts(setProduct),
                fetcherRentals(setRen),
                fetcherReports(setReports)
            ]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const Fetcher = async () => {
        try {
            await Promise.all([
                GetCustomer(dispatch),
                GetProfile("customer", dispatch),
                fetcherProducts(setProduct),
                fetcherRentals(setRen),
                fetcherReports(setReports)
            ]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        FetcherLoad();
        setInterval(Fetcher, 60000);
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <LoadingDashScreen />
            </div>
        )
    }

    return (
        <div>
            <Content>
                <div className="mb-4 flex justify-between">
                    <h1 className="text-3xl font-extrabold">Dashboard</h1>
                    <div className="flex items-center gap-2">
                        <button onClick={FetcherLoad} className="flex items-center justify-center gap-1 transition-all px-3 text-2xl py-3 rounded-full bg-white text-[12px] hover:shadow cursor-pointer relative"><IoMdRefresh /></button>
                    </div>
                </div>
                <div className="flex md:flex-row flex-col md:items-center md:justify-center gap-2">
                    <Card title="Money" ClassName="md:w-[17rem] md:h-[5rem]" color={{ bg: "#16A34A", text: "#fff" }}>
                        ${money}
                    </Card>
                    <Card title="Buys" ClassName="md:w-[17rem] md:h-[5rem]" color={{ bg: "#F59E0B", text: "#fff" }}>
                        ${buys}
                    </Card>
                    <Card title="Sells" ClassName="md:w-[17rem] md:h-[5rem]" color={{ bg: "#2563EB", text: "#fff" }}>
                        ${sells}
                    </Card>
                </div>
            </Content>

            <Content>
                <p className="mb-4 text-md font-extrabold text-slate-400">Charts for Reports</p>
                <div className="flex md:flex-row flex-col md:items-center md:justify-center gap-2">
                    <ReportLineChart reports={Reports} />
                    <ReportCircleCharts buys={buys} money={money} />
                </div>
            </Content>

            <Content>
                <div className="flex md:flex-row flex-col md:items-center md:justify-center gap-2">
                    <Card title="Count of Products" ClassName="md:w-[17rem] md:h-[5rem] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" color={{ text: "#fff" }}>
                        {Product.length}
                    </Card>
                    <Card title="Store Rentals" ClassName="md:w-[17rem] md:h-[5rem] bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500" color={{ text: "#fff" }}>
                        {ren.rentals.length}
                    </Card>
                    <Card title="Store still Request Rental" ClassName="md:w-[17rem] md:h-[5rem] bg-gradient-to-r from-amber-400 via-orange-500 to-red-500" color={{ text: "#fff" }}>
                        {ren.ReqRental.length}
                    </Card>
                </div>
            </Content>

            <UserVisited />
        </div>
    )
}