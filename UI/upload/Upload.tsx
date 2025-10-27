"use client";

import { useRef, useState } from "react";

import classes from "./upload.module.scss";
// UI
import Btn from "../BTN/Btn";
import Msg from "../message/Msg";
// Icons
import { IoAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

interface Props {
    TypeUpload: "single" | "multiple";
}

export default function Upload({ TypeUpload }: Props) {
    const ref = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string[]>([]);
    const [single, setSingle] = useState<string>("");
    const handlePreview = () => {
        const file = ref.current?.files?.[0];
        if (!file) return alert("No file selected");
        const fileURL = URL.createObjectURL(file);
        TypeUpload === "single" && setSingle(fileURL);
        TypeUpload === "multiple" && setPreview(e => [...e, fileURL]);
    };

    return (
        <div>
            <div className="flex items-center justify-between my-2 border-b border-[#e5e5e5] p-2">
                <h1 className="text-2xl font-bold">Upload {TypeUpload === "single" ? "One Image" : "Images"}</h1>
                <input ref={ref} onChange={handlePreview} type="file" className="hidden" />
                <Msg msg="Add image" dir="b" effect="trans">
                    <Btn isLight type="button" onClick={() => ref.current?.click()}>
                        <IoAdd />
                    </Btn>
                </Msg>
            </div>
            {TypeUpload === "multiple" && preview.map((item, i) => (
                <div key={i}>
                    <div className="flex items-center justify-between">
                        <img src={item} alt="" width={40} height={40} className="rounded-full" />
                        <Btn isLight type="button" BtnStatus="alarm" className="rounded-full" onClick={() => setPreview(e => e.filter((_, index) => index !== i))}>
                            <MdDelete />
                        </Btn>
                    </div>
                    <div className={classes.progress}>
                        <div className={`${classes.bar} w-[100%]`}></div>
                    </div>
                </div>
            ))}
            {TypeUpload === "single" && single && (
                <div>
                    <div className="flex items-center justify-between">
                        <img src={single} alt="" width={40} height={40} className="rounded-full" />
                        <Btn isLight type="button" BtnStatus="alarm" className="rounded-full" onClick={() => setSingle("")}>
                            <MdDelete />
                        </Btn>
                    </div>
                    <div className={classes.progress}>
                        <div className={`${classes.bar} w-[100%]`}></div>
                    </div>
                </div>
            )}
        </div>
    )
}