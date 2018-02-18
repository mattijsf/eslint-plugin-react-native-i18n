/**
 * @fileoverview ESLint plugin for React Native + i18n
 * @author mattijsf
 */

const noUnknownKey = require('./rules/no-unknown-key');

module.exports = {
  rules: {
    'no-unknown-key': noUnknownKey,
  },
};