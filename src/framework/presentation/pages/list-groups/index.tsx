import { GroupEntity } from '@/core/features/group/entities/GroupEntity';
import { useListGroups } from './hooks';

import { ProgressSpinner } from 'primereact/progressspinner';

import { Button } from 'primereact/button';
import { PageListGroupsUI } from '@/core/features/page-list-groups/facades/PageListGroupsUI';

export default function ListGroups() {
    const { isLoading, list, title } = useListGroups();

    return (
        <>
            <h1>{title}</h1>
            {isLoading ? <ProgressSpinner /> : <List list={list} />}
        </>
    );
}

function List({ list }: { list: GroupEntity[] }) {
    const onSelectGroup = (id: number) => {
        PageListGroupsUI.selectGroup(id);
    };

    return (
        <>
            {list.map(({ id, name }) => (
                <div key={id}>
                    <Button
                        severity='info'
                        onClick={() => onSelectGroup(id)}
                    >
                        {name}
                    </Button>
                </div>
            ))}
        </>
    );
}
