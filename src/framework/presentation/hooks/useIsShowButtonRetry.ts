import React from 'react';

import { Result } from '@/core/models/Result';

import { isShowButtonRetry } from '../functions';

export default function useIsShowButtonRetry<T>(apiResponse: Result<T> | null) {
    return React.useMemo(() => isShowButtonRetry(apiResponse), [apiResponse]);
}
