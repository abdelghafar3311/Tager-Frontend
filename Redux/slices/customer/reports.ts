import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReportData {
  _id: string;
  report_for: "sells" | "buys";
  money_push: number;
  customer_id: string;
  product_id: string;
  createdAt: string;
}

interface ReportState {
  reports: ReportData[];
  isCachingUpdate: boolean;
}

const initialState: ReportState = {
  reports: [],
  isCachingUpdate: false,
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setReports: (state, action: PayloadAction<ReportData[]>) => {
      state.reports = action.payload;
    },
    setIsCachingUpdate: (state, action: PayloadAction<boolean>) => {
      state.isCachingUpdate = action.payload;
      return state;
    },
  },
});

export const { setReports, setIsCachingUpdate } = reportsSlice.actions;
export default reportsSlice.reducer;
