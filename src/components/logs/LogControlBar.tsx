import {useCallback} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import LogActionSelect from "@/components/logs/LogActionSelect";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import LogMinDateInput from "@/components/logs/LogMinDateInput";
import LogMaxDateInput from "@/components/logs/LogMaxDateInput";
import {loadLogs} from "@/ducks/log/actions";
import LoadMoreButton from "@/components/logs/LoadMoreButton";
import {selectLoadProps} from "@/ducks/log";

export default function LogControlBar() {
    const dispatch = useAppDispatch();
    const loadProps = useAppSelector(selectLoadProps);

    const loadHandler = useCallback(() => {
        dispatch(loadLogs(loadProps));
    }, [loadProps, dispatch])

    return (
        <Row>
            <Col xs="auto">
                <LogActionSelect/>
            </Col>
            <Col xs="auto">
                <LogMinDateInput/>
            </Col>
            <Col xs="auto">
                <LogMaxDateInput/>
            </Col>
            <Col xs="auto">
                <Button type="button" variant="primary" size="sm" onClick={loadHandler}>Load</Button>
            </Col>
            <Col xs="auto">
                <LoadMoreButton/>
            </Col>
        </Row>
    )
}
