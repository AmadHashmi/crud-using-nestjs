module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '../..',
  roots: ['<rootDir>/src', '<rootDir>/test/unit'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^test/(.*)$': '<rootDir>/test/$1',
  },
  testMatch: ['**/*.spec.ts', '!**/*.e2e-spec.ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.module.ts', '!src/main.ts'],
  coverageDirectory: '<rootDir>/coverage/unit',
};
