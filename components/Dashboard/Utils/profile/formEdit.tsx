"use client";
// react
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setProfile } from "@/Redux/slices/profile"
interface Props {
    role: "customer" | "owner"
}

interface FormData {
    name: string;
    phone?: string;
    address?: string;
    description?: string;
}

export default function FormEditProfile({ role = "customer" }: Props) {
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
    const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
    // router
    const router = useRouter();
    // dispatch
    const dispatch = useAppDispatch();

    const formData = (flied: string, value: string) => {
        setForm(prev => ({
            ...prev,
            [flied]: value
        }))
    }

    const GetProfile = async () => {
        try {
            setIsLoadingPage(true);
            const response = await axios.get(url.get, {
                headers: {
                    token: `${getCookie("token")}`
                }
            })
            const data = await response.data;
            setForm({
                name: data.profile.name,
                phone: data.profile.phone,
                address: data.profile.address,
                description: data.profile.description
            })
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            console.log(err);
        } finally {
            setIsLoadingPage(false);
        }
    }

    useEffect(() => {
        GetProfile();
    }, [])

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLoading) return;
        if (form.name.length < 3) {
            notification("Name must be at least 3 characters", "warn");
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.put(url.update, {
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
            setCookie("hasProfile", true);
            dispatch(setProfile({
                name: data.profile.name,
                phone: data.profile.phone,
                address: data.profile.address,
                description: data.profile.description,
                avatar: data.profile.avatar,
                isProfile: true
            }))
            router.push(role === "customer" ? "/dashboard_customer/profile" : "/owner_dashboard/profile");
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            console.log(err);
            notification(err.response?.data?.message || "Something went wrong", "error");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <form onSubmit={handleForm}>
            <Content name={"Edit Profile"} isLoading={isLoadingPage}>
                <div>
                    <Inp type="text" value={form.name} name="name" placeholder="full name" label="Full Name" isLabel onChange={(e) => formData(e.target.name, e.target.value)} />
                    <Inp type="text" value={form.phone} name="phone" placeholder="your phone" label="Phone" isLabel onChange={(e) => formData(e.target.name, e.target.value)} />
                    <Inp type="text" value={form.address} name="address" placeholder="your address" label="Address" isLabel onChange={(e) => formData(e.target.name, e.target.value)} />
                    <Inp name="description" value={form.description} isArea placeholder="Write your description" label="Description" isLabel onChange={(e) => formData(e.target.name, e.target.value)} />
                </div>
                <div className="flex justify-center mt-5">
                    <Btn isLight className="w-full" isLoading={isLoading}>
                        Update
                    </Btn>
                </div>
            </Content>
        </form>

    )
}