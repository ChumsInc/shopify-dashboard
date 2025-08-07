import {createAsyncThunk} from "@reduxjs/toolkit";
import type {LoadUpdateLogStatsProps, LoadUpdateLogStatsResponse} from "@/types/stats";
import type {RootState} from "@/app/configureStore";
import {fetchStats} from "@/ducks/stats/api";
import {selectAction, selectLimit, selectOffset, selectPeriod, selectStatus} from "@/ducks/stats/index";


export const loadStats = createAsyncThunk<LoadUpdateLogStatsResponse, void, { state: RootState }>(
    'stats/loadStats',
    async (_, {getState}) => {
        const state = getState();
        const props: LoadUpdateLogStatsProps = {
            period: selectPeriod(state),
            action: selectAction(state) ?? undefined,
            start: selectOffset(state),
            limit: selectLimit(state),
        }
        return await fetchStats(props);
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectStatus(state) === 'idle';
        }
    }
)
