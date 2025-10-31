"use client";

import Alarm from "@/UI/Alarm/alarm";
import { useCallback, useState, useMemo } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceArea,
    ResponsiveContainer,

} from "recharts";

interface ReportData {
    _id: string;
    report_for: "sells" | "buys";
    money_push: number;
    customer_id: string;
    product_id: string;
    createdAt: string;
}


const initialState = {
    left: "dataMin",
    right: "dataMax",
    refAreaLeft: undefined as number | undefined,
    refAreaRight: undefined as number | undefined,
    animation: true,
};

const HighlightAndZoomLineChart = ({ reports }: { reports: ReportData[] }) => {
    const [zoomGraph, setZoomGraph] = useState(initialState);

    const chartData = useMemo(() => {
        if (!reports || reports.length === 0) return [];

        const grouped: Record<string, { name: string; buys: number; sells: number }> = {};

        reports.forEach((report) => {
            const date = new Date(report.createdAt);
            const name = `${date.getDate()}/${date.getMonth() + 1}`;

            if (!grouped[name]) grouped[name] = { name, buys: 0, sells: 0 };

            const type = (report.report_for || "").trim().toLowerCase();
            const money = Number(report.money_push || 0);

            if (type === "buys") grouped[name].buys += money;
            else if (type === "sells") grouped[name].sells += money;
        });

        return Object.values(grouped);
    }, [reports]);

    const zoom = useCallback(() => {
        // @ts-expect-error
        setZoomGraph((prev) => {
            let { refAreaLeft, refAreaRight } = prev;
            if (!refAreaLeft || !refAreaRight || refAreaLeft === refAreaRight)
                return { ...prev, refAreaLeft: undefined, refAreaRight: undefined };
            if (refAreaLeft > refAreaRight)
                [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];
            return {
                ...prev,
                refAreaLeft: undefined,
                refAreaRight: undefined,
                left: refAreaLeft,
                right: refAreaRight,
            };
        });
    }, []);
    // @ts-expect-error
    const onMouseDown = useCallback((e) => {
        if (e?.activeLabel)
            setZoomGraph((prev) => ({ ...prev, refAreaLeft: e.activeLabel }));
    }, []);

    const onMouseMove = useCallback(
        // @ts-expect-error
        (e) => {
            if (e?.activeLabel && zoomGraph.refAreaLeft)
                setZoomGraph((prev) => ({ ...prev, refAreaRight: e.activeLabel }));
        },
        [zoomGraph.refAreaLeft]
    );

    const { refAreaLeft, refAreaRight, left, right } = zoomGraph;

    return (
        <div style={{ width: "100%", height: reports.length > 0 ? "400px" : "auto" }}>
            {reports.length <= 0 && <Alarm type="warning" subject=""><center>Not Found Any Reports</center> </Alarm>}
            {reports.length > 0 && <ResponsiveContainer>
                <AreaChart
                    data={chartData}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={zoom}
                    margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        allowDataOverflow
                        dataKey="name"
                        domain={[left, right]}
                        type="category"
                        tick={{ fill: "#666" }}
                    />
                    <YAxis tick={{ fill: "#666" }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                        }}
                    />

                    <Area
                        type="monotone"
                        dataKey="buys"
                        stroke="#ff4d4f"
                        fill="rgba(255,77,79,0.3)"
                        strokeWidth={2}
                        dot={{ r: 3, fill: "#ff4d4f" }}
                    />
                    <Area
                        type="monotone"
                        dataKey="sells"
                        stroke="#00b96b"
                        fill="rgba(0,185,107,0.3)"
                        strokeWidth={2}
                        dot={{ r: 3, fill: "#00b96b" }}
                    />

                    {refAreaLeft && refAreaRight ? (
                        <ReferenceArea
                            x1={refAreaLeft}
                            x2={refAreaRight}
                            strokeOpacity={0.3}
                            fill="#ffd6d6"
                        />
                    ) : null}
                </AreaChart>
            </ResponsiveContainer>}

        </div>
    );
};

export default HighlightAndZoomLineChart;

