"use client"

import { useRef } from "react";

import styles from "./Inp.module.scss"
import { InpEvents } from "@/interfaces/events"

// icons custom
import { IoWarningOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";

interface InpProps extends InpEvents<HTMLInputElement | HTMLTextAreaElement> {
    type?: string,
    placeholder?: string,
    className?: string,
    classContainer?: string,
    classMainContainer?: string,
    icon?: React.ReactNode,
    isRequired?: boolean,
    msg?: {
        case: string | "warning" | "error" | "",
        msg: string
    },
    name?: string,
    value?: string,
    min?: number,
    max?: number,
    isLabel?: boolean,
    label?: string,
    isArea?: boolean

}

export default function Inp({ type = "text", name, value, min, max, placeholder = "", classMainContainer = "", className = "", classContainer = "", msg, icon, isRequired = false, label, isLabel = false, isArea = false, ...props }: InpProps) {
    const refTextArea = useRef<HTMLTextAreaElement>(null);
    const ref = useRef<HTMLInputElement>(null);


    if (isArea) {
        return (
            <div className={`${classMainContainer}`}>
                {isLabel && <label className="text-[17px] text-slate-700" onClick={() => refTextArea.current?.focus()}>{label}{isRequired && "*"}</label>}
                <div className={`${styles.inp} ${classContainer}`}>
                    {icon ? <span>{icon}</span> : null}
                    <textarea ref={refTextArea} name={name} value={value} placeholder={placeholder} required={isRequired} className={className} {...props} />
                </div>
                <i className={`${styles.msg} ${msg?.case == "warning" ? styles.warning : styles.error}`}>
                    {msg?.case == "warning" && <IoWarningOutline />}
                    {msg?.case == "error" && <MdErrorOutline />}
                    <span>{msg?.msg}</span>
                </i>
            </div>
        )
    }

    return (
        <div className={`${classMainContainer}`}>
            {isLabel && <label className="text-[17px] text-slate-700" onClick={() => ref.current?.focus()}>{label}{isRequired && "*"} </label>}
            <div className={`${styles.inp} ${classContainer}`}>
                {icon ? <span>{icon}</span> : null}
                <input type={type} ref={ref} min={min} max={max} name={name} value={value} placeholder={placeholder} required={isRequired} className={className} {...props} />
            </div>
            <i className={`${styles.msg} ${msg?.case == "warning" ? styles.warning : styles.error}`}>
                {msg?.case == "warning" && <IoWarningOutline />}
                {msg?.case == "error" && <MdErrorOutline />}
                <span>{msg?.msg}</span>
            </i>
        </div>
    )
}