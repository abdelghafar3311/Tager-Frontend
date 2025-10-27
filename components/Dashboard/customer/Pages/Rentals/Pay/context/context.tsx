"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface PayContext {
    stepName: string;
    setStepName: React.Dispatch<React.SetStateAction<string>>;
    progress: number;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
    id: string;
    setId: React.Dispatch<React.SetStateAction<string>>;
    data: {
        nameRoom: string;
        price: number;
        Discount: number;
        relPrice: number;
        _id: string;
        Area_Id: {
            nameArea: string;
            address: string;
            maxRooms: number;
            _id: string;
            status: boolean;
            isDeleted: boolean;
        }
        NumberRoom: number;
        length: number;
        width: number;
        description: string;
        Duration: "M" | "d" | "y";
        RentalType: "null" | "rental" | "expire";
        status: boolean;
        isDeleted: boolean;
        ownerName: string;
        Owner_Id: string;
    }
    setData: React.Dispatch<React.SetStateAction<{
        nameRoom: string;
        price: number;
        Discount: number;
        relPrice: number;
        _id: string;
        Area_Id: {
            nameArea: string;
            address: string;
            maxRooms: number;
            _id: string;
            status: boolean;
            isDeleted: boolean;
        }
        NumberRoom: number;
        length: number;
        width: number;
        description: string;
        Duration: "M" | "d" | "y";
        RentalType: "null" | "rental" | "expire";
        status: boolean;
        isDeleted: boolean;
        ownerName: string;
        Owner_Id: string;
    }>>;
    Req: {
        Time: number,
        Date: "M" | "d" | "y" | "h" | "m",
        pay: number
    };
    setReq: React.Dispatch<React.SetStateAction<{
        Time: number,
        Date: "M" | "d" | "y" | "h" | "m",
        pay: number
    }>>
}

const PayContext = createContext<PayContext | null>(null);

export function usePayContext() {
    const context = useContext(PayContext);
    if (!context) {
        throw new Error("usePayContext must be used within a PayProvider");
    }
    return context;
}

export function PayProvider({ children }: { children: ReactNode }) {
    const [stepName, setStepName] = useState<string>("home");
    const [progress, setProgress] = useState<number>(0);
    const [id, setId] = useState<string>("");
    const [data, setData] = useState<{
        nameRoom: string;
        price: number;
        Discount: number;
        relPrice: number;
        _id: string;
        Area_Id: {
            nameArea: string;
            address: string;
            maxRooms: number;
            _id: string;
            status: boolean;
            isDeleted: boolean;
        }
        NumberRoom: number;
        length: number;
        width: number;
        description: string;
        Duration: "M" | "d" | "y";
        RentalType: "null" | "rental" | "expire";
        status: boolean;
        isDeleted: boolean;
        ownerName: string;
        Owner_Id: string;
    }>({
        nameRoom: "",
        price: 0,
        Discount: 0,
        relPrice: 0,
        _id: "",
        Area_Id: {
            nameArea: "",
            address: "",
            maxRooms: 0,
            _id: "",
            status: false,
            isDeleted: false,
        },
        NumberRoom: 0,
        length: 0,
        width: 0,
        description: "",
        Duration: "M",
        RentalType: "null",
        status: false,
        isDeleted: false,
        ownerName: "",
        Owner_Id: ""
    });
    const [Req, setReq] = useState<{
        Time: number,
        Date: "M" | "d" | "y" | "h" | "m",
        pay: number
    }>({
        Time: 0,
        Date: "M",
        pay: 0
    });
    return (
        <PayContext.Provider value={{ stepName, setStepName, progress, setProgress, id, setId, data, setData, Req, setReq }}>
            {children}
        </PayContext.Provider>
    );
}