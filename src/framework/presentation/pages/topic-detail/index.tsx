import { ProgressSpinner } from 'primereact/progressspinner';
import { useTopicDetail } from './hooks';

import { Tag } from 'primereact/tag';
import { VocabularyEntity } from '@/core/features/vocabulary/entities/VocabularyEntity';
import { Button } from 'primereact/button';
import styled from 'styled-components';

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
                        className='btn-start'
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

function ListTags({ list }: { list: VocabularyEntity[] }) {
    return (
        <p>
            {list.map(({ id, name }) => (
                <CustomTag
                    key={id}
                    severity='info'
                >
                    {name}
                </CustomTag>
            ))}
        </p>
    );
}

const Title = styled.h1``;

const Icon = styled.i`
    font-size: 1em;
`;

const CustomTag = styled(Tag)`
    margin-right: 0.5em;
    margin-bottom: 0.5em;
    font-size: 1em;
`;

const ButtonStart = styled(Button)`
    @media screen and (max-width: 768px) {
        position: fixed;
        right: 1em;
        bottom: 1em;
    }
`;
