#!/usr/bin/env node
'use strict';

const disallowedProperties = require('./disallowedProperties.js');
const stylelint = require('stylelint');

const ruleName = 'plugin/stylelint-disallow-bootstrap-properties';
const messages = stylelint.utils.ruleMessages(ruleName, {
	rejected: (property, value, altBootstrapClass) =>
		`Unexpected property "${property}" with value "${value}", use "${altBootstrapClass}" bootstrap class or it's breakpoint variant instead`,
});

const queryChecker = ({ params, type, name }) => {
	const bootstrapQueries = [
		'max-width: 575.98px',
		'max-width: 767.98px',
		'max-width: 991.98px',
		'max-width: 1199.98px',
		'max-width: 1399.98px',
	];

	if (type === 'root' || name !== 'media') {
		return false;
	}

	// the regex outputs an array of all numbers in the sting.
	const numbers = params.match(/(-\d+|\d+)(,\d+)*(\.\d+)*/g);

	if (numbers.length === 1) {
		let result = true;
		const n = numbers[0];

		bootstrapQueries.forEach((e) => {
			const width = e.match(/(-\d+|\d+)(,\d+)*(\.\d+)*/g)[0];

			if (Math.abs(Number(width) - Number(n)) <= 50) {
				result = false;
			}
		});

		return result;
	}

	return true;
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
			// We can expose value with decl.value
			const { prop, value, parent } = decl;

			const { selector } = parent;

			if (queryChecker(parent.parent)) {
				return;
			}

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
		});
	};
});

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
