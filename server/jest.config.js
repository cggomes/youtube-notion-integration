/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  clearMocks: true,
  restoreMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
    "text",
    "lcov"
  ],
  testEnvironment: "node",
  watchPathIgnorePatterns: [
    "node_modules"
  ],
  transformIgnorePatterns: [
    "node_modules"
  ],
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/index.js",
    "!src/youtube/**/*.js",
    "!src/notion/**/*.js",
    "!src/routes/**/*.js",
  ]
};
