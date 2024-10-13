import { PageListTopicsUI } from '@/core/pages/list-topics/facades/PageListTopicsUI';
import { TopicEntity } from '@/core/features/topic/entities/TopicEntity';
import { Button } from 'primereact/button';
import React from 'react';
import { styled } from 'styled-components';

function TopicItemNotCache({ item }: { item: TopicEntity }) {
    const { id, name } = item;

    const onSelectTopic = (id: number) => {
        PageListTopicsUI.selectTopic(id);
    };

    return (
        <ButtonContainer key={id}>
            <Button
                severity='info'
                onClick={() => onSelectTopic(id)}
            >
                {name}
            </Button>
        </ButtonContainer>
    );
}

const TopicItem = React.memo(TopicItemNotCache, (prevProps, nextProps) => prevProps.item.id === nextProps.item.id);

const ButtonContainer = styled.div`
    margin-bottom: 1em;
`;

export default TopicItem;
