"use client";
import { useState, useEffect } from "react";
import Card from "@/UI/Card/Card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";


const COLORS = ["#0088FE", "#FF8042", "#FFBB28"];
const RADIAN = Math.PI / 180;


const RenderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
}: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            fontSize={12}
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

interface StoresValues {
    _id: string;
    nameRoom: string;
    NumberRoom: number;
    length: number;
    width: number;
    description: string;
    price: number;
    Discount: number;
    Duration: "M" | "d" | "y";
    RentalType: "null" | "rental" | "expire";
    status: boolean;
    isDeleted: boolean;
    Area_Id: {
        nameArea: string;
        address: string;
        maxRooms: number;
        _id: string;
        status: boolean;
        isDeleted: boolean;
    };
}

export default function StoreAnalysis({ stores }: { stores: StoresValues[] }) {
    // active, expired, notRental
    const [active, setActive] = useState(0);
    const [expired, setExpired] = useState(0);
    const [notRental, setNotRental] = useState(0);

    useEffect(() => {
        console.log(stores, "length: ", stores.length)
        if (!stores || stores.length === 0) {
            setActive(0);
            setExpired(0);
            setNotRental(0);
            return;
        }

        let activeCount = 0;
        let expiredCount = 0;
        let notRentalCount = 0;

        for (const item of stores) {
            if (item.RentalType === "rental") {
                activeCount++;
            } else if (item.RentalType === "expire") {
                expiredCount++;
            } else if (item.RentalType === "null") {
                notRentalCount++;
            }
        }

        setActive(activeCount);
        setExpired(expiredCount);
        setNotRental(notRentalCount);
    }, [stores]);


    const data = [
        { name: "Store Active", value: active },
        { name: "Store Expired", value: expired },
        { name: "Store Not Rental", value: notRental },
    ];

    return (
        <Card
            title="Analysis Stores"
            ClassName="w-full h-[300px] max-w-md mx-auto bg-white shadow-md rounded-xl p-4" // 🔥 ارتفاع فعلي مضمون
        >
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={RenderCustomizedLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${entry.name}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            padding: "6px 10px",
                            fontSize: "14px",
                            color: "#333",
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </Card>
    );
}
