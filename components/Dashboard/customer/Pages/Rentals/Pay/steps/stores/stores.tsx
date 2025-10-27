"use client"
import { useEffect, useState } from "react";
//  UI
import Btn from "@/UI/BTN/Btn"
import Inp from "@/UI/input/Inp";
import Pagination from "@/UI/pagination/pagination";
import LoadingDashScreen from "@/components/loading-com/dash-load";
// axios
import axios from "axios";
// cookies
import { getCookie } from "cookies-next";
// routes
import { RoomRoutes } from "@/config/routes";
// context
import { usePayContext } from "../../context/context";

interface DataFetch {
    nameRoom: string;
    price: number;
    Discount: number;
    relPrice: number;
    _id: string;
    Area_Id: {
        nameArea: string;
        address: string;
        maxRooms: number;
        _id: string;
        status: boolean;
        isDeleted: boolean;
    };
    Owner_Id: string;
    NumberRoom: number;
    length: number;
    width: number;
    description: string;
    Duration: "M" | "d" | "y";
    RentalType: "null" | "rental" | "expire";
    status: boolean;
    isDeleted: boolean;
    ownerName: string;

}

export default function SoresSelect() {
    const { setStepName, setProgress, setData } = usePayContext();

    const [stores, setStores] = useState<DataFetch[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [filter, setFilter] = useState<DataFetch[]>([]);
    const [price, setPrice] = useState<{ from: number, to: number }>({
        from: 0,
        to: 0
    });

    const getStores = async () => {
        try {
            setLoading(true);
            const res = await axios.get(RoomRoutes.getCustomerRooms, {
                headers: {
                    token: `${getCookie("token")}`
                }
            });
            const modifiedRooms = res.data.rooms.map((store: any) => ({
                ...store,
                relPrice:
                    store.Discount > 5 && store.Discount < store.price
                        ? store.Discount
                        : store.price
            }));

            setStores(modifiedRooms);
            setFilter(modifiedRooms);
            console.log(stores);
        } catch (error) {
            setLoading(false);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const filterStores = () => {
        if (price.from === 0 && price.to === 0) {
            setFilter(stores);
            return;
        }
        const filtered = stores.filter((store) => {
            return store.relPrice >= price.from && store.relPrice <= price.to;
        });
        setFilter(filtered);
    }

    useEffect(() => {
        filterStores();
    }, [price]);

    useEffect(() => {
        getStores();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingDashScreen />
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-3xl text-center">Select Your Store Here</h1>

            <div className="flex md:flex-row flex-col gap-2 mt-4" style={{ direction: "rtl" }}>
                <div className="flex-4" style={{ direction: "ltr" }}>
                    <div className="border border-gray-200 bg-white rounded-xl p-5 shadow-sm sticky top-0">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-lg font-semibold text-gray-800">Filter</h2>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Inp type="number" value={price.from.toString()} onChange={(e) => setPrice({ ...price, from: +e.target.value })} placeholder="from" isLabel label="from" />
                                <Inp type="number" value={price.to.toString()} onChange={(e) => setPrice({ ...price, to: +e.target.value })} placeholder="to" isLabel label="to" />
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col gap-2">
                            <Btn className="w-full" onClick={() => { setPrice({ from: 0, to: 0 }) }}>
                                Reset
                            </Btn>
                        </div>
                    </div>
                </div>

                <div className="flex-6 flex flex-col gap-2" style={{ direction: "ltr" }}>
                    <Pagination data={filter} itemsPerPage={5}>
                        {(currentItems: DataFetch[]) => (
                            <div className="flex-6 flex flex-col gap-2" style={{ direction: "ltr" }}>
                                {currentItems && currentItems.map((store: DataFetch) => (
                                    <div key={store._id} className="border border-gray-200 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200">
                                        <div className="flex justify-between items-center mb-3">
                                            <h2 className="text-lg font-semibold text-gray-800">{store.nameRoom}</h2>
                                            <span className="px-2 py-1 text-xs font-medium text-green-600">
                                                {store.Discount > 5 ? store.Discount > store.price ? store.Discount : (<><span className="line-through text-gray-400">${store.price}</span> <span>${store.Discount}</span> </>) : "$" + store.price}/{store.Duration === "d" ? "Day" : store.Duration === "M" ? "Month" : "Year"}
                                            </span>
                                        </div>

                                        <div className="space-y-2 text-sm text-gray-600">
                                            <p>
                                                <span className="font-medium text-gray-700">Address:</span> {store.Area_Id.address}
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-700">Size:</span> {store.length}*{store.width}
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-700">Area Name:</span> {store.Area_Id.nameArea}
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-700">Owner Name:</span> {store.ownerName}
                                            </p>
                                        </div>

                                        <div className="mt-4">
                                            <Btn className="w-full" onClick={() => { setData(store); setStepName("pay"); setProgress(50) }}>
                                                Select
                                            </Btn>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Pagination>
                </div>
            </div>

        </div>
    )
}