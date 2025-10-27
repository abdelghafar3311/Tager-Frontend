"use client"
// react
import { useState, useEffect } from "react";
// UI
import Content from "@/components/Dashbpoard Tools/ContentStyle/content";
import Table from "@/UI/Table/Table";
import Btn from "@/UI/BTN/Btn";
import Pagination from "@/UI/pagination/pagination";
import Modal from "@/UI/Modal/modal";
import LoadingDashScreen from "@/components/loading-com/dash-load";
// charts
import HighlightAndZoomLineChart from "./charts";
// icons
import { IoMdRefresh } from "react-icons/io";

// axios
import axios, { AxiosError } from "axios";
// cookies
import { getCookie } from "cookies-next";
// routes
import { ReportRoutes } from "@/config/routes";
// notification
import notification from "@/hooks/useNotifications";


export default function Reports() {

    // loading page
    const [loadingPage, setLoadingPage] = useState<boolean>(true);
    const [reports, setReports] = useState<any[]>([]);

    // modal
    const [showModal, setShowModal] = useState<boolean>(false);
    // load btn
    const [loading, setLoading] = useState<boolean>(false);

    // get reports
    const getReports = async (loader: boolean = false) => {
        try {
            loader && setLoadingPage(true);
            const res = await axios.get(ReportRoutes.getAll, {
                headers: {
                    token: `${getCookie("token")}`,
                },
            });
            const data = await res.data;
            setReports(data);
            console.log("reports: ", data)
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            console.log(err);
        } finally {
            setLoadingPage(false);
        }
    }

    // fun Delete Reports
    const deleteReport = async () => {
        try {
            setLoading(true);
            const res = await axios.delete(ReportRoutes.deleteAll, {
                headers: {
                    token: `${getCookie("token")}`,
                },
            });
            const data = await res.data;
            await getReports(false);
            notification(data.message, "success");
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            notification(err.response?.data.message || "Something went wrong", "error");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getReports();
    }, [])


    // loading
    if (loadingPage) {
        return (
            <div className="h-screen">
                <LoadingDashScreen />
            </div>
        );
    }

    return (
        <div>

            <Content ClassName={`${reports.length > 0 ? "h-[470px]" : "h-autoauto"}`}>
                <div className="mb-4 flex justify-between">
                    <h1 className="text-3xl font-extrabold">Reports</h1>
                    <div className="flex items-center gap-2">
                        <Btn onClick={() => setShowModal(true)} BtnStatus="alarm" isLight>Clear Reports</Btn>
                        <button onClick={() => getReports(true)} className="flex items-center justify-center gap-1 transition-all px-3 text-2xl py-3 rounded-full bg-white text-[12px] hover:shadow cursor-pointer relative"><IoMdRefresh /></button>
                    </div>
                </div>
                <HighlightAndZoomLineChart reports={reports} />
            </Content>
            <Pagination data={reports} itemsPerPage={20}>
                {reps => (
                    <Table>
                        <thead>
                            <tr>
                                <th>Report</th>
                                <th>pay</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reps.length > 0 && reps.map((rep) => (
                                <tr key={rep._id}>
                                    <td>{rep.report_for}</td>
                                    <td>{rep.money_push}</td>
                                </tr>
                            ))}
                            {reps.length <= 0 && <tr><td colSpan={2}>No Data</td></tr>}
                        </tbody>
                    </Table>
                )}
            </Pagination>

            <Modal
                openState={{
                    isOpen: showModal,
                    setIsOpen: setShowModal
                }}
                header={{
                    title: "Clear Reports",
                    isClose: true
                }}
                footer={{
                    btn: <Btn BtnStatus="alarm" onClick={deleteReport} isLoading={loading}>Clear</Btn>,
                    isClose: false
                }}
            >
                Do you sure want to <b>Clear All Reports</b> from your data?
            </Modal>
        </div>
    )
}