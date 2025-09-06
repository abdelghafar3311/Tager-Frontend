import style from "./Btn.module.scss"
import { Events } from "@/interfaces/events";

export interface BtnProps extends Events {
    children: React.ReactNode;
    isLight?: boolean;
    isBlock?: boolean;
}

export default function Btn({ isLight = false, isBlock = false, children, ...props }: BtnProps) {
    return (
        <button className={`${style.btn} ${isLight ? style.light : ""} ${isBlock ? style.block : ""}`} {...props}>
            {children}
        </button>
    )
}