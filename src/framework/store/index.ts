import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { groupReducer } from '../features/group/redux/slice';

const reducer = combineReducers({
    group: groupReducer,
});

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof reducer>;
