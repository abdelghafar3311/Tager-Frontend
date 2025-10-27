"use client";
import { LineChart, Line, CartesianGrid, Tooltip, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import Content from '@/components/Dashbpoard Tools/ContentStyle/content';

const data = [
    { name: "Jan", Visited: 20 },
    { name: "Feb", Visited: 80 },
    { name: "Mar", Visited: 45 },
    { name: "Apr", Visited: 120 },
    { name: "May", Visited: 60 },
    { name: "Jun", Visited: 150 },
    { name: "Jul", Visited: 90 },
    { name: "Aug", Visited: 180 },
    { name: "Sep", Visited: 110 },
    { name: "Oct", Visited: 200 },
    { name: "Nov", Visited: 130 },
    { name: "Dec", Visited: 170 },
];



export default function UserVisited() {
    return (
        <Content ClassName='h-[400px]'>
            <ResponsiveContainer width="100%" height="100%">

                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey="name" />
                    <YAxis width="auto" />
                    <Line type="monotone" dataKey="Visited" stroke="#007bff" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </Content>
    )
}