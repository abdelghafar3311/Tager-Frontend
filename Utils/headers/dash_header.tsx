"use client"
// react
import { useState, useEffect } from "react";
// next
import Link from "next/link";
import { useRouter } from "next/navigation";
// security
import { CheckForAllDetails } from "@/fetchData/secFetcher";
// redux
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
// styles
import styles from "./header.module.scss";
// fetch data
import { GetProfile, GetOwnerInfo } from "@/fetchData/fetch";
// UI
import Modal from "@/UI/Modal/modal";
import Image from "next/image";
import Notification from "@/UI/Notification/notifiction";

interface Props {
    role: "customer" | "owner"
}

export default function DashHeader({ role }: Props) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    GetProfile(role, dispatch);

    const [show, setShow] = useState(false);
    const { status, avatar, name, isProfile } = useAppSelector((state) => state.profile);
    const { money } = useAppSelector((state) => state.customer);
    const { money: ownerMoney } = useAppSelector((state) => state.ownerInfo);
    // GetProfile(role, dispatch)
    // role === "owner" && GetOwnerInfo(dispatch)
    useEffect(() => {
        Promise.all([
            GetProfile(role, dispatch),
            role === "owner" && GetOwnerInfo(dispatch)
        ]);
    }, []);

    useEffect(() => {
        if (isProfile === null) return;
        if (isProfile === false) router.push("/create_profile");
    }, [isProfile]);
    return (
        <div className={styles.header}>
            <div className={styles.Logo}>
                <img src="/tlogo.png" alt="logo" width={40} height={40} />
                <span className={styles.title}>Tager</span>
            </div>
            {/* logo profile */}
            {isProfile && (
                <div className="flex items-center gap-1.5">
                    <Notification />
                    {role === "customer" && <Link href={"/dashboard_customer/money"} className="text-xl text-slate-600 cursor-pointer">
                        <span>${money}</span>
                    </Link>}
                    {role === "owner" && <p className="text-xl text-slate-600">
                        <span>${ownerMoney}</span>
                    </p>}
                    <div className={styles.profile}>
                        <div className={styles.img} onClick={() => setShow(true)}>
                            <Image src={avatar || ""} alt="profile" width={40} height={40} />
                            <span className={`${styles.dot} ${status ? styles.online : styles.offline}`}></span>
                        </div>
                        <div className={styles.info}>
                            <h3 className={styles.name}>
                                <span className="truncate w-[80px]">{name}</span>
                            </h3>
                            <i className={styles.type}>{role}</i>
                        </div>
                    </div>
                </div>
            )}
            {!isProfile && (
                <div className={styles.profile}>
                    <span className={styles.name}>Sorry to use system, please create <Link href={"/create_profile"} className="text-blue-500">profile</Link></span>
                </div>
            )}

            <Modal openState={{ isOpen: show, setIsOpen: setShow }} header={{ title: "Avatar", isClose: true }} size="md">
                <div className="flex items-center justify-center">
                    <Image src={avatar || ""} alt="avatar" width={200} height={200} />
                </div>
            </Modal>
        </div>
    );
}