"use client"

import { useState, useEffect } from "react";
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
import SecurityTab from "@/UI/Security tab/security";
import Inp from "@/UI/input/Inp";
import LoadingDashScreen from "@/components/loading-com/dash-load";

// components
import Status from "./status";
// fetch
import { GetProfile, GetCustomer, GetOwner, GetOwnerInfo } from "@/fetchData/fetch";
// hooks
import notification from "@/hooks/useNotifications";
// Customer and Owner routes
import { CustomerRoutes, OwnerRoutes } from "@/config/routes";
// cookies
import { getCookie, deleteCookie } from "cookies-next";
// axios
import axios, { AxiosError } from "axios";
import { IoMdRefresh } from "react-icons/io";

interface Props {
    role: "customer" | "owner"
}

export default function Profile({ role }: Props) {
    const url = role === "customer" ? CustomerRoutes.update : OwnerRoutes.update;
    const urlProfile = role === "customer" ? CustomerRoutes.profile : OwnerRoutes.profile;

    const dispatch = useAppDispatch();
    const { isProfile, status, avatar, name, phone, address, description } = useAppSelector((state) => state.profile);
    const { money, isDeleted } = useAppSelector((state) => state.ownerInfo);
    const { username, email, id } = useAppSelector((state) => state.auth);

    const [security, setSecurity] = useState(false);
    const [changePass, setChangePass] = useState({ newPass: "", confirmPass: "" });

    const [updateUsername, setUpdateUsername] = useState("");
    const [showUpdateUsername, setShowUpdateUsername] = useState(false);

    const [showDeleteAccount, setShowDeleteAccount] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [loading, setLoading] = useState(false);
    const [stopClick, setStopClick] = useState(false);

    const router = useRouter();

    // ✅ Fetch data safely once per role
    const GetDataProfile = async () => {
        try {
            setLoadingPage(true);
            const promises = [GetProfile(role, dispatch)];

            if (role === "customer") {
                promises.push(GetCustomer(dispatch));
            } else if (role === "owner") {
                promises.push(GetOwner(dispatch), GetOwnerInfo(dispatch));
            }

            await Promise.all(promises);
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingPage(false);
        }
    };

    useEffect(() => {
        GetDataProfile();
    }, [role]); // 👈 يمنع إعادة التنفيذ إلا عند تغيير الـ role

    // ✅ update password
    const updatePass = async () => {
        try {
            setLoading(true);
            await axios.put(
                url,
                { password: changePass.newPass },
                { headers: { token: `${getCookie("token")}` } }
            );
            notification("Password updated successfully", "success");
            setChangePass({ newPass: "", confirmPass: "" });
            setSecurity(false);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            notification(err.response?.data.message || "Something went wrong", "error");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ update username
    const updateUsernameHandler = async () => {
        if (!updateUsername.trim()) return notification("Please enter username", "warn");
        try {
            setLoading(true);
            await axios.put(
                url,
                { username: updateUsername },
                { headers: { token: `${getCookie("token")}` } }
            );
            await GetDataProfile();
            notification("Username updated successfully", "success");
            setShowUpdateUsername(false);
            setUpdateUsername("");
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            notification(err.response?.data.message || "Something went wrong", "error");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ delete account
    const ClearData = () => {
        deleteCookie("token");
        deleteCookie("role");
        router.push("/Auth/Login");
    };

    const deleteAccount = async () => {
        try {
            const res = await axios.delete(urlProfile.delete, {
                headers: { token: `${getCookie("token")}` },
            });
            const data = res.data;
            notification(data.message, "success");
            ClearData();
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            notification(err.response?.data.message || "Something went wrong", "error");
            console.log(error);
        }
    };

    // ✅ stop delete for owner
    const handelStopDelete = async () => {
        if (stopClick) return notification("Please wait, we are processing your request", "info");
        try {
            setStopClick(true);
            await axios.put(
                urlProfile.update,
                { isDeleted: false },
                { headers: { token: `${getCookie("token")}` } }
            );
            await GetDataProfile();
            notification("You stopped delete account successfully", "success");
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            console.log(err);
        } finally {
            setStopClick(false);
        }
    };

    if (!isProfile) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-9xl font-bold">404</h1>
                <p className="text-3xl text-center">
                    Page is not found, please back to{" "}
                    <Link href="/dashboard_customer" className="text-[#097]">
                        Home
                    </Link>
                </p>
            </div>
        );
    }

    if (loadingPage) {
        return (
            <div className="h-screen flex justify-center items-center">
                <LoadingDashScreen />
            </div>
        );
    }
    return (
        <div>

            <div className="mb-4 flex justify-between">
                <h1 className="text-3xl font-extrabold">My Profile</h1>
                <div className="flex items-center gap-2">
                    <button className="flex items-center justify-center gap-1 transition-all px-3 text-2xl py-3 rounded-full bg-white text-[12px] hover:shadow cursor-pointer relative" onClick={() => GetDataProfile()}><IoMdRefresh /></button>
                </div>
            </div>

            <Content>
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
            <Content>
                <div>
                    <div className={`${classes.con} flex flex-col md:flex-row md:justify-between md:items-center`}>
                        <h3 className={classes.title}>Full Name</h3>
                        <p className={classes.export}>{name}</p>
                    </div>
                    <div className={`${classes.con} flex flex-col md:flex-row md:justify-between md:items-center`}>
                        <h3 className={classes.title}>ID</h3>
                        <p className={classes.export}>{id}</p>
                    </div>
                    {role === "owner" && <div className={`${classes.con} flex flex-col md:flex-row md:justify-between md:items-center`}>
                        <h3 className={classes.title}>money</h3>
                        <p className={classes.export}>${money}</p>
                    </div>}
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
            <Content name="Controllers" caseName="sub">
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
                        <Btn BtnStatus="warning" className="w-[100px] md:w-[150px]" isLight onClick={() => setSecurity(true)}>Change</Btn>
                    </div>
                    <div className={`${classes.con} flex gap-1 justify-between items-center`}>
                        <h3 className={classes.title}>Change Username</h3>
                        <Btn BtnStatus="warning" className="w-[100px] md:w-[150px]" onClick={() => setShowUpdateUsername(true)}>Change</Btn>
                    </div>
                    <div className={`${classes.con} flex gap-1 justify-between items-center`}>
                        <h3 className={classes.title}>Delete Account</h3>
                        {role === "customer" && <Btn BtnStatus="alarm" isLight className="w-[100px] md:w-[150px]" onClick={() => setShowDeleteAccount(true)}>Delete</Btn>}
                        {role === "owner" && !isDeleted && <Btn BtnStatus="alarm" isLight className="w-[100px] md:w-[150px]" onClick={() => setShowDeleteAccount(true)}>Delete</Btn>}
                        {role === "owner" && isDeleted && <Btn className="w-[100px] md:w-[150px]" onClick={handelStopDelete} >Stop Delete</Btn>}
                    </div>
                </div>
            </Content>
            <SecurityTab TitleAction="Change Password" openState={{ isOpen: security, setIsOpen: setSecurity }} ACTIONS="design" role={role} BtnFooter={<Btn isDisabled={changePass.newPass !== changePass.confirmPass} onClick={() => updatePass()} isLoading={loading}>Save</Btn>}>
                <Inp type="password" placeholder="New Password" onChange={(e) => setChangePass({ ...changePass, newPass: e.target.value })} />
                <Inp type="password" placeholder="Confirm Password" onChange={(e) => setChangePass({ ...changePass, confirmPass: e.target.value })} />
            </SecurityTab>
            <SecurityTab TitleAction="Change Username" openState={{ isOpen: showUpdateUsername, setIsOpen: setShowUpdateUsername }} ACTIONS="design" role={role} BtnFooter={<Btn onClick={() => updateUsernameHandler()} isLoading={loading}>Save</Btn>}>
                <Inp type="text" placeholder="New Username" value={updateUsername} onChange={(e) => setUpdateUsername(e.target.value.replace(/\s+/g, '_'))} />
            </SecurityTab>

            <SecurityTab TitleAction="Delete Account" openState={{ isOpen: showDeleteAccount, setIsOpen: setShowDeleteAccount }} ACTIONS="fun" role={role} Fun={deleteAccount} />
        </div>
    )
}