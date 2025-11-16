# TOON - Token-Oriented Object Notation for Agents

> **Agent-Optimized Repository Layer**
>
> This directory contains token-efficient representations of repository content, automatically generated for AI agent consumption.

---

## What is TOON?

**TOON (Token-Oriented Object Notation)** is a compressed, structured format designed to minimize token usage while preserving semantic meaning for AI agents.

### The Problem
- Human-readable documentation uses **10,000+ tokens** for comprehensive guides
- Code examples with comments use **3-5x more tokens** than necessary
- Agents reading the full repo consume **100,000+ tokens** per session
- Repeated reads waste tokens on unchanged content

### The Solution
- **80-90% token reduction** through intelligent compression
- **Semantic preservation** - all meaning retained
- **Automatic generation** - no manual maintenance
- **Transparent access** - agents use TOON automatically via skills
- **Cache-friendly** - only regenerate what changed

---

## Architecture

### Directory Structure

```
.toon/
├── README.md                 # This file
├── manifest.json             # Index of all TOON files
├── config.json               # TOON generation config
├── docs/                     # Compressed documentation
│   ├── API.toon.json
│   ├── MOBILE.toon.json
│   ├── WEB.toon.json
│   ├── BACKEND.toon.json
│   └── CICD.toon.json
├── code/                     # AST-based code representations
│   └── (future: actual code files)
└── stats.json                # Token savings statistics
```

### TOON Format Specification

**Version 1.0**

```typescript
interface ToonDocument {
  version: "1.0";
  source: string;              // Original file path
  sourceHash: string;          // SHA-256 of source file
  generatedAt: string;         // ISO timestamp
  tokenCount: {
    original: number;          // Tokens in source file
    compressed: number;        // Tokens in TOON format
    savings: number;           // Percentage saved
  };
  type: "markdown" | "code" | "config";
  content: ToonContent;
}

interface ToonContent {
  metadata: {
    title: string;
    description: string;
    tags: string[];
  };
  structure: Section[];
}

interface Section {
  heading: string;
  level: number;               // h1=1, h2=2, etc.
  summary: string;             // Compressed summary
  keyPoints: string[];         // Bullet points
  codeBlocks?: CodeBlock[];    // Only essential code
  subsections?: Section[];     // Nested sections
}

interface CodeBlock {
  language: string;
  purpose: string;             // What it demonstrates
  code: string;                // Minimal working example
  tokens: number;              // Token count for this block
}
```

---

## How It Works

### 1. Generation (Automated)

**On Git Push (CI/CD):**
```yaml
# .github/workflows/toon-update.yml
name: Update TOON Cache

on:
  push:
    paths:
      - 'docs/**'
      - 'README.md'
      - '**/*.md'

jobs:
  generate-toon:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Generate TOON files
        run: npm run toon:generate
      - name: Commit TOON updates
        run: |
          git add .toon/
          git commit -m "chore: update TOON cache [skip ci]"
          git push
```

**On Local Development:**
```bash
# Manual generation
npm run toon:generate

# Watch mode (dev)
npm run toon:watch

# Generate specific file
npm run toon:generate docs/API.md
```

### 2. Agent Access (Transparent)

**Claude Code Skill (.claude/skills/toon-reader/):**

Agents automatically use TOON files when available:

```typescript
// Agent reads: docs/API.md
// Skill intercepts and checks: .toon/docs/API.toon.json
// If exists and fresh → return TOON version (saves 85% tokens)
// If missing/stale → return original file
```

**Usage:**
```
Agent: "Read the API documentation"
System: → Checks .toon/docs/API.toon.json
System: → Returns compressed version (1,200 tokens vs 8,000 tokens)
Agent: "Got it!" (saves 6,800 tokens)
```

### 3. Cache Invalidation

**Smart Updates:**
- TOON files include source file hash
- On file change, hash mismatch detected
- Automatically regenerate that TOON file
- Other TOON files remain cached

---

## Compression Strategies

### 1. Documentation Compression

**Original (8,000 tokens):**
```markdown
# API Development Guide

This comprehensive guide provides detailed instructions for building
production-ready APIs using RESTful patterns, tRPC, and Supabase Edge
Functions. You'll learn best practices for authentication, error handling,
rate limiting, and API versioning.

## RESTful API Patterns

RESTful APIs follow a resource-oriented architecture where each endpoint
represents a resource and HTTP methods define operations...

### Example: CRUD Operations

Here's a complete example of implementing CRUD operations for a todo list:

```typescript
// Full 80-line implementation with comments...
```

**TOON Compressed (1,200 tokens):**
```json
{
  "metadata": {
    "title": "API Development Guide",
    "description": "RESTful, tRPC, Edge Functions, auth, errors, rate limiting",
    "tags": ["api", "rest", "trpc", "supabase"]
  },
  "structure": [
    {
      "heading": "RESTful API Patterns",
      "level": 2,
      "summary": "Resource-oriented architecture, HTTP methods for operations",
      "keyPoints": [
        "GET /todos - list",
        "POST /todos - create",
        "PUT /todos/:id - update",
        "DELETE /todos/:id - delete"
      ],
      "codeBlocks": [
        {
          "language": "typescript",
          "purpose": "CRUD list endpoint",
          "code": "const list = async (req, res) => {\n  const { data } = await supabase.from('todos').select('*');\n  return res.json({ data });\n};"
        }
      ]
    }
  ]
}
```

**Savings: 85% fewer tokens**

### 2. Code Examples

**Strategy:**
- Remove verbose comments
- Keep only essential code
- One minimal working example per concept
- Link to full source if needed

### 3. Metadata Extraction

**Extract:**
- Section headings → navigation
- Key concepts → tags
- Prerequisites → metadata
- Cross-references → links

---

## Token Savings Analysis

### Projected Savings

| File Type | Avg Original | Avg TOON | Savings |
|-----------|--------------|----------|---------|
| Large docs (API.md) | 8,000 tokens | 1,200 tokens | 85% |
| Medium docs (MOBILE.md) | 5,000 tokens | 800 tokens | 84% |
| README files | 3,000 tokens | 500 tokens | 83% |
| Code files | 2,000 tokens | 400 tokens | 80% |

### Full Repo Savings

**Current State:**
- Total docs: ~50,000 tokens
- Agent reads 10 docs/session: 50,000 tokens
- 100 sessions: 5,000,000 tokens

**With TOON:**
- Total TOON: ~8,000 tokens
- Agent reads 10 docs/session: 8,000 tokens
- 100 sessions: 800,000 tokens
- **Savings: 4,200,000 tokens (84%)**

---

## Configuration

### .toon/config.json

```json
{
  "version": "1.0",
  "compression": {
    "enabled": true,
    "level": "aggressive",
    "preserveCodeBlocks": "minimal",
    "maxTokensPerSection": 100
  },
  "generation": {
    "include": [
      "docs/**/*.md",
      "README.md",
      "*.md"
    ],
    "exclude": [
      "node_modules/**",
      ".git/**",
      "**/*.test.md"
    ]
  },
  "cache": {
    "enabled": true,
    "invalidateOnChange": true,
    "ttl": null
  }
}
```

---

## Agent Integration

### Using TOON in Skills

**File: `.claude/skills/toon-reader/skill.md`**

```markdown
# TOON Reader Skill

Use this skill to automatically read token-efficient versions of repository files.

## When to Use
- Reading documentation files
- Scanning code examples
- Understanding architecture
- Any file access operation

## How It Works
1. Agent requests file (e.g., "read docs/API.md")
2. Skill checks for .toon/docs/API.toon.json
3. If exists and valid → return TOON version
4. If missing → return original file
5. Agent processes with 80-90% fewer tokens

## Usage
Just read files normally - TOON is automatic:
- Read("docs/API.md") → automatically uses TOON if available
- Glob("docs/*.md") → returns TOON versions for matches
```

---

## Development

### Converter Implementation

**Tools:**
- `tools/toon/converter.ts` - Main converter
- `tools/toon/markdown-compressor.ts` - Markdown compression
- `tools/toon/code-analyzer.ts` - Code AST analysis
- `tools/toon/token-counter.ts` - Token counting

### Adding New Compression Strategies

1. Edit `tools/toon/strategies/`
2. Implement `CompressorStrategy` interface
3. Register in `converter.ts`
4. Run `npm run toon:test`

---

## Monitoring

### Token Savings Dashboard

**View stats:**
```bash
npm run toon:stats

# Output:
# TOON Token Savings Report
# ═══════════════════════════
# Total files: 45
# Total original tokens: 52,384
# Total TOON tokens: 8,291
# Savings: 44,093 tokens (84.2%)
#
# Top savers:
# 1. docs/API.md: 6,800 tokens saved (85%)
# 2. docs/MOBILE.md: 5,200 tokens saved (84%)
# 3. docs/WEB.md: 4,900 tokens saved (83%)
```

---

## Future Enhancements

### Phase 2: Code Compression
- AST-based code representation
- Remove comments, keep structure
- Minimal working examples only

### Phase 3: Semantic Search
- Embed TOON content
- Vector search for relevant sections
- Agent queries: "show me auth patterns" → returns only relevant TOON sections

### Phase 4: Progressive Loading
- Agent requests summary first (50 tokens)
- Requests full section if needed (200 tokens)
- Requests code examples on demand (150 tokens)

---

## Contributing

### Improving Compression

1. Analyze token usage: `npm run toon:analyze docs/API.md`
2. Identify high-token sections
3. Implement new compression strategy
4. Test savings: `npm run toon:test`
5. Submit PR with before/after stats

---

## FAQ

**Q: Do humans ever see TOON files?**
A: No. Humans use regular markdown. Agents use TOON transparently.

**Q: What if TOON is out of sync?**
A: Hash mismatch detection + automatic regeneration. Can't get out of sync.

**Q: Can I disable TOON for specific files?**
A: Yes, add to `exclude` in `.toon/config.json`

**Q: How do I know it's working?**
A: Check `.toon/stats.json` or run `npm run toon:stats`

**Q: Does this work with all agents?**
A: Works with Claude Code via skills. Other agents can read TOON files directly.

---

## License

Same as repository root (MIT).

---

**Made with ❤️ by [William Finger](https://github.com/willbnu) for efficient AI agents**
