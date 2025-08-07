import {Outlet} from "react-router";
import AppAlertList from "@/components/AppAlertList";
import AppNav from "@/app/AppNav";
import {ErrorBoundary} from "react-error-boundary";
import fallbackRender from "@/components/error-boundary/fallbackRender";

export default function AppLayout() {
    return (
        <ErrorBoundary fallbackRender={fallbackRender}>
            <AppAlertList/>
            <AppNav/>
            <Outlet/>
        </ErrorBoundary>
    )
}
