"use client"
import { useState } from "react"
// redux
import { useAppDispatch } from "@/hooks/reduxHooks"
import { auth } from "@/Redux/slices/auth"
// axios
import axios, { AxiosError } from "axios";

// cookies
import { setCookie } from "cookies-next"
// env
import { AuthRoutes } from "@/config/routes"
// routers
import { useRouter } from "next/navigation"
// hooks
import notification from "@/hooks/useNotifications"

import Inp from "@/UI/input/Inp"
import Btn from "@/UI/BTN/Btn"

import { MdEmail } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"
import Image from "next/image";

interface Login {
    email: string
    password: string,
    type: "customer" | "owner"
}


export default function FormLogin() {

    // const {auth , type} = checkAuth();
    // checkAuth();

    const [form, setForm] = useState<Login>({
        email: "",
        password: "",
        type: "customer"
    });
    const dispatch = useAppDispatch();
    const route = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const url = form.type === "customer" ? AuthRoutes.customer.login : AuthRoutes.owner.login
    const pushData = (flied: string, value: string) => {
        setForm(prev => ({
            ...prev,
            [flied]: value
        }))
    }

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true)
        try {
            const response = await axios.post(url, {
                email: form.email,
                password: form.password
            })
            setCookie("token", response.data.token);
            setCookie("role", form.type);
            dispatch(auth({
                username: response.data.username,
                email: response.data.email,
                id: response.data._id
            }));
            notification("Login successful", "success");
            form.type === "customer" ? route.push("/dashboard_customer") : route.push("/owner_dashboard");
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            notification(err.response?.data?.message || "Something went wrong", "error")
        } finally {
            setLoading(false)
        }
    }

    const handleGoogle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return notification("Please wait, we are processing your request", "info");
        notification("This feature is not available yet", "info")
    }



    return (
        <div className="w-[90%] lg:w-[50%] md:w-[50%] flex flex-col gap-4">
            <form className="flex flex-col gap-4 w-[100%]" onSubmit={handleForm}>
                <Inp icon={<MdEmail />} type="email" name="email" value={form.email} onChange={(e) => pushData(e.target.name, e.target.value)} placeholder="Email" isRequired />
                <Inp icon={<RiLockPasswordFill />} type="password" name="password" value={form.password} onChange={(e) => pushData(e.target.name, e.target.value)} placeholder="Password" isRequired />
                <div className="flex flex-col gap-4">
                    <label className="flex gap-2 cursor-pointer" onClick={() => setForm(prev => ({ ...prev, type: "customer" }))}>
                        <input type="radio" checked={form.type === "customer"} name="role" value="customer" />
                        Customer
                    </label>
                    <label className="flex gap-2 cursor-pointer" onClick={() => setForm(prev => ({ ...prev, type: "owner" }))}>
                        <input type="radio" name="role" checked={form.type === "owner"} value="owner" />
                        Owner
                    </label>
                </div>
                <Btn className="w-full" isLoading={loading} isLight>Sign In</Btn>

            </form>
            <form onSubmit={handleGoogle}>
                <button
                    className="flex items-center justify-center gap-4 w-full py-3 border border-[#000] rounded-md cursor-pointer"
                >
                    <Image src="/images/google.png" alt="google" width={24} height={24} />
                    <span>Sign In With Google</span>
                </button>
            </form>
        </div>

    )
}