'use strict';

const { messages, ruleName } = require('..');

testRule({
	ruleName,
	plugins: ['./index.js'],

	config: [''],

	accept: [
		{
			code: 'div { display: flex; }',
			description: 'When config is an invalid empty string',
		},
	],
});

testRule({
	ruleName,
	plugins: ['./index.js'],

	config: [[]],

	accept: [
		{
			code: 'div { display: flex; }',
			description: 'When config is an invalid empty array',
		},
	],
});

testRule({
	ruleName,
	plugins: ['./index.js'],

	config: true,

	accept: [
		{
			code: 'a { color: pink; }',
			description: 'When property is allowed',
		},
		{
			code: 'a { top: 0; color: pink; }',
			description: 'When two or more properties is allowed',
		},
		{
			code: 'div:hover { display: flex; }',
			description: 'When property is disallowed but uses psuedo class selector',
		},
		{
			code: 'div::before { display: flex; }',
			description: 'When property is disallowed but uses psuedo element selector',
		},
	],

	reject: [
		{
			code: 'div { display: flex; }',
			message: messages.rejected('display'),
			line: 1,
			column: 7,
			description: 'When property is disallowed',
		},
	],
});