import { QuestionaireEntity } from '@/core/features/questionaire/entities/QuestionaireEntity';
import { VocabularyEntity } from '@/core/features/vocabulary/entities/VocabularyEntity';
import { QuestionaireType } from '@/core/features/vocabulary/types/QuestionaireType';
import { useListAnswersByType } from './hooks';
import Question from '../Question';

export default function ListAnswersByType({
    currentQuestion,
    type,
    progressText,
    progressPercent,
}: {
    currentQuestion?: QuestionaireEntity<VocabularyEntity>;
    type: QuestionaireType;
    progressText: string;
    progressPercent: number;
}) {
    const {
        currentMeaningAnswerText,
        currentNameAnswerText,
        nameAnswerUniqueKey,
        isAnswerTypeName,
        listMeaningAnswers,
        meaningAnswerUniqueKey,
        listNameAnswers,
        rightAnswer,
    } = useListAnswersByType(type, currentQuestion);

    return (
        <>
            {isAnswerTypeName ? (
                <Question
                    key={nameAnswerUniqueKey}
                    answerText={currentNameAnswerText}
                    listAnswers={listMeaningAnswers}
                    rightAnswer={rightAnswer}
                    progressText={progressText}
                    progressPercent={progressPercent}
                />
            ) : (
                <Question
                    key={meaningAnswerUniqueKey}
                    answerText={currentMeaningAnswerText}
                    listAnswers={listNameAnswers}
                    rightAnswer={rightAnswer}
                    progressText={progressText}
                    progressPercent={progressPercent}
                />
            )}
        </>
    );
}
