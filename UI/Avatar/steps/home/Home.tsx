"use client"
import { useState } from "react";
import { useRef } from "react";
import { useAvatarContext } from "../../context/context";
import { useRouter } from "next/navigation";
import Btn from "@/UI/BTN/Btn"
import Content from "@/components/Dashbpoard Tools/ContentStyle/content";
// icons
import { MdEdit, MdUpload, MdDelete } from "react-icons/md";

// axios
import axios, { AxiosError } from "axios";
// cookies
import { getCookie } from "cookies-next";
// routes
import { CustomerRoutes, OwnerRoutes } from "@/config/routes";

import notification from "@/hooks/useNotifications";

export default function Home() {
    const router = useRouter();
    const { setStepName, setUploadImage, mainImage, role } = useAvatarContext();
    const ref = useRef<HTMLInputElement>(null);

    // make url delete image
    const urlDelete = role === "customer" ? CustomerRoutes.profile.avatar.delete : OwnerRoutes.profile.avatar.delete
    const urlBack = role === "customer" ? "/dashboard_customer/profile" : "/owner_dashboard/profile"
    const [load, setLoad] = useState(false);


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUploadImage(reader.result as string);
                setStepName("crop");
            };
            reader.readAsDataURL(file);
        } else {
            notification("Please select an image", "error");
        }
    }

    const EditAction = () => {
        setUploadImage(mainImage);
        setStepName("crop");
    }

    const DeleteAction = async () => {
        if (load) return;
        setLoad(true);
        console.log(role);
        try {
            const token = getCookie("token");
            const response = await axios.delete(urlDelete, {
                headers: {
                    token: `${token}`,
                },
            });
            const data = await response.data;
            notification(data.message, "success");
            router.push(urlBack);
        } catch (error) {
            if (error instanceof AxiosError) {
                notification(error.response?.data.message, "error");
            }
            console.log(error);
        } finally {
            setLoad(false);
        }
    }



    return (
        <Content>
            <h1 className="text-3xl font-extrabold text-center mb-4">Your Avatar</h1>
            <div className="flex flex-col items-center">
                <div className="flex justify-center mb-4 border border-dashed border-gray-400 p-4 rounded-md md:w-[400px] md:h-[400px] w-[200px] h-[200px]">
                    <img src={mainImage} className="md:w-[350px] md:h-[350px] w-[150px] h-[150px]" />
                </div>
            </div>
            <div className="flex justify-center gap-2 items-center flex-col md:flex-row">
                <Btn onClick={EditAction}>
                    <MdEdit />
                    <span>Edit</span>
                </Btn>
                <Btn BtnStatus="alarm" isLoading={load} onClick={DeleteAction}>
                    <MdDelete />
                    <span>Clear</span>
                </Btn>
                <Btn isLight onClick={() => ref.current?.click()}>
                    <MdUpload />
                    <span>Change</span>
                </Btn>
                <input ref={ref} onChange={handleImageChange} type="file" name="avatar" className="hidden" />
                <Btn BtnStatus="warning" onClick={() => router.back()}>
                    Cancel
                </Btn>
            </div>
        </Content>
    )
}