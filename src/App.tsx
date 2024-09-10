import { RouterSetter } from './framework/presentation/components/RouterSetter';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import routes from './framework/router';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import 'primeicons/primeicons.css';

function App() {
    return (
        <Container>
            <ToastContainer />
            <Router>
                <RouterSetter />
                <Routes>
                    {routes.map(({ path, Element }) => (
                        <Route
                            key={path}
                            path={path}
                            element={
                                <Suspense>
                                    <Element />
                                </Suspense>
                            }
                        />
                    ))}
                </Routes>
            </Router>
        </Container>
    );
}

const Container = styled.main`
    max-width: 600px;
    margin: 0 auto;
    padding: 0 1em;
`;

export default App;
