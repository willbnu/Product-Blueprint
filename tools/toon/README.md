# TOON (Token-Oriented Object Notation) Tools

This directory contains tools for generating and managing TOON files - an optimized documentation format for AI consumption.

## What is TOON?

TOON converts markdown documentation into a token-efficient JSON format that reduces token usage by 60-85% when consumed by AI agents. This enables faster processing and lower costs for AI-assisted development.

## Available Scripts

### Generate TOON Files

```bash
# Generate all TOON files from documentation
npm run toon:generate

# Watch for changes and auto-regenerate
npm run toon:watch
```

### View Statistics

```bash
# View token reduction statistics
npm run toon:stats
```

### Clean Generated Files

```bash
# Remove all generated TOON files
npm run toon:clean
```

### **Resolve Git Conflicts** 🔧

```bash
# Automatically resolve TOON file conflicts during merge/rebase
npm run toon:resolve
```

## Handling TOON Conflicts During Git Merge/Rebase

### The Problem

TOON files (`.toon/*.toon.json`) are generated files that are tracked in git. When merging branches, conflicts occur because both branches generate different TOON outputs from the same source documentation.

### The Solution

Use the automated conflict resolver:

```bash
# When you see TOON conflicts during merge/rebase:
npm run toon:resolve
```

**What it does:**
1. ✅ Detects all conflicted `.toon` files
2. ✅ Accepts the current branch version
3. ✅ Regenerates all TOON files from source
4. ✅ Stages the regenerated files
5. ✅ Shows you next steps

### Example Workflow

```bash
# 1. Start a merge or rebase
git merge feature-branch
# or
git pull --rebase origin main

# 2. See TOON conflicts
# Auto-merging .toon/README.toon.json
# CONFLICT (content): Merge conflict in .toon/README.toon.json
# ...

# 3. Run the resolver
npm run toon:resolve

# 4. Continue the merge/rebase
git merge --continue
# or
git rebase --continue
```

### Why This Works

TOON files are **derived** from source documentation (`.md` files). The source files are the single source of truth. When conflicts occur:

1. **Source conflicts** - Resolve manually (these matter!)
2. **TOON conflicts** - Resolve automatically (these are generated)

The resolver:
- Picks one version arbitrarily (doesn't matter which)
- Regenerates from the merged source documentation
- Ensures TOON files match the final merged state

### Manual Resolution (Advanced)

If you prefer manual resolution:

```bash
# Accept current branch version for all TOON files
git checkout --ours '.toon/**/*.toon.json'
git add .toon/

# Or accept incoming branch version
git checkout --theirs '.toon/**/*.toon.json'
git add .toon/

# Then regenerate
npm run toon:generate
git add .toon/
```

## File Structure

```
.toon/
├── *.toon.json              # Root-level documentation
├── docs/
│   ├── *.toon.json          # docs/ directory
│   └── paths/
│       └── *.toon.json      # Documentation paths
├── prd/
│   ├── examples/*.toon.json # PRD examples
│   └── templates/*.toon.json # PRD templates
├── manifest.json            # File index
└── stats.json              # Token reduction statistics
```

## Scripts Reference

| Script | Description |
|--------|-------------|
| `generate-all.js` | Generates TOON files from all markdown sources |
| `converter.js` | Core conversion logic (markdown → TOON) |
| `resolve-conflicts.js` | Automated conflict resolution for git merges |
| `audit-logger.js` | Logging utilities for TOON operations |

## Benefits

### For AI Agents
- **60-85% token reduction** - Faster processing, lower costs
- **Structured format** - Easier parsing and navigation
- **Preserved semantics** - All content relationships maintained

### For Developers
- **Automated conflict resolution** - No manual TOON file editing
- **Always up-to-date** - Regenerate from source anytime
- **Git-friendly** - Conflicts are easy to resolve

## Best Practices

1. **Never manually edit `.toon` files** - They're generated
2. **Edit source `.md` files** - Then regenerate TOON
3. **Run `toon:resolve`** - When you see TOON conflicts
4. **Use `toon:watch`** - During active documentation development

## Troubleshooting

### "TOON files out of sync"

```bash
# Regenerate all files
npm run toon:clean
npm run toon:generate
```

### "Conflicts won't resolve"

```bash
# Nuclear option: delete and regenerate
rm -rf .toon/
npm run toon:generate
git add .toon/
```

### "Why are TOON files in git?"

TOON files are committed because:
1. This is a **blueprint repository** - users should get optimized AI documentation immediately
2. AI agents can consume docs efficiently without local generation
3. Shows the token reduction benefits upfront

---

**Note**: TOON is a documentation optimization system. The source markdown files remain the single source of truth.
