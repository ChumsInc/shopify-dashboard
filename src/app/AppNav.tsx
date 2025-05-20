import React from 'react';
import {useLocation, Link} from "react-router";
import Nav from "react-bootstrap/Nav";

export default function AppNav() {
    const location = useLocation();

    return (
        <Nav activeKey={location.pathname} variant="tabs" defaultActiveKey="/" className="mb-3">
            <Nav.Item>
                <Nav.Link as={Link} to="/" eventKey="/">Recent Stats</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/logs" eventKey="/logs">Log</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}
