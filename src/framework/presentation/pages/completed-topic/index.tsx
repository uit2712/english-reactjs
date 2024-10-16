import { Button } from 'primereact/button';
import styled from 'styled-components';

import {
    pageCompletedTopicConstant
} from '@/core/pages/completed-topic/constants/PageCompletedTopicConstant';

import { useCompletedTopic } from './hooks';

export default function CompletedTopic() {
    const { title, subtitle, buttonLearnAgainTitle, buttonSelectOtherTopicsSameGroupTitle } = pageCompletedTopicConstant;

    const { learnAgain, selectOtherTopicsSameGroup, testResultMessage, totalCorrectAnswersText } = useCompletedTopic();

    return (
        <>
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <p>{totalCorrectAnswersText}</p>
            <p>{testResultMessage}</p>
            <ButtonLearnAgain onClick={learnAgain}>{buttonLearnAgainTitle}</ButtonLearnAgain>
            <Button onClick={selectOtherTopicsSameGroup}>{buttonSelectOtherTopicsSameGroupTitle}</Button>
        </>
    );
}

const ButtonLearnAgain = styled(Button)`
    margin-bottom: 1em;
`;
