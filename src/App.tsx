import { RouterSetter } from './framework/presentation/components/RouterSetter';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import routes from './framework/router';

function App() {
    return (
        <>
            <ToastContainer />
            <Router>
                <RouterSetter />
                <Routes>
                    {routes.map(({ path, Element }) => (
                        <Route
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
        </>
    );
}

export default App;
