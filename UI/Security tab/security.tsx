"use client";
import { useState, useEffect } from "react";

import Modal from "../Modal/modal";
import Inp from "../input/Inp";
import Btn from "../BTN/Btn";
// icons
import { MdOutlineSecurity } from "react-icons/md";
// next
import Image from "next/image";
// redux
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";

// fetch
import { GetProfile } from "@/fetchData/fetch";
// axios
import axios, { AxiosError } from "axios";

// auth route
import { AuthRoutes } from "@/config/routes";


interface Props {
    children?: React.ReactNode,
    openState: {
        isOpen: boolean,
        setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    }
    ACTIONS: "fun" | "design",
    Fun?: () => void,
    role: "customer" | "owner",
    BtnFooter?: React.ReactNode,
    TitleAction?: string
}

export default function SecurityTab({ children, openState, BtnFooter, ACTIONS, Fun, role, TitleAction }: Props) {
    const url = AuthRoutes[role].login
    const { avatar } = useAppSelector(state => state.profile)
    const { email } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();

    // load Page
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // load btn
    const [isLoadBtn, setIsLoadBtn] = useState<boolean>(false);
    // set pass
    const [pass, setPass] = useState<string>("");
    // error state
    const [error, setError] = useState({
        error: false,
        message: ""
    });
    // success
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const getAll = async () => {
        try {
            setIsLoading(true);
            await GetProfile(role, dispatch);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }



    const handelForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLoadBtn) return;
        setIsLoadBtn(true);
        try {
            const response = await axios.post(url, { email, password: pass });
            await response.data;
            setIsSuccess(true);
            setError({ error: false, message: "" });
            await Promise.all(
                [
                    ACTIONS === "fun" && Fun && Fun()
                ]
            );
            ACTIONS === "fun" && openState.setIsOpen(false);
            ACTIONS === "fun" && setIsSuccess(false);
            setPass("");
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            console.log(err);
            setError({ error: true, message: err.response?.data.message || "Something went wrong" });
        } finally {
            setIsLoadBtn(false);

        }
    }


    useEffect(() => {
        getAll();
    }, [])

    return (
        <div>
            <Modal
                openState={{ isOpen: openState.isOpen, setIsOpen: openState.setIsOpen }}
                header={{ title: <p className="flex items-center gap-2"><MdOutlineSecurity /> Security</p>, isClose: false }}
                footer={{ isClose: false, btn: ACTIONS !== "fun" && isSuccess && BtnFooter && <>{BtnFooter}</> }}
            >
                <div>
                    {!isSuccess && <>
                        <div>
                            <h1 className="text-2xl mb-2 text-center text-slate-600">{TitleAction}</h1>
                        </div>
                        <div className="flex items-center justify-center gap-2 w-full">
                            {isLoading && <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>}
                            {!isLoading && <Image src={avatar || ""} alt="avatar" width={100} height={100} className="rounded-full" />}
                        </div>
                        <form onSubmit={handelForm} className="flex flex-col gap-1 w-full mt-2">
                            <Inp
                                type="password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                isRequired
                                name="password"
                                placeholder="password"
                                msg={error.error ? { case: "error", msg: error.message } : { case: "", msg: "" }}
                            />
                            <Btn className="w-full" isLoading={isLoadBtn}>Continue</Btn>
                        </form>
                    </>}
                    {
                        isSuccess && ACTIONS === "design" && <div>{children}</div>
                    }
                </div>
            </Modal>
        </div>
    )
}
