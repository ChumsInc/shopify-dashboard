import {GraphQLLog, LoadUpdatesLogProps} from "@/types/logs";
import {createEntityAdapter, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadLogs} from "@/ducks/log/actions";
import dayjs from "dayjs";

const logAdapter = createEntityAdapter<GraphQLLog, number>({
    selectId: (arg) => arg.id,
    sortComparer: (a, b) => a.id - b.id,
});

const selectors = logAdapter.getSelectors();

export interface LogState {
    status: 'idle' | 'loading' | 'rejected';
    action: string;
    minDate: string;
    maxDate: string;
    start: number;
    limit: number;
}

const initialState: LogState = {
    status: 'idle',
    action: '',
    minDate: dayjs().subtract(1, 'week').format('YYYY-MM-DD'),
    maxDate: dayjs().format('YYYY-MM-DD'),
    start: 0,
    limit: 100,
};

const logSlice = createSlice({
    name: 'log',
    initialState: logAdapter.getInitialState(initialState),
    reducers: {
        setAction: (state, action: PayloadAction<string>) => {
            state.action = action.payload;
        },
        setMinDate: (state, action: PayloadAction<string>) => {
            state.minDate = action.payload;
        },
        setMaxDate: (state, action: PayloadAction<string>) => {
            state.maxDate = action.payload;
        },
        setStart: (state, action: PayloadAction<number>) => {
            state.start = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
        setProps: (state, action: PayloadAction<Required<LoadUpdatesLogProps>>) => {
            state.action = action.payload.action;
            state.minDate = action.payload.minDate;
            state.maxDate = action.payload.maxDate;
            state.start = +action.payload.start;
            state.limit = +action.payload.limit;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadLogs.pending, (state, action) => {
                if (action.meta.arg && (
                    action.meta.arg.action !== state.action ||
                        action.meta.arg.minDate !== state.minDate ||
                        action.meta.arg.maxDate !== state.maxDate ||
                        action.meta.arg.limit !== state.limit)
                ) {
                    state.action = action.meta.arg.action ?? state.action;
                    state.minDate = action.meta.arg.minDate ?? state.minDate;
                    state.maxDate = action.meta.arg.maxDate ?? state.maxDate;
                    state.start = +(action.meta.arg.start ?? state.start);
                    state.limit = +(action.meta.arg.limit ?? state.limit);
                    logAdapter.removeAll(state);
                }
                if (action.meta.arg?.start && +action.meta.arg.start !== state.start) {
                    state.start = +action.meta.arg.start;
                }
                state.status = 'loading';
            })
            .addCase(loadLogs.fulfilled, (state, action) => {
                state.status = 'idle';
                logAdapter.setMany(state, action.payload);
            })
            .addCase(loadLogs.rejected, (state) => {
                state.status = 'rejected';
            })
    },
    selectors: {
        selectStatus: (state) => state.status,
        selectAction: (state) => state.action,
        selectMinDate: (state) => state.minDate,
        selectMaxDate: (state) => state.maxDate,
        selectStart: (state) => state.start,
        selectLimit: (state) => state.limit,
        selectAllLogs: selectors.selectAll,
    }
});

export const {setAction, setMinDate, setMaxDate, setStart, setLimit, setProps} = logSlice.actions;
export const {
    selectStatus,
    selectAction,
    selectMinDate,
    selectMaxDate,
    selectStart,
    selectLimit,
    selectAllLogs,
} = logSlice.selectors;

export const selectLoadProps = createSelector(
    [selectAction, selectMinDate, selectMaxDate, selectStart, selectLimit],
    (action, minDate, maxDate, start, limit):Required<LoadUpdatesLogProps> => {
        return {action, minDate, maxDate, start, limit}
    }
)


export default logSlice;
