import React, { useState } from 'react';

import { GetListGroupsResult } from '@/core/features/group/models/GetListGroupsResult';
import { Toast } from '@/core/features/toast/facades/Toast';
import { pageListGroupsConstant } from '@/core/pages/list-groups/constants/PageListGroupsConstant';
import { PageListGroupsUI } from '@/core/pages/list-groups/facades/PageListGroupsUI';
import { useGetListGroups } from '@/framework/features/group/redux/selectors';

import { useRefetchDataFromApi } from '../../hooks/useRefetchDataFromApi';

export function useListGroups() {
    const { title } = pageListGroupsConstant;

    const { isLoading, list, apiResponse, refetchData } = useLoadData();
    useShowMessage(apiResponse);

    const { isShowButtonRetry, onClickRetry } = useRetry(apiResponse, refetchData);

    return {
        title,
        isLoading,
        list,
        isShowButtonRetry,
        onClickRetry,
    };
}

export function useLoadData() {
    const [isLoading, setIsLoading] = useState(true);
    const [apiResponse, setApiResponse] = useState<GetListGroupsResult | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        const result = await PageListGroupsUI.getList();
        setIsLoading(false);
        setApiResponse(result);
    };

    const list = useGetListGroups();

    React.useEffect(() => {
        fetchData();
    }, []);

    const refetchData = () => {
        setApiResponse(null);
        fetchData();
    };

    return {
        isLoading,
        list,
        apiResponse,
        refetchData,
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

export function useRetry(apiResponse: GetListGroupsResult | null, refetchData: () => void) {
    const data = useRefetchDataFromApi(apiResponse, refetchData);

    return {
        ...data,
    };
}
