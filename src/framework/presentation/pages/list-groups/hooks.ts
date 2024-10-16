import React, { useState } from 'react';

import { GetListGroupsResult } from '@/core/features/group/models/GetListGroupsResult';
import { Toast } from '@/core/features/toast/facades/Toast';
import { pageListGroupsConstant } from '@/core/pages/list-groups/constants/PageListGroupsConstant';
import { PageListGroupsUI } from '@/core/pages/list-groups/facades/PageListGroupsUI';
import { useGetListGroups } from '@/framework/features/group/redux/selectors';

export function useListGroups() {
    const { title } = pageListGroupsConstant;

    const { isLoading, list, apiResponse } = useLoadData();
    useShowMessage(apiResponse);

    return {
        title,
        isLoading,
        list,
    };
}

export function useLoadData() {
    const [isLoading, setIsLoading] = useState(true);
    const [apiResponse, setApiResponse] = useState<GetListGroupsResult | null>(null);

    const fetchData = async () => {
        const result = await PageListGroupsUI.getList();
        setIsLoading(false);
        setApiResponse(result);
    };

    const list = useGetListGroups();

    React.useEffect(() => {
        fetchData();
    }, []);

    return {
        isLoading,
        list,
        apiResponse,
    };
}

export function useShowMessage(apiResponse: GetListGroupsResult | null) {
    React.useEffect(() => {
        if (apiResponse === null) {
            return;
        }

        if (false === apiResponse.success) {
            Toast.showErrorMessage(apiResponse.message);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiResponse?.success]);
}
