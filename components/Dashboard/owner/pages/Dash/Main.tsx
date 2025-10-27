"use client"
import { useState, useEffect } from "react";
// UI
import Content from "@/components/Dashbpoard Tools/ContentStyle/content"
import Card from "@/UI/Card/Card";
import LoadingDashScreen from "@/components/loading-com/dash-load";
// charts
import StoreAnalysis from "./chartsStores";
import MoneyAnalysis from "./MoneyAnalysis";
import RAE from "./RAE";
// fetchers
import { fetcherRentals, fetcherAreas, fetcherOwnerProfile, fetcherReqRentals, fetcherStores } from "./fetchers/fetchers";
import { IoMdRefresh } from "react-icons/io";

export default function DashboardOwner() {
    // LOAD DATA
    const [loading, setLoading] = useState(true);
    // state fetchers
    const [rentals, setRentals] = useState<[]>([]);
    const [areas, setAreas] = useState<[]>([]);
    const [stores, setStores] = useState<[]>([]);
    const [reqRentals, setReqRentals] = useState<[]>([]);
    const [owner, setOwner] = useState(0);

    const FetcherLoad = async () => {
        try {
            setLoading(true);
            await Promise.all([
                fetcherRentals(setRentals),
                fetcherAreas(setAreas),
                fetcherStores(setStores),
                fetcherReqRentals(setReqRentals),
                fetcherOwnerProfile(setOwner)
            ])

            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const Fetcher = async () => {
        try {

            await Promise.all([
                fetcherRentals(setRentals),
                fetcherAreas(setAreas),
                fetcherStores(setStores),
                fetcherReqRentals(setReqRentals),
                fetcherOwnerProfile(setOwner)
            ])


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        FetcherLoad();
        setInterval(Fetcher, 60000);
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
            <Content>
                <div className="mb-4 flex justify-between">
                    <h1 className="text-3xl font-extrabold">Dashboard</h1>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center justify-center gap-1 transition-all px-3 text-2xl py-3 rounded-full bg-white text-[12px] hover:shadow cursor-pointer relative" onClick={FetcherLoad}><IoMdRefresh /></button>
                    </div>
                </div>
                <div className="flex md:flex-row flex-col md:items-center md:justify-center gap-2">
                    <Card title="Money" ClassName="md:w-[17rem] md:h-[5rem]" color={{ bg: "#16A34A", text: "#fff" }}>
                        ${owner}
                    </Card>
                    <Card title="Rentals" ClassName="md:w-[17rem] md:h-[5rem]" color={{ bg: "#2563EB", text: "#fff" }}>
                        {rentals.length}
                    </Card>
                    <Card title="Requests Rentals" ClassName="md:w-[17rem] md:h-[5rem]" color={{ bg: "#F59E0B", text: "#fff" }}>
                        {reqRentals.length}
                    </Card>
                </div>
            </Content>
            <Content>
                <div className="flex md:flex-row flex-col md:items-center md:justify-between gap-2">
                    <StoreAnalysis stores={stores} />
                    <MoneyAnalysis />
                </div>
            </Content>
            <Content>
                <div className="flex md:flex-row flex-col md:items-center md:justify-between gap-2">
                    <Card title="Area" ClassName="md:w-[100%] md:h-[5rem]" color={{ bg: "#3B82F6", text: "#fff" }}>
                        {areas.length}
                    </Card>
                    <Card title="Store" ClassName="md:w-[100%] md:h-[5rem]" color={{ bg: "#8B5CF6", text: "#fff" }}>
                        {stores.length}
                    </Card>
                </div>
            </Content>
            <RAE />
        </div>
    )
}