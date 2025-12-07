"use client";
// react
import { useState } from "react";
import { useRouter } from "next/navigation";
// security
import { GetProfile } from "@/fetchData/fetch";
// UI
import Content from "@/components/Dashbpoard Tools/ContentStyle/content";
import Btn from "@/UI/BTN/Btn";
import Inp from "@/UI/input/Inp";
//routes
import { CustomerRoutes, OwnerRoutes } from "@/config/routes";
// notification
import notification from "@/hooks/useNotifications";
import { getCookie, setCookie } from "cookies-next";
// axios
import axios, { AxiosError } from "axios";
// profile redux
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
interface Props {
    role: "customer" | "owner"
}

interface FormData {
    name: string;
    phone?: string;
    address?: string;
    description?: string;
}

export default function FormProfile({ role = "customer" }: Props) {
    // redux
    const dispatch = useAppDispatch();
    const { isProfile } = useAppSelector((state) => state.profile);
    // url
    const url = role === "customer" ? CustomerRoutes.profile : OwnerRoutes.profile
    // form
    const [form, setForm] = useState<FormData>({
        name: "",
        phone: "",
        address: "",
        description: ""
    })
    // loading
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // router
    const router = useRouter();

    const formData = (flied: string, value: string) => {
        setForm(prev => ({
            ...prev,
            [flied]: value
        }))
    }

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLoading) return;
        if (form.name.length < 3) {
            notification("Name must be at least 3 characters", "warn");
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post(url.add, {
                name: form.name,
                phone: form.phone || "",
                address: form.address || "",
                description: form.description || ""
            }, {
                headers: {
                    token: `${getCookie("token")}`
                }
            })
            const data = await response.data;
            notification(data.message, "success");
            setIsLoading(false);
            GetProfile(role, dispatch);
            setCookie("hasProfile", true);
            role === "customer" ? router.push(`/dashboard_customer/profile/Avatar`) : router.push(`/owner_dashboard/profile/Avatar`)
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            console.log(err);
            notification(err.response?.data?.message || "Something went wrong", "error");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            {isProfile ? (
                <div>
                    <p className="text-center text-2xl font-bold">You already have a profile</p>
                </div>
            ) : (
                <form onSubmit={handleForm}>
                    <Content name={"Add Profile"}>
                        <div>
                            <Inp type="text" isRequired name="name" placeholder="full name" label="Full Name" isLabel onChange={(e) => formData(e.target.name, e.target.value)} />
                            <Inp type="text" name="phone" isRequired placeholder="your phone" label="Phone" isLabel onChange={(e) => formData(e.target.name, e.target.value)} />
                            <Inp type="text" name="address" isRequired placeholder="your address" label="Address" isLabel onChange={(e) => formData(e.target.name, e.target.value)} />
                            <Inp name="description" isArea placeholder="Write your description" label="Description" isLabel onChange={(e) => formData(e.target.name, e.target.value)} />
                        </div>
                        <div className="flex justify-center mt-5">
                            <Btn isLight className="w-full" isLoading={isLoading}>
                                Save and Continue
                            </Btn>
                        </div>
                    </Content>
                </form>
            )}
        </>
    )
}