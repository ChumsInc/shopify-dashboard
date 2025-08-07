import {Col, ProgressBar, Row} from "react-bootstrap";
import StatsGraph from "@/components/stats/StatsGraph";
import StatsControlBar from "@/components/stats/StatsControlBar";
import StatsList from "@/components/stats/StatsList";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import type {LoadUpdatesLogProps} from "@/types/logs";
import dayjs from "dayjs";
import {loadLogs} from "@/ducks/log/actions";
import type {ActionStats} from "@/types/stats";
import {useNavigate} from "react-router";
import {selectStatus} from "@/ducks/stats";
import {selectLoadProps} from "@/ducks/log";

export default function StatsContainer() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const status = useAppSelector(selectStatus);
    const loadProps = useAppSelector(selectLoadProps);

    const clickHandler = (item: ActionStats) => {
        const arg: LoadUpdatesLogProps = {
            ...loadProps,
            minDate: dayjs(item.minTimestamp).format("YYYY-MM-DD"),
            maxDate: dayjs(item.maxTimestamp).format("YYYY-MM-DD"),
            start: 0
        }
        dispatch(loadLogs(arg));
        navigate("/logs");
    }

    return (
        <div>
            <h2>Stats</h2>
            <StatsControlBar/>
            {status !== 'idle' && (
                <ProgressBar animated now={100} label={`${status}...`} className="my-1" />
            )}

            <Row className="g-3">
                <Col sm={6}>
                    <StatsGraph onClick={clickHandler}/>
                </Col>
                <Col sm={6}>
                    <StatsList onClick={clickHandler}/>
                </Col>
            </Row>
        </div>
    )
}
