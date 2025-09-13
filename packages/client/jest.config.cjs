const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
    __EXTERNAL_SERVER_URL__: process.env.EXTERNAL_SERVER_URL ?? 'http://localhost:3001',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.scss$': '<rootDir>/__mocks__/styleMock.js',
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/node_modules/@gravity-ui/',
    '\\.css$',
  ],
}
