import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jest-environment-jsdom",
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 100,
      // branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};

export default createJestConfig(config);
