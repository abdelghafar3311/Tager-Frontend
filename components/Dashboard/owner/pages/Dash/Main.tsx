"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// UI
import Content from "@/components/Dashbpoard Tools/ContentStyle/content"
import Card from "@/UI/Card/Card";
import LoadingDashScreen from "@/components/loading-com/dash-load";
// charts
import StoreAnalysis from "./chartsStores";
import MoneyAnalysis from "./MoneyAnalysis";
import RAE from "./RAE";
// icons
import { IoMdRefresh } from "react-icons/io";
// redux
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { updateReqRentalCache, updateAreaCache, updateRentalOwnerCache, updateStoreCache } from "@/cache/updateCaching";
import { GetOwner, GetOwnerInfo, GetProfile } from "@/fetchData/fetch";


export default function DashboardOwner() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { rentals, isCachingUpdate: rentalsIsCaching } = useAppSelector((state) => state.rentalsOwner);
    const { area, isCachingUpdate: areaIsCaching } = useAppSelector((state) => state.areas);
    const { store, isCachingUpdate: storesIsCaching } = useAppSelector((state) => state.stores);
    const { reqRental, isCachingUpdate: reqRentalIsCaching } = useAppSelector((state) => state.reqRental);
    const { money, isCached: ownerInfoIsCached } = useAppSelector((state) => state.ownerInfo);
    const { isCached: profileIsCached } = useAppSelector((state) => state.profile);
    const { isProfile } = useAppSelector(state => state.profile);
    // LOAD DATA
    const [loading, setLoading] = useState(true);

    const fetchMainData = async () => {
        try {
            await Promise.all([
                GetOwner(dispatch),
                GetOwnerInfo(dispatch),
                GetProfile("owner", dispatch),
            ])
        } catch (error) {
            console.log(error);
        }
    }

    const FetcherLoad = async () => {
        try {

            await Promise.all([
                updateAreaCache(dispatch),
                updateStoreCache(dispatch),
                updateRentalOwnerCache(dispatch),
                updateReqRentalCache(dispatch)
            ])
            console.log("stores from dashboard: ", store.length, reqRental.length, rentals.length, area.length);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isProfile === null) return;
        if (isProfile === false) {
            router.push("/create_profile");
        }
    }, [isProfile])

    const AllRequests = async () => {
        try {
            setLoading(true);
            await Promise.all([
                fetchMainData(),
                FetcherLoad()
            ])
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!(rentalsIsCaching && areaIsCaching && storesIsCaching && reqRentalIsCaching && ownerInfoIsCached && profileIsCached)) {
            AllRequests();
        }
        if (rentalsIsCaching && areaIsCaching && storesIsCaching && reqRentalIsCaching && ownerInfoIsCached && profileIsCached) {
            setLoading(false);
        }

    }, [])

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <LoadingDashScreen />
            </div>
        )
    }

    if (!isProfile) {
        return (
            <div className="h-screen flex justify-center items-center text-3xl">
                Wait we redirecting you to create profile
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
                        ${money}
                    </Card>
                    <Card title="Rentals" ClassName="md:w-[17rem] md:h-[5rem]" color={{ bg: "#2563EB", text: "#fff" }}>
                        {rentals.length}
                    </Card>
                    <Card title="Requests Rentals" ClassName="md:w-[17rem] md:h-[5rem]" color={{ bg: "#F59E0B", text: "#fff" }}>
                        {reqRental.length}
                    </Card>
                </div>
            </Content>
            <Content>
                <div className="flex md:flex-row flex-col md:items-center md:justify-between gap-2">
                    <StoreAnalysis stores={store} />
                    <MoneyAnalysis />
                </div>
            </Content>
            <Content>
                <div className="flex md:flex-row flex-col md:items-center md:justify-between gap-2">
                    <Card title="Area" ClassName="md:w-[100%] md:h-[5rem]" color={{ bg: "#3B82F6", text: "#fff" }}>
                        {area.length}
                    </Card>
                    <Card title="Store" ClassName="md:w-[100%] md:h-[5rem]" color={{ bg: "#8B5CF6", text: "#fff" }}>
                        {store.length}
                    </Card>
                </div>
            </Content>
            <RAE />
        </div>
    )
}