// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

process.env = Object.assign(process.env, { REACT_APP_BASE_API_URL: 'http://www.english-api.com' });

// Manually load ts-node and tsconfig
require('ts-node').register({
    transpileOnly: true,
});

// Manually map paths
const { compilerOptions } = require('../paths.json');
const tsConfigPaths = require('tsconfig-paths');

tsConfigPaths.register({
    baseUrl: '../',
    paths: compilerOptions.paths,
});
