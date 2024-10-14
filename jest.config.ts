import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    rootDir: 'src',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleNameMapper: {
        '^@/core/(.*)$': 'core/$1',
        '^@/framework/(.*)$': 'framework/$1',
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
    moduleDirectories: ['node_modules', '<rootDir>/'],
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
    },
    testEnvironment: '@happy-dom/jest-environment',
    transformIgnorePatterns: ['node_modules'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;
