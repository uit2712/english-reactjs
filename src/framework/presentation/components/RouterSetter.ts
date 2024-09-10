import { Navigator } from '@/core/features/navigator/facades/Navigator';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function RouterSetter() {
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        Navigator.getRouter().setRouter(navigate);
        Navigator.getRoute().setRoute(location);
    }, [location, navigate]);

    return null;
}
