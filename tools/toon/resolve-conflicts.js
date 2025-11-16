#!/usr/bin/env node

/**
 * Automatically resolve TOON file conflicts during git merges/rebases
 *
 * TOON files are generated from documentation sources. During merges,
 * conflicts occur because both branches generate different TOON outputs.
 *
 * Solution: Accept current branch, regenerate all TOON files, then continue merge.
 *
 * Usage:
 *   node tools/toon/resolve-conflicts.js
 *   OR
 *   npm run toon:resolve
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 TOON Conflict Resolver\n');

/**
 * Execute shell command and return output
 */
function exec(command, options = {}) {
  try {
    return execSync(command, {
      encoding: 'utf8',
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options
    });
  } catch (error) {
    if (options.ignoreError) {
      return error.stdout || '';
    }
    throw error;
  }
}

/**
 * Check if we're in a merge/rebase conflict state
 */
function isInConflictState() {
  const gitDir = path.join(process.cwd(), '.git');
  const mergeHead = path.join(gitDir, 'MERGE_HEAD');
  const rebaseDir = path.join(gitDir, 'rebase-merge');
  const rebaseApply = path.join(gitDir, 'rebase-apply');

  return fs.existsSync(mergeHead) ||
         fs.existsSync(rebaseDir) ||
         fs.existsSync(rebaseApply);
}

/**
 * Get list of conflicted TOON files
 */
function getConflictedToonFiles() {
  const status = exec('git status --porcelain', { silent: true });
  const lines = status.split('\n');

  const conflicted = lines
    .filter(line => line.startsWith('UU ') || line.startsWith('AA ') || line.startsWith('DD '))
    .map(line => line.substring(3).trim())
    .filter(file => file.includes('.toon'));

  return conflicted;
}

/**
 * Resolve TOON conflicts by accepting ours and regenerating
 */
function resolveToonConflicts() {
  const conflicted = getConflictedToonFiles();

  if (conflicted.length === 0) {
    console.log('✅ No TOON file conflicts found.');
    return false;
  }

  console.log(`📋 Found ${conflicted.length} conflicted TOON file(s):\n`);
  conflicted.forEach(file => console.log(`   - ${file}`));
  console.log();

  // Strategy: Accept current branch version for all TOON files
  console.log('🔄 Resolving conflicts by accepting current branch version...\n');

  for (const file of conflicted) {
    try {
      // Check if file exists in current branch
      const existsInOurs = exec(`git cat-file -e HEAD:${file}`, {
        silent: true,
        ignoreError: true
      });

      if (existsInOurs) {
        // Accept our version
        exec(`git checkout --ours "${file}"`, { silent: true });
        exec(`git add "${file}"`, { silent: true });
        console.log(`   ✓ Accepted ours: ${file}`);
      } else {
        // File doesn't exist in our branch, remove it
        exec(`git rm "${file}"`, { silent: true, ignoreError: true });
        console.log(`   ✓ Removed: ${file}`);
      }
    } catch (error) {
      console.error(`   ✗ Error resolving ${file}:`, error.message);
    }
  }

  console.log();
  return true;
}

/**
 * Regenerate all TOON files
 */
function regenerateToonFiles() {
  console.log('🔨 Regenerating all TOON files...\n');

  try {
    exec('node tools/toon/generate-all.js');
    console.log('\n✅ TOON files regenerated successfully\n');
  } catch (error) {
    console.error('❌ Error regenerating TOON files:', error.message);
    throw error;
  }
}

/**
 * Stage regenerated TOON files
 */
function stageToonFiles() {
  console.log('📦 Staging regenerated TOON files...\n');

  try {
    exec('git add .toon/', { silent: true });
    console.log('✅ TOON files staged\n');
  } catch (error) {
    console.error('❌ Error staging TOON files:', error.message);
    throw error;
  }
}

/**
 * Main execution
 */
function main() {
  try {
    // Check if we have TOON conflicts
    const hadConflicts = resolveToonConflicts();

    if (!hadConflicts) {
      console.log('💡 Tip: Run this script when you have TOON file conflicts during merge/rebase\n');
      return;
    }

    // Regenerate TOON files to ensure they're up to date
    regenerateToonFiles();

    // Stage the regenerated files
    stageToonFiles();

    // Check if we're still in conflict state
    const remainingConflicts = exec('git status --porcelain', { silent: true })
      .split('\n')
      .filter(line => line.startsWith('UU ') || line.startsWith('AA ') || line.startsWith('DD '))
      .filter(line => !line.includes('.toon'));

    console.log('═══════════════════════════════════════════════════════════\n');

    if (remainingConflicts.length === 0) {
      console.log('✅ All TOON conflicts resolved!\n');

      if (isInConflictState()) {
        console.log('📝 Next steps:');
        console.log('   1. Review the changes: git status');
        console.log('   2. Continue merge: git merge --continue');
        console.log('   OR continue rebase: git rebase --continue\n');
      }
    } else {
      console.log('⚠️  TOON conflicts resolved, but other conflicts remain:\n');
      remainingConflicts.slice(0, 5).forEach(line => console.log(`   ${line}`));
      if (remainingConflicts.length > 5) {
        console.log(`   ... and ${remainingConflicts.length - 5} more`);
      }
      console.log('\n💡 Resolve remaining conflicts, then run: git merge --continue\n');
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { resolveToonConflicts, regenerateToonFiles };
