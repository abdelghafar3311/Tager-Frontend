"use client"

import Content from "@/components/Dashbpoard Tools/ContentStyle/content"
import Btn from "@/UI/BTN/Btn";

import Cropper from "react-easy-crop";
import { useState, useCallback } from "react";

import { useAvatarContext } from "../../context/context";

import { MdArrowBackIos } from "react-icons/md";

function getCroppedImg(imageSrc: string, croppedAreaPixels: any): Promise<string> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            if (!ctx) return reject("No 2d context");

            const size = Math.max(croppedAreaPixels.width, croppedAreaPixels.height);
            canvas.width = size;
            canvas.height = size;

            ctx.drawImage(
                image,
                croppedAreaPixels.x,
                croppedAreaPixels.y,
                croppedAreaPixels.width,
                croppedAreaPixels.height,
                0,
                0,
                size,
                size
            );

            resolve(canvas.toDataURL("image/jpeg"));
        };
        image.onerror = (err) => reject(err);
    });
}


export default function CropImage() {
    const { setStepName, UploadImage, setUploadImage } = useAvatarContext();
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);

    const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleCrop = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(UploadImage, croppedAreaPixels);
            setCroppedImage(croppedImage);
            setUploadImage(croppedImage);
            setStepName("upload");
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, UploadImage, setStepName, setUploadImage]);
    return (
        <Content>
            <div>
                <div className="flex justify-start">
                    <button onClick={() => setStepName("image")} className="flex items-center justify-center gap-1 transition-all px-3 py-1 rounded border border-gray-300 text-[12px] hover:bg-gray-100 cursor-pointer">
                        <span><MdArrowBackIos /></span>
                        <span>Back</span>
                    </button>
                </div>
                <h1 className="text-3xl font-extrabold text-center mb-4">Edit Avatar</h1>
                <div className="relative h-[300px] bg-black m-4">
                    <Cropper
                        image={UploadImage}
                        crop={crop}
                        zoom={zoom}
                        aspect={1 / 1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        cropShape="round"
                        style={{
                            containerStyle: {
                                width: '100%',
                                height: '100%',
                                backgroundColor: '#f3f4f6'
                            }
                        }}
                    />
                </div>
                <div className="flex justify-end">
                    <Btn isLight onClick={handleCrop}>
                        Continue
                    </Btn>
                </div>
            </div>
        </Content>
    )
}