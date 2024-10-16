import React from 'react';

import { Navigator } from '@/core/features/navigator/facades/Navigator';
import { QuestionaireEntity } from '@/core/features/questionaire/entities/QuestionaireEntity';
import {
    QuestionaireRepositoryInterface
} from '@/core/features/questionaire/interface-adapters/QuestionaireRepositoryInterface';
import {
    VocabularyQuestionaireRepository
} from '@/core/features/questionaire/repositories/VocabularyQuestionaireRepository';
import { Toast } from '@/core/features/toast/facades/Toast';
import { VocabularyEntity } from '@/core/features/vocabulary/entities/VocabularyEntity';
import { QuestionaireType } from '@/core/features/vocabulary/types/QuestionaireType';
import { NumberHelper } from '@/core/helpers/NumberHelper';
import { useGetListVocabularies } from '@/framework/features/questionaire/redux/selectors';

export function useTest() {
    const state = React.useState<{
        currentQuestion: QuestionaireEntity<VocabularyEntity>;
    }>({
        currentQuestion: new QuestionaireEntity<VocabularyEntity>(),
    });

    const listVocabularies = useGetListVocabularies();
    const { next, choose, isCompleted, currentQuestion, progressText, type, progressPercent, totalCorrectAnswersText, testResultMessage } =
        useQuestionaire(listVocabularies);

    React.useEffect(() => {
        if (isCompleted) {
            Navigator.getRouter().navigateToCompletedTopic(totalCorrectAnswersText, testResultMessage);
        }
    }, [isCompleted, testResultMessage, totalCorrectAnswersText]);

    const { showMessage: showSuccessMessage } = useShowSuccessMessage();
    const { showMessage: showErrorMessage } = useShowErrorMessage();

    return {
        ...state,
        next,
        choose,
        showSuccessMessage,
        showErrorMessage,
        isCompleted,
        currentQuestion,
        progressText,
        type,
        progressPercent,
    };
}

function useQuestionaire(list: VocabularyEntity[]) {
    const { randomType, type } = useType();

    const [currentQuestion, setCurrentQuestion] = React.useState<QuestionaireEntity<VocabularyEntity>>();
    const [progressText, setProgressText] = React.useState('');
    const [progressPercent, setProgressPercent] = React.useState(0);

    const [result, setResult] = React.useState<QuestionaireRepositoryInterface<VocabularyEntity>>(new VocabularyQuestionaireRepository());
    const initNewQuestion = React.useCallback(() => {
        setCurrentQuestion(result.getCurrentQuestion());
        setProgressText(result.getProgressInText());
        setProgressPercent(result.getProgressInPercent());
        setIsCompleted(result.isCompleted());
        randomType();
    }, [randomType, result]);

    React.useEffect(() => {
        setResult(result.initializeListQuestions(list));
        initNewQuestion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [isCompleted, setIsCompleted] = React.useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const totalCorrectAnswersText = React.useMemo(() => result.getTotalCorrectAnswersText(), [isCompleted]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const testResultMessage = React.useMemo(() => result.getTestResultMessage(), [isCompleted]);

    const next = React.useCallback(() => {
        setResult(result.nextQuestion());
        initNewQuestion();
    }, [initNewQuestion, result]);

    const choose = React.useCallback(
        (totalChosedTimes: number) => {
            if (totalChosedTimes === 1) {
                setResult(result.increaseTotalCorrectAnswers());
            }
        },
        [result],
    );

    return {
        next,
        choose,
        isCompleted,
        currentQuestion,
        progressText,
        type,
        progressPercent,
        totalCorrectAnswersText,
        testResultMessage,
    };
}

function useType() {
    const [type, setType] = React.useState<QuestionaireType>('name');
    const randomType = (): void => {
        if (0 === NumberHelper.randomNumberInRange(0, 1)) {
            setType('name');
            return;
        }

        setType('meaning');
    };

    return {
        type,
        randomType,
    };
}

function useShowSuccessMessage() {
    const showMessage = (message: string) => {
        Toast.showSuccessMessageAutoClose(message, 2000);
    };

    return {
        showMessage,
    };
}

function useShowErrorMessage() {
    const showMessage = (message: string) => {
        Toast.showErrorMessageAutoClose(message, 2000);
    };

    return {
        showMessage,
    };
}
