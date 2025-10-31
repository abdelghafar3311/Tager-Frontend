"use client";

import Card from "@/UI/Card/Card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";


const COLORS = ["#ff4d4f", "#00b96b"];
const RADIAN = Math.PI / 180;


const RenderCustomizedLabel = ({
    // @ts-expect-error
    cx,
    // @ts-expect-error
    cy,
    // @ts-expect-error
    midAngle,
    // @ts-expect-error
    innerRadius,
    // @ts-expect-error
    outerRadius,
    // @ts-expect-error
    percent,
}) => {
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


export default function ReportCircleCharts({ buys, money }: { buys: number, money: number }) {

    const data = [
        { name: "Buys", value: buys },
        { name: "money", value: money },
    ];

    return (
        <Card
            ClassName="w-full h-[300px] max-w-md mx-auto bg-white shadow-md rounded-xl p-4" // 🔥 ارتفاع فعلي مضمون
        >
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        // @ts-expect-error
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
