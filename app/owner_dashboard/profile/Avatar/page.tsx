"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AvatarUpload from "@/UI/Avatar/avatar";
import { OwnerRoutes } from "@/config/routes";
import { getCookie } from "cookies-next";

import axios from "axios";

export default function EditAvatarProfile() {
    const token = getCookie("token")
    const [image, setImage] = useState<string>("");
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const getProfile = async () => {
        try {
            setLoading(true);
            const response = await axios.get(OwnerRoutes.profile.get, {
                headers: {
                    token: `${token}`
                }
            });
            const data = await response.data;
            console.log("fetch: ", data)
            setImage(data.profile.Avatar);

        } catch (error) {
            router.push("/Auth/Login");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProfile();
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></span>
            </div>
        );
    }

    console.log("image profile: ", image)
    return (
        <div>
            <AvatarUpload
                urlRoute={OwnerRoutes.profile.avatar.upload}
                isToken={true}
                token={token}
                mainImage={image}
                role={"owner"}
            />
        </div>
    );
}