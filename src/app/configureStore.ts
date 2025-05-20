import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from "redux";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {alertsSlice} from "@chumsinc/alert-list";
import statsSlice from "@/ducks/stats";
import logSlice from "@/ducks/log";

const rootReducer = combineReducers({
    [alertsSlice.reducerPath]: alertsSlice.reducer,
    [logSlice.reducerPath]: logSlice.reducer,
    [statsSlice.reducerPath]: statsSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActionPaths: ['payload.error']
        }
    })
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
