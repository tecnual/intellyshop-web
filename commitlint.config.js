const Configuration = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'always', ['sentence-case']],
  },
};

module.exports = Configuration;

