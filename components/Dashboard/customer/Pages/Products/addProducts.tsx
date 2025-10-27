"use client"
import { useState, useEffect } from "react";
// next
import { useRouter } from "next/navigation";
// axios
import axios, { AxiosError } from "axios";
// notification
import notification from "@/hooks/useNotifications";
// fetch
import { GetCustomer } from "@/fetchData/fetch";
// redux despatch
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
// cookies
import { getCookie } from "cookies-next";

import Content from "@/components/Dashbpoard Tools/ContentStyle/content"
import Inp from "@/UI/input/Inp"
import Btn from "@/UI/BTN/Btn"
import Table from "@/UI/Table/Table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/UI/Select/select";
import LoadingDashScreen from "@/components/loading-com/dash-load";

import { RentalRoutes, BuysRoutes } from "@/config/routes";

export default function AddProducts() {
    const dispatch = useAppDispatch();
    const { money } = useAppSelector((state) => state.customer);
    const router = useRouter();
    // loading page
    const [loadingPage, setLoadingPage] = useState<boolean>(true);
    // load btn
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
    // rentals
    const [rentals, setRentals] = useState<any[]>([]);

    // catch error money
    const [error, setError] = useState<{
        errorType: boolean;
        errorMsg: string;
    }>({
        errorType: false,
        errorMsg: "",
    });

    const [limit, setLimit] = useState(1);
    const [localData, setLocalData] = useState<any[]>([]);


    // fetch Rentals
    const fetcherRentals = async () => {
        try {
            setLoadingPage(true);
            const token = getCookie("token");
            const response = await axios.get(`${RentalRoutes.getAll}`, {
                headers: {
                    token: `${token}`,
                },
            });
            await GetCustomer(dispatch);
            const dataBase = await response.data;
            setRentals(dataBase.rentals.filter((item: any) => item.subscriptionState === "active"));
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            console.log(err);
        } finally {
            setLoadingPage(false);
        }
    };

    // Know Price All Products Created
    const [allPriceCreate, setAllPriceCreate] = useState({
        errorStatus: false,
        price: 0,
    });

    // create data
    function createData() {
        const a = [];
        let d = {};
        // here loop in limit to create data
        for (let i = 0; i < limit; i++) {
            d = {
                nameProduct: "",
                category: "",
                count: "",
                price: "",
                taxes: "",
                ads: "",
                gain: "",
                discount: "",
                Rental_Id: "",
            };
            a.push(d);
        }
        // here put data in local data
        setLocalData([...localData, ...a]);
    }

    // this fun to catch changing in inputs create (This work like update data)
    function handleChange(index: number, flied: string, value: string) {
        setLocalData((prev) => {
            const d = [...prev];
            d[index] = { ...d[index], [flied]: value };
            return d;
        });
    }

    // this allow you delete data which in local data
    function deleteOneItem(index: number) {
        setLocalData((prev) => {
            const d = [...prev];
            d.splice(index, 1);
            return d;
        });
    }

    // this to create more data
    function createDataMore() {
        createData();
        setLimit(1);
    }

    // Know The Price Product Local Which You Create Them.
    function BuysAllProductsLocal() {
        const totalBuys = localData.reduce((acc, item) => {
            const price = item.price ? +item.price : 0;
            const taxes = item.taxes ? +item.taxes : 0;
            const ads = item.ads ? +item.ads : 0;
            const count = item.count ? +item.count : 1;
            return acc + (price + taxes + ads) * count;
        }, 0);
        if (totalBuys > +money) {
            setAllPriceCreate({ errorStatus: true, price: totalBuys });
            notification("Your money is not enough", "warn");
        } else {
            setAllPriceCreate({ errorStatus: false, price: totalBuys });
        }
    }

    const formSend = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loadingBtn) return;
        if (error.errorType) return notification(error.errorMsg, "warn");
        try {
            setLoadingBtn(true);
            const token = getCookie("token");
            const response = await axios.post(`${BuysRoutes.buyProducts}`, localData, {
                headers: {
                    token: `${token}`,
                },
            });
            const data = await response.data;
            notification(data.message, "success");
            router.push("/dashboard_customer/product")

        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            console.log(err);
            notification(err.response?.data.message || "Something went wrong", "error");
        } finally {
            setLoadingBtn(false);
        }
    }


    useEffect(() => {
        BuysAllProductsLocal();
        localData.map(item => {
            if (item.count === "" || item.count === undefined || +item.count <= 0) {
                return setError({
                    errorType: true,
                    errorMsg: "Please enter the count of the product"
                })
            }
            if (+item.discount >= +item.gain) {
                return setError({
                    errorType: true,
                    errorMsg: "Discount must be less than the gain"
                })
            }

            if (item.Rental_Id === "" || item.Rental_Id === undefined) {
                return setError({
                    errorType: true,
                    errorMsg: "Please select the Rental"
                })
            }

            setError({
                errorType: false,
                errorMsg: ""
            })

        })
    }, [localData]);

    useEffect(() => {
        fetcherRentals();
    }, []);



    // loading
    if (loadingPage) {
        return (
            <div className="h-screen">
                <LoadingDashScreen />
            </div>
        );
    }

    return (
        <Content name="Add Products">
            <form onSubmit={formSend}>

                <div className="flex items-center justify-between gap-1 mb-2 border-b border-b-gray-500">
                    <Inp
                        placeholder="limit"
                        type="number"
                        value={limit.toString()}
                        onChange={(e) => {
                            setLimit(+e.target.value);
                        }}
                    />
                    <Btn type="button" onClick={createDataMore}>Create</Btn>
                </div>

                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Taxes</th>
                            <th>Ads</th>
                            <th>Gain</th>
                            <th>Discount</th>
                            <th>Count</th>
                            <th>Store</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {localData.length > 0 ? (<>
                            {localData.map((item, i) => (
                                <tr>
                                    <td className="w-[250px]">
                                        <input
                                            className="px-2 py-1 border border-gray-400"
                                            required
                                            placeholder="name product" type="text"
                                            value={item.nameProduct}
                                            onChange={(e) =>
                                                handleChange(i, "nameProduct", e.target.value)
                                            }
                                        />
                                    </td>
                                    <td className="w-[250px]">
                                        <input
                                            placeholder="category"
                                            type="text"
                                            className="px-2 py-1 border border-gray-400"
                                            required
                                            value={item.category}
                                            onChange={(e) =>
                                                handleChange(i, "category", e.target.value)
                                            }
                                        />
                                    </td>
                                    <td className="w-[250px]">
                                        <input
                                            placeholder="price"
                                            type="number"
                                            className="px-2 py-1 border border-gray-400"
                                            required
                                            value={item.price}
                                            onChange={(e) =>
                                                handleChange(i, "price", e.target.value)
                                            }
                                        />
                                    </td>
                                    <td className="w-[250px]">
                                        <input
                                            placeholder="taxes"
                                            type="number"
                                            className="px-2 py-1 border border-gray-400"
                                            value={item.taxes}
                                            onChange={(e) =>
                                                handleChange(i, "taxes", e.target.value)
                                            }
                                        />
                                    </td>
                                    <td className="w-[250px]">
                                        <input
                                            placeholder="ads"
                                            type="number"
                                            className="px-2 py-1 border border-gray-400"
                                            value={item.ads}
                                            onChange={(e) =>
                                                handleChange(i, "ads", e.target.value)
                                            }
                                        />
                                    </td>
                                    <td className="w-[250px]">
                                        <input
                                            placeholder="gain"
                                            type="number"
                                            className="px-2 py-1 border border-gray-400" required
                                            value={item.gain}
                                            onChange={(e: { target: { value: string; }; }) =>
                                                handleChange(i, "gain", e.target.value)
                                            }
                                        />
                                    </td>
                                    <td className="w-[250px]">
                                        <input
                                            placeholder="discount"
                                            type="number"
                                            className="px-2 py-1 border border-gray-400"
                                            value={item.discount}
                                            onChange={(e) =>
                                                handleChange(i, "discount", e.target.value)
                                            }
                                        />
                                    </td>
                                    <td className="w-[250px]">
                                        <input
                                            placeholder="count"
                                            type="number"
                                            className="px-2 py-1 border border-gray-400"
                                            required
                                            value={item.count}
                                            onChange={(e) =>
                                                handleChange(i, "count", e.target.value)
                                            }
                                        />
                                    </td>
                                    <td className="w-[250px]">
                                        <Select
                                            required={true}
                                            value={item.Rental_Id}
                                            onValueChange={(e) =>
                                                handleChange(i, "Rental_Id", e)
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Store" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {rentals.map((rental: any) => (
                                                    <SelectItem key={rental._id} value={rental._id}>
                                                        {rental.Room_Id.nameRoom}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </td>
                                    <td>
                                        <Btn onClick={() => deleteOneItem(i)} BtnStatus="alarm" type="button">
                                            Delete
                                        </Btn>
                                    </td>
                                </tr>
                            ))}
                        </>) : (
                            <tr>
                                <td colSpan={10} className="text-center">
                                    no data
                                </td>
                            </tr>
                        )}

                    </tbody>
                </Table>
                <div className="mt-3">
                    <Btn onClick={createData} isLight className="w-full" type="button">
                        Add Item
                    </Btn>
                </div>
                <div className="flex items-center justify-between mt-3">
                    <p className={`px-3 py-1 ${allPriceCreate.errorStatus ? "bg-rose-200 text-rose-700" : "bg-emerald-200 text-emerald-700"}  rounded-full`}>${allPriceCreate.price}/${money}</p>
                    <Btn isLoading={loadingBtn} type="submit">Save</Btn>
                </div>
            </form>
        </Content>
    )
}