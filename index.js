#!/usr/bin/env node
'use strict';

const disallowedProperties = require('./disallowedProperties.js');
const stylelint = require('stylelint');

const ruleName = 'plugin/stylelint-disallow-bootstrap-properties';
const messages = stylelint.utils.ruleMessages(ruleName, {
	rejected: (property, altBootstrapClass) =>
		`Unexpected property "${property}", use "${altBootstrapClass}" bootstrap class or it's breakpoint variant instead`,
});

const rule = stylelint.createPlugin(ruleName, (primaryOption) => {
	return (root, result) => {
		const validOptions = stylelint.utils.validateOptions(result, ruleName, {
			actual: primaryOption,
			possible: [true],
		});

		if (!validOptions || !(primaryOption === true)) {
			return;
		}

		root.walkDecls((decl) => {
			// We can expose value with decl.value
			const { prop, value, parent } = decl;

			const { selector } = parent;

			if (selector.includes(':')) {
				return;
			}

			const unprefixedProp = prop.replace(/^-\w+-/, '');
			const currentProp = disallowedProperties[unprefixedProp];

			if (!currentProp) {
				return;
			}

			const currentValue = currentProp.values[value];

			if (currentValue) {
				stylelint.utils.report({
					message: messages.rejected(prop, currentValue),
					node: decl,
					result,
					ruleName,
				});
			}
		});
	};
});

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
