import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectMaxDate, selectMinDate, setMaxDate} from "@/ducks/log";
import {FormControl, FormControlProps, InputGroup} from "react-bootstrap";
import dayjs from "dayjs";

export type LogMaxDateInputProps = Omit<FormControlProps, 'type' | 'value' | 'onChange'>
export default function LogMaxDateInput({...props}: LogMaxDateInputProps) {
    const dispatch = useAppDispatch();
    const minDate = useAppSelector(selectMinDate);
    const maxDate = useAppSelector(selectMaxDate);
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setMaxDate(ev.target.value));
    }

    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>Max Date</InputGroup.Text>
            <FormControl type="date" id={id}
                         value={maxDate ?? dayjs().format('YYYY-MM-DD')} onChange={changeHandler}
                         min={minDate} {...props}/>
        </InputGroup>
    )
}
