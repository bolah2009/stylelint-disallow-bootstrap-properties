'use strict';

const properties = {
	display: {
		values: {
			none: 'd-none',
			inline: 'd-inline',
			'inline-block': 'd-inline-block',
			block: 'd-block',
			grid: 'd-grid',
			table: 'd-table',
			'table-cell': 'd-table-cell',
			'table-row': 'd-table-row',
			flex: 'd-flex',
			'inline-flex': 'd-inline-flex',
		},
	},
	'flex-direction': {
		values: {
			row: 'flex-row',
			'row-reverse': 'flex-row-reverse',
			column: 'flex-column',
			'column-reverse': 'flex-column-reverse',
		},
	},
	'justify-content': {
		values: {
			'flex-start': 'justify-content-start',
			'flex-end': 'justify-content-end',
			center: 'justify-content-center',
			'space-between': 'justify-content-between',
			'space-around': 'justify-content-around',
			'space-evenly': 'justify-content-evenly',
		},
	},
	'align-content': {
		values: {
			'flex-start': 'align-content-start',
			'flex-end': 'align-content-end',
			center: 'align-content-center',
			'space-between': 'align-content-between',
			'space-around': 'align-content-around',
			stretch: 'align-content-stretch',
		},
	},
	'align-items': {
		values: {
			'flex-start': 'align-items-start',
			'flex-end': 'align-items-end',
			center: 'align-items-center',
			baseline: 'align-items-baseline',
			stretch: 'align-items-stretch',
		},
	},
	'align-self': {
		values: {
			auto: 'align-self-auto',
			'flex-start': 'align-self-start',
			'flex-end': 'align-self-end',
			center: 'align-self-center',
			baseline: 'align-self-baseline',
			stretch: 'align-self-stretch',
		},
	},
	'flex-grow': {
		values: {
			0: 'flex-grow-0',
			1: 'flex-grow-1',
		},
	},
	'flex-shrink': {
		values: {
			0: 'flex-shrink-0',
			1: 'flex-shrink-1',
		},
	},
	'flex-wrap': {
		values: {
			wrap: 'flex-wrap',
			nowrap: 'flex-nowrap',
			'wrap-reverse': 'flex-wrap-reverse',
		},
	},
};

module.exports = properties;
