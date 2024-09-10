import { store } from '@/framework/store';
import { ArrayHelper } from '@/core/helpers/ArrayHelper';
import { StorageGroupRepositoryInterface } from '@/core/features/group/interface-adapters/StorageGroupRepositoryInterface';
import { GroupEntity } from '@/core/features/group/entities/GroupEntity';
import { GetListGroupsResult } from '@/core/features/group/models/GetListGroupsResult';
import { GetGroupResult } from '@/core/features/group/models/GetGroupResult';
import { setListGroups } from '../redux/slice';

export class StorageGroupRepository implements StorageGroupRepositoryInterface {
    setList(list: GroupEntity[]): void {
        store.dispatch(setListGroups(list));
    }

    getAll(): GetListGroupsResult {
        const result = new GetListGroupsResult();

        const data = store.getState().group.list;
        if (ArrayHelper.isHasItems(data)) {
            result.success = true;
            result.data = data;
        }

        return result;
    }

    get(id: number): GetGroupResult {
        const result = new GetGroupResult();

        const getAllResult = this.getAll();
        const data = getAllResult.data.find((item) => item.id === id);
        if (data) {
            result.success = true;
            result.data = data;
        }

        return result;
    }
}
