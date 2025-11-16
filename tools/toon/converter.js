#!/usr/bin/env node

/**
 * TOON Converter - Markdown to Token-Oriented Object Notation
 *
 * Compresses markdown documentation into token-efficient JSON format
 * for AI agent consumption.
 *
 * Usage:
 *   node converter.js <input-file> [output-file]
 *   node converter.js docs/API.md .toon/docs/API.toon.json
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Simple token estimation (rough approximation)
function estimateTokens(text) {
  // Rough estimate: 1 token ≈ 4 characters for English text
  return Math.ceil(text.length / 4);
}

// Calculate SHA-256 hash of file
function calculateHash(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

// Extract metadata from markdown
function extractMetadata(markdown) {
  const lines = markdown.split('\n');
  const title = lines.find(l => l.startsWith('# '))?.replace('# ', '').trim() || '';
  const description = lines.find(l => l.startsWith('> '))?.replace('> ', '').trim() || '';

  // Extract tags from content
  const tags = new Set();
  const techMatches = markdown.match(/\b(React|TypeScript|Supabase|Expo|API|REST|tRPC|PostgreSQL|Auth|RLS|Edge Functions|CI\/CD|GitHub Actions)\b/gi);
  if (techMatches) {
    techMatches.forEach(tag => tags.add(tag.toLowerCase()));
  }

  return {
    title,
    description,
    tags: Array.from(tags).slice(0, 10) // Limit to 10 tags
  };
}

// Parse markdown into sections
function parseMarkdown(markdown) {
  const lines = markdown.split('\n');
  const sections = [];
  let currentSection = null;
  let currentCodeBlock = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Heading detection
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const heading = headingMatch[2].trim();

      // Save previous section
      if (currentSection && level <= 2) {
        sections.push(currentSection);
        currentSection = null;
      }

      // Start new section for h2 and below
      if (level >= 2) {
        currentSection = {
          heading,
          level,
          summary: '',
          keyPoints: [],
          codeBlocks: [],
          subsections: []
        };
      }
      continue;
    }

    // Code block detection
    if (line.startsWith('```')) {
      if (!currentCodeBlock) {
        const language = line.substring(3).trim() || 'text';
        currentCodeBlock = { language, code: '', lines: [] };
      } else {
        // End code block
        if (currentSection && currentCodeBlock.lines.length > 0) {
          // Only keep minimal code blocks
          const code = currentCodeBlock.lines.join('\n').trim();
          if (code.length < 1000 && estimateTokens(code) < 200) {
            currentSection.codeBlocks.push({
              language: currentCodeBlock.language,
              purpose: '', // TODO: extract from comments
              code: code,
              tokens: estimateTokens(code)
            });
          }
        }
        currentCodeBlock = null;
      }
      continue;
    }

    // Inside code block
    if (currentCodeBlock) {
      currentCodeBlock.lines.push(line);
      continue;
    }

    // Key points (bullet points)
    if (currentSection && line.match(/^[-*]\s+(.+)$/)) {
      const point = line.replace(/^[-*]\s+/, '').trim();
      if (point.length < 200) {
        currentSection.keyPoints.push(point);
      }
      continue;
    }

    // Summary text (first paragraph after heading)
    if (currentSection && !currentSection.summary && line.trim() && !line.startsWith('>')) {
      currentSection.summary = line.trim().substring(0, 200);
    }
  }

  // Save last section
  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

// Compress sections by removing verbose content
function compressSections(sections) {
  return sections.map(section => {
    // Limit key points
    const keyPoints = section.keyPoints.slice(0, 5);

    // Limit code blocks
    const codeBlocks = section.codeBlocks
      .slice(0, 2)
      .map(block => ({
        language: block.language,
        purpose: block.purpose || 'Example',
        code: block.code.substring(0, 500) // Max 500 chars per code block
      }));

    // Shorten summary
    const summary = section.summary.substring(0, 150);

    return {
      heading: section.heading,
      level: section.level,
      summary,
      keyPoints,
      codeBlocks: codeBlocks.length > 0 ? codeBlocks : undefined,
      subsections: section.subsections.length > 0 ? compressSections(section.subsections) : undefined
    };
  }).filter(s => s.summary || s.keyPoints.length > 0 || (s.codeBlocks && s.codeBlocks.length > 0));
}

// Main conversion function
function convertToTOON(inputFile, outputFile) {
  try {
    // Read source file
    const sourceContent = fs.readFileSync(inputFile, 'utf8');
    const sourceHash = calculateHash(sourceContent);

    // Parse and compress
    const metadata = extractMetadata(sourceContent);
    const sections = parseMarkdown(sourceContent);
    const compressedSections = compressSections(sections);

    // Calculate token counts
    const originalTokens = estimateTokens(sourceContent);
    const compressedContent = JSON.stringify({ metadata, structure: compressedSections });
    const compressedTokens = estimateTokens(compressedContent);
    const savings = Math.round(((originalTokens - compressedTokens) / originalTokens) * 100);

    // Build TOON document
    const toon = {
      version: "1.0",
      source: inputFile,
      sourceHash,
      generatedAt: new Date().toISOString(),
      tokenCount: {
        original: originalTokens,
        compressed: compressedTokens,
        savings
      },
      type: "markdown",
      content: {
        metadata,
        structure: compressedSections
      }
    };

    // Ensure output directory exists
    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write TOON file
    fs.writeFileSync(outputFile, JSON.stringify(toon, null, 2), 'utf8');

    // Log results
    console.log(`✅ Converted: ${inputFile}`);
    console.log(`   Output: ${outputFile}`);
    console.log(`   Original: ${originalTokens} tokens`);
    console.log(`   Compressed: ${compressedTokens} tokens`);
    console.log(`   Savings: ${savings}%`);

    return toon;

  } catch (error) {
    console.error(`❌ Error converting ${inputFile}:`, error.message);
    process.exit(1);
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.error('Usage: node converter.js <input-file> [output-file]');
    console.error('Example: node converter.js docs/API.md .toon/docs/API.toon.json');
    process.exit(1);
  }

  const inputFile = args[0];
  const outputFile = args[1] || inputFile.replace(/\.md$/, '.toon.json').replace(/^/, '.toon/');

  if (!fs.existsSync(inputFile)) {
    console.error(`❌ Input file not found: ${inputFile}`);
    process.exit(1);
  }

  convertToTOON(inputFile, outputFile);
}

module.exports = { convertToTOON, estimateTokens, calculateHash };
