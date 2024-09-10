import React from 'react';
import { useLocation } from 'react-router-dom';

export default function useGetRouteDataAsNumber(name: string, defaultValue: number = 0) {
    const { state } = useLocation();

    const result = React.useMemo(() => {
        const value = state[name];
        if (value) {
            return Number.parseInt(value);
        }

        return defaultValue;
    }, [state]);

    return result;
}
