const chalk = require('chalk');
const shell = require('shelljs');
const { ucs2 } = require('punycode');

/*
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Special file were Git will store the content
 * of the commit message of a commit in progress.
 *
 * https://git-scm.com/docs/git-commit#_files
 */

const COMMIT_MESSAGE_FILE = '.git/COMMIT_EDITMSG';

const COMMIT_GUIDELINES_URL =
	'https://github.com/bolah2009/stylelint-disallow-bootstrap-properties/blob/main/.github/commit-guidelines.md';

const PKG = require('./../package.json');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

shell.config.silent = true;
shell.config.fatal = true;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const checkWording = (line, lineNumber) => {
	const issues = [];

	/*
	 * This checks for cases such as:
	 *
	 * Fixed #number
	 * Fixes owner/repo#number
	 * Fixes https://example.com/...
	 * Closed #number
	 * Closes owner/dssad#121
	 */

	const regex = /((Fixe|Close)(d|s))\s+([^#\s]*#[0-9]*|https?:\/\/[^\s]+)/i;
	const match = line.match(regex);

	if (match) {
		issues.push(
			`[Line ${lineNumber}] Contains '${match[1]}' instead of '${
				match[1].toLowerCase().startsWith('fix') ? 'Fix' : 'Close'
			}'.`,
		);
	}

	return issues;
};

const checkFirstLine = (line) => {
	const ALLOWED_TAGS = [
		'Fix:',
		'Breaking:',
		'Build:',
		'Chore:',
		'Docs:',
		'New:',
		'Update:',
		'Upgrade:',
	];

	let issues = [];

	if (ucs2.decode(line).length > 72) {
		issues.push('[Line 1] Has over 72 characters.');
	}

	const tag = ALLOWED_TAGS.filter((allowedTag) => {
		return line.startsWith(allowedTag);
	})[0];

	if (!tag) {
		issues.push(
			`[Line 1] Does not start with one of the following tags: \n\n     ${ALLOWED_TAGS.join(
				'\n     ',
			)}\n`,
		);
	}

	const afterTag = tag ? line.split(tag)[1] : line;

	if (!afterTag) {
		issues.push(`[Line 1] No summary.`);
	} else if (tag) {
		const firstChar = afterTag.charAt(0);
		const secondChar = afterTag.charAt(1);

		if (firstChar !== ' ') {
			issues.push(`[Line 1] Does not have a space between tag and summary.`);
		}

		if (secondChar !== secondChar.toUpperCase()) {
			issues.push(`[Line 1] Summary does not start with uppercase letter.`);
		}
	}

	issues = [...issues, ...checkWording(line, 1)];

	return issues;
};

const checkSecoundLine = (line) => {
	const issues = [];

	if (typeof line !== 'undefined' && line !== '') {
		issues.push('[Line 2] Should be blank.');
	}

	return issues;
};

const checkPackagesModified = (files) => {
	const issues = [];
	const packages = files.reduce((pkgs, file) => {
		const pathParts = file.split('/');

		if (pathParts[0] === 'packages') {
			pkgs.add(pathParts[1]);
		}

		return pkgs;
	}, new Set());

	if (packages.size > 1) {
		issues.push(
			`A breaking change cannot affect to more than one package. Packages affected:\n    - ${[
				...packages,
			].join('\n    - ')}`,
		);
	}

	return issues;
};

const checkBreakingChange = (line, files) => {
	let issues = [];
	const isBreakingChange = line.startsWith('Breaking:');

	if (isBreakingChange) {
		issues = checkPackagesModified(files);
	}

	return issues;
};

const checkLine = (line, lineNumber) => {
	const chars = ucs2.decode(line);
	let issues = [];

	/*
	 * If the line has more then 72 characters, and the part just before
	 * and after the 72 limit contains spaces (i.e. it's not something
	 * like a long URL), suggest splitting the line into multiple lines.
	 */

	if (chars.length > 72 && chars.slice(60, chars.length).includes(32)) {
		issues.push(
			`[Line ${lineNumber}] Has over 72 characters, and should be split into multiple lines.`,
		);
	}

	issues = [...issues, ...checkWording(line, lineNumber)];

	return issues;
};

const getUncommentedLines = (lines) => {
	return lines.filter((line) => {
		return !line.startsWith('#');
	});
};

const getCommittedFiles = () => {
	const filesString = shell.exec('git diff --name-only --cached').toString();

	return filesString.split('\n').reduce((files, file) => {
		if (file) {
			files.push(file.trim());
		}

		return files;
	}, []);
};

const getCommitData = () => {
	const commits = [];

	/*
	 * If the special file were Git stores the commit message exists,
	 * it most probably means this script is executed when the user
	 * does a commit, so we only need to get the current commit message.
	 */

	if (shell.test('-f', COMMIT_MESSAGE_FILE)) {
		commits.push({
			files: getCommittedFiles(),
			message: shell.cat(COMMIT_MESSAGE_FILE),
			sha: null,
		});

		/*
		 * Otherwise, it means this script is execute as part of the tests,
		 * and since there is no easy way to know how many new commits were
		 * added, check all commits since the last release.
		 */
	} else {
		const commitSHAsSinceLastRelease = shell
			.exec(`git rev-list HEAD...${PKG.version}`)
			.stdout.split('\n');

		commitSHAsSinceLastRelease.forEach((sha) => {
			commits.push({
				message: shell.exec(`git show --no-patch --format=%B ${sha}`).stdout.trim(),
				sha,
				username: shell.exec(`git show --no-patch --format=%an ${sha}`).stdout.trim(),
			});
		});
	}

	return commits;
};

const checkCommit = (commit) => {
	const commitMsgLines = getUncommentedLines(commit.message.split('\n'));
	let issues = [];

	issues = [
		...checkFirstLine(commitMsgLines[0]),
		...checkSecoundLine(commitMsgLines[1]),
		...checkBreakingChange(commitMsgLines[0], commit.files),
	];

	for (let i = 2; i < commitMsgLines.length; i++) {
		issues = [...issues, ...checkLine(commitMsgLines[i], i + 1)];
	}

	if (issues.length !== 0) {
		let commitMsg = '';

		commitMsgLines.forEach((line) => {
			commitMsg += `  > ${line}\n`;
		});

		console.error(`\n* The commit message${commit.sha ? ` (for ${commit.sha})` : ''}:

${commitMsg}
  does not respect the conventions, namely:
`);

		issues.forEach((issue) => {
			console.error(chalk.red(`  * ${issue}`));
		});

		return false;
	}

	return true;
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const main = () => {
	const commitMessagesAreValid = getCommitData().reduce((result, commit) => {
		return checkCommit(commit) && result;
	}, true);

	if (!commitMessagesAreValid) {
		console.log(
			`Please see the commit message guidelines for more details:\n${COMMIT_GUIDELINES_URL}`,
		);

		/*
		 * Because the commit messages are not valid, to not
		 * complicate things (see: getCommitData), remove the special
		 * file Git uses to store the commit message, if it exists.
		 *
		 * " If `git commit` exits due to an error before creating a
		 *   commit, any commit message that has been provided by the
		 *   user (e.g., in an editor session) will be available in
		 *   this file, but will be overwritten by the next invocation
		 *   of git commit. "
		 *
		 * From: https://git-scm.com/docs/git-commit#_files
		 */

		if (shell.test('-f', COMMIT_MESSAGE_FILE)) {
			shell.rm(COMMIT_MESSAGE_FILE);
		}

		process.exit(1); // eslint-disable-line no-process-exit
	}
};

main();
