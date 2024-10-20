import React from 'react';
import { useSelector } from 'react-redux';

import { Questionaire } from '@/core/features/questionaire/facades/Questionaire';

import { getListSelectedVocabularies, getSelectedGroupId, getSelectedTopicId } from './slice';

export function useGetListVocabularies() {
    return useSelector(getListSelectedVocabularies);
}

export function useGetTotalVocabulariesTitle() {
    const list = useGetListVocabularies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const title = React.useMemo(() => Questionaire.getVocaStorage().getTotalVocabulariesTitle(), [list]);

    return title;
}

export function useGetSelectedGroupId() {
    return useSelector(getSelectedGroupId);
}

export function useGetSelectedTopicId() {
    return useSelector(getSelectedTopicId);
}
