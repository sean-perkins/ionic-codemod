import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  clearMocks: true,
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testMatch: [
    "<rootDir>/src/**/*.spec.ts"
  ]
}

export default config;