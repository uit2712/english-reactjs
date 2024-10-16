import { AxiosError } from 'axios';

import { Result } from '@/core/models/Result';

export function isShowButtonRetry<T>(apiResponse: Result<T> | null) {
    if (null === apiResponse) {
        return false;
    }

    return apiResponse.responseCode >= 500 || apiResponse.code === AxiosError.ERR_NETWORK;
}

export async function emptyPromiseFunction() {}
