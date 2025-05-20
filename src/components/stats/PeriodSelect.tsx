import React, {ChangeEvent, useId} from 'react';
import {FormSelect, InputGroup} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectPeriod, setPeriod} from "@/ducks/stats";
import {loadStats} from "@/ducks/stats/actions";

export default function PeriodSelect() {
    const dispatch = useAppDispatch();
    const period = useAppSelector(selectPeriod);
    const id = useId();

    const changeHandler = (ev:ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPeriod(ev.target.value));
        dispatch(loadStats());
    }

    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>Period</InputGroup.Text>
            <FormSelect  size="sm" required id={id}
                         value={period} onChange={changeHandler}>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </FormSelect>
        </InputGroup>
    )
}
