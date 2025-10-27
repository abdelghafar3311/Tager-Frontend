"use client"
import Link from "next/link";
import style from "./header.module.scss";
import { IoMdLogIn } from "react-icons/io";
// pathname
import { usePathname } from "next/navigation";

export default function Header() {
    let r;
    const router = usePathname();
    r = router == "/Auth/Login" ? "Register" : "Login";
    return (
        <div className={style.header}>
            <Link href="/">
                <div className={style.Logo}>
                    <img src="/tlogo.png" alt="tager logo" width={34} height={34} />
                    <h1 className={style.title}> Hello in Tager</h1>
                </div>
            </Link>


            <Link href={`/Auth/${r}${r == "Register" ? "/welcome" : ""}`} className={style.headerType}>
                <span><IoMdLogIn /></span>
                <span>{r}</span>
            </Link>

        </div>
    )
}