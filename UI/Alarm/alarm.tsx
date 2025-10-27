import classes from "./alarm.module.scss";

// icons
import { GoInfo } from "react-icons/go";
import { MdErrorOutline } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";

// interface
interface AlarmProps {
    subject?: string;
    type?: "info" | "error" | "warning" | "success";
    children?: React.ReactNode;
    ClassName?: string;
    IconsShow?: boolean;
}

export default function Alarm({ children, subject, type = "info", ClassName, IconsShow = true }: AlarmProps) {
    return (
        <div className={`${classes.containerAlarm} ${classes[type]} ${ClassName || ""}`}>
            <header className={classes.headerAlarm}>
                <span>
                    {IconsShow && type == "info" && <GoInfo />}
                    {IconsShow && type == "error" && <MdErrorOutline />}
                    {IconsShow && type == "warning" && <IoWarningOutline />}
                    {IconsShow && type == "success" && <FaRegCheckCircle />}
                </span>
                <h1>{subject}</h1>
            </header>
            <main className={classes.mainAlarm}>
                <p>{children}</p>
            </main>
        </div>
    )
}