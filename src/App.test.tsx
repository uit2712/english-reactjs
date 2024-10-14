import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import App from './App';
import { ReduxProvider } from './framework/presentation/components/ReduxProvider';
import { store } from './framework/store';

test('renders learn react link', () => {
    render(
        <ReduxProvider reduxStore={store}>
            <App />
        </ReduxProvider>,
    );
    const linkElement = screen.getByText(/Nhóm từ vựng/i);
    expect(linkElement).toBeInTheDocument();
});
