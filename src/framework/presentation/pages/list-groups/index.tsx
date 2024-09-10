import { useListGroups } from './hooks';

import { ProgressSpinner } from 'primereact/progressspinner';

import ListGroupItems from './components/ListGroupItems';

export default function ListGroups() {
    const { isLoading, list, title } = useListGroups();

    return (
        <>
            <h1>{title}</h1>
            {isLoading ? <ProgressSpinner /> : <ListGroupItems list={list} />}
        </>
    );
}
