import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { RadioButton } from 'primereact/radiobutton';
import styled from 'styled-components';

import { VocabularyEntity } from '@/core/features/vocabulary/entities/VocabularyEntity';
import { AnswerViewModel } from '@/core/features/vocabulary/view-models/AnswerViewModel';
import { pageTestConstant } from '@/core/pages/test/constants/PageTestConstant';
import { PreventedSubmitForm } from '@/framework/presentation/components/PreventedSubmitForm';

import { useQuestion } from './hooks';

const { buttonNextText, buttonConfirmText } = pageTestConstant;

export default function Question({
    answerText,
    listAnswers,
    rightAnswer,
    progressText,
    progressPercent,
}: {
    answerText: string;
    listAnswers: AnswerViewModel[];
    rightAnswer?: VocabularyEntity;
    progressText: string;
    progressPercent: number;
}) {
    const { title, selectedId, isSelected, isCompleted, isShowFullInfo, tempListAnswers, confirmAnswer, next, onClickAudio, setSelectedId } =
        useQuestion({
            rightAnswer,
            listAnswers,
        });

    return (
        <>
            <Title>{title}</Title>
            <Content>
                <ProgressBar value={progressPercent}></ProgressBar>
                <ProgressWrapper className='mb-0'>
                    <ProgressText>{progressText}</ProgressText>
                </ProgressWrapper>
                <ProgressWrapper className='mb-2'>
                    <span className='text'>{answerText}</span>
                </ProgressWrapper>
                <PreventedSubmitForm>
                    <FormFieldSet>
                        {tempListAnswers.map(({ id, text, elementId, disabled, englishText, fullInfoHtml }) => (
                            <AnswerWrapper key={id}>
                                <div className='flex items-center'>
                                    <RadioButton
                                        inputId={elementId}
                                        checked={selectedId === id}
                                        value={id}
                                        disabled={disabled}
                                        name='selectedAnswer'
                                        onChange={(e) => setSelectedId(Number.parseInt(e.value))}
                                    />
                                    <RadioButtonLabel htmlFor={elementId}>{text}</RadioButtonLabel>
                                </div>
                                <FullInfoContainer $show={isShowFullInfo}>
                                    <FullInfo
                                        dangerouslySetInnerHTML={{ __html: fullInfoHtml }}
                                        className='inline-block mr-2'
                                    ></FullInfo>
                                    <ButtonAudio onClick={() => onClickAudio(englishText)}>
                                        <ButtonAudioIcon className='pi pi-headphones' />
                                    </ButtonAudio>
                                </FullInfoContainer>
                            </AnswerWrapper>
                        ))}
                    </FormFieldSet>
                    <ButtonNext
                        onClick={next}
                        $show={isCompleted}
                    >
                        {buttonNextText}
                    </ButtonNext>
                    <ButtonConfirm
                        onClick={confirmAnswer}
                        $show={isCompleted === false}
                        disabled={isSelected === false}
                    >
                        {buttonConfirmText}
                    </ButtonConfirm>
                </PreventedSubmitForm>
            </Content>
        </>
    );
}

const Title = styled.h1`
    text-align: center;
`;

const Content = styled.main`
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: 0 auto;
`;

const FormFieldSet = styled.fieldset`
    border: none;
    padding: 0;
`;

const ProgressWrapper = styled.p`
    font-weight: bold;
`;

const ProgressText = styled.span`
    text-decoration: underline;
`;

const AnswerWrapper = styled.div`
    margin-bottom: 1em;
`;

const RadioButtonLabel = styled.label`
    margin-left: 0.5em;
    cursor: pointer;
`;

const FullInfoContainer = styled.div<{ $show?: boolean }>`
    display: ${(props) => (props.$show ? 'block' : 'none')};
    margin-top: 0.5em;
`;

const FullInfo = styled.span`
    display: inline-block;
    margin-right: 0.5em;
`;

const ButtonAudio = styled(Button)`
    outline: none;
    box-shadow: none;
    background-color: transparent;
    border: none;
    padding: 0;
`;

const ButtonAudioIcon = styled.i`
    font-size: 1em;
    color: black;
`;

const ButtonNext = styled(Button)<{ $show?: boolean }>`
    display: ${(props) => (props.$show ? 'block' : 'none')};
`;

const ButtonConfirm = styled(ButtonNext)``;
