/**
 * @fileoverview Verify that translation keys are present in your translation files
 * @author mattijsf
 */

const RuleTester = require('eslint/lib/testers/rule-tester');
const rule = require('../../../lib/rules/no-unknown-key');

const ruleTester = new RuleTester();

const settings = {
    i18n: {
        disableCache: true,
        allowEmpty: true,
        languages: {
            enJS: 'test/i18n/en.js',
            enJSON: 'test/i18n/en.json',
            nlJS: 'test/i18n/nl.js',
            nlJSON: 'test/i18n/nl.json'
        }
    },
};

ruleTester.run("no-unknown-key", rule, {
    valid: [
        { code: 'I18n.t("basic")', settings },
        { code: 'I18n.t("iAmEmpty")', settings },
        { code: 'I18n.t("some.nested.item", {count: 1})', settings },
        { code: 'I18n.t("plural")', settings },
        { code: 'I18n.t("plural", {count: 1})', settings },
        { code: 'I18n.t("plural", {count: 5})', settings },
        { code: 'I18n.t("flattened_plural")', settings },
        { code: 'I18n.t("flattened_plural", {count: 1})', settings },
        { code: 'I18n.t("flattened_plural", {count: 5})', settings },
    ],
    invalid: [
        {
            code: 'I18n.t("foo")',
            settings,
            errors: [
                {
                    message: "'foo' is missing from 'enJS' language",
                    type: 'CallExpression',
                },
                {
                    message: "'foo' is missing from 'enJSON' language",
                    type: 'CallExpression',
                },
                {
                    message: "'foo' is missing from 'nlJS' language",
                    type: 'CallExpression',
                },
                {
                    message: "'foo' is missing from 'nlJSON' language",
                    type: 'CallExpression',
                },
            ],
        },
        {
            code: 'I18n.t("iAmMissingInNL")',
            settings,
            errors: [
                {
                    message: "'iAmMissingInNL' is missing from 'nlJS' language",
                    type: 'CallExpression',
                },
                {
                    message: "'iAmMissingInNL' is missing from 'nlJSON' language",
                    type: 'CallExpression',
                },
            ],
        },
        {
            code: 'I18n.t("iAmEmpty")',
            settings: {
                i18n: {
                    disableCache: true,
                    allowEmpty: false,
                    languages: {
                        enJS: 'test/i18n/en.js',
                    }
                },
            },
            errors: [
                {
                    message: "'iAmEmpty' is missing from 'enJS' language",
                    type: 'CallExpression',
                },
            ],
        },
    ],
});