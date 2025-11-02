"use client"
import { useState } from "react"
// scss file
import Image from "next/image"
import classes from "./auth.module.scss"
// axios
import axios, { AxiosError } from "axios"
// route
import { SysRoutes } from "../../config/routes"
// notification
import { toast } from "react-toastify"
// cookies
import { setCookie } from "cookies-next"
// router
import { useRouter } from "next/navigation"

export default function SysSys() {
    const router = useRouter();
    // password
    const [password, setPassword] = useState<string>("");

    // login
    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!password) return toast.error("Please enter password");
        try {
            const promise = axios.post(SysRoutes.auth, { sysPass: password });

            const response = await toast.promise(promise, {
                pending: "Authenticating system...",
                success: "Access granted successfully ✅",
                error: "Authentication failed ❌",
            });

            const token = response.data.token;
            console.log("Token:", token);

            setCookie("sysToken", token);
            router.push("/SYS00/Refactor");
            // localStorage.setItem("sysToken", token);

        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "Request failed");
            } else {
                toast.error("Something went wrong");
            }
        }
    };



    return (
        <div className={`${classes.container} bg-gradient-to-br from-gray-900 via-gray-800 to-black`}>
            <form onSubmit={login} className={classes.form}>
                <Image src="/tlogo.png" alt="logo" width={200} height={200} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </form>
        </div>
    )
}