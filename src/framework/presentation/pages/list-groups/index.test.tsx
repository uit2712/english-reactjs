import { Provider } from 'react-redux';

import { store } from '@/framework/store';
import { render, screen } from '@testing-library/react';

import ListGroups from './';
import * as hooks from './hooks';

describe('Page list groups', () => {
    it('render title', () => {
        render(
            <Provider store={store}>
                <ListGroups />
            </Provider>,
        );

        const titleElement = screen.getByTestId('page-list-groups-title');
        expect(titleElement).toBeInTheDocument();
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
            title: '123',
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
