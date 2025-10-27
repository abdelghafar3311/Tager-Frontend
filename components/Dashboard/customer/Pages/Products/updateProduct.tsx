"use client";
import { useState, useEffect } from "react";
// next
import { useRouter } from "next/navigation";
// UI
import Content from "@/components/Dashbpoard Tools/ContentStyle/content";
import Inp from "@/UI/input/Inp";
import Btn from "@/UI/BTN/Btn";
import Alarm from "@/UI/Alarm/alarm";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/UI/Select/select";
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
// load page
import LoadingDashScreen from "@/components/loading-com/dash-load";
// routes
import { ProductRoutes, RentalRoutes } from "@/config/routes";


interface Form {
    nameProduct: string;
    category: string;
    price: number;
    taxes: number;
    ads: number;
    gain: number;
    discount: number;
    count: number;
    store: string;
}

export default function UpdateProduct({ id }: { id: string }) {

    // router
    const router = useRouter();
    // despatch
    const dispatch = useAppDispatch();
    // catch error money
    const [error, setError] = useState<{
        errorType: boolean;
        errorMsg: string;
    }>({
        errorType: false,
        errorMsg: "",
    });
    // loading page
    const [loadingPage, setLoadingPage] = useState<boolean>(true);
    // load btn
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
    // get Rentals
    const [rentals, setRentals] = useState<any>([]);
    // form
    const [form, setForm] = useState<Form>({
        nameProduct: "",
        category: "",
        price: 0,
        taxes: 0,
        ads: 0,
        gain: 0,
        discount: 0,
        count: 0,
        store: "",
    });


    // push form fun
    const pushForm = (flied: string, value: string) => {
        setForm((prev) => ({
            ...prev,
            [flied]: value,
        }));
    };

    // get product
    const getProduct = async () => {
        try {
            setLoadingPage(true);
            const token = getCookie("token");
            const response = await axios.get(`${ProductRoutes.getById(id)}`, {
                headers: {
                    token: `${token}`,
                },
            });
            const dataBase = await response.data;
            setForm({
                nameProduct: dataBase.nameProduct,
                category: dataBase.category,
                price: +dataBase.price,
                taxes: dataBase.taxes,
                ads: +dataBase.ads,
                gain: +dataBase.gain,
                discount: +dataBase.discount,
                count: +dataBase.count,
                store: dataBase.Rental_Id,
            });
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            console.log(err);
        } finally {
            setLoadingPage(false);
        }
    }

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

    // form send data to server
    const formSend = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loadingBtn) return;

        try {
            setLoadingBtn(true);
            const token = getCookie("token");
            const response = await axios.put(`${ProductRoutes.update(id)}`, {
                nameProduct: form.nameProduct,
                category: form.category,
                price: +form.price,
                taxes: +form.taxes,
                ads: +form.ads,
                gain: +form.gain,
                discount: +form.discount,
                count: +form.count,
                Rental_Id: form.store
            }, {
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

    // useEffect
    useEffect(() => {
        async function Fetchers() {
            await getProduct();
            await fetcherRentals();
        }
        Fetchers();

    }, []);
    useEffect(() => {
        if (+money < ((+form.price + +form.ads + +form.taxes * +form.count))) {
            setError({
                errorType: true,
                errorMsg: "You don't have enough money",
            });
            return;
        }
        if (+form.count <= 0) {
            setError({
                errorType: true,
                errorMsg: "Count must be more than 0",
            });
            return;
        }
        if (+form.discount > +form.gain) {
            setError({
                errorType: true,
                errorMsg: "Discount must be less than gain",
            });
            return;
        }
        setError({
            errorType: false,
            errorMsg: "",
        });
    }, [form])


    const { money } = useAppSelector((state) => state.customer);


    // loading
    if (loadingPage) {
        return (
            <div className="h-screen">
                <LoadingDashScreen />
            </div>
        );
    }


    return (
        <Content name="Update Product">
            <form onSubmit={formSend}>
                <Inp
                    placeholder="name product"
                    isLabel
                    label="Name Product"
                    isRequired
                    type="text"
                    name="nameProduct"
                    value={form.nameProduct}
                    onChange={(e) => pushForm(e.target.name, e.target.value)}
                />
                <Inp
                    placeholder="category"
                    isLabel
                    label="Category"
                    isRequired
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={(e) => pushForm(e.target.name, e.target.value)}
                />
                <div className="flex flex-col md:flex-row gap-2">
                    <Inp
                        placeholder="price"
                        isLabel
                        label="Price"
                        isRequired
                        type="number"
                        name="price"
                        value={form.price.toString()}
                        onChange={(e) => pushForm(e.target.name, e.target.value)}
                    />
                    <Inp
                        placeholder="taxes"
                        isLabel
                        label="Taxes"
                        type="number"
                        name="taxes"
                        value={form.taxes.toString()}
                        onChange={(e) => pushForm(e.target.name, e.target.value)}
                    />
                    <Inp
                        placeholder="ads"
                        isLabel
                        label="Ads"
                        type="number"
                        name="ads"
                        value={form.ads.toString()}
                        onChange={(e) => pushForm(e.target.name, e.target.value)}
                    />
                    <Inp
                        placeholder="gain"
                        isLabel
                        label="Gain"
                        isRequired
                        type="number"
                        name="gain"
                        value={form.gain.toString()}
                        onChange={(e) => pushForm(e.target.name, e.target.value)}
                    />
                    <Inp
                        placeholder="discount"
                        isLabel
                        label="Discount"
                        type="number"
                        name="discount"
                        value={form.discount.toString()}
                        onChange={(e) => pushForm(e.target.name, e.target.value)}
                    />
                </div>
                <Inp
                    placeholder="count of product"
                    isLabel
                    label="Count"
                    isRequired
                    type="number"
                    name="count"
                    value={form.count.toString()}
                    onChange={(e) => pushForm(e.target.name, e.target.value)}
                />
                <div className="my-2">
                    <label className="text-gray-600">Select Store*</label>
                    <Select
                        required
                        name="store"
                        value={form.store}
                        onValueChange={(value) => pushForm("store", value)}
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
                </div>
                <div className="flex flex-row items-center gap-2">
                    <h3 className="font-bold">Total:</h3>
                    <p className={`${((+form.price + +form.ads + +form.taxes) * +form.count) > +money ? "text-red-500" : "text-emerald-500"}`}>${(+form.price + +form.ads + +form.taxes) * +form.count}/ {money}</p>
                </div>
                {error.errorType && <div className="my-3">
                    <Alarm type="error" subject="Error Message">
                        {error.errorMsg}
                    </Alarm>
                </div>}
                <div className="mt-2">
                    <Btn isDisabled={error.errorType} isLoading={loadingBtn} type="submit" className="w-full">Submit</Btn>
                </div>
            </form>
        </Content>
    )
}