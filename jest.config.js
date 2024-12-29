export default {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src'],
  clearMocks: true,
  collectCoverage: true,
  verbose: true,
  transform: {},
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testMatch: ['**/tests/__tests__/**/*.test.js'],
  testPathIgnorePatterns: ['/node_modules/', '/tests/utils/'],
  setupFilesAfterEnv: ['./jest.setup.js'],
};
