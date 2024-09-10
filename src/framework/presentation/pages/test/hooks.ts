import { VocabularyEntity } from '@/core/features/vocabulary/entities/VocabularyEntity';
import { NumberHelper } from '@/core/helpers/NumberHelper';
import { VocabularyQuestionaireRepository } from '@/core/features/questionaire/repositories/VocabularyQuestionaireRepository';
import { QuestionaireType } from '@/core/features/vocabulary/types/QuestionaireType';
import { Navigator } from '@/core/features/navigator/facades/Navigator';
import { QuestionaireEntity } from '@/core/features/questionaire/entities/QuestionaireEntity';
import { QuestionaireRepositoryInterface } from '@/core/features/questionaire/interface-adapters/QuestionaireRepositoryInterface';
import React from 'react';
import { useGetListVocabularies } from '@/framework/features/questionaire/redux/selectors';
import { Toast } from '@/core/features/toast/facades/Toast';

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
            // Navigator.getRouter().navigateToCompletedTopic(totalCorrectAnswersText, testResultMessage);
        }
    }, [isCompleted]);

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
    const initNewQuestion = () => {
        setCurrentQuestion(result.getCurrentQuestion());
        setProgressText(result.getProgressInText());
        setProgressPercent(result.getProgressInPercent());
        randomType();
    };

    const [result, setResult] = React.useState<QuestionaireRepositoryInterface<VocabularyEntity>>(new VocabularyQuestionaireRepository());
    React.useEffect(() => {
        setResult(result.initializeListQuestions(list));
        initNewQuestion();
    }, []);

    const isCompleted = React.useMemo(() => result.isCompleted(), [result]);
    const totalCorrectAnswersText = React.useMemo(() => result.getTotalCorrectAnswersText(), [result]);
    const testResultMessage = React.useMemo(() => result.getTestResultMessage(), [result]);

    const next = () => {
        result.nextQuestion();
        initNewQuestion();
    };

    const choose = (totalChosedTimes: number) => {
        if (totalChosedTimes === 1) {
            result.increaseTotalCorrectAnswers();
        }
    };

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
