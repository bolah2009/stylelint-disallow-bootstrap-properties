# Commit messages

Commit messages should have the following structure:

```text
<Tag>: Capitalized, summary (50 chars recommended)

If necessary, more detailed explanatory text and/or what this commit
fixes, wrapped to about 72 characters or so. The commit message should
be in the imperative: "Fix bug" and not "Fixed bug" or "Fixes bug."

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Fix #<issue>
```

The **first line** of the commit message (the summary) constitutes the
one-sentence description of the change. It must be 50 characters in
length or shorter, and should start with a `<Tag>` that is one of the
following:

- `Breaking` - for a backwards-incompatible changes.
- `Build` - changes to build process only.
- `Chore` - for refactoring, adding tests, etc. (anything that
  isn’t user-facing).
- `Docs` - changes to documentation only.
- `Fix` - for a bug fix.
- `New` - implemented a new feature.
- `Update` - for a dependency upgrade.

Here are some good commit message summary examples:

```text
Docs: Fix broken links in `pull-requests.md`
```

```text
New: Add hint to check life-work balance
```

```text
Build: Generate new Travis CI token
```

The **second line** should be left blank if there are other lines
after it.

**All other lines**, where possible, should be wrapped to about 72
characters.

If applicable, to refer to an issue, comment or URL not being resolved
by the commit or to link to more related information, use
**'Ref \<reference\>'** below the seperator(-------) and before
'Fix #\<issue\>'. For example: `Ref #3`,
`Ref https://github.com/bolah2009/stylelint-disallow-bootstrap-properties/issues/1`
or `Ref https://github.com/bolah2009/stylelint-disallow-bootstrap-properties/issues/1`.
