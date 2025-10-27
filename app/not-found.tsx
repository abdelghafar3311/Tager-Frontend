import Image from "next/image";
import Link from "next/link";
export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Image src="/tlogo.png" alt="" width={100} height={100} className="absolute top-[20px] left-[20px]" />
            <h1 className="text-9xl font-bold">404</h1>
            <p className="text-3xl text-center">Page is not found, please back to <Link href="/" className="text-[#097]">Home</Link></p>
        </div>
    )
}