import { GroupEntity } from '@/core/features/group/entities/GroupEntity';
import { initialQuestionaireState } from '@/core/features/questionaire/store/QuestionaireState';
import { TopicEntity } from '@/core/features/topic/entities/TopicEntity';
import { VocabularyEntity } from '@/core/features/vocabulary/entities/VocabularyEntity';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const questionaireSliceName = 'questionaire';
export const questionaireSlice = createSlice({
    name: questionaireSliceName,
    initialState: initialQuestionaireState,
    reducers: {
        setListSelectedVocabularies: (state, action: PayloadAction<VocabularyEntity[]>) => {
            state.listSelectedVocabularies = action.payload;
        },
        setSelectedTopic: (state, action: PayloadAction<TopicEntity>) => {
            state.selectedTopic = action.payload;
        },
        setSelectedGroup: (state, action: PayloadAction<GroupEntity>) => {
            state.selectedGroup = action.payload;
        },
    },
    selectors: {
        getListSelectedVocabularies: (state) => state.listSelectedVocabularies,
        getSelectedTopic: (state) => state.selectedTopic,
        getSelectedGroup: (state) => state.selectedGroup,
    },
});

export const { setListSelectedVocabularies, setSelectedGroup, setSelectedTopic } = questionaireSlice.actions;
export const { getListSelectedVocabularies, getSelectedGroup, getSelectedTopic } = questionaireSlice.selectors;

export const questionaireReducer = questionaireSlice.reducer;
