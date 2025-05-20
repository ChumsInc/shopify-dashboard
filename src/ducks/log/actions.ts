import {createAsyncThunk} from "@reduxjs/toolkit";
import {GraphQLLog, LoadUpdatesLogProps} from "@/types/logs";
import {fetchLogs} from "@/ducks/log/api";
import {selectLoadProps, selectStatus} from "@/ducks/log/index";
import {RootState} from "@/app/configureStore";

export const loadLogs = createAsyncThunk<GraphQLLog[], LoadUpdatesLogProps | undefined, { state: RootState }>(
    'log/loadLogs',
    async (arg, {getState}) => {
        if (!arg) {
            const state = getState();
            arg = selectLoadProps(state);
        }
        return await fetchLogs(arg);
    }, {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectStatus(state) === 'idle';
        }
    })
