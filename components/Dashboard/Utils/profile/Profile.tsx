"use client"
// next
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// redux
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
// scss
import classes from "./style.module.scss";
// UI
import Content from "@/components/Dashbpoard Tools/ContentStyle/content";
import Btn from "@/UI/BTN/Btn";
// components
import Status from "./status";
// fetch
import { GetProfile, GetCustomer, GetOwner } from "@/fetchData/fetch";
// hooks
import notification from "@/hooks/useNotifications";


interface Props {
    role: "customer" | "owner"
}

export default function Profile({ role }: Props) {
    const dispatch = useAppDispatch();
    const { isProfile, status, avatar, name, phone, address, description } = useAppSelector((state) => state.profile);
    const { username, email, id } = useAppSelector((state) => state.auth);
    const router = useRouter()
    GetProfile(role, dispatch);
    role === "customer" && GetCustomer(dispatch);
    role === "owner" && GetOwner(dispatch);
    console.log("role is: ", role)
    if (!isProfile) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-9xl font-bold">404</h1>
                <p className="text-3xl text-center">Page is not found, please back to <Link href="/dashboard_customer" className="text-[#097]">Home</Link></p>
            </div>
        )
    }

    return (
        <div>
            <Content name="Your Profile" isLoading={false}>
                <div className={`flex items-center flex-col md:flex-row gap-2 w-full`}>
                    <div className={`flex-1`}>
                        <Image src={avatar || ""} alt="avatar" width={100} height={100} className="rounded-full" />
                    </div>
                    <div className={`${classes.info} flex-9`}>
                        <p className={`${classes.username} flex items-center justify-between w-full gap-2`}>
                            <span>{username}</span>
                            <i className={`${classes.status} ${status ? classes.online : classes.offline}`}>{status ? "Online" : "Offline"}</i>
                        </p>
                        <p className={classes.email}>{email}</p>
                    </div>
                </div>
            </Content>
            <Content isLoading={false}>
                <div>
                    <div className={`${classes.con} flex flex-col md:flex-row md:justify-between md:items-center`}>
                        <h3 className={classes.title}>Full Name</h3>
                        <p className={classes.export}>{name}</p>
                    </div>
                    <div className={`${classes.con} flex flex-col md:flex-row md:justify-between md:items-center`}>
                        <h3 className={classes.title}>ID</h3>
                        <p className={classes.export}>{id}</p>
                    </div>
                    <div className={`${classes.con} flex flex-col md:flex-row md:justify-between md:items-center`}>
                        <h3 className={classes.title}>Phone</h3>
                        <p className={classes.export}>{phone}</p>
                    </div>
                    <div className={`${classes.con} flex flex-col md:flex-row md:justify-between md:items-center`}>
                        <h3 className={classes.title}>Address</h3>
                        <p className={classes.export}>{address}</p>
                    </div>
                    <Status role={role} />
                    <div className={`${classes.con} flex flex-col`}>
                        <h3 className={classes.title}>Description</h3>
                        <p className={classes.export}>{description}</p>
                    </div>
                </div>
            </Content>
            <Content name="Controllers" caseName="sub" isLoading={false}>
                <div className="flex flex-col gap-1.5">
                    <div className={`${classes.con} flex gap-1 justify-between items-center`}>
                        <h3 className={classes.title}>Edit Profile</h3>
                        <Btn className="w-[100px] md:w-[150px]" onClick={() => router.push(role === "customer" ? "/dashboard_customer/profile/update" : "/owner_dashboard/profile/update")}>Edit</Btn>
                    </div>
                    <div className={`${classes.con} flex gap-1 justify-between items-center`}>
                        <h3 className={classes.title}>Edit Avatar</h3>
                        <Btn className="w-[100px] md:w-[150px]" onClick={() => router.push(role === "customer" ? "/dashboard_customer/profile/Avatar" : "/owner_dashboard/profile/Avatar")}>Edit</Btn>
                    </div>
                    <div className={`${classes.con} flex gap-1 justify-between items-center`}>
                        <h3 className={classes.title}>Change Password</h3>
                        <Btn BtnStatus="warning" className="w-[100px] md:w-[150px]" isLight onClick={() => notification("هذة الامكانية ستكون في اخر المشروع تحديد بعد عمل security auth", "info")}>Change</Btn>
                    </div>
                    <div className={`${classes.con} flex gap-1 justify-between items-center`}>
                        <h3 className={classes.title}>Change Username</h3>
                        <Btn BtnStatus="warning" className="w-[100px] md:w-[150px]" onClick={() => notification("هذة الامكانية ستكون في اخر المشروع تحديد بعد عمل security auth", "info")}>Change</Btn>
                    </div>
                    <div className={`${classes.con} flex gap-1 justify-between items-center`}>
                        <h3 className={classes.title}>Delete Account</h3>
                        <Btn BtnStatus="alarm" isLight className="w-[100px] md:w-[150px]" onClick={() => notification("هذة الامكانية ستكون في اخر المشروع تحديد بعد عمل security auth", "info")}>Delete</Btn>
                    </div>
                </div>
            </Content>
        </div>
    )
}