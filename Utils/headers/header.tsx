"use client"

import style from "./header.module.scss";
import { IoMdLogIn } from "react-icons/io";
// pathname
import { usePathname } from "next/navigation";
import Msg from "@/UI/message/Msg";

export default function Header() {
    const router = usePathname();
    return (
        <div className={style.header}>

            <div className={style.Logo}>
                <img src="/tlogo.png" alt="tager logo" width={34} height={34} />
                <h1 className={style.title}> Hello in Tager</h1>
            </div>

            <div className={style.headerType}>
                <span><IoMdLogIn /></span>
                <span>{router === "/Auth/register" ? "Login" : "Register"}</span>
            </div>

        </div>
    )
}