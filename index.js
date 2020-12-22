/* eslint-env node */
'use strict';

// Pull in our modules
const chalk = require('chalk');
const boxen = require('boxen');
const fs = require('fs');
const path = require('path');

// Define options for Boxen
const options = {
	padding: 1,
	margin: 1,
	borderStyle: 'round',
};

// Text + chalk definitions
// prettier-ignore
const data = {
	name:            chalk.white('           Patrick Guo'),
	handle:          chalk.white('shpatrickguo'),
	role:            chalk.white('Data scientist and Full stack developer @ IPTE'),
	npm:             chalk.gray('https://npmjs.com/') + chalk.red('~shpatrickguo'),
	github:          chalk.gray('https://github.com/') + chalk.green('shpatrickguo'),
	linkedin:        chalk.gray('https://linkedin.com/in/') + chalk.blueBright('patrickguo'),
	facebook:        chalk.gray('https://facebook.com/') + chalk.blue('guopatrick'),
	npx:             chalk.red('npx') + ' ' + chalk.white('shpg-card'),
	labelrole:       chalk.white.bold('   Title:'),
	labelnpm:        chalk.white.bold('     npm:'),
	labelGitHub:     chalk.white.bold('  GitHub:'),
	labelLinkedIn:   chalk.white.bold('LinkedIn:'),
	labelFacebook:   chalk.white.bold('Facebook:'),
	labelCard:       chalk.white.bold('    Card:'),
};

// Actual strings we're going to output, newlines matter
const output = `${data.name} / ${data.handle}
${data.labelrole}  ${data.role}
${data.labelLinkedIn}  ${data.linkedin}
${data.labelGitHub}  ${data.github}
${data.labelnpm}  ${data.npm}
${data.labelFacebook}  ${data.facebook}
${data.labelCard}  ${data.npx}
`;

// frame the text
const box = chalk.green(boxen(output, options));

// generate the single js file that need run with npx
fs.writeFileSync(
	path.join(__dirname, 'index.js'),
	`#!/usr/bin/env node
// 👆 Used to tell Node.js that this is a CLI tool
console.log('${box.split('\n').join('\\n\\\n')}');
`
);