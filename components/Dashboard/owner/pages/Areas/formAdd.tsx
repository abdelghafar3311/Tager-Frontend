"use client"
import { useState } from "react"
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
    Address: string;
    RoomNumber: number;
}

interface Error {
    nameArea?: string;
    Address?: string;
    RoomNumber?: string;
}

interface Props {
    setClose: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FormAddBuilder({ setClose }: Props) {
    const [form, setForm] = useState<FormData>({
        nameArea: "",
        Address: "",
        RoomNumber: 1
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error>({
        nameArea: "",
        Address: "",
        RoomNumber: ""
    });
    const pushData = (flied: string, value: string) => {
        setForm(prev => ({
            ...prev,
            [flied]: value
        }))
    }

    const handleChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return notification("Please wait, we are processing your request", "info");
        if (!form.nameArea || !form.Address || !form.RoomNumber) {
            setError(prev => ({
                ...prev,
                nameArea: !form.nameArea ? "Name area is required" : "",
                Address: !form.Address ? "Address is required" : "",
                RoomNumber: !form.RoomNumber ? "Room number is required" : ""
            }))
            return;
        }
        if (form.RoomNumber < 1 || form.RoomNumber > 8) {
            setError(prev => ({
                ...prev,
                RoomNumber: "Room number must be greater than 0 and less than 8"
            }))
            return;
        }
        setLoading(true)
        try {
            const response = await axios.post(AreaRoutes.create, {
                nameArea: form.nameArea,
                address: form.Address,
                maxRooms: form.RoomNumber
            }, {
                headers: {
                    token: `${getCookie("token")}`
                }
            });
            notification("Area added successfully", "success");
            const data = (await response).data;
            setClose(false);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            notification(err.response?.data?.message || "Something went wrong", "error")
        } finally {
            setLoading(false)
        }
    };
    return (
        <Content>
            <h1 className="text-3xl font-extrabold text-center">form add area</h1>
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
                    name="Address"
                    value={form.Address}
                    placeholder="Address"
                    label="Address Area"
                    isLabel
                    isRequired
                    onChange={(e) => pushData(e.target.name, e.target.value)}
                    msg={error.Address ? { case: "error", msg: error.Address } : { case: "", msg: "" }}
                />
                <Inp
                    name="RoomNumber"
                    value={form.RoomNumber.toString()}
                    placeholder="Stores Number"
                    type="number"
                    label="Number of stores"
                    isLabel
                    isRequired
                    onChange={(e) => pushData(e.target.name, e.target.value)}
                    msg={error.RoomNumber ? { case: "error", msg: error.RoomNumber } : { case: "", msg: "" }}
                />
                <Btn type="submit" isLoading={loading} className="w-full mt-5">Save</Btn>
            </form>
        </Content>
    )
}