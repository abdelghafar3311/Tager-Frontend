import style from "./Btn.module.scss"
import { Events } from "@/interfaces/events";

export interface BtnProps extends Events {
    children: React.ReactNode;
    isLight?: boolean;
    className?: string;
    isLoading?: boolean;
    isDisabled?: boolean;
    BtnStatus?: "alarm" | "warning" | "usually";
    type?: "button" | "submit" | "reset";
    SmLoad?: boolean
}

export default function Btn({ isLight = false, className, children, isDisabled = false, isLoading = false, BtnStatus = "usually", type = "submit", SmLoad = false, ...props }: BtnProps) {

    if (isDisabled) {
        return (
            <button type="button" className={`${style.btnDisabled} ${style[BtnStatus]} ${isLight ? style.light : ""} ${className || ""}`}>
                {children}
            </button>
        )
    }

    if (isLoading) {
        return (
            <button type="button" className={`${style.btnLoader} ${style[BtnStatus]} ${isLight ? style.light : ""} ${className || ""}`}>
                <span className={style.loader}></span>
                <span className={style.text}>Waiting ...</span>
            </button>
        )
    }

    if (SmLoad) {
        return (
            <button type="button" className={`${style.btnLoader} ${style[BtnStatus]} ${isLight ? style.light : ""} ${className || ""}`}>
                <span className={style.loader}></span>
            </button>
        )
    }

    return (
        <button type={type} className={`${style.btn} ${style[BtnStatus]} ${isLight ? style.light : ""} ${className || ""}`} {...props}>
            {children}
        </button>
    )
}