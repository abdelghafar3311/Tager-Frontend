"use client"
import { useEffect, useState } from "react";
import classes from "./modal.module.scss"

// test
import Btn from "../BTN/Btn"
import { IoMdAdd } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
// icons
import { IoClose } from "react-icons/io5";

interface ModalProps {
    openState: {
        isOpen: boolean,
        setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    }
    header: {
        title: string
        isClose?: boolean
    }
    footer?: {
        btn?: React.ReactNode
        isClose?: boolean,
    }
    size?: "sm" | "md" | "lg" | "full"
    children: React.ReactNode
}

export default function Modal({ openState, header, footer, size = "md", children }: ModalProps) {

    const [shouldRender, setShouldRender] = useState(openState.isOpen);

    useEffect(() => {
        if (openState.isOpen) {
            setShouldRender(true);
        } else {
            const timer = setTimeout(() => setShouldRender(false), 500); // نفس مدة الأنيميشن
            return () => clearTimeout(timer);
        }
    }, [openState.isOpen]);

    if (!shouldRender) {
        return null;
    }

    return (
        <div className={classes.container}>
            <div className={`${classes.BlackScreen} ${openState.isOpen ? classes.open : classes.close}`} onClick={() => openState.setIsOpen(false)}></div>
            <div className={`${classes.modal} ${openState.isOpen ? classes.open : classes.close} ${size == "full" && classes.full} ${size == "sm" && "w-[90%] md:w-[30%]"} ${size == "md" && "w-[90%] md:w-[50%]"} ${size == "lg" && "w-[90%] md:w-[70%]"}`}>
                <header className={classes.headerModal}>
                    <h1>{header.title}</h1>
                    {header.isClose && <button onClick={() => openState.setIsOpen(false)}><IoClose /></button>}
                </header>
                <main className={classes.mainModal}>
                    {children}
                </main>
                <footer className={classes.footerModal}>
                    {footer?.isClose || true && <button type="button" className={classes.close} onClick={() => openState.setIsOpen(false)}>close</button>}
                    {footer?.btn}
                </footer>
            </div>
        </div>
    )
}