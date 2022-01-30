module.exports = {
  roots: ['src'],
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
  collectCoverage: true,
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  preset: '@shelf/jest-mongodb'
};
