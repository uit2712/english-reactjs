import { GroupEntity } from '@/core/features/group/entities/GroupEntity';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface GroupState {
    list: GroupEntity[];
}

const initialState: GroupState = {
    list: [],
};

export const groupSliceName = 'group';
export const groupSlice = createSlice({
    name: groupSliceName,
    initialState,
    reducers: {
        setListGroups: (state, action: PayloadAction<GroupEntity[]>) => {
            state.list = action.payload;
        },
    },
});

export const { setListGroups } = groupSlice.actions;

export const groupReducer = groupSlice.reducer;
