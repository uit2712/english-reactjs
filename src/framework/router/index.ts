import { ROUTES } from '@/core/constants/Routes';
import ListGroups from '../presentation/pages/list-groups';

const { completedTopic, home, test, topicDetail, topics } = ROUTES;

const routes = [{ name: home.name, path: home.path, Element: ListGroups }];

export default routes;
