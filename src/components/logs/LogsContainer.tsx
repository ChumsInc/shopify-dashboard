import {useState} from 'react';
import {Col, ProgressBar, Row} from "react-bootstrap";
import LogList from "@/components/logs/LogList";
import {ErrorBoundary} from "react-error-boundary";
import ErrorBoundaryFallbackAlert from "@/components/error-boundary/ErrorBoundaryFallbackAlert.tsx";
import type {GraphQLLog} from "@/types/logs";
import styled from "@emotion/styled";
import LogControlBar from "@/components/logs/LogControlBar";
import {useAppSelector} from "@/app/configureStore";
import {selectStatus} from "@/ducks/log";

const ResponseContainer = styled.div`
    max-height: 90vh;
    height: auto;
    overflow: auto;
    padding: 1rem;
    border: 1px solid var(--bs-border-color);
    margin-bottom: 1rem;
`
export default function LogsContainer() {
    const [log, setLog] = useState<GraphQLLog|null>(null);
    const status = useAppSelector(selectStatus)

    return (
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallbackAlert}>
            <h2>Logs</h2>
            <LogControlBar />
            {status !== 'idle' && (
                <ProgressBar animated now={100} label={`${status}...`} className="my-1" />
            )}
            <Row className="g-3">
                <Col sm={4}>
                    <h3>Request</h3>
                    <LogList onClick={setLog} />
                </Col>
                <Col sm={4}>
                    <h3>Query/Mutation</h3>
                    <ResponseContainer>
                        {log && <code><pre>{log.request}</pre></code>}
                    </ResponseContainer>

                </Col>
                <Col sm={4}>
                    <h3>Response</h3>
                    {log && (
                        <ResponseContainer>
                            <h4>Errors ({log.errors.length})</h4>
                            <code><pre>{JSON.stringify(log.errors, undefined, 2)}</pre></code>
                        </ResponseContainer>
                    )}
                    {log && (
                        <ResponseContainer>
                            <h4>Updates ({log.response.length})</h4>
                            <code><pre>{JSON.stringify(log.response, undefined, 2)}</pre></code>
                        </ResponseContainer>
                    )}
                </Col>
            </Row>
        </ErrorBoundary>
    )
}
