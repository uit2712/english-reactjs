import { GroupEntity } from '@/core/features/group/entities/GroupEntity';
import { initialGroupState } from '@/core/features/group/store/GroupState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const groupSliceName = 'group';
export const groupSlice = createSlice({
    name: groupSliceName,
    initialState: initialGroupState,
    reducers: {
        setListGroups: (state, action: PayloadAction<GroupEntity[]>) => {
            state.list = action.payload;
        },
    },
    selectors: {
        getListGroups: (state) => state.list,
    },
});

export const { setListGroups } = groupSlice.actions;
export const { getListGroups } = groupSlice.selectors;

export const groupReducer = groupSlice.reducer;
