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

    let langConfig = undefined;
    try {
      if (config && config.languages) {
        langConfig = getLangConfig(config);
      }
    } catch (error) {
      context.report({
        loc: { line: 0, column: 0 },
        severity: 2,
        message: `Failed to load translation files: ${error.message}`,
      });
      return {};
    }

    return {
      CallExpression(node) {
        if (!config || !config.languages || !langConfig) {
          return;
        }
        const funcName = (node.callee.type === 'MemberExpression' && node.callee.property.name) || node.callee.name;

        if (funcName !== 't' || !node.arguments || !node.arguments.length) {
          return;
        }

        const [keyNode] = node.arguments;
        const key = getKeyValue(keyNode);

        if (!key) {
          return;
        }

        langConfig.forEach(({ name, translation }) => {
          if (!translation) {
            context.report({
              node,
              severity: 2,
              message: `'${name}' language is missing`,
            });

            return;
          }

          if (!has(translation, key, config)) {
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
