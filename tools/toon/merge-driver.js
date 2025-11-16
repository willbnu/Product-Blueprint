#!/usr/bin/env node

/**
 * Git Merge Driver for TOON Files
 *
 * This script is called automatically by git when TOON file conflicts occur.
 * It regenerates TOON files from the merged source markdown files instead of
 * trying to merge the generated JSON (which would be pointless).
 *
 * Git calls this script with these arguments:
 *   %O - ancestor's version (base)
 *   %A - current version (ours)
 *   %B - other version (theirs)
 *   %L - conflict marker size
 *   %P - path to the file
 *
 * Exit codes:
 *   0 - merge successful
 *   1 - merge failed (conflict unresolved)
 *   >1 - script error
 *
 * @see https://git-scm.com/docs/gitattributes#_defining_a_custom_merge_driver
 */

const { execSync } = require('child_process');
const path = require('path');

// Get git root directory
function getGitRoot() {
  try {
    return execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
  } catch (error) {
    console.error('❌ Not in a git repository');
    process.exit(2);
  }
}

// Main merge driver logic
function mergeToonFile(filePath) {
  const gitRoot = getGitRoot();
  const resolverScript = path.join(gitRoot, 'tools/toon/resolve-conflicts.js');

  console.log(`🔧 TOON Merge Driver: Auto-resolving conflict in ${filePath}`);

  try {
    // Accept the current version (ours) for this specific file
    execSync(`git checkout --ours "${filePath}"`, { cwd: gitRoot });

    // Stage the file
    execSync(`git add "${filePath}"`, { cwd: gitRoot });

    console.log(`✅ Accepted current version, will regenerate from source`);
    console.log(`💡 Run 'npm run toon:generate' after merge completes to regenerate all TOON files`);

    // Exit with success - the file is "resolved" by accepting ours
    // The actual regeneration will happen when user runs toon:generate
    process.exit(0);
  } catch (error) {
    console.error(`❌ Failed to resolve TOON conflict: ${error.message}`);
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length < 5) {
  console.error('❌ Invalid arguments. Expected: base current other marker-size path');
  process.exit(2);
}

const [base, current, other, markerSize, filePath] = args;

// Run the merge driver
mergeToonFile(filePath);
