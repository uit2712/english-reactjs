import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { groupReducer } from '../features/group/redux/slice';
import { topicReducer } from '../features/topic/redux/slice';

const reducer = combineReducers({
    group: groupReducer,
    topic: topicReducer,
});

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof reducer>;
