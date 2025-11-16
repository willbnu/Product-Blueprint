#!/usr/bin/env node

/**
 * TOON Batch Generator
 *
 * Generates TOON files for all configured documentation files.
 * Reads configuration from .toon/config.json
 */

const fs = require('fs');
const path = require('path');
const { convertToTOON, estimateTokens } = require('./converter');

// Read TOON config
function readConfig() {
  const configPath = path.join(process.cwd(), '.toon/config.json');
  if (!fs.existsSync(configPath)) {
    console.error('❌ .toon/config.json not found');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

// Find all markdown files matching patterns
function findMarkdownFiles(config) {
  const { include, exclude } = config.generation;
  const files = [];

  function matchPattern(filePath, patterns) {
    return patterns.some(pattern => {
      const regex = new RegExp(pattern.replace(/\*/g, '.*').replace(/\//g, '\\/'));
      return regex.test(filePath);
    });
  }

  function scanDirectory(dir) {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(process.cwd(), fullPath);

      // Skip excluded patterns
      if (matchPattern(relativePath, exclude)) continue;

      if (entry.isDirectory()) {
        scanDirectory(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        if (matchPattern(relativePath, include)) {
          files.push(relativePath);
        }
      }
    }
  }

  scanDirectory(process.cwd());
  return files;
}

// Generate TOON files with priority ordering
function generateAll() {
  console.log('🚀 TOON Batch Generator\n');

  const config = readConfig();
  const files = findMarkdownFiles(config);

  // Sort by priority
  const priorityFiles = config.generation.priority || [];
  files.sort((a, b) => {
    const aIndex = priorityFiles.indexOf(a);
    const bIndex = priorityFiles.indexOf(b);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.localeCompare(b);
  });

  console.log(`Found ${files.length} markdown files to convert:\n`);

  const stats = {
    totalFiles: 0,
    successFiles: 0,
    failedFiles: 0,
    totalOriginalTokens: 0,
    totalCompressedTokens: 0
  };

  // Convert each file
  for (const file of files) {
    stats.totalFiles++;

    try {
      const outputFile = path.join('.toon', file.replace(/\.md$/, '.toon.json'));
      const toon = convertToTOON(file, outputFile);

      stats.successFiles++;
      stats.totalOriginalTokens += toon.tokenCount.original;
      stats.totalCompressedTokens += toon.tokenCount.compressed;

      console.log(''); // Empty line between files
    } catch (error) {
      stats.failedFiles++;
      console.error(`❌ Failed: ${file} - ${error.message}\n`);
    }
  }

  // Calculate overall savings
  const totalSavings = Math.round(
    ((stats.totalOriginalTokens - stats.totalCompressedTokens) / stats.totalOriginalTokens) * 100
  );

  // Save stats
  const statsFile = {
    generatedAt: new Date().toISOString(),
    files: stats.totalFiles,
    successful: stats.successFiles,
    failed: stats.failedFiles,
    tokens: {
      original: stats.totalOriginalTokens,
      compressed: stats.totalCompressedTokens,
      saved: stats.totalOriginalTokens - stats.totalCompressedTokens,
      savingsPercent: totalSavings
    }
  };

  fs.writeFileSync('.toon/stats.json', JSON.stringify(statsFile, null, 2), 'utf8');

  // Generate manifest
  const manifest = {
    version: "1.0",
    generatedAt: new Date().toISOString(),
    files: files.map(f => ({
      source: f,
      toon: path.join('.toon', f.replace(/\.md$/, '.toon.json'))
    }))
  };

  fs.writeFileSync('.toon/manifest.json', JSON.stringify(manifest, null, 2), 'utf8');

  // Print summary
  console.log('\n' + '═'.repeat(60));
  console.log('📊 TOON Generation Summary');
  console.log('═'.repeat(60));
  console.log(`Total files:          ${stats.totalFiles}`);
  console.log(`Successful:           ${stats.successFiles}`);
  console.log(`Failed:               ${stats.failedFiles}`);
  console.log(`Original tokens:      ${stats.totalOriginalTokens.toLocaleString()}`);
  console.log(`Compressed tokens:    ${stats.totalCompressedTokens.toLocaleString()}`);
  console.log(`Tokens saved:         ${(stats.totalOriginalTokens - stats.totalCompressedTokens).toLocaleString()}`);
  console.log(`Savings:              ${totalSavings}%`);
  console.log('═'.repeat(60));
  console.log('\n✅ TOON generation complete!');
  console.log(`📈 Stats saved to: .toon/stats.json`);
  console.log(`📋 Manifest saved to: .toon/manifest.json\n`);
}

// Run if called directly
if (require.main === module) {
  generateAll();
}

module.exports = { generateAll };
