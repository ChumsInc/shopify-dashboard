import {Button, Col, Row} from "react-bootstrap";
import {useAppDispatch} from "@/app/configureStore";
import {loadStats} from "@/ducks/stats/actions";
import PeriodSelect from "@/components/stats/PeriodSelect";
import ActionSelect from "@/components/stats/ActionSelect";
import {ErrorBoundary} from "react-error-boundary";
import fallbackRender from "@/components/error-boundary/fallbackRender";

export default function StatsControlBar() {
    const dispatch = useAppDispatch();

    const reloadHandler = () => {
        dispatch(loadStats());
    }

    return (
        <ErrorBoundary fallbackRender={fallbackRender} >
            <Row>
                <Col xs="auto">
                    <PeriodSelect />
                </Col>
                <Col xs="auto">
                    <ActionSelect />
                </Col>
                <Col xs="auto">
                    <Button type="button" variant="primary" size="sm" onClick={reloadHandler}>Reload</Button>
                </Col>
            </Row>
        </ErrorBoundary>
    )
}
