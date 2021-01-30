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
	order: {
		values: {
			'-1': 'order-first',
			0: 'order-0',
			1: 'order-1',
			2: 'order-2',
			3: 'order-3',
			4: 'order-4',
			5: 'order-5',
			6: 'order-last',
		},
	},
	margin: {
		values: {
			0: 'm-0',
			auto: 'm-auto',
		},
	},
	'margin-top': {
		values: {
			0: 'mt-0',
			auto: 'mt-auto',
		},
	},
	'margin-right': {
		values: {
			0: 'mr-0',
			auto: 'mr-auto',
		},
	},
	'margin-bottom': {
		values: {
			0: 'mb-0',
			auto: 'mb-auto',
		},
	},
	'margin-left': {
		values: {
			0: 'ms-0',
			auto: 'ms-auto',
		},
	},
	padding: {
		values: {
			0: 'p-0',
		},
	},
	'padding-top': {
		values: {
			0: 'pt-0',
		},
	},
	'padding-right': {
		values: {
			0: 'pe-0',
		},
	},
	'padding-bottom': {
		values: {
			0: 'pb-0',
		},
	},
	'padding-left': {
		values: {
			0: 'ps-0',
		},
	},
	'vertical-align': {
		values: {
			baseline: 'align-baseline',
			top: 'align-top',
			middle: 'align-middle',
			bottom: 'align-bottom',
			'text-bottom': 'align-text-bottom',
			'text-top': 'align-text-top',
		},
	},
	float: {
		values: {
			left: 'float-start',
			right: 'float-end',
			none: 'float-none',
		},
	},
	overflow: {
		values: {
			auto: 'overflow-auto',
			hidden: 'overflow-hidden',
			visible: 'overflow-visible',
			scroll: 'overflow-scroll',
		},
	},
	'box-shadow': {
		values: {
			none: 'shadow-none',
		},
	},
	position: {
		values: {
			static: 'position-static',
			relative: 'position-relative',
			absolute: 'position-absolute',
			fixed: 'position-fixed',
			sticky: 'position-sticky',
		},
	},
	top: {
		values: {
			0: 'top-0',
			0.5: 'top-50',
			1: 'top-100',
		},
	},
	bottom: {
		values: {
			0: 'bottom-0',
			0.5: 'bottom-50',
			1: 'bottom-100',
		},
	},
	left: {
		values: {
			0: 'start-0',
			0.5: 'start-50',
			1: 'start-100',
		},
	},
	right: {
		values: {
			0: 'end-0',
			0.5: 'end-50',
			1: 'end-100',
		},
	},
	transform: {
		values: {
			'translate(-50%, -50%)': 'translate-middle',
			'translateX(-50%)': 'translate-middle-x',
			'translateY(-50%)': 'translate-middle-y',
		},
	},
	border: {
		values: {
			0: 'border-0',
		},
	},
	'border-top': {
		values: {
			0: 'border-top-0',
		},
	},
	'border-right': {
		values: {
			0: 'border-end-0',
		},
	},
	'border-bottom': {
		values: {
			0: 'border-bottom-0',
		},
	},
	'border-left': {
		values: {
			0: 'border-start-0',
		},
	},
	'border-color': {
		values: {
			'#0d6efd': 'border-primary',
			'#6c757d': 'border-secondary',
			'#198754': 'border-success',
			'#0dcaf0': 'border-info',
			'#ffc107': 'border-warning',
			'#dc3545': 'border-danger',
			'#f8f9fa': 'border-light',
			'#212529': 'border-dark',
			'#fff': 'border-white',
		},
	},
	width: {
		values: {
			0.25: 'w-25',
			0.5: 'w-50',
			0.75: 'w-75',
			1: 'w-100',
			auto: 'w-auto',
			'100vw': 'vw-100',
		},
	},
	'max-width': {
		values: {
			1: 'mw-100',
		},
	},
	'min-width': {
		values: {
			'100vw': 'min-vw-100',
		},
	},
	height: {
		values: {
			0.25: 'h-25',
			0.5: 'h-50',
			0.75: 'h-75',
			1: 'h-100',
			auto: 'h-auto',
			'100vh': 'vh-100',
		},
	},
	'max-height': {
		values: {
			1: 'mh-100',
		},
	},
	'min-height': {
		values: {
			'100vh': 'min-vh-100',
		},
	},
	gap: {
		values: {
			0: 'gap-0',
			'0.25rem': 'gap-1',
			'0.5rem': 'gap-2',
			'1rem': 'gap-3',
			'1.5rem': 'gap-4',
			'3rem': 'gap-5',
		},
	},
	'font-style': {
		values: {
			italic: 'fst-italic',
			normal: 'fst-normal',
		},
	},
	'font-weight': {
		values: {
			300: 'fw-light',
			lighter: 'fw-lighter',
			400: 'fw-normal',
			700: 'fw-bold',
			normal: 'fw-normal',
			bold: 'fw-bold',
			bolder: 'fw-bolder',
		},
	},
	'text-transform': {
		values: {
			lowercase: 'text-lowercase',
			uppercase: 'text-uppercase',
			capitalize: 'text-capitalize',
		},
	},
	'text-align': {
		values: {
			left: 'text-start',
			right: 'text-end',
			center: 'text-center',
		},
	},
	color: {
		values: {
			'#0d6efd': 'text-primary',
			'#6c757d': 'text-secondary',
			'#198754': 'text-success',
			'#0dcaf0': 'text-info',
			'#ffc107': 'text-warning',
			'#dc3545': 'text-danger',
			'#f8f9fa': 'text-light',
			'#212529': 'text-dark',
			'#fff': 'text-white',
			'rgba(0, 0, 0, 0.5)': 'text-black-50',
			'rgba(255, 255, 255, 0.5)': 'text-white-50',
			inherit: 'text-reset',
		},
	},
	'line-height': {
		values: {
			1: 'lh-1',
		},
	},
	'background-color': {
		values: {
			'#0d6efd': 'bg-primary',
			'#6c757d': 'bg-secondary',
			'#198754': 'bg-success',
			'#0dcaf0': 'bg-info',
			'#ffc107': 'bg-warning',
			'#dc3545': 'bg-danger',
			'#f8f9fa': 'bg-light',
			'#212529': 'bg-dark',
			'#fff': 'bg-white',
			transparent: 'bg-transparent',
		},
	},
	'white-space': {
		values: {
			normal: 'text-wrap',
			nowrap: 'text-nowrap',
		},
	},
	'text-decoration': {
		values: {
			none: 'text-decoration-none',
			underline: 'text-decoration-underline',
			'line-through': 'text-decoration-line-through',
		},
	},
	'word-wrap': {
		values: {
			'break-word': 'text-break',
		},
	},
	'word-break': {
		values: {
			'break-word': 'text-break',
		},
	},
	'pointer-events': {
		values: {
			none: 'pe-none',
			auto: 'pe-auto',
		},
	},
	'border-radius': {
		values: {
			0: 'rounded-0',
			0.5: 'rounded-circle',
		},
	},
	visibility: {
		values: {
			visible: 'visible',
			hidden: 'invisible',
		},
	},
};

module.exports = properties;
