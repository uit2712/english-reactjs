import { Navigator } from '@/core/features/navigator/facades/Navigator';
import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export function RouterSetter() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    React.useEffect(() => {
        Navigator.getRouter().setRouter(navigate);
        Navigator.getRoute().setRouteData(location.state);
        Navigator.getRoute().setRouteQueryData(searchParams);
    }, [location, navigate]);

    return null;
}
