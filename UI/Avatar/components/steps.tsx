
"use client";
import { useState } from "react";
// icons
import { CiImageOn } from "react-icons/ci";
import { GrCut } from "react-icons/gr";
import { MdOutlineCloudUpload } from "react-icons/md";


export default function Steps({ steps = "image" }: { steps: string }) {
    return (
        <div className="flex justify-center items-center gap-4 m-4">
            <div className={`flex items-center gap-2 ${steps == "image" ? "bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-600 text-white" : "bg-gray-200 text-gray-700"} px-3 py-1 rounded-2xl transition-all`}>
                <span><CiImageOn /></span>
                <span>Image</span>
            </div>
            <div className={`flex items-center gap-2 ${steps == "crop" ? "bg-gradient-to-r from-orange-400 via-pink-500 to-red-600 text-white" : "bg-gray-200 text-gray-700"} px-3 py-1 rounded-2xl transition-all`}>
                <span><GrCut /></span>
                <span>Crop Image</span>
            </div>
            <div className={`flex items-center gap-2 ${steps == "upload" ? "bg-gradient-to-r from-green-500 to-cyan-500 text-white" : "bg-gray-200 text-gray-700"} px-3 py-1 rounded-2xl transition-all`}>
                <span><MdOutlineCloudUpload /></span>
                <span>Upload</span>
            </div>
        </div>
    )
}