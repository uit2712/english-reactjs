import { Provider } from 'react-redux';

import { pageListGroupsConstant } from '@/core/pages/list-groups/constants/PageListGroupsConstant';
import { store } from '@/framework/store';
import { render, screen } from '@testing-library/react';

import ListGroups from './';
import * as hooks from './hooks';

describe('Page list groups', () => {
    const { title } = pageListGroupsConstant;

    it('render title', () => {
        render(
            <Provider store={store}>
                <ListGroups />
            </Provider>,
        );

        const titleElement = screen.getByTestId('page-list-groups-title');
        expect(titleElement).toBeInTheDocument();
    });

    it('render loading spinner', async () => {
        const mockGetList = jest.spyOn(hooks, 'useListGroups');
        mockGetList.mockReturnValue({
            list: [],
            title,
            isLoading: true,
        });

        render(
            <Provider store={store}>
                <ListGroups />
            </Provider>,
        );

        const loadingElement = await screen.findByTestId('loading');
        expect(loadingElement).toBeInTheDocument();
    });

    it('render no group(s)', async () => {
        const mockGetList = jest.spyOn(hooks, 'useListGroups');
        mockGetList.mockReturnValue({
            list: [],
            title,
            isLoading: false,
        });

        render(
            <Provider store={store}>
                <ListGroups />
            </Provider>,
        );

        const noGroupsElement = await screen.findByTestId('no-groups-text');
        expect(noGroupsElement).toBeInTheDocument();
    });

    it('render single button', async () => {
        const mockGetList = jest.spyOn(hooks, 'useListGroups');
        mockGetList.mockReturnValue({
            list: [
                {
                    id: 1,
                    name: 'Tiếng Anh',
                },
            ],
            title,
            isLoading: false,
        });

        render(
            <Provider store={store}>
                <ListGroups />
            </Provider>,
        );

        const firstButtonElement = await screen.findByTestId('button-group-1');
        expect(firstButtonElement).toBeInTheDocument();
    });
});
