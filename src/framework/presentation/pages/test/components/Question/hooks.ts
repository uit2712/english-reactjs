import React, { useContext } from 'react';

import { Questionaire } from '@/core/features/questionaire/facades/Questionaire';
import { TextToSpeech } from '@/core/features/text-to-speech/facades/TextToSpeech';
import { VocabularyEntity } from '@/core/features/vocabulary/entities/VocabularyEntity';
import { AnswerViewModel } from '@/core/features/vocabulary/view-models/AnswerViewModel';
import { pageTestConstant } from '@/core/pages/test/constants/PageTestConstant';

import { TestContext } from '../../contexts';

export function useQuestion({ rightAnswer, listAnswers }: { rightAnswer?: VocabularyEntity; listAnswers: AnswerViewModel[] }) {
    const [tempListAnswers, setTempListAnswers] = React.useState(listAnswers);
    const { selectedId, isSelected, setSelectedId, resetSelectedId } = useSelectAnswer();
    const { complete, resetComplete, isCompleted } = useComplete();
    const [totalChosedTimes, setTotalChosedTimes] = React.useState(0);

    React.useEffect(() => {
        resetSelectedId();
        resetComplete();
        setTotalChosedTimes(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rightAnswer]);

    const { disableAnswer } = useDisableAnswer({ listAnswers: tempListAnswers, setListAnswers: setTempListAnswers, isCompleted });

    const isDisableForm = React.useMemo(() => isCompleted, [isCompleted]);
    const { isShowFullInfo, onClickAudio } = useShowFullInfo(isCompleted);

    const title = Questionaire.getVocaStorage().getTopicTitle();

    const { confirmAnswer, next } = useActions({
        disableAnswer,
        complete,
        setTotalChosedTimes,
        selectedId,
        totalChosedTimes,
        rightAnswer,
    });

    return {
        title,
        selectedId,
        isSelected,
        isDisableForm,
        isCompleted,
        isShowFullInfo,
        tempListAnswers,
        confirmAnswer,
        next,
        onClickAudio,
        setSelectedId,
    };
}

function useComplete() {
    const [isCompleted, setIsCompleted] = React.useState(false);

    const resetComplete = () => {
        setIsCompleted(false);
    };

    const complete = () => {
        setIsCompleted(true);
    };

    return {
        resetComplete,
        complete,
        isCompleted,
    };
}

function useActions({
    disableAnswer,
    selectedId,
    setTotalChosedTimes,
    totalChosedTimes,
    rightAnswer,
    complete,
}: {
    disableAnswer: (id: number) => void;
    selectedId: number;
    setTotalChosedTimes: (value: number) => void;
    totalChosedTimes: number;
    rightAnswer?: VocabularyEntity;
    complete: () => void;
}) {
    const { onChoose, onComplete, onSelectCorrect, onSelectWrong, onNext } = useContext(TestContext);
    const confirmAnswer = React.useCallback(() => {
        disableAnswer(selectedId);
        const newTotalChosedTimes = totalChosedTimes + 1;
        setTotalChosedTimes(newTotalChosedTimes);

        const { correctMessage, wrongMessage } = pageTestConstant;

        if (selectedId === rightAnswer?.id) {
            onSelectCorrect(correctMessage);
            onComplete();
            onChoose(newTotalChosedTimes);
            complete();
        } else {
            onSelectWrong(wrongMessage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rightAnswer?.id, selectedId, totalChosedTimes]);

    const next = () => {
        onNext();
    };

    return {
        confirmAnswer,
        next,
    };
}

function useSelectAnswer() {
    const defaultValue = 0;
    const [selectedId, setSelectedId] = React.useState(defaultValue);

    const isSelected = React.useMemo(() => selectedId > 0, [selectedId]);

    const resetSelectedId = () => {
        setSelectedId(defaultValue);
    };

    return {
        isSelected,
        selectedId,
        setSelectedId,
        resetSelectedId,
    };
}

function useDisableAnswer({
    setListAnswers,
    listAnswers,
    isCompleted,
}: {
    setListAnswers: (value: AnswerViewModel[]) => void;
    listAnswers: AnswerViewModel[];
    isCompleted: boolean;
}) {
    const disableAnswer = React.useCallback(
        (id: number) => {
            const foundAnswer = listAnswers.find((item) => item.id === id);
            if (foundAnswer) {
                foundAnswer.disabled = true;
            }
        },
        [listAnswers],
    );

    React.useEffect(() => {
        if (isCompleted) {
            setListAnswers(
                listAnswers.map((item) => ({
                    ...item,
                    disabled: true,
                })),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCompleted]);

    return {
        disableAnswer,
    };
}

function useShowFullInfo(isCompleted: boolean) {
    const isShowFullInfo = React.useMemo(() => isCompleted, [isCompleted]);

    const onClickAudio = React.useCallback(
        async (text: string) => {
            if (isShowFullInfo === false) {
                return;
            }

            await TextToSpeech.speak(text);
        },
        [isShowFullInfo],
    );

    return {
        isShowFullInfo,
        onClickAudio,
    };
}
