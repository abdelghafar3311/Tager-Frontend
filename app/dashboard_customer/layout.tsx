import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import DashHeader from "@/Utils/headers/dash_header";
import Sidebar from "@/components/Dashbpoard Tools/Sidebar/sidebar";
import Screen from "@/components/Dashbpoard Tools/Screen/screen";
// icons
import { RiDashboardFill } from "react-icons/ri";
import { AiOutlineProduct } from "react-icons/ai";
import { GrStorage } from "react-icons/gr";
import { TbReportSearch } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { HiArrowsRightLeft } from "react-icons/hi2";

interface Link {
    name: string,
    link: string,
    icon: React.ReactNode
}
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Tager dashboard customer",
    description: "Tager dashboard customer",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const topLinks: Link[] = [
        {
            name: "Dashboard",
            link: "/dashboard_customer",
            icon: <RiDashboardFill />
        },
        {
            name: "My Rentals",
            link: "/dashboard_customer/rentals",
            icon: <GrStorage />
        },
        {
            name: "Product",
            link: "/dashboard_customer/product",
            icon: <AiOutlineProduct />
        },
        {
            name: "Reports",
            link: "/dashboard_customer/reports",
            icon: <TbReportSearch />
        },
        {
            name: "Translate Money",
            link: "/dashboard_customer/tran_money",
            icon: <HiArrowsRightLeft />
        },
    ]

    const bottomLinks: Link[] = [
        {
            name: "Money",
            link: "/dashboard_customer/money",
            icon: <FaMoneyCheckAlt />
        },
        {
            name: "Profile",
            link: "/dashboard_customer/profile",
            icon: <CgProfile />
        }
    ]

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <DashHeader role="customer" />
                <div className="flex bg-amber-200 h-[calc(100vh-55px)]">
                    <Sidebar TopLinks={topLinks} BottomLinks={bottomLinks} />
                    <Screen>{children}</Screen>
                </div>
            </body>
        </html>
    );
}
