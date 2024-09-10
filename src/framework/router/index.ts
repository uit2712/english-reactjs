import { ROUTES } from '@/core/constants/Routes';
import ListGroups from '../presentation/pages/list-groups';
import ListTopics from '../presentation/pages/list-topics';
import TopicDetail from '../presentation/pages/topic-detail';
import Test from '../presentation/pages/test';

const { completedTopic, home, test, topicDetail, topics } = ROUTES;

const routes = [
    { name: home.name, path: home.path, Element: ListGroups },
    { name: topics.name, path: topics.alternativePath, Element: ListTopics },
    { name: topicDetail.name, path: topicDetail.alternativePath, Element: TopicDetail },
    { name: test.name, path: test.path, Element: Test },
];

export default routes;
