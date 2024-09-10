import { createContext } from 'react';

export interface TestContextInterface {
    onSelectCorrect(message: string): void;
    onComplete(): void;
    onChoose(totalChosedTimes: number): void;
    onSelectWrong(message: string): void;
    onNext(): void;
}

export const TestContext = createContext<TestContextInterface>({
    onSelectCorrect: (message: string) => {},
    onComplete: () => {},
    onChoose: (totalChosedTimes: number) => {},
    onSelectWrong: (message: string) => {},
    onNext: () => {},
});
