import { TopicEntity } from '@/core/features/topic/entities/TopicEntity';
import { initialTopicState } from '@/core/features/topic/store/TopicState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const topicSliceName = 'topic';
export const topicSlice = createSlice({
    name: topicSliceName,
    initialState: initialTopicState,
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
