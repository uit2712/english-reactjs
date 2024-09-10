import { ROUTES } from '@/core/constants/Routes';
import ListGroups from '../presentation/pages/list-groups';
import ListTopics from '../presentation/pages/list-topics';
import TopicDetail from '../presentation/pages/topic-detail';

const { completedTopic, home, test, topicDetail, topics } = ROUTES;

const routes = [
    { name: home.name, path: home.path, Element: ListGroups },
    { name: topics.name, path: topics.alternativePath, Element: ListTopics },
    { name: topicDetail.name, path: topicDetail.alternativePath, Element: TopicDetail },
];

export default routes;
