import React, {useEffect} from 'react';
import {useAppDispatch} from "./configureStore";
import RecentStats from "@/components/stats/RecentStats";
import {loadStats} from "@/ducks/stats/actions";
import {HashRouter, Route, Routes} from "react-router";
import Alert from "react-bootstrap/Alert";
import AppLayout from "@/app/AppLayout";
import StatsGraph from "@/components/stats/StatsGraph";
import LogsContainer from "@/components/logs/LogsContainer";
import StatsContainer from "@/components/stats/StatsContainer";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadStats());
    }, []);

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<AppLayout/>}>
                    <Route index element={<StatsContainer />}/>
                    <Route path="/logs" element={<LogsContainer />}/>
                    <Route path="*" element={<Alert variant="danger" className="my-3">Path not found</Alert>}/>
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default App;
