module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/tests/jest/__mocks__/styleMock.js',
      }
}