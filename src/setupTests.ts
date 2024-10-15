// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import axios from 'axios';

process.env = Object.assign(process.env, { REACT_APP_BASE_API_URL: 'http://www.english-api.com' });

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
let payload: any = {};
mockedAxios.get.mockReturnValueOnce(payload);
