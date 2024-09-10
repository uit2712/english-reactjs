import { store } from '@/framework/store';
import { VocabularyEntity } from '../../../../core/features/vocabulary/entities/VocabularyEntity';
import { ArrayHelper } from '@/core/helpers/ArrayHelper';
import { GroupEntity } from '@/core/features/group/entities/GroupEntity';
import { StorageQuestionaireRepositoryInterface } from '@/core/features/questionaire/interface-adapters/StorageQuestionaireRepositoryInterface';
import { TopicEntity } from '@/core/features/topic/entities/TopicEntity';
import { setListSelectedVocabularies, setSelectedGroup, setSelectedTopic } from '../redux/slice';

export class StorageVocabularyQuestionaireRepository implements StorageQuestionaireRepositoryInterface<VocabularyEntity> {
    setTopic(topic?: TopicEntity | null): void {
        if (!topic) {
            return;
        }

        store.dispatch(setSelectedTopic(topic));
    }

    setList(list?: VocabularyEntity[]): void {
        if (!list || ArrayHelper.isHasItems(list) === false) {
            return;
        }

        store.dispatch(setListSelectedVocabularies(list));
    }

    getList(): VocabularyEntity[] {
        return store.getState().questionaire.listSelectedVocabularies;
    }

    getTotalVocabulariesTitle(): string {
        const list = this.getList();
        return `Tổng cộng có ${list.length} từ vựng`;
    }

    getTopicTitle(): string {
        const topic = this.getTopic();
        if (!topic) {
            return '';
        }

        return topic.name;
    }

    private getTopic(): TopicEntity | null {
        return store.getState().questionaire.selectedTopic;
    }

    setGroup(group?: GroupEntity | null): void {
        if (!group) {
            return;
        }

        store.dispatch(setSelectedGroup(group));
    }

    getGroupId(): number {
        const group = this.getGroup();
        if (!group) {
            return 0;
        }

        return group.id;
    }

    private getGroup(): GroupEntity | null {
        return store.getState().questionaire.selectedGroup;
    }

    getTopicId(): number {
        const topic = this.getTopic();
        if (!topic) {
            return 0;
        }

        return topic.id;
    }
}
