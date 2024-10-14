import { ProgressSpinner } from 'primereact/progressspinner';

import ListGroupItems from './components/list-group-items';
import { useListGroups } from './hooks';

export default function ListGroups() {
    const { isLoading, list, title } = useListGroups();

    return (
        <>
            <h1 data-testid='page-list-groups-title'>{title}</h1>
            {isLoading ? <ProgressSpinner data-test-id='loading' /> : <ListGroupItems list={list} />}
        </>
    );
}
