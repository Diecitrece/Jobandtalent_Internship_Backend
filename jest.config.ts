import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  verbose: true,
  roots: ['src'],
  moduleNameMapper: {
    '^@ports/(.*)$': '<rootDir>/src/core/application/ports/$1',
    '^@use-cases/(.*)$': '<rootDir>/src/core/application/use-cases/$1',
    '^@domain/(.*)$': '<rootDir>/src/core/domain/$1',
    '^@shared/(.*)$': '<rootDir>/src/infrastructure/shared/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@user-interface/(.*)$': '<rootDir>/src/user-interface/$1',
  },
};
export default config;
