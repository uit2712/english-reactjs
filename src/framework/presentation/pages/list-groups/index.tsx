import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

import ListGroupItems from './components/list-group-items';
import { useListGroups } from './hooks';

export default function ListGroups() {
    const { isLoading, list, title, onClickRetry, isShowButtonRetry } = useListGroups();

    return (
        <>
            <h1 data-testid='page-list-groups-title'>{title}</h1>
            {isLoading ? <ProgressSpinner data-testid='loading' /> : <ListGroupItems list={list} />}
            {isShowButtonRetry && (
                <Button
                    onClick={onClickRetry}
                    data-testid='button-retry'
                >
                    Thử lại
                </Button>
            )}
        </>
    );
}
