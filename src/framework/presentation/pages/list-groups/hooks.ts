import { pageListGroupsConstant } from '@/core/pages/list-groups/constants/PageListGroupsConstant';
import { PageListGroupsUI } from '@/core/pages/list-groups/facades/PageListGroupsUI';
import { Toast } from '@/core/features/toast/facades/Toast';
import { useGetListGroups } from '@/framework/features/group/redux/selectors';
import React, { useState } from 'react';

export function useListGroups() {
    const { title } = pageListGroupsConstant;

    const { isLoading, list } = useLoadData();

    return {
        title,
        isLoading,
        list,
    };
}

function useLoadData() {
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        const { success, message } = await PageListGroupsUI.getList();
        setIsLoading(false);
        if (false === success) {
            Toast.showErrorMessage(message);
        }
    };

    const list = useGetListGroups();

    React.useEffect(() => {
        fetchData();
    }, []);

    return {
        isLoading,
        list,
    };
}
