"use client"
import styles from "./sidebar.module.scss"
import Link from "next/link"

import { usePathname } from "next/navigation"
import { RiLogoutBoxLine } from "react-icons/ri";

import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import Msg from "@/UI/message/Msg"

interface Props {
    TopLinks: {
        link: string,
        name: string,
        icon: React.ReactNode
    }[],
    BottomLinks: {
        link: string,
        name: string,
        icon: React.ReactNode
    }[]
}

export default function Sidebar({ TopLinks, BottomLinks }: Props) {
    const path = usePathname();

    const router = useRouter();
    const logout = () => {
        deleteCookie("token");
        deleteCookie("role");

        router.push("/Auth/Login");
    }

    const comparePath = (link: string) => {
        return path === link ? styles.active : "";
    }
    return (
        <div className={`${styles.Sidebar} bg-white flex-1 md:flex-2 items-center md:items-start`}>
            <div className={`${styles.Divs} hidden md:block`}>
                {TopLinks.map((link, index) => (
                    <Link
                        key={`top-link-${index}`}
                        className={`${styles.Link} ${comparePath(link.link)}`}
                        href={link.link}
                    >
                        <span className={styles.icon}>{link.icon}</span>
                        <span className="hidden md:block">{link.name}</span>
                    </Link>
                ))}
            </div>

            <div className={`${styles.Divs} block md:hidden`}>
                {TopLinks.map((link, index) => (
                    <Msg
                        key={`top-msg-${index}`}
                        effect="scale"
                        msg={link.name}
                        dir="l"
                    >
                        <Link
                            className={`${styles.Link} ${comparePath(link.link)}`}
                            href={link.link}
                        >
                            <span className={styles.icon}>{link.icon}</span>
                            <span className="hidden md:block">{link.name}</span>
                        </Link>
                    </Msg>
                ))}
            </div>

            <div className={`${styles.Divs} hidden md:block`}>
                {BottomLinks.map((link, index) => (
                    <Link
                        key={`bottom-link-${index}`}
                        className={`${styles.Link} ${comparePath(link.link)}`}
                        href={link.link}
                    >
                        <span className={styles.icon}>{link.icon}</span>
                        <span className="hidden md:block">{link.name}</span>
                    </Link>
                ))}
                <div
                    className={`${styles.Link} ${styles.logout} text-red-500`}
                    onClick={logout}
                >
                    <span className={styles.icon}>
                        <RiLogoutBoxLine />
                    </span>
                    <span className="hidden md:block">Logout</span>
                </div>
            </div>

            <div className={`${styles.Divs} block md:hidden`}>
                {BottomLinks.map((link, index) => (
                    <Msg
                        key={`bottom-msg-${index}`}
                        effect="trans"
                        msg={link.name}
                        dir="l"
                    >
                        <Link
                            className={`${styles.Link} ${comparePath(link.link)}`}
                            href={link.link}
                        >
                            <span className={styles.icon}>{link.icon}</span>
                            <span className="hidden md:block">{link.name}</span>
                        </Link>
                    </Msg>
                ))}
                <Msg key="logout-msg" effect="trans" msg="Logout" dir="l">
                    <div
                        className={`${styles.Link} ${styles.logout} text-red-500`}
                        onClick={logout}
                    >
                        <span className={styles.icon}>
                            <RiLogoutBoxLine />
                        </span>
                        <span className="hidden md:block">Logout</span>
                    </div>
                </Msg>
            </div>
        </div>

    )
}