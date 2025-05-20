import React, {ChangeEvent, useId} from 'react';
import {FormSelect, InputGroup} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectActions} from "@/ducks/stats";
import {selectAction, setAction} from "@/ducks/log";
import {loadLogs} from "@/ducks/log/actions";

export default function LogActionSelect() {
    const dispatch = useAppDispatch();
    const actions = useAppSelector(selectActions);
    const action = useAppSelector(selectAction);
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setAction(ev.target.value));
        dispatch(loadLogs());
    }

    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>Action</InputGroup.Text>
            <FormSelect id={id} value={action} onChange={changeHandler}>
                <option value="">All</option>
                {actions.map(a => <option key={a} value={a}>{a}</option>)}
            </FormSelect>
        </InputGroup>
    )
}
