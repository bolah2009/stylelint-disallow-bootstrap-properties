#!/usr/bin/env node
'use strict';

const disallowedProperties = require('./disallowedProperties.js');
const stylelint = require('stylelint');

const ruleName = 'plugin/stylelint-disallow-bootstrap-properties';
const messages = stylelint.utils.ruleMessages(ruleName, {
	rejected: (property, value, altBootstrapClass) =>
		`Unexpected property "${property}" with value "${value}", use "${altBootstrapClass}" bootstrap class or it's breakpoint variant instead`,
});

const useBootstrapMediaQuery = ({ params, type, name }) => {
	const bootstrapQueries = [
		'max-width: 575.98px',
		'max-width: 767.98px',
		'max-width: 991.98px',
		'max-width: 1199.98px',
		'max-width: 1399.98px',
	];

	if (type === 'root' || name !== 'media') {
		return true;
	}

	// the regex matches all numbers in a string.
	const numRegex = /(-\d+|\d+)(,\d+)*(\.\d+)*/g;
	const numbers = params.match(numRegex);

	if (numbers.length === 1 && /max-width/g.test(params)) {
		const firstNumber = numbers[0];

		return bootstrapQueries.some((query) => {
			const width = query.match(numRegex)[0];

			return Math.abs(Number(width) - Number(firstNumber)) <= 50;
		});
	}

	return false;
};

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
			const { prop, value, parent } = decl;

			const { selector, parent: grandParent } = parent;

			if (selector && selector.includes(':')) {
				return;
			}

			const unprefixedProp = prop.replace(/^-\w+-/, '');
			const currentProp = disallowedProperties[unprefixedProp];

			const altBootstrapClass = currentProp && currentProp.values[value];

			if (altBootstrapClass && useBootstrapMediaQuery(grandParent)) {
				stylelint.utils.report({
					message: messages.rejected(prop, value, altBootstrapClass),
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
