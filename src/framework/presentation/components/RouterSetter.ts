import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { Navigator } from '@/core/features/navigator/facades/Navigator';

export function RouterSetter() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    React.useEffect(() => {
        Navigator.getRouter().setRouter(navigate);
        Navigator.getRoute().setRouteData(location.state);
        Navigator.getRoute().setRouteQueryData(searchParams);
    }, [location, navigate, searchParams]);

    return null;
}
