"use client"
import classes from "./StepOperation.module.scss"

// icons
import { FaCheck } from "react-icons/fa";

// context
import { usePayContext } from "../context/context"

export default function StepOperation() {
    const { stepName, progress } = usePayContext();
    return (
        <div className={classes.containerSteps}>
            <div className={classes.progress}>
                <div className={classes.bar} style={{ width: `${progress}%` }}></div>
            </div>
            <div className={classes.steps}>
                <span className={`${stepName === "home" ? classes.progress : classes.active}`}>{stepName !== "home" ? <FaCheck /> : 1}</span>
                <span className={`${stepName === "pay" ? classes.progress : stepName === "fin" ? classes.active : ""}`}>{stepName !== "pay" && stepName !== "home" ? <FaCheck /> : 2} </span>
                <span className={`${stepName === "fin" ? classes.progress : ""}`}>3</span>
            </div>
        </div>
    )
}