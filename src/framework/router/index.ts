import { ROUTES } from '@/core/constants/Routes';
import ListGroups from '../presentation/pages/list-groups';
import ListTopics from '../presentation/pages/list-topics';

const { completedTopic, home, test, topicDetail, topics } = ROUTES;

const routes = [
    { name: home.name, path: home.path, Element: ListGroups },
    { name: topics.name, path: topics.alternativePath, Element: ListTopics },
];

export default routes;
