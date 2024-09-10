import { ProgressSpinner } from 'primereact/progressspinner';
import { useListTopics } from './hooks';
import { TopicEntity } from '@/core/features/topic/entities/TopicEntity';
import { PageListTopicsUI } from '@/core/features/page-list-topics/facades/PageListTopicsUI';
import { Button } from 'primereact/button';
import styled from 'styled-components';

export default function ListTopics() {
    const { isLoading, list, title } = useListTopics();

    return (
        <>
            <h1>{title}</h1>
            {isLoading ? <ProgressSpinner /> : <List list={list} />}
        </>
    );
}

function List({ list }: { list: TopicEntity[] }) {
    const onSelectTopic = (id: number) => {
        PageListTopicsUI.selectTopic(id);
    };

    return (
        <>
            {list.map(({ id, name }) => (
                <ButtonContainer key={id}>
                    <Button
                        severity='info'
                        onClick={() => onSelectTopic(id)}
                    >
                        {name}
                    </Button>
                </ButtonContainer>
            ))}
        </>
    );
}

const ButtonContainer = styled.div`
    margin-bottom: 1em;
`;
