// /**
//  * @fileoverview Verify that translation keys are present in your translation files
//  * @author mattijsf
//  */

const { getKeyValue, get, has, getLangConfig } = require('../utils/utils');
module.exports = {
  meta: {
    docs: {
      description: 'ensures that used translate key is in translation file',
      category: 'Possible errors',
    },
    schema: [],
  },
  create(context) {
    const config = context.settings.i18n;

    if (!config) {
      context.report({
        node,
        severity: 2,
        message: 'Missing eslint config i18n',
      });
      return {};
    }

    return {
      CallExpression(node) {
        const funcName = (node.callee.type === 'MemberExpression' && node.callee.property.name) || node.callee.name;

        if (funcName !== 't' || !node.arguments || !node.arguments.length) {
          return;
        }

        const [keyNode] = node.arguments;
        const key = getKeyValue(keyNode);

        if (!key) {
          return;
        }

        getLangConfig(config).forEach(({ name, translation }) => {
          if (!translation) {
            context.report({
              node,
              severity: 2,
              message: `'${name}' language is missing`,
            });

            return;
          }

          if (!has(translation, key)) {
            context.report({
              node,
              severity: 2,
              message: `'${key}' is missing from '${name}' language`,
            });

            return;
          }
        });
      },
    };
  },
};
