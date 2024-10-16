import React from 'react';

import { QuestionaireEntity } from '@/core/features/questionaire/entities/QuestionaireEntity';
import { VocabularyEntity } from '@/core/features/vocabulary/entities/VocabularyEntity';
import { Vocabulary } from '@/core/features/vocabulary/facades/Vocabulary';
import { QuestionaireType } from '@/core/features/vocabulary/types/QuestionaireType';
import { AnswerViewModel } from '@/core/features/vocabulary/view-models/AnswerViewModel';

export function useListAnswersByType(type: QuestionaireType, currentQuestion?: QuestionaireEntity<VocabularyEntity> | undefined) {
    const listAnswers = React.useMemo(
        () => (currentQuestion?.listAnswers ? currentQuestion.listAnswers.filter((item) => item !== undefined) : []),
        [currentQuestion],
    );
    const rightAnswer = React.useMemo(() => currentQuestion?.rightAnswer, [currentQuestion]);
    const isAnswerTypeName = React.useMemo(() => 'name' === type, [type]);

    const { listNameAnswers, currentNameAnswerText, nameAnswerUniqueKey } = useDataForNameAnswer(listAnswers, rightAnswer);
    const { listMeaningAnswers, currentMeaningAnswerText, meaningAnswerUniqueKey } = useDataForMeaning(listAnswers, rightAnswer);

    return {
        isAnswerTypeName,
        currentNameAnswerText,
        currentMeaningAnswerText,
        nameAnswerUniqueKey,
        listNameAnswers,
        listMeaningAnswers,
        meaningAnswerUniqueKey,
        rightAnswer,
    };
}

function useDataForNameAnswer(listAnswers: VocabularyEntity[], rightAnswer: VocabularyEntity | undefined) {
    const nameAnswerUniqueKey = React.useMemo(() => (rightAnswer ? 'name-' + rightAnswer.id : ''), [rightAnswer]);
    const currentNameAnswerText = React.useMemo(() => rightAnswer?.name ?? '', [rightAnswer]);
    const listNameAnswers = React.useMemo<AnswerViewModel[]>(
        () => Vocabulary.getMapper().mapFromListEntitiesToListAnswerNameViewModels(listAnswers),
        [listAnswers],
    );

    return {
        listNameAnswers,
        currentNameAnswerText,
        nameAnswerUniqueKey,
    };
}

function useDataForMeaning(listAnswers: VocabularyEntity[], rightAnswer: VocabularyEntity | undefined) {
    const meaningAnswerUniqueKey = React.useMemo(() => (rightAnswer ? 'meaning-' + rightAnswer.id : ''), [rightAnswer]);
    const currentMeaningAnswerText = React.useMemo(() => rightAnswer?.meaning ?? '', [rightAnswer]);
    const listMeaningAnswers = React.useMemo<AnswerViewModel[]>(
        () => Vocabulary.getMapper().mapFromListEntitiesToListAnswerMeaningViewModels(listAnswers),
        [listAnswers],
    );

    return {
        listMeaningAnswers,
        currentMeaningAnswerText,
        meaningAnswerUniqueKey,
    };
}
