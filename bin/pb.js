#!/usr/bin/env node

const { spawnSync } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0];
const subCommand = args[1];

function runScript(scriptPath, scriptArgs = []) {
    const fullPath = path.resolve(__dirname, '..', scriptPath);
    const result = spawnSync('node', [fullPath, ...scriptArgs], { stdio: 'inherit' });
    if (result.error) {
        console.error(result.error);
        process.exit(1);
    }
    process.exit(result.status);
}

function showHelp() {
    console.log(`
Product-Blueprint CLI (pb)

Usage:
  pb prd new <project-name>   Scaffold a new PRD
  pb docs check               Check documentation links
  pb help                     Show this help
`);
}

switch (command) {
    case 'prd':
        if (subCommand === 'new') {
            // Pass the rest of arguments to the script
            // If project name is provided as 3rd arg, scaffold-prd should probably accept it.
            // Currently scaffold-prd asks interactively. We will update it to accept arg.
            process.exit(runScript('tools/scaffold-prd.js', args.slice(2)));
        }
        break;

    case 'docs':
        if (subCommand === 'check') {
            process.exit(runScript('tools/check-links.js'));
        }
        break;

    case 'help':
        showHelp();
        break;

    default:
        console.error(`Unknown command: ${command}`);
        showHelp();
        process.exit(1);
}
