# eslint-plugin-react-native-i18n

ESLint plugin for React Native and [i18n](https://github.com/fnando/i18n-js)

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-react-native-i18n`:

```
$ npm install eslint-plugin-react-native-i18n --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-react-native-i18n` globally.

## Usage

Add `react-native-i18n` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "react-native-i18n"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "react-native-i18n/no-unknown-key": "error"
    }
}
```

Then add the required settings under the sessions section.

```json
{
    "settings": {
        "i18n": {
            "languages": {
                "en": "i18n/en.js",
                "nl": "i18n/nl.json",
            }
        }
    }
}
```

Note that using `.js` language files is supported but you can't use ES6's `export default { .. }`. Use `module.export = { .. }` instead.



