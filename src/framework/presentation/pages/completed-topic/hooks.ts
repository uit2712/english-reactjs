import { Navigator } from '@/core/features/navigator/facades/Navigator';
import useGetRouteDataAsString from '../../hooks/useGetRouteDataAsString';
import { useGetSelectedGroupId, useGetSelectedTopicId } from '@/framework/features/questionaire/redux/selectors';
import React from 'react';

export function useCompletedTopic() {
    const { selectOtherTopicsSameGroup } = useSelectOtherTopicsSameGroup();
    const { learnAgain } = useLearnAgain();
    const { totalCorrectAnswersText, testResultMessage } = useGetDataFromRoute();

    return {
        learnAgain,
        selectOtherTopicsSameGroup,
        testResultMessage,
        totalCorrectAnswersText,
    };
}

function useGetDataFromRoute() {
    const totalCorrectAnswersText = useGetRouteDataAsString('totalCorrectAnswersText');
    const testResultMessage = useGetRouteDataAsString('testResultMessage');

    return {
        totalCorrectAnswersText,
        testResultMessage,
    };
}

function useSelectOtherTopicsSameGroup() {
    const selectedGroupId = useGetSelectedGroupId();

    const selectOtherTopicsSameGroup = React.useCallback(() => {
        Navigator.getRouter().navigateToListTopicsOfGroup(selectedGroupId);
    }, [selectedGroupId]);

    return {
        selectOtherTopicsSameGroup,
    };
}

function useLearnAgain() {
    const selectedTopicId = useGetSelectedTopicId();

    const learnAgain = () => {
        Navigator.getRouter().navigateToTopicDetail(selectedTopicId);
    };

    return {
        learnAgain,
    };
}
