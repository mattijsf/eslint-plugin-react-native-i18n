const fs = require('fs');
const path = require('path');

const recursiveGet = (object, keys, index) => {
  if (keys.length - index === 1) {
    return object[keys[index]];
  }

  return object[keys[index]] ? recursiveGet(object[keys[index]], keys, index + 1) : undefined;
};

exports.has = (object, key) => !!recursiveGet(object, key.split('.'), 0);

exports.get = (object, key) => recursiveGet(object, key.split('.'), 0);

exports.getKeyValue = key => {
  if (key.type === 'Literal') {
    return key.value;
  } else if (key.type === 'TemplateLiteral' && key.quasis.length === 1) {
    return key.quasis[0].value.cooked;
  }

  return null;
};

var expireAt = null;
var langConfig = null;

exports.getLangConfig = (config) => {
  if (!expireAt || expireAt <= Date.now() || config.disableCache) {
    const languages = config.languages
    langConfig = Object.keys(languages).map((name) => {
      try {
        const translationPath = languages[name]
        var langFile = null
        const absolutePath = path.resolve(`${process.cwd()}/${translationPath}`)
        if (translationPath.toLowerCase().endsWith('json')) {
          langFile = JSON.parse(fs.readFileSync(absolutePath).toString());
        } else {
          // invalidate require cache for translation file to reload possible changes
          delete require.cache[require.resolve(absolutePath)]
          langFile = require(absolutePath) // ES6 export default won't work
        }

        return { name, translation: langFile };
      } catch (e) {
        return { name, translation: null };
      }
    });
    expireAt = Date.now() + 500;
  }

  return langConfig;
};
