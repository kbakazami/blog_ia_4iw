module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['dotenv/config'],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    moduleFileExtensions: [
        'js',
        'ts'
    ],
    modulePathIgnorePatterns: [
        "node_modules/",
        "dist/"
    ],
    testMatch: [
        '**/test/**/*.test.(ts|js)'
    ],
};