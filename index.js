#!/usr/bin/env node
'use strict';

const disallowedProperties = require('./disallowedProperties.js');
const stylelint = require('stylelint');

const ruleName = 'plugin/stylelint-disallow-bootstrap-properties';
const messages = stylelint.utils.ruleMessages(ruleName, {
	rejected: (property) => `Unexpected property "${property}", use bootstrap class instead`,
});

const rule = stylelint.createPlugin(ruleName, (primaryOption) => {
	return function (root, result) {
		const validOptions = stylelint.utils.validateOptions(result, ruleName, {
			actual: primaryOption,
			possible: [true],
		});

		if (!validOptions || !(primaryOption === true)) {
			return;
		}

		root.walkRules(({ selector }) => {
			if (selector.includes(':')) {
				return;
			}

			root.walkDecls((decl) => {
				const { prop } = decl;

				if (disallowedProperties[prop.replace(/^-\w+-/, '')]) {
					stylelint.utils.report({
						message: messages.rejected(prop),
						node: decl,
						result,
						ruleName,
					});
				}
			});
		});
	};
});

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
