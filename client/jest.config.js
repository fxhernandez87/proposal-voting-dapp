module.exports = {
  setupFilesAfterEnv: [
    'react-testing-library/cleanup-after-each',
  ],
  moduleDirectories: [
    'node_modules',
      'src/utils', // a utility folder
      __dirname, // the root directory
  ],
};