import type { Config } from 'jest';

const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./paths.json');

const config: Config = {
    verbose: true,
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths),
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
    moduleDirectories: ['node_modules', '<rootDir>/'],
    modulePaths: ['<rootDir>'],
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
    },
    testEnvironment: '@happy-dom/jest-environment',
    transformIgnorePatterns: ['node_modules'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['./src/setupTests.ts'],
};

export default config;
