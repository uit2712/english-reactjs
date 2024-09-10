import { GroupEntity } from '@/core/features/group/entities/GroupEntity';
import GroupItem from '../group-item';

export default function ListGroupItems({ list }: { list: GroupEntity[] }) {
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
