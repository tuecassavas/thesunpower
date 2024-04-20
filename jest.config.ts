module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['app/rest/tests'],
  modulePaths: ['app'],
  rootDir: './',
  setupFilesAfterEnv: ['./app/rest/tests/bootstrap.ts'],
  moduleNameMapper: {
    '^app/(.*)$': '<rootDir>/app/$1',
    '^shared/(.*)$': '<rootDir>/app/shared/$1',
    '^rest/(.*)$': '<rootDir>/app/rest/$1'
  }
};
