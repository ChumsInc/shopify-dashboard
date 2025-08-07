import {type ChangeEvent, useId} from 'react';
import {FormSelect, InputGroup} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectAction, selectActions, setAction} from "@/ducks/stats";
import {loadStats} from "@/ducks/stats/actions";

export default function ActionSelect() {
    const dispatch = useAppDispatch();
    const actions = useAppSelector(selectActions);
    const action = useAppSelector(selectAction);
    const id = useId();

    const changeHandler = (ev:ChangeEvent<HTMLSelectElement>) => {
        dispatch(setAction(ev.target.value));
        dispatch(loadStats());
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
