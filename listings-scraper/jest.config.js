const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "swiper/react": "swiper/react/swiper-react.js",
    "swiper/css": "swiper/swiper.min.css",
  },
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  transformIgnorePatterns: [
    "/node_modules/((?!markdown-to-jsx) | (?!swiper)).*/",
  ],
};

const asyncConfig = createJestConfig(customJestConfig);

module.exports = async () => {
  const config = await asyncConfig();
  config.transformIgnorePatterns = customJestConfig.transformIgnorePatterns;

  return config;
};
