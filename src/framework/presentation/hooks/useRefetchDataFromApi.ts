import React from 'react';

import { Result } from '@/core/models/Result';

import useIsShowButtonRetry from './useIsShowButtonRetry';

export function useRefetchDataFromApi<T>(apiResponse: Result<T> | null, refetchData: () => void) {
    const isShowButtonRetry = useIsShowButtonRetry(apiResponse);

    const onClickRetry = React.useCallback(async () => {
        if (isShowButtonRetry) {
            refetchData();
        }
    }, [isShowButtonRetry, refetchData]);

    return {
        isShowButtonRetry,
        onClickRetry,
    };
}
