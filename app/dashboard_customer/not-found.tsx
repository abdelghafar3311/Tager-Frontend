import Link from "next/link";
export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-9xl font-bold">404</h1>
            <p className="text-3xl">Page is not found, please back to <Link href="/dashboard_customer" className="text-[#097]">Home</Link></p>
        </div>
    )
}