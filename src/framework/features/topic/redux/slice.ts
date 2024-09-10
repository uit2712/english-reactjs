import { TopicEntity } from '@/core/features/topic/entities/TopicEntity';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface TopicState {
    list: TopicEntity[];
}

const initialState: TopicState = {
    list: [],
};

export const topicSliceName = 'topic';
export const topicSlice = createSlice({
    name: topicSliceName,
    initialState,
    reducers: {
        setListTopics: (state, action: PayloadAction<TopicEntity[]>) => {
            state.list = action.payload;
        },
    },
    selectors: {
        getListTopics: (state) => state.list,
    },
});

export const { setListTopics } = topicSlice.actions;
export const { getListTopics } = topicSlice.selectors;

export const topicReducer = topicSlice.reducer;
