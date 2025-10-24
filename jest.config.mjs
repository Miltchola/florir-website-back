// jest.config.mjs

export default {
  testEnvironment: 'node',
  testMatch: ['**/*.test.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  verbose: true,
  // This line loads your .env file before running tests
  setupFiles: ['dotenv/config'],
};