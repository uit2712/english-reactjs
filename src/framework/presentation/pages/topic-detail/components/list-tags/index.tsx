import { Tag } from 'primereact/tag';
import { styled } from 'styled-components';

import { VocabularyEntity } from '@/core/features/vocabulary/entities/VocabularyEntity';

export default function ListTags({ list }: { list: VocabularyEntity[] }) {
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

const CustomTag = styled(Tag)`
    margin-right: 0.5em;
    margin-bottom: 0.5em;
    font-size: 1em;
`;
