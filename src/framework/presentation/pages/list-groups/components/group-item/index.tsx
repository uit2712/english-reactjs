import { GroupEntity } from '@/core/features/group/entities/GroupEntity';
import { PageListGroupsUI } from '@/core/features/page-list-groups/facades/PageListGroupsUI';
import { Button } from 'primereact/button';
import React from 'react';

function GroupItemNotCache({ item }: { item: GroupEntity }) {
    const { id, name } = item;

    const onSelectGroup = (id: number) => {
        PageListGroupsUI.selectGroup(id);
    };

    return (
        <div>
            <Button
                severity='info'
                onClick={() => onSelectGroup(id)}
            >
                {name}
            </Button>
        </div>
    );
}

const GroupItem = React.memo(GroupItemNotCache, (prevProps, nextProps) => prevProps.item.id === nextProps.item.id);
export default GroupItem;
