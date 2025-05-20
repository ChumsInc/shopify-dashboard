import React, {useCallback} from 'react';
import {useAppSelector} from "@/app/configureStore";
import {selectPeriod, selectStats} from "@/ducks/stats";
import {ErrorBoundary} from "react-error-boundary";
import ErrorBoundaryFallbackAlert from "@/components/ErrorBoundaryFallbackAlert";
import {BarChart} from "@mui/x-charts/BarChart";
import {createTheme, ThemeProvider} from "@mui/material";
import {BarItemIdentifier} from "@mui/x-charts";
import {ActionStats} from "@/types/stats";

const theme = createTheme({
    colorSchemes: {
        dark: true
    },
    components: {
    }
})

const getPeriodName = (period: string): string => {
    switch (period) {
        case "hourly":
            return "Hourly Updates";
        case "daily":
            return "Days";
        case "weekly":
            return "Weeks";
        case "monthly":
            return "Months";
        default:
            return "Unknown";
    }
}

export interface StatsGraphProps {
    onClick: (item: ActionStats) => void,
}

export default function StatsGraph({onClick}: StatsGraphProps) {
    const stats = useAppSelector(selectStats);
    const period = useAppSelector(selectPeriod);

    const clickHandler = useCallback((ev: unknown, id: BarItemIdentifier) => {
        const item = stats[id.dataIndex];
        if (item) {
            onClick(item);
        }
    }, [stats])

    return (
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallbackAlert}>
            <ThemeProvider theme={theme}>
                <BarChart xAxis={[{
                    id: 'barCategories',
                    data: [...stats.map((s) => s.actionPeriod)]
                }]}
                          colors={["red"]}
                          series={[{
                              data: stats.map((s) => +s.errorCount),
                              label: `Errors for the last ${stats.length} ${getPeriodName(period)}`,
                          }]}
                          height={300}
                          borderRadius={3}
                          onItemClick={clickHandler}
                />
            </ThemeProvider>
        </ErrorBoundary>
    )
}
