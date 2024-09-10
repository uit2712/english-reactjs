import ListAnswersByType from './components/ListAnswersByType';
import { TestContext, TestContextInterface } from './contexts';
import { useTest } from './hooks';

export default function Test() {
    const { next, choose, showSuccessMessage, showErrorMessage, currentQuestion, type, progressText, progressPercent } = useTest();

    const contextValue: TestContextInterface = {
        onChoose: choose,
        onComplete: () => {},
        onSelectCorrect: showSuccessMessage,
        onSelectWrong: showErrorMessage,
        onNext: next,
    };

    return (
        <TestContext.Provider value={contextValue}>
            <ListAnswersByType
                currentQuestion={currentQuestion}
                type={type}
                progressText={progressText}
                progressPercent={progressPercent}
            />
        </TestContext.Provider>
    );
}
