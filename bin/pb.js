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
  pb prd new <project-name>       Scaffold a new PRD
  pb docs check                   Check documentation links
  pb release <version>            Create GitHub release
  pb release <version> --draft    Create draft release
  pb release <version> --prerelease   Mark as pre-release
  pb help                         Show this help

Examples:
  pb prd new my-awesome-app
  pb docs check
  pb release v2.0.0
  pb release v2.0.0-beta.1 --prerelease
`);
}

switch (command) {
    case 'prd':
        if (subCommand === 'new') {
            runScript('tools/scaffold-prd.js', args.slice(2));
        }
        break;

    case 'docs':
        if (subCommand === 'check') {
            runScript('tools/check-links.js');
        }
        break;

    case 'release':
        // Pass version and flags to release script
        runScript('tools/release.js', args.slice(1));
        break;

    case 'help':
    case '--help':
    case '-h':
        showHelp();
        break;

    default:
        console.error(`Unknown command: ${command}`);
        showHelp();
        process.exit(1);
}
