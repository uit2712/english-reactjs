import type { Config } from 'jest';
import { resolve } from 'path';

const config: Config = {
    verbose: true,
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleNameMapper: {
        '^@/core/(.*)$': resolve(__dirname, './src/core/$1'),
        '^@/framework/(.*)$': resolve(__dirname, './src/framework/$1'),
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
