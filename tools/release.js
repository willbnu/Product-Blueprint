#!/usr/bin/env node

/**
 * GitHub Release Script
 * Usage: node tools/release.js <version> [--draft] [--prerelease]
 * 
 * Requires: GITHUB_TOKEN environment variable
 * 
 * Examples:
 *   node tools/release.js v2.0.0
 *   node tools/release.js v2.0.0-beta.1 --prerelease
 *   node tools/release.js v2.0.0 --draft
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const REPO_OWNER = 'willbnu';
const REPO_NAME = 'Product-Blueprint';

// Parse arguments
const args = process.argv.slice(2);
const version = args.find(arg => !arg.startsWith('--'));
const isDraft = args.includes('--draft');
const isPrerelease = args.includes('--prerelease');

if (!version) {
    console.log(`
\x1b[36m🚀 GitHub Release Tool\x1b[0m

Usage: node tools/release.js <version> [options]

Options:
  --draft       Create as draft (not published)
  --prerelease  Mark as pre-release

Examples:
  node tools/release.js v2.0.0
  node tools/release.js v2.0.0-beta.1 --prerelease
  node tools/release.js v2.0.0 --draft

Required:
  Set GITHUB_TOKEN environment variable with a Personal Access Token
  (needs 'repo' scope for private repos, 'public_repo' for public)
`);
    process.exit(1);
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
    console.error('\x1b[31m❌ Error: GITHUB_TOKEN environment variable is required\x1b[0m');
    console.log('\nTo create a token:');
    console.log('1. Go to https://github.com/settings/tokens');
    console.log('2. Generate new token (classic)');
    console.log('3. Select "repo" scope');
    console.log('4. Set: $env:GITHUB_TOKEN = "your_token_here"');
    process.exit(1);
}

// Generate release notes from CHANGELOG or auto-generate
function generateReleaseNotes(version) {
    const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');

    if (fs.existsSync(changelogPath)) {
        const changelog = fs.readFileSync(changelogPath, 'utf8');

        // Find the section for this version
        const versionPattern = new RegExp(`## \\[${version.replace('v', '')}\\].*?(?=## \\[|$)`, 's');
        const match = changelog.match(versionPattern);

        if (match) {
            return match[0].trim();
        }
    }

    // Auto-generate basic notes
    return `## Release ${version}

See [CHANGELOG.md](https://github.com/${REPO_OWNER}/${REPO_NAME}/blob/main/CHANGELOG.md) for details.

---
**Full Changelog**: https://github.com/${REPO_OWNER}/${REPO_NAME}/compare/v1.1.0...${version}
`;
}

// Create the release
async function createRelease() {
    const releaseNotes = generateReleaseNotes(version);

    const releaseData = JSON.stringify({
        tag_name: version,
        name: `${version} - ${getReleaseName(version)}`,
        body: releaseNotes,
        draft: isDraft,
        prerelease: isPrerelease,
        generate_release_notes: false,
    });

    const options = {
        hostname: 'api.github.com',
        port: 443,
        path: `/repos/${REPO_OWNER}/${REPO_NAME}/releases`,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'User-Agent': 'Product-Blueprint-Release-Tool',
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(releaseData),
        },
    };

    return new Promise((resolve, reject) => {
        console.log(`\n\x1b[36m🚀 Creating release ${version}...\x1b[0m`);
        console.log(`   Draft: ${isDraft}`);
        console.log(`   Prerelease: ${isPrerelease}`);

        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                const response = JSON.parse(data);

                if (res.statusCode === 201) {
                    console.log(`\n\x1b[32m✅ Release created successfully!\x1b[0m`);
                    console.log(`   URL: ${response.html_url}`);
                    resolve(response);
                } else {
                    console.error(`\n\x1b[31m❌ Failed to create release\x1b[0m`);
                    console.error(`   Status: ${res.statusCode}`);
                    console.error(`   Message: ${response.message || JSON.stringify(response)}`);
                    reject(new Error(response.message));
                }
            });
        });

        req.on('error', (error) => {
            console.error(`\n\x1b[31m❌ Request failed: ${error.message}\x1b[0m`);
            reject(error);
        });

        req.write(releaseData);
        req.end();
    });
}

// Get a release name based on version
function getReleaseName(version) {
    if (version.includes('alpha')) return 'Alpha Release';
    if (version.includes('beta')) return 'Beta Release';
    if (version.includes('rc')) return 'Release Candidate';

    // Check package.json for description or use milestone names
    const packagePath = path.join(process.cwd(), 'package.json');
    if (fs.existsSync(packagePath)) {
        const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

        // Version-based naming
        const major = parseInt(version.replace('v', '').split('.')[0]);
        if (major >= 2) return 'Code Implementation Release';
        if (version.startsWith('v1.1')) return 'Enhanced Developer Experience';
        if (version.startsWith('v1.0')) return 'Production Ready';
    }

    return 'Release';
}

// Run
createRelease()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
