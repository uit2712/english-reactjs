import { NavigateFunction } from 'react-router-dom';

import { ROUTES } from '@/core/constants/Routes';
import {
    RouterRepositoryInteface
} from '@/core/features/navigator/interface-adapters/RouterRepositoryInteface';
import { NumberHelper } from '@/core/helpers/NumberHelper';
import { StringHelper } from '@/core/helpers/StringHelper';

const { completedTopic, test, topicDetail, topics } = ROUTES;

export class RouterRepository implements RouterRepositoryInteface<NavigateFunction> {
    private router?: NavigateFunction;

    setRouter(router: NavigateFunction): void {
        this.router = router;
    }

    navigate<T>(path: string, params?: T | null): void {
        if (!this.router || StringHelper.isHasValue(path) === false) {
            return;
        }

        const query = params ? params : {};

        this.router(path, {
            state: query,
        });
    }

    navigateToListTopicsOfGroup(groupId: number): void {
        if (!this.router || NumberHelper.isPositive(groupId) === false) {
            return;
        }

        this.router(topics.alternativePath, {
            state: {
                groupId,
            },
        });
    }

    navigateToTopicDetail(topicId: number): void {
        if (!this.router || NumberHelper.isPositive(topicId) === false) {
            return;
        }

        this.router(topicDetail.alternativePath, {
            state: {
                id: topicId,
            },
        });
    }

    navigateToCompletedTopic(totalCorrectAnswersText: string, testResultMessage: string) {
        if (!this.router) {
            return;
        }

        this.router(completedTopic.path, {
            state: {
                totalCorrectAnswersText,
                testResultMessage,
            },
        });
    }

    navigateToTest(): void {
        if (!this.router) {
            return;
        }

        this.router(test.path);
    }
}
