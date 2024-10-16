import React from 'react';

import { ROUTES } from '@/core/constants/Routes';

import ListGroups from '../presentation/pages/list-groups';

const CompletedTopic = React.lazy(() => import('../presentation/pages/completed-topic'));
const Test = React.lazy(() => import('../presentation/pages/test'));
const TopicDetail = React.lazy(() => import('../presentation/pages/topic-detail'));
const ListTopics = React.lazy(() => import('../presentation/pages/list-topics'));

const { completedTopic, home, test, topicDetail, topics } = ROUTES;

const routes = [
    { name: home.name, path: home.path, Element: ListGroups },
    { name: topics.name, path: topics.alternativePath, Element: ListTopics },
    { name: topicDetail.name, path: topicDetail.alternativePath, Element: TopicDetail },
    { name: test.name, path: test.path, Element: Test },
    { name: completedTopic.name, path: completedTopic.path, Element: CompletedTopic },
];

export default routes;
