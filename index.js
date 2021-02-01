#!/usr/bin/env node
'use strict';

const disallowedProperties = require('./disallowedProperties.js');
const stylelint = require('stylelint');

const ruleName = 'plugin/stylelint-disallow-bootstrap-properties';
const messages = stylelint.utils.ruleMessages(ruleName, {
	rejected: (property, value, altBootstrapClass) =>
		`Unexpected property "${property}" with value "${value}", use "${altBootstrapClass}" bootstrap class or it's breakpoint variant instead`,
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

			const { params, type } = parent.parent;

			const bootstrapQueries = [
				'max-width: 575.98px',
				'max-width: 767.98px',
				'max-width: 991.98px',
				'max-width: 1199.98px',
				'max-width: 1399.98px',
			];

			if (
				type === 'root' ||
				(type === 'atrule' && bootstrapQueries.some((element) => params.includes(element)))
			) {
				if (selector.includes(':')) {
					return;
				}

				const unprefixedProp = prop.replace(/^-\w+-/, '');
				const currentProp = disallowedProperties[unprefixedProp];

				const altBootstrapClass = currentProp && currentProp.values[value];

				if (altBootstrapClass) {
					stylelint.utils.report({
						message: messages.rejected(prop, value, altBootstrapClass),
						node: decl,
						result,
						ruleName,
					});
				}
			}
		});
	};
});

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
