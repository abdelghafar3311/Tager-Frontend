import FormLogin from "@/components/Login/form"
import Link from "next/link"
import Image from "next/image"
export default function Login() {
    return (
        <div className="flex items-center justify-center flex-col gap-2 min-h-[calc(100vh-55px)]">
            <div className="flex items-center gap-2 mb-3.5 flex-col lg:flex-row">
                <Image src="/tlogo.png" alt="logo" width={50} height={50} />
                <h1 className="text-3xl text-[#097]">Login</h1>
            </div>
            <FormLogin />
            <Link href="/" className="text-[#097] mt-8">
                Forget Password
            </Link>
        </div>
    )
}