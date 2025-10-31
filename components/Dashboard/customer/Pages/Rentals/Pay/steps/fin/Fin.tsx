"use client"
import { useState } from "react";
// axios
import axios, { AxiosError } from "axios";
// hooks notification
import notification from "@/hooks/useNotifications";
// cookie
import { getCookie } from "cookies-next";
// Rental route
import { RentalRoutes } from "@/config/routes";
// next
import { useRouter } from "next/navigation";
// UI
import Content from "@/components/Dashbpoard Tools/ContentStyle/content"
import Btn from "@/UI/BTN/Btn";
import SecurityTab from "@/UI/Security tab/security";
// redux
import { useAppDispatch } from "@/hooks/reduxHooks";
import { updateRentalCustomerCache } from "@/cache/updateCaching";

import { usePayContext } from "../../context/context";
import { MdArrowBackIos } from "react-icons/md";

interface formData {
    timeNumber: number,
    timeType: string,
    Room_Id: string,
    Owner_Id: string
}

export default function FinStepPay() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { setStepName, setProgress, Req, data } = usePayContext();
    const [show, setShow] = useState(false);
    // data send
    const fetchData: formData = {
        timeNumber: Req.Time,
        timeType: Req.Date,
        Room_Id: data._id,
        Owner_Id: data.Owner_Id
    }

    // fun send
    const send = async () => {
        try {
            const response = await axios.post(RentalRoutes.create, fetchData, {
                headers: {
                    token: `${getCookie("token")}`
                }
            });
            const data = await response.data;
            await updateRentalCustomerCache(dispatch);
            notification(data.message, "success");
            router.push("/dashboard_customer/rentals");
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            notification(err.response?.data.message || "Something went wrong", "error");
            console.log(err);
        }
    }

    return (
        <Content>
            <div className="mb-4">
                <button onClick={() => { setStepName("pay"); setProgress(50) }} className="flex items-center justify-center gap-1 transition-all px-3 py-1 rounded border border-gray-300 text-[12px] hover:bg-gray-100 cursor-pointer"><span><MdArrowBackIos /></span>Back</button>
            </div>
            <div className="flex flex-col gap-4">
                <h1 className="text-4xl text-center">You Will Pay ${Req.pay} for {Req.Time} {Req.Date === "M" ? "Months" : Req.Date === "d" ? "Days" : Req.Date === "y" ? "Years" : Req.Date === "h" ? "Hours" : "Minutes"}</h1>
                <p className="text-2xl text-center">Do you want to continue</p>
                <div className="flex gap-1">
                    <Btn className="w-full" onClick={() => setShow(true)}>Continue</Btn>
                    <Btn className="w-full" isLight BtnStatus="warning" onClick={() => { setStepName("home"); setProgress(0) }}>Cancel</Btn>
                </div>
            </div>
            <SecurityTab
                openState={{ isOpen: show, setIsOpen: setShow }}
                ACTIONS="fun"
                TitleAction="Continue Pay"
                Fun={send}
                role="customer"
            />
        </Content>
    )
}