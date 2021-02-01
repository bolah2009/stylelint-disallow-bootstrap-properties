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
			code: 'a { top: 2.5; color: pink; }',
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
		{
			code: "@media ('max-width: 800px') { div { display: flex; } }",
			description: 'When property is disallowed but media query is allowed',
		},
	],

	reject: [
		{
			code: 'div { display: none; }',
			message: messages.rejected('display', 'none', 'd-none'),
			line: 1,
			column: 7,
			description: 'When property is disallowed',
		},
		{
			code: "@media ('max-width: 575.98px') { div { display: flex; } }",
			message: messages.rejected('display', 'flex', 'd-flex'),
			line: 1,
			column: 40,
			description: 'When property and its parent is disallowed',
		},
		{
			code: 'div { display: flex; } a:hover { display: inline; }',
			message: messages.rejected('display', 'flex', 'd-flex'),
			line: 1,
			column: 7,
			description: 'When property is disallowed with an additional allowed declaration',
		},
		{
			code: 'div { color: red; display: inline; }',
			message: messages.rejected('display', 'inline', 'd-inline'),
			line: 1,
			column: 19,
			description: 'When property is disallowed with an additional allowed property',
		},
		{
			code: 'div { color: red; flex-direction: column-reverse; }',
			message: messages.rejected('flex-direction', 'column-reverse', 'flex-column-reverse'),
			line: 1,
			column: 19,
			description: 'When property is disallowed with an additional allowed property',
		},
		{
			code: 'div { color: red; justify-content: space-evenly; }',
			message: messages.rejected('justify-content', 'space-evenly', 'justify-content-evenly'),
			line: 1,
			column: 19,
			description: 'When property is disallowed with an additional allowed property',
		},
		{
			code: 'div { color: red; align-content: stretch; }',
			message: messages.rejected('align-content', 'stretch', 'align-content-stretch'),
			line: 1,
			column: 19,
			description: 'When property is disallowed with an additional allowed property',
		},
		{
			code: 'div { color: red; align-items: baseline; }',
			message: messages.rejected('align-items', 'baseline', 'align-items-baseline'),
			line: 1,
			column: 19,
			description: 'When property is disallowed with an additional allowed property',
		},
		{
			code: 'div { color: red; align-self: auto; }',
			message: messages.rejected('align-self', 'auto', 'align-self-auto'),
			line: 1,
			column: 19,
			description: 'When property is disallowed with an additional allowed property',
		},
		{
			code: 'div { color: red; flex-grow: 0; }',
			message: messages.rejected('flex-grow', '0', 'flex-grow-0'),
			line: 1,
			column: 19,
			description: 'When property is disallowed with an additional allowed property',
		},
		{
			code: 'div { color: red; flex-shrink: 1; }',
			message: messages.rejected('flex-shrink', '1', 'flex-shrink-1'),
			line: 1,
			column: 19,
			description: 'When property is disallowed with an additional allowed property',
		},
		{
			code: 'div { color: red; flex-wrap: wrap-reverse; }',
			message: messages.rejected('flex-wrap', 'wrap-reverse', 'flex-wrap-reverse'),
			line: 1,
			column: 19,
			description: 'When property is disallowed with an additional allowed property',
		},
	],
});
