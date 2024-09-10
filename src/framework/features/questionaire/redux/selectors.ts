import { useSelector } from 'react-redux';
import { getListSelectedVocabularies } from './slice';
import React from 'react';
import { Questionaire } from '@/core/features/questionaire/facades/Questionaire';

export function useGetListVocabularies() {
    return useSelector(getListSelectedVocabularies);
}

export function useGetTotalVocabulariesTitle() {
    const list = useGetListVocabularies();
    const title = React.useMemo(() => Questionaire.getVocaStorage().getTotalVocabulariesTitle(), [list]);

    return title;
}
