const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.module\\.scss$': 'identity-obj-proxy',
    '\\.scss$': '<rootDir>/__mocks__/styleMock.js',
  },
}
