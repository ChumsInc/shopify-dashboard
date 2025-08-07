import {type ChangeEvent, useId} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectMaxDate, selectMinDate, setMinDate} from "@/ducks/log";
import {FormControl, type FormControlProps, InputGroup} from "react-bootstrap";
import dayjs from "dayjs";

export type LogMinDateInputProps = Omit<FormControlProps, 'type' | 'value' | 'onChange'>
export default function LogMinDateInput({...props}: LogMinDateInputProps) {
    const dispatch = useAppDispatch();
    const minDate = useAppSelector(selectMinDate);
    const maxDate = useAppSelector(selectMaxDate);
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setMinDate(ev.target.value));
    }

    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>Min Date</InputGroup.Text>
            <FormControl type="date" id={id}
                         value={minDate ?? dayjs().startOf('week').format('YYYY-MM-DD')}
                         onChange={changeHandler}
                         max={maxDate} {...props}/>
        </InputGroup>
    )
}
