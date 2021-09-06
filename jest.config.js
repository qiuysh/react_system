module.exports = {
  roots: ["<rootDir>"],
  // testEnvironment: "jsdom",
  setupFiles: ['<rootDir>/src/setupTests.ts'], // 运行测试前可执行的脚本(包含enzyme的注册)
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  // snapshotSerializers: ["enzyme-to-json/serializer"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: [
    '<rootDir>/dist/', 
    '<rootDir>/.vscode/',
    '<rootDir>/node_modules/(?!(lodash-es|other-es-lib|@ant-design))',
    '<rootDir>/src/components/customIcon',
  ],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@assets(.*)$': '<rootDir>/src/assets$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    // '^@assets/fonts/iconfont.js$': '<rootDir>/src/__test__/iconMock',
  },
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/', '<rootDir>/.vscode/'], //转换时需忽略的文件
  collectCoverageFrom: ['<rootDir>/src/**/*.{tsx,ts,js}'], // 哪些文件需要收集覆盖率信息
  coverageDirectory: '<rootDir>/.coverage', // 输出覆盖信息文件的目录
  coveragePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/', '<rootDir>/.vscode/'],
  testMatch: [ // 匹配的测试文件
    '<rootDir>/src/__tests__/**/?(*.)(spec|test).{ts,tsx}',
  ]
}