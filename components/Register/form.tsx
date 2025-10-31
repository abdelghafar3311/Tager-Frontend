"use client"
// react
import { useState } from "react";
import axios, { AxiosError } from "axios"
import notification from "@/hooks/useNotifications"
// cookies
import { setCookie } from "cookies-next";

// redux
import { useAppDispatch } from "@/hooks/reduxHooks"
import { auth } from "@/Redux/slices/auth"
// env
import { AuthRoutes } from "@/config/routes"
// routers
import { useRouter } from "next/navigation"
// Templates
import Inp from "@/UI/input/Inp"
import Btn from "@/UI/BTN/Btn"
// icons
import { FaUser } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"
import Image from "next/image";

interface Props {
    formFor: "customer" | "owner"
}
interface FormRegisterProps {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

export default function FormRegister({ formFor }: Props) {
    // checkAuth();
    const router = useRouter();
    const url = formFor === "customer" ? AuthRoutes.customer.register : AuthRoutes.owner.register
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [form, setForm] = useState<FormRegisterProps>({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const dispatch = useAppDispatch();

    const pushData = (flied: string, value: string) => {
        setForm(prev => ({
            ...prev,
            [flied]: value
        }))
    }

    const checkPass = () => {
        if (form.password !== form.confirmPassword) {
            return { case: "error", msg: "Password does not match", error: true }
        }
        return { case: "", msg: "", error: false }
    }
    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isLoading) return
        if (form.password.length < 6) {
            notification("Password must be at least 6 characters", "warn")
            return
        }

        if (checkPass().error) {
            notification(checkPass().msg, "error")
            return
        }

        setIsLoading(true)

        try {
            const response = await axios.post(url, {
                username: form.username,
                email: form.email,
                password: form.password
            })

            setCookie("token", response.data.token)
            setCookie("role", formFor)
            dispatch(auth({
                username: response.data.username,
                email: response.data.email,
                id: response.data.id,
                role: formFor
            }));

            notification("Account created successfully", "success");
            router.push("/create_profile")

        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            console.log("the error", err, "url is", url)
            notification(err.response?.data?.message || "Something went wrong", "error")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-[90%] lg:w-[50%] md:w-[50%] flex flex-col gap-4">
            <form className="flex flex-col gap-4 w-[100%]" onSubmit={handleForm}>
                <Inp icon={<FaUser />} placeholder="Username" name="username" isRequired onChange={(e) => pushData(e.target.name, e.target.value.replace(/\s+/g, '_'))} />
                <Inp icon={<MdEmail />} type="email" placeholder="Email" name="email" isRequired onChange={(e) => pushData(e.target.name, e.target.value)} />
                <Inp icon={<RiLockPasswordFill />} type="password" min={6} max={32} name="password" placeholder="Password" isRequired onChange={(e) => pushData(e.target.name, e.target.value)} />
                <Inp icon={<RiLockPasswordFill />} type="password" name="confirmPassword" placeholder="Confirm Password" msg={checkPass().error ? { case: checkPass().case, msg: checkPass().msg } : { case: "", msg: "" }} isRequired onChange={(e) => pushData(e.target.name, e.target.value)} />
                <Btn className="w-full" isDisabled={checkPass().error} isLight isLoading={isLoading}>Sign Up</Btn>
            </form>
        </div>

    )
}