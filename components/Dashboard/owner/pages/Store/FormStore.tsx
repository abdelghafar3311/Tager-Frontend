"use client"
import { useState, useEffect } from "react";
// next
import { useRouter } from "next/navigation"
import Content from "@/components/Dashbpoard Tools/ContentStyle/content"
// axios
import axios, { AxiosError } from "axios"
// UI
import Inp from "@/UI/input/Inp"
import Btn from "@/UI/BTN/Btn"
// cookies
import { getCookie } from "cookies-next"
// routes
import { RoomRoutes, AreaRoutes } from "@/config/routes"
// notification
import notification from "@/hooks/useNotifications"
// redux
import { useAppDispatch } from "@/hooks/reduxHooks"
import { updateStoreCache } from "@/cache/updateCaching"


interface FormData {
    nameRoom: string,
    NumberRoom: number,
    length: number,
    width: number,
    description: string,
    price: number,
    Discount: number,
    Duration: "M" | "d" | "y",
    AreaId?: string
}

interface Props {
    workIt: "create" | "Edit",
    ID?: string
}

interface AreaFetch {
    _id: string,
    nameArea: string
}

export default function FormStore({ workIt, ID }: Props) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [areas, setAreas] = useState<AreaFetch[]>();
    const [form, setForm] = useState<FormData>({
        nameRoom: "",
        NumberRoom: 0,
        length: 0,
        width: 0,
        description: "",
        price: 0,
        Discount: 0,
        Duration: "M",
        AreaId: ""
    });
    // load Page
    const [loadingPage, setLoadingPage] = useState(true);
    const [loading, setLoading] = useState(false);


    const url = workIt === "create" ? RoomRoutes.create : RoomRoutes.update(ID || "");

    // fun get Areas
    const getAreas = async () => {
        if (workIt === "Edit") return;

        try {
            setLoadingPage(true)
            const response = await axios.get(AreaRoutes.getAll, {
                headers: {
                    token: `${getCookie("token")}`
                }
            });
            const data = await response.data;
            setAreas((prev) => {
                return data.map((item: AreaFetch) => {
                    return {
                        _id: item._id,
                        nameArea: item.nameArea
                    }
                })
            });
            console.log(data);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            console.log(err);
        } finally {
            setLoadingPage(false)
        }
    }
    // fun get data when Edit
    const getDataEdit = async () => {
        if (workIt === "create") return;

        try {
            setLoadingPage(true)
            const response = await axios.get(RoomRoutes.getOneFromOwner(ID || ""), {
                headers: {
                    token: `${getCookie("token")}`
                }
            });
            const data = await response.data;
            console.log(data);
            setForm({
                nameRoom: data.room.nameRoom,
                NumberRoom: data.room.NumberRoom,
                length: data.room.length,
                width: data.room.width,
                description: data.room.description,
                price: data.room.price || 0,
                Discount: data.room.Discount,
                Duration: data.room.Duration,
                AreaId: data.room.Area_Id.nameArea
            });
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            console.log(err);
        } finally {
            setLoadingPage(false)
        }
    }



    const pushState = (flied: string, value: string) => {
        setForm(prev => ({
            ...prev,
            [flied]: value
        }))
    }

    // handel submit Edit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return notification("Please wait, we are processing your request", "info");
        try {
            setLoading(true)
            const response = workIt === "Edit" ? await axios.put(url, {
                nameRoom: form.nameRoom,
                NumberRoom: +form.NumberRoom,
                length: +form.length,
                width: +form.width,
                description: form.description,
                price: +form.price,
                Discount: +form.Discount,
                Duration: form.Duration,
                status: true
            }, {
                headers: {
                    token: `${getCookie("token")}`
                }
            }) : await axios.post(url, {
                nameRoom: form.nameRoom,
                NumberRoom: +form.NumberRoom,
                length: +form.length,
                width: +form.width,
                description: form.description,
                price: +form.price,
                Discount: +form.Discount,
                Duration: form.Duration,
                Area_Id: form.AreaId,
                status: true
            }, {
                headers: {
                    token: `${getCookie("token")}`
                }
            })
            const data = await response.data;
            await updateStoreCache(dispatch);
            notification(data.message, "success");
            router.push(`/owner_dashboard/stores`);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            notification(err.response?.data.message || "Something went wrong", "error");
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAreas()
        getDataEdit();
    }, [])
    return (
        <form onSubmit={handleSubmit}>
            <Content isLoading={loadingPage} name={workIt === "create" ? "Create Store" : "Edit Store"}>
                <div>
                    <Inp type="text" isLabel value={form.nameRoom} label="Name Room" name="nameRoom" isRequired placeholder="Name Room" onChange={(e) => pushState(e.target.name, e.target.value)} />
                    <Inp type="number" isLabel value={form.NumberRoom.toString()} label="Number Room" isRequired name="NumberRoom" placeholder="Number Room" onChange={(e) => pushState(e.target.name, e.target.value)} />
                    <Inp type="number" isLabel value={form.length.toString()} label="Hight" name="length" isRequired placeholder="Length" onChange={(e) => pushState(e.target.name, e.target.value)} />
                    <Inp type="number" isLabel value={form.width.toString()} label="Width" name="width" isRequired placeholder="Width" onChange={(e) => pushState(e.target.name, e.target.value)} />
                    <Inp type="number" isLabel value={form.price.toString()} label="Price" name="price" isRequired placeholder="Price" onChange={(e) => pushState(e.target.name, e.target.value)} />
                    <Inp type="number" isLabel value={form.Discount.toString()} label="Discount (this new Price)" name="Discount" placeholder="Discount" onChange={(e) => pushState(e.target.name, e.target.value)} />
                    <div>
                        <label className="text-[17px] text-slate-700">Duration</label>
                        <select name="Duration" value={form.Duration} onChange={(e) => pushState(e.target.name, e.target.value)} className="w-full border border-slate-300 p-2 rounded-lg">
                            <option value="d">Day</option>
                            <option value="M">Month</option>
                            <option value="y">Year</option>
                        </select>
                    </div>
                    {workIt === "create" && <div>
                        <label className="text-[17px] text-slate-700">Area*</label>
                        <select name="AreaId" required value={form.AreaId} onChange={(e) => pushState(e.target.name, e.target.value)} className="w-full border border-slate-300 p-2 rounded-lg">
                            <option value="" disabled>select Area</option>
                            {areas && areas.map((area: { nameArea: string, _id: string }) => (
                                <option key={area._id} value={area._id}>{area.nameArea}</option>
                            ))}
                        </select>
                    </div>}
                    {workIt === "Edit" && <div>
                        <label className="text-[17px] text-slate-700">Area*</label>
                        <select name="AreaId" value={""} onChange={(e) => pushState(e.target.name, e.target.value)} className="w-full border border-slate-300 p-2 rounded-lg">
                            <option value="" disabled>{form.AreaId}</option>
                        </select>
                    </div>}
                    <Inp type="text" value={form.description} isArea isLabel label="Description" name="description" placeholder="Description" onChange={(e) => pushState(e.target.name, e.target.value)} />
                </div>
                <div className="mt-2">
                    <Btn type="submit" isLoading={loading} className="w-full">{workIt === "create" ? "Create" : "Update"}</Btn>
                </div>
            </Content>
        </form>
    )
}