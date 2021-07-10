
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/', '/database/*'],
  collectCoverage: true,
  verbose: true,
  setupFilesAfterEnv: ['./jest.setup.js'],
};
