"use client"

import { CartesianGrid, Line, LineChart, ResponsiveContainer } from 'recharts';
import Card from "@/UI/Card/Card";
const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

export default function MoneyAnalysis() {
    return (
        <Card title="Money Analysis" ClassName="w-full h-[300px] max-w-md mx-auto bg-white shadow-md rounded-xl p-4">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <Line type="monotone" dataKey="pv" stroke="#0097ff" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    )
}