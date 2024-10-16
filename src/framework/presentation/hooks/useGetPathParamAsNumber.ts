import React from 'react';
import { useParams } from 'react-router-dom';

import { StringHelper } from '@/core/helpers/StringHelper';

export default function useGetPathParamAsNumber(name: string, defaultValue: number = 0) {
    const params = useParams();

    const result = React.useMemo(() => {
        const value = params[name];
        if (value && StringHelper.isHasValue(value)) {
            return Number.parseInt(value);
        }

        return defaultValue;
    }, [params]);

    return result;
}
