import axios, { HttpStatusCode } from 'axios';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { GetListGroupsResult } from '@/core/features/group/models/GetListGroupsResult';
import { pageListGroupsConstant } from '@/core/pages/list-groups/constants/PageListGroupsConstant';
import { BASE_API_URL } from '@/framework/constants/Api';
import { store } from '@/framework/store';
import { render, renderHook, screen, waitFor } from '@testing-library/react';

import { emptyPromiseFunction } from '../../functions';
import ListGroups from './';
import * as hooks from './hooks';

describe('Page list groups', () => {
    const { title } = pageListGroupsConstant;

    it('render title', async () => {
        render(
            <Provider store={store}>
                <ListGroups />
            </Provider>,
        );

        await waitFor(async () => {
            const titleElement = screen.getByTestId('page-list-groups-title');
            expect(titleElement).toBeInTheDocument();
        });
    });

    it('call api get list groups', async () => {
        render(
            <Provider store={store}>
                <ListGroups />
                <ToastContainer />
            </Provider>,
        );

        expect(axios.get).toHaveBeenCalledWith(BASE_API_URL + '/groups', { params: { page: 0, perPage: 10 } });
    });

    it('render loading spinner', async () => {
        const mockGetList = jest.spyOn(hooks, 'useListGroups');
        mockGetList.mockReturnValue({
            list: [],
            title,
            isLoading: true,
            isShowButtonRetry: false,
            onClickRetry: emptyPromiseFunction,
        });

        render(
            <Provider store={store}>
                <ListGroups />
            </Provider>,
        );

        await waitFor(async () => {
            const loadingElement = await screen.findByTestId('loading');
            expect(loadingElement).toBeInTheDocument();
        });
    });

    it('fetch data error then show toast error', async () => {
        const apiResponse = new GetListGroupsResult();
        apiResponse.message = 'Network Error';
        apiResponse.responseCode = HttpStatusCode.BadGateway;

        renderHook(() => hooks.useShowMessage(apiResponse));

        render(
            <Provider store={store}>
                <ListGroups />
                <ToastContainer />
            </Provider>,
        );

        await waitFor(async () => {
            const errorElement = await screen.findByText('Network Error');
            expect(errorElement).toBeInTheDocument();
        });
    });

    it('show button retry', async () => {
        const mockUseListGroups = jest.spyOn(hooks, 'useListGroups');
        mockUseListGroups.mockReturnValue({
            isLoading: false,
            list: [],
            title: '',
            isShowButtonRetry: true,
            onClickRetry: emptyPromiseFunction,
        });

        render(
            <Provider store={store}>
                <ListGroups />
            </Provider>,
        );

        await waitFor(async () => {
            const buttonRetryElement = await screen.findByTestId('button-retry');
            expect(buttonRetryElement).toBeInTheDocument();
        });
    });

    it('hide button retry', async () => {
        const mockUseListGroups = jest.spyOn(hooks, 'useListGroups');
        mockUseListGroups.mockReturnValue({
            isLoading: false,
            list: [],
            title: '',
            isShowButtonRetry: false,
            onClickRetry: emptyPromiseFunction,
        });

        render(
            <Provider store={store}>
                <ListGroups />
            </Provider>,
        );

        expect(screen.queryByTestId('button-retry')).toBeFalsy();
    });

    it('render no group(s)', async () => {
        const mockGetList = jest.spyOn(hooks, 'useListGroups');
        mockGetList.mockReturnValue({
            list: [],
            title,
            isLoading: false,
            isShowButtonRetry: false,
            onClickRetry: emptyPromiseFunction,
        });

        render(
            <Provider store={store}>
                <ListGroups />
            </Provider>,
        );

        await waitFor(async () => {
            const noGroupsElement = await screen.findByTestId('no-groups-text');
            expect(noGroupsElement).toBeInTheDocument();
        });
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
            isShowButtonRetry: false,
            onClickRetry: emptyPromiseFunction,
        });

        render(
            <Provider store={store}>
                <ListGroups />
            </Provider>,
        );

        await waitFor(async () => {
            const firstButtonElement = await screen.findByTestId('button-group-1');
            expect(firstButtonElement).toBeInTheDocument();
        });
    });

    it('render two buttons', async () => {
        const list = [
            {
                id: 1,
                name: 'Tiếng Anh',
            },
            {
                id: 2,
                name: 'Tiếng Việt',
            },
        ];

        const mockGetList = jest.spyOn(hooks, 'useListGroups');
        mockGetList.mockReturnValue({
            list,
            title,
            isLoading: false,
            isShowButtonRetry: false,
            onClickRetry: emptyPromiseFunction,
        });

        render(
            <Provider store={store}>
                <ListGroups />
            </Provider>,
        );

        for (const item of list) {
            await waitFor(async () => {
                const buttonElement = await screen.findByTestId(`button-group-${item.id}`);
                expect(buttonElement).toBeInTheDocument();
            });
        }
    });
});
