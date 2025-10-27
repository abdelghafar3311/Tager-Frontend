"use client"
import { PayProvider } from "./context/context"

// component
import StepOperation from "./steps/StepOperation"
import SoresSelect from "./steps/stores/stores"
import Pay from "./steps/pay/Pay"
import FinStepPay from "./steps/fin/Fin"
// context
import { usePayContext } from "./context/context"

export function Content() {
    const { stepName } = usePayContext();
    return (
        <div>
            <StepOperation />
            <div className="mt-4">
                {stepName === "home" && <SoresSelect />}
                {stepName === "pay" && <Pay />}
                {stepName === "fin" && <FinStepPay />}
            </div>
        </div>
    )
}


export default function PayContent() {
    return (
        <PayProvider>
            <Content />
        </PayProvider>
    )
}