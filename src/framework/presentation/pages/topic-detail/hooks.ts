import React from 'react';

import { Navigator } from '@/core/features/navigator/facades/Navigator';
import { Questionaire } from '@/core/features/questionaire/facades/Questionaire';
import { Toast } from '@/core/features/toast/facades/Toast';
import { NumberHelper } from '@/core/helpers/NumberHelper';
import { PageTopicDetailUI } from '@/core/pages/topic-detail/facades/PageTopicDetailUI';
import {
    useGetListVocabularies, useGetTotalVocabulariesTitle
} from '@/framework/features/questionaire/redux/selectors';

import useGetRouteDataAsNumber from '../../hooks/useGetRouteDataAsNumber';

export function useTopicDetail() {
    const { id } = useGetDataFromRoute();
    const { isLoading, list } = useLoadData(id);
    const { title, totalVocabulariesTitle } = useGetTitles();

    const onClickStartLearning = () => {
        Navigator.getRouter().navigateToTest();
    };

    return {
        onClickStartLearning,
        isLoading,
        list,
        title,
        totalVocabulariesTitle,
    };
}

function useGetDataFromRoute() {
    const id = useGetRouteDataAsNumber('id');

    return {
        id,
    };
}

function useLoadData(id: number) {
    const [isLoading, setIsLoading] = React.useState(true);

    const fetchData = React.useCallback(async () => {
        if (NumberHelper.isPositive(id) === false) {
            return;
        }

        const { success, message } = await PageTopicDetailUI.getListVocabularies(id);
        setIsLoading(false);
        if (false === success) {
            Toast.showErrorMessage(message);
        }
    }, [id]);

    const list = useGetListVocabularies();

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        isLoading,
        list,
    };
}

function useGetTitles() {
    const [title] = React.useState(Questionaire.getVocaStorage().getTopicTitle());
    const totalVocabulariesTitle = useGetTotalVocabulariesTitle();

    return {
        title,
        totalVocabulariesTitle,
    };
}
