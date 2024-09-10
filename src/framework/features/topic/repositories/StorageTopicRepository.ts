import { store } from '@/framework/store';
import { ArrayHelper } from '@/core/helpers/ArrayHelper';
import { StorageTopicRepositoryInterface } from '@/core/features/topic/interface-adapters/StorageTopicRepositoryInterface';
import { TopicEntity } from '@/core/features/topic/entities/TopicEntity';
import { GetListTopicsResult } from '@/core/features/topic/models/GetListTopicsResult';
import { GetTopicResult } from '@/core/features/topic/models/GetTopicResult';
import { setListTopics } from '../redux/slice';

export class StorageTopicRepository implements StorageTopicRepositoryInterface {
    setList(list: TopicEntity[]): void {
        store.dispatch(setListTopics(list));
    }

    getAll(): GetListTopicsResult {
        const result = new GetListTopicsResult();

        const data = store.getState().topic.list;
        if (ArrayHelper.isHasItems(data)) {
            result.success = true;
            result.data = data;
        }

        return result;
    }

    get(id: number): GetTopicResult {
        const result = new GetTopicResult();

        const getAllResult = this.getAll();
        const data = getAllResult.data.find((item) => item.id === id);
        if (data) {
            result.success = true;
            result.data = data;
        }

        return result;
    }
}
