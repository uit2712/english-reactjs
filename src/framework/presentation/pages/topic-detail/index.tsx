import { ProgressSpinner } from 'primereact/progressspinner';
import { useTopicDetail } from './hooks';

import { Button } from 'primereact/button';
import styled from 'styled-components';
import ListTags from './components/list-tags';

export default function TopicDetail() {
    const { onClickStartLearning, isLoading, list, title, totalVocabulariesTitle } = useTopicDetail();

    return (
        <>
            <Title>{title}</Title>
            {isLoading ? (
                <ProgressSpinner />
            ) : (
                <main>
                    <p>{totalVocabulariesTitle}</p>
                    <ListTags list={list} />
                    <ButtonStart
                        rounded
                        onClick={onClickStartLearning}
                    >
                        <Icon className='pi pi-caret-right' />
                    </ButtonStart>
                </main>
            )}
        </>
    );
}

const Title = styled.h1``;

const Icon = styled.i`
    font-size: 1em;
`;

const ButtonStart = styled(Button)`
    @media screen and (max-width: 768px) {
        position: fixed;
        right: 1em;
        bottom: 1em;
    }
`;
