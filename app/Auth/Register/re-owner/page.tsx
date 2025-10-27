import FormRegister from "@/components/Register/form"
import Image from "next/image"
export default function RegisterOwner() {
    return (
        <div className="flex items-center pt-10 flex-col gap-2 min-h-[100vh]">
            <div className="flex items-center gap-2 mb-3.5 flex-col lg:flex-row">
                <Image src="/tlogo.png" alt="logo" width={50} height={50} />
                <h1 className="text-3xl text-[#097]">Create Account As Owner</h1>
            </div>
            <FormRegister formFor="owner" />
        </div>
    )
}