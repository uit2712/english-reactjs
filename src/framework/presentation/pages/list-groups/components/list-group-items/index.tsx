import { GroupEntity } from '@/core/features/group/entities/GroupEntity';
import { pageListGroupsConstant } from '@/core/pages/list-groups/constants/PageListGroupsConstant';

import GroupItem from '../group-item';

export default function ListGroupItems({ list }: { list: GroupEntity[] }) {
    const { noGroups } = pageListGroupsConstant;

    if (list.length === 0) {
        return <p data-testid='no-groups-text'>{noGroups}</p>;
    }

    return (
        <>
            {list.map((item) => (
                <GroupItem
                    key={item.id}
                    item={item}
                />
            ))}
        </>
    );
}
