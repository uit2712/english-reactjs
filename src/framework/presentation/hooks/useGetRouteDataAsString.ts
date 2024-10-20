import React from 'react';
import { useLocation } from 'react-router-dom';

import { StringHelper } from '@/core/helpers/StringHelper';

export default function useGetRouteDataAsString(name: string, defaultValue: string = '') {
    const { state } = useLocation();

    const result = React.useMemo(() => {
        const value = state[name];
        if (value && StringHelper.isHasValue(value)) {
            return value;
        }

        return defaultValue;
    }, [defaultValue, name, state]);

    return result;
}
