/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {

  // The test environment that will be used for testing
  testEnvironment: "jsdom",
  //setupFiles: ['<rootDir>/jest/setup.js'],
  setupFilesAfterEnv: ['<rootDir>/jest/setup.js', '<rootDir>/jest/set-env-vars.js'],

  /*transformIgnorePatterns: [
    "/node_modules/(?!lucide-react)/" //transform lucide-react files
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",  // Transform JS/JSX/TS/TSX files with Babel
  }*/
};

export default createJestConfig(config);
