import { TopicEntity } from '@/core/features/topic/entities/TopicEntity';
import TopicItem from '../topic-item';

export default function ListTopicItems({ list }: { list: TopicEntity[] }) {
    return (
        <>
            {list.map((item) => (
                <TopicItem
                    key={item.id}
                    item={item}
                />
            ))}
        </>
    );
}
