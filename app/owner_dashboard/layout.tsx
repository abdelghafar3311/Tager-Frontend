import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import DashHeader from "@/Utils/headers/dash_header";
import Sidebar from "@/components/Dashbpoard Tools/Sidebar/sidebar";
import Screen from "@/components/Dashbpoard Tools/Screen/screen";
// icons
import { RiDashboardFill } from "react-icons/ri";
import { PiMapPinAreaBold } from "react-icons/pi";
import { GrStorage } from "react-icons/gr";
import { LiaStoreSolid } from "react-icons/lia";
import { TbReportSearch } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
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
    title: "Tager dashboard owner",
    description: "Tager dashboard owner",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const topLinks: Link[] = [
        {
            name: "Dashboard",
            link: "/owner_dashboard",
            icon: <RiDashboardFill />
        },
        {
            name: "Areas",
            link: "/owner_dashboard/areas",
            icon: <PiMapPinAreaBold />
        },
        {
            name: "Stores",
            link: "/owner_dashboard/stores",
            icon: <LiaStoreSolid />
        },
        {
            name: "Rentals Requests",
            link: "/owner_dashboard/rentals_requests",
            icon: <TbReportSearch />
        },
        {
            name: "My Rentals",
            link: "/owner_dashboard/rentals",
            icon: <GrStorage />
        },
    ]

    const bottomLinks: Link[] = [
        {
            name: "Translate Money",
            link: "/owner_dashboard/tran_money",
            icon: <HiArrowsRightLeft />
        },
        {
            name: "Profile",
            link: "/owner_dashboard/profile",
            icon: <CgProfile />
        }
    ]

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <DashHeader role="owner" />
                <div className="flex h-[calc(100vh-55px)]">
                    <Sidebar TopLinks={topLinks} BottomLinks={bottomLinks} />
                    <Screen>{children}</Screen>
                </div>
            </body>
        </html>
    );
}
