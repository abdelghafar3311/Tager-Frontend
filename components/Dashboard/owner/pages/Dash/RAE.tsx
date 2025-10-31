"use client";
import { LineChart, Line, CartesianGrid, Tooltip, Legend, ResponsiveContainer, XAxis } from 'recharts';
import Content from '@/components/Dashbpoard Tools/ContentStyle/content';

const data = [
    { name: "Jan", Stores: 180, Customers: 100, Rentals: 150, RequestsRental: 55 },
    { name: "Feb", Stores: 140, Customers: 422, Rentals: 200, RequestsRental: 25 },
    { name: "Mar", Stores: 200, Customers: 360, Rentals: 90, RequestsRental: 70 },
    { name: "Apr", Stores: 100, Customers: 200, Rentals: 180, RequestsRental: 35 },
    { name: "May", Stores: 230, Customers: 254, Rentals: 130, RequestsRental: 85 },
    { name: "Jun", Stores: 150, Customers: 120, Rentals: 210, RequestsRental: 45 },
    { name: "Jul", Stores: 260, Customers: 300, Rentals: 160, RequestsRental: 95 },
    { name: "Aug", Stores: 130, Customers: 500, Rentals: 230, RequestsRental: 40 },
    { name: "Sep", Stores: 210, Customers: 362, Rentals: 120, RequestsRental: 75 },
    { name: "Oct", Stores: 170, Customers: 165, Rentals: 190, RequestsRental: 50 },
    { name: "Nov", Stores: 250, Customers: 4, Rentals: 140, RequestsRental: 85 },
    { name: "Dec", Stores: 190, Customers: 12, Rentals: 200, RequestsRental: 60 },
];



// @ts-expect-error
const CustomizedLabel = ({ x, y, stroke, value }) => {
    return (
        <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
            {value}
        </text>
    );
};
// @ts-expect-error
const CustomizedAxisTick = ({ x, y, stroke, payload }) => {
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
                {payload.value}
            </text>
        </g>
    );
};

export default function RAE() {
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
                    <Line type="monotone" dataKey="Stores" stroke="#007bff" strokeWidth={2} />
                    <Line type="monotone" dataKey="Customers" stroke="#28a745" strokeWidth={2} />
                    <Line type="monotone" dataKey="Rentals" stroke="#ffc107" strokeWidth={2} />
                    <Line type="monotone" dataKey="RequestsRental" stroke="#dc3545" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </Content>
    )
}