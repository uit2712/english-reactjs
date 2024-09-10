import { ProgressSpinner } from 'primereact/progressspinner';
import { useListTopics } from './hooks';
import ListTopicItems from './components/list-topic-items';

export default function ListTopics() {
    const { isLoading, list, title } = useListTopics();

    return (
        <>
            <h1>{title}</h1>
            {isLoading ? <ProgressSpinner /> : <ListTopicItems list={list} />}
        </>
    );
}
