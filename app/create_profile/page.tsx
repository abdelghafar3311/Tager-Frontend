"use client"

import { useState, useEffect } from "react";

import FormProfile from "@/components/Dashboard/Utils/profile/formProfile";
import { getCookie } from "cookies-next";
import NotFound from "../not-found";
import LoadingDashScreen from "@/components/loading-com/dash-load";

// profile redux
import { useAppSelector } from "@/hooks/reduxHooks";

export default function CreateProfilePageMain() {

    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const { isProfile } = useAppSelector((state) => state.profile);
    useEffect(() => {
        const fetchRole = async () => {
            const type = await getCookie("role");
            setRole(typeof type === "string" ? type : null);
            setLoading(false);
        };
        fetchRole();

    }, []);

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <LoadingDashScreen />
            </div>
        )
    }

    if (!role) {
        return <NotFound />;
    }

    if (isProfile) {
        return <NotFound />;
    }

    return (
        <div className="p-6">
            <FormProfile role={role as "customer" | "owner"} />
        </div>

    );
}