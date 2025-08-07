import {type ChangeEvent, useId} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectLoadProps, selectStatus, setLimit} from "@/ducks/log";
import {Button, FormSelect, InputGroup} from "react-bootstrap";
import {loadLogs} from "@/ducks/log/actions";

export default function LoadMoreButton() {
    const dispatch = useAppDispatch();
    const loadProps = useAppSelector(selectLoadProps);
    const status = useAppSelector(selectStatus);
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setLimit(+ev.target.value));
    }

    const clickHandler = () => {
        dispatch(loadLogs({...loadProps, start: loadProps.start + loadProps.limit}));
    }
    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>Max Records</InputGroup.Text>
            <FormSelect id={id} value={loadProps.limit ?? '100'} onChange={changeHandler}>
                <option value="100">100</option>
                <option value="250">250</option>
                <option value="500">500</option>
                <option value="1000">1000</option>
            </FormSelect>
            <Button type="button" size="sm" variant="outline-primary"
                    onClick={clickHandler}
                    disabled={status !== 'idle'}>
                Load More
            </Button>
        </InputGroup>
    )
}
