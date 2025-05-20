import {createEntityAdapter, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ActionStats} from "@/types/stats";
import {loadStats} from "@/ducks/stats/actions";

const statsAdapter = createEntityAdapter<ActionStats, string>({
    selectId: (stat) => stat.actionPeriod,
    sortComparer: (a, b) => a.actionPeriod.localeCompare(b.actionPeriod),
});

const selectors = statsAdapter.getSelectors();

interface StatsState {
    status: 'idle' | 'loading' | 'rejected';
    offset: number;
    limit: number;
    action: string;
    period: string;
    actions: string[];
    updated: string | null;
}

const initialState: StatsState = {
    status: 'idle',
    offset: 0,
    limit: 25,
    action: '',
    period: 'daily',
    actions: [],
    updated: null,
}
const statsSlice = createSlice({
    name: 'stats',
    initialState: statsAdapter.getInitialState(initialState),
    reducers: {
        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
        setAction: (state, action: PayloadAction<string>) => {
            state.action = action.payload;
        },
        setPeriod: (state, action: PayloadAction<string>) => {
            state.period = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadStats.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(loadStats.fulfilled, (state, action) => {
            state.status = 'idle';
            statsAdapter.setAll(state, action.payload.stats);
            state.updated = action.payload.updated;
            state.actions = action
                .payload.stats
                .map(a => a.actions).reduce((pv, cv) => {
                    cv.map(action => {
                        if (!pv.includes(action)) {
                            pv.push(action);
                        }
                    });
                    return pv;
                }, state.actions)
                .sort();
        });
        builder.addCase(loadStats.rejected, (state) => {
            state.status = 'rejected';
        });
    },
    selectors: {
        selectStatus: (state) => state.status,
        selectOffset: (state) => state.offset,
        selectLimit: (state) => state.limit,
        selectAction: (state) => state.action,
        selectPeriod: (state) => state.period,
        selectAll: selectors.selectAll,
        selectActions: (state) => state.actions,
    }
});

export const {setOffset, setLimit, setAction, setPeriod} = statsSlice.actions;
export const {
    selectAll,
    selectActions,
    selectLimit,
    selectOffset,
    selectPeriod,
    selectAction,
    selectStatus
} = statsSlice.selectors;

export const selectStats = createSelector(
    [selectAll],
    (stats) => {
        return [...stats]
            .sort((a, b) => b.actionPeriod.localeCompare(a.actionPeriod))
            // .reverse()
    }
)

export default statsSlice;
