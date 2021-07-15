
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/', '/database/*'],
  modulePathIgnorePatterns: ["<rootDir>/src/"],
  collectCoverage: true,
  verbose: true,
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
