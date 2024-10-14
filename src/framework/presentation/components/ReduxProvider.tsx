import { Provider } from 'react-redux';

export const ReduxProvider = ({ children, reduxStore }: { children: any; reduxStore: any }) => <Provider store={reduxStore}>{children}</Provider>;
