import { GroupEntity } from '@/core/features/group/entities/GroupEntity';
import GroupItem from '../GroupItem';

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
