module.exports = {
    testEnvironment: 'jsdom',
    rootDir: 'src',
    moduleNameMapper: {
        '\\.(css)$': '<rootDir>/__tests__/__mocks__/styleMock.js',
    },
    modulePathIgnorePatterns: [
        '<rootDir>/__tests__/__mocks__',
        '<rootDir>/__tests__/__setup__',
    ],
    setupFiles: ['jest-canvas-mock'],
    setupFilesAfterEnv: ['<rootDir>/__tests__/__setup__/setupTests.js'],
};
