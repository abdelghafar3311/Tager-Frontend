"use client"

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Btn from "@/UI/BTN/Btn"
import Content from "@/components/Dashbpoard Tools/ContentStyle/content";
import ProgressLoad from "@/UI/progrtessLoad/progressLoad";
import { useAvatarContext } from "../../context/context";

import notification from "@/hooks/useNotifications";

import { MdArrowBackIos, MdUpload } from "react-icons/md";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

export default function Upload() {
    const { UploadImage, setStepName, urlUpload, hasToken, token, role } = useAvatarContext();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const urlBack = role === "customer" ? "/dashboard_customer/profile" : "/owner_dashboard/profile"
    const router = useRouter();
    const handleUpload = async () => {
        if (!UploadImage) {
            notification("No image selected", "warn");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();

            let imageFile: File | Blob | string = UploadImage;

            if (typeof UploadImage === "string" && UploadImage.startsWith("data:")) {
                const res = await fetch(UploadImage);
                const blob = await res.blob();
                imageFile = new File([blob], "avatar.png", { type: blob.type });
            }

            formData.append("image", imageFile as File);

            const response = await axios.put(urlUpload, formData, {
                headers: hasToken ? { token: `${token}` } : {},
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setProgress(percentCompleted);
                    }
                },
            });

            if (response.status === 200) {
                notification("Avatar uploaded successfully", "success");
                setIsUploading(true);
                router.push(urlBack);
            }
        } catch (error) {
            console.error(error);
            notification("Error uploading avatar", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Content>
            <div>
                <div className="flex justify-start">
                    <button onClick={() => setStepName("image")} className="flex items-center justify-center gap-1 transition-all px-3 py-1 rounded border border-gray-300 text-[12px] hover:bg-gray-100 cursor-pointer">
                        <span><MdArrowBackIos /></span>
                        <span>Back First Step</span>
                    </button>
                </div>
                <h1 className="text-3xl font-extrabold text-center mb-4">Upload Avatar</h1>
                <div className="flex flex-col items-center">
                    <div className="flex justify-center mb-4 border border-dashed border-gray-400 p-4 rounded-md md:w-[400px] md:h-[400px] w-[200px] h-[200px]">
                        <img src={UploadImage} className="md:w-[350px] md:h-[350px] w-[150px] h-[150px] rounded-full" />
                    </div>
                </div>
                <div className="flex flex-col justify-center gap-2 items-center">
                    {
                        !loading && !isUploading &&
                        <Btn onClick={handleUpload} className="w-full" isLight>
                            <MdUpload />
                            <span>Upload</span>
                        </Btn>
                    }
                    {
                        loading && !isUploading && <div className="w-full">
                            <p className="text-[12px] text-gray-500">Uploading ... {progress}%</p>
                            {progress >= 100 && <ProgressLoad color="#1a73e8" />}
                            {progress < 100 && <div className="w-full h-[4px] bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 transition-all"
                                    style={{ width: `${progress}%` }}
                                ></div>

                            </div>}
                        </div>
                    }
                    {
                        isUploading &&
                        <div className="flex items-center justify-center gap-2 text-green-500">
                            <span><IoCheckmarkCircleOutline /></span>
                            <span>Avatar uploaded successfully</span>
                        </div>
                    }
                </div>
            </div>
        </Content>
    )
}