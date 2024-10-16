import React, { useState } from 'react';

import { Toast } from '@/core/features/toast/facades/Toast';
import { NumberHelper } from '@/core/helpers/NumberHelper';
import { PageListTopicsUI } from '@/core/pages/list-topics/facades/PageListTopicsUI';
import { useGetListTopics } from '@/framework/features/topic/redux/selectors';

import useGetRouteDataAsNumber from '../../hooks/useGetRouteDataAsNumber';

export function useListTopics() {
    const { groupId } = useGetDataFromRoute();
    const { isLoading, list } = useLoadData(groupId);
    const title = useGetTitle(groupId);

    return {
        isLoading,
        list,
        title,
    };
}

function useGetDataFromRoute() {
    const groupId = useGetRouteDataAsNumber('groupId');

    return {
        groupId,
    };
}

function useLoadData(groupId: number) {
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = React.useCallback(async () => {
        if (NumberHelper.isPositive(groupId) === false) {
            return;
        }

        const { success, message } = await PageListTopicsUI.getByGroupId(groupId);
        setIsLoading(false);
        if (false === success) {
            Toast.showErrorMessage(message);
        }
    }, [groupId]);

    const list = useGetListTopics();

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        isLoading,
        list,
    };
}

function useGetTitle(groupId: number) {
    const title = PageListTopicsUI.getTitle(groupId);

    return title;
}
