"use client"
import { useState } from "react";
// axios
import axios, { AxiosError } from "axios";
// notify
import notification from "@/hooks/useNotifications";
// cookies
import { getCookie } from "cookies-next"
// route api
import { TransferMoneyRoutes } from "@/config/routes";
// dispatch
import { useAppDispatch } from "@/hooks/reduxHooks";

import Content from "@/components/Dashbpoard Tools/ContentStyle/content"
import Inp from "@/UI/input/Inp";
import Btn from "@/UI/BTN/Btn";
import { GetCustomer } from "@/fetchData/fetch";

interface formData {
    money: number;
    user_id: string;
    user_type: "Customer" | "Owner";
}

export default function TransMoney() {
    const dispatch = useAppDispatch();
    GetCustomer(dispatch);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<formData>({
        money: 0,
        user_id: "",
        user_type: "Customer"
    });

    const handleFiledData = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    // translate money
    const handleTransMoney = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true)
        try {
            const response = await axios.post(TransferMoneyRoutes.transfer, {
                user_id: formData.user_id,
                money: formData.money,
                user_type: formData.user_type
            }, {
                headers: {
                    token: `${getCookie("token")}`
                }
            })
            const data = await response.data
            notification(data.message, "success")
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            notification(err.response?.data?.message || "Something went wrong", "error")
        } finally {
            setLoading(false)
        }
    }
    return (
        <Content name="Translate Money">
            <form onSubmit={handleTransMoney}>
                <Inp value={formData.money.toString()} onChange={(e) => handleFiledData("money", e.target.value)} isLabel label="Money Translate" type="number" isRequired placeholder="Money here" />
                <Inp value={formData.user_id} onChange={(e) => handleFiledData("user_id", e.target.value)} isLabel label="User ID" type="text" isRequired placeholder="User ID here" />
                <div className="flex gap-4 m-2">
                    <label className="flex gap-2 cursor-pointer" onClick={() => setFormData({ ...formData, user_type: "Customer" })} >
                        <input required type="radio" name="user_type" value="customer" checked={formData.user_type === "Customer"} />
                        Customer
                    </label>
                    <label className="flex gap-2 cursor-pointer" onClick={() => setFormData({ ...formData, user_type: "Owner" })}>
                        <input required type="radio" name="user_type" value="owner" checked={formData.user_type === "Owner"} />
                        Owner
                    </label>
                </div>
                <Btn type="submit" isLoading={loading} className="w-full">Translate</Btn>
            </form>
        </Content>
    )
}