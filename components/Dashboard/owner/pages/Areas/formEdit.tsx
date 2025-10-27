"use client"
import { useState, useEffect } from "react"
// next
import { useRouter } from "next/navigation"
// axios
import axios, { AxiosError } from "axios"
// components
import Content from "@/components/Dashbpoard Tools/ContentStyle/content"
import Inp from "@/UI/input/Inp"
import Btn from "@/UI/BTN/Btn";

// env
import { AreaRoutes } from "@/config/routes";
// hook
import notification from "@/hooks/useNotifications";
import { getCookie } from "cookies-next"

interface FormData {
    nameArea: string;
    address: string;
}

interface Error {
    nameArea?: string;
    address?: string;
}

interface Props {
    setClose: React.Dispatch<React.SetStateAction<boolean>>,
    id: string
}

export default function FormEditBuilder({ setClose, id }: Props) {
    const router = useRouter();
    const [form, setForm] = useState<FormData>({
        nameArea: "",
        address: "",
    });
    const [loadingPage, setLoadingPage] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error>({
        nameArea: "",
        address: "",
    });
    const pushData = (flied: string, value: string) => {
        setForm(prev => ({
            ...prev,
            [flied]: value
        }))
    }


    const getData = async () => {
        try {
            setLoadingPage(true)
            const response = await axios.get(AreaRoutes.getOne(id), {
                headers: {
                    token: `${getCookie("token")}`
                }
            });
            const data = await response.data;
            setForm({
                nameArea: data.nameArea,
                address: data.address
            });
            console.log("fetch-get: ", form);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            console.log(err);
        } finally {
            setLoadingPage(false)
        }
    }

    const handleChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return notification("Please wait, we are processing your request", "info");
        if (!form.nameArea || !form.address) {
            setError(prev => ({
                ...prev,
                nameArea: !form.nameArea ? "Name area is required" : "",
                address: !form.address ? "Address is required" : "",
            }))
            return;
        }
        setLoading(true)
        try {
            const response = await axios.put(AreaRoutes.update(id), {
                nameArea: form.nameArea,
                address: form.address
            }, {
                headers: {
                    token: `${getCookie("token")}`
                }
            });
            notification("Area added successfully", "success");
            router.refresh();
            setClose(false);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            notification(err.response?.data?.message || "Something went wrong", "error")
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        if (id) getData();
    }, [id])
    return (
        <Content isLoading={loadingPage}>
            <h1 className="text-3xl font-extrabold text-center">form edit area</h1>
            <form onSubmit={handleChange}>
                <Inp
                    name="nameArea"
                    value={form.nameArea}
                    placeholder="Name Area"
                    label="Name Area"
                    isLabel
                    isRequired
                    onChange={(e) => pushData(e.target.name, e.target.value)}
                    msg={error.nameArea ? { case: "error", msg: error.nameArea } : { case: "", msg: "" }}
                />
                <Inp
                    name="address"
                    value={form.address}
                    placeholder="address"
                    label="Address Area"
                    isLabel
                    isRequired
                    onChange={(e) => pushData(e.target.name, e.target.value)}
                    msg={error.address ? { case: "error", msg: error.address } : { case: "", msg: "" }}
                />
                <Btn type="submit" isLoading={loading} className="w-full mt-5">Update</Btn>
            </form>
        </Content>
    )
}