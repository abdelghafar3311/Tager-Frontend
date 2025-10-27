"use client"
import { useRef } from "react";
import { useAvatarContext } from "../../context/context";

import Btn from "@/UI/BTN/Btn"
import Content from "@/components/Dashbpoard Tools/ContentStyle/content";
// icons
import { MdEdit, MdUpload } from "react-icons/md";

import notification from "@/hooks/useNotifications";

export default function Home() {
    const { setStepName, setUploadImage, mainImage } = useAvatarContext();
    const ref = useRef<HTMLInputElement>(null);

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

    return (
        <Content>
            <h1 className="text-3xl font-extrabold text-center mb-4">Your Avatar</h1>
            <div className="flex flex-col items-center">
                <div className="flex justify-center mb-4 border border-dashed border-gray-400 p-4 rounded-md md:w-[400px] md:h-[400px] w-[200px] h-[200px]">
                    <img src={mainImage} className="md:w-[350px] md:h-[350px] w-[150px] h-[150px]" />
                </div>
            </div>
            <div className="flex justify-center gap-2 items-center">
                <Btn onClick={EditAction}>
                    <MdEdit />
                    <span>Edit</span>
                </Btn>
                <Btn isLight onClick={() => ref.current?.click()}>
                    <MdUpload />
                    <span>Change</span>
                </Btn>
                <input ref={ref} onChange={handleImageChange} type="file" name="avatar" className="hidden" />
                <Btn BtnStatus="warning">
                    Cancel
                </Btn>
            </div>
        </Content>
    )
}