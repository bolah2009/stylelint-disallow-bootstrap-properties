# stylelint-disallow-bootstrap-properties

A Stylelint plugin to disallow [bootstrap](https://getbootstrap.com/) CSS properties.

## Installation

1. If you haven't, install [stylelint](https://stylelint.io/):

```
npm install stylelint --save-dev
```

2.  Install `stylelint-disallow-bootstrap-properties`:

```
npm install stylelint-disallow-bootstrap-properties --save-dev
```

## Usage

Add `stylelint-disallow-bootstrap-properties` to your stylelint config `plugins` array, then add the rule to the rules list. The rule from stylelint-disallow-bootstrap-properties need to be namespaced with `plugin`.

```json
{
  ...
  "plugins": ["stylelint-disallow-bootstrap-properties"],
  "rules": {
    ...
    "plugin/stylelint-disallow-bootstrap-properties": true
  },
  ...
```

## What this rule does?

<!-- prettier-ignore -->
```css
  a::before {}
/** ↑
 * This pseudo-element selector */

  a:hover {}
/**↑
 * This pseudo-class selector */
```

This rule ignores:

- CSS pseudo-elements i.e. those prefixed with a single colon
- CSS pseudo-classes i.e. those prefixed with two colon
- selectors that use variable interpolation e.g. `::#{$variable} {}`

## Options

`boolean`: `true`

Given:

```
true
```

The following patterns are considered violations:

<!-- prettier-ignore -->
```css
a {
  display: flex;
}
```

<!-- prettier-ignore -->
```css
div {
  display: block;
}
```

The following patterns are _not_ considered violations:

<!-- prettier-ignore -->
```css
div::before {
  display: flex;
  }
```

<!-- prettier-ignore -->
```css
a:hover {
  display: block;
  }
```

<!-- prettier-ignore -->
```css
div {
  color: red;
  }
```
