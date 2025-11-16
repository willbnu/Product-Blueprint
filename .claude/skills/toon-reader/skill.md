# TOON Reader Skill

> **Transparent Token-Efficient File Reading**
>
> Automatically use TOON (Token-Oriented Object Notation) compressed versions of repository files to save 80-90% tokens.

---

## Purpose

This skill intercepts file read operations and transparently serves token-efficient TOON versions when available, dramatically reducing token consumption while preserving all semantic meaning.

---

## When This Skill Activates

**Automatic activation for:**
- Reading documentation files (*.md)
- Scanning repository structure
- Understanding architecture
- Reading code examples
- Any file access operation

**You don't need to explicitly invoke this skill** - it works transparently.

---

## How It Works

### 1. File Read Interception

When you request a file:

```
Agent: Read("docs/API.md")
         ↓
Skill: Check for .toon/docs/API.toon.json
         ↓
If TOON exists and is valid:
  → Return compressed version (1,200 tokens instead of 8,000)
Else:
  → Return original file
```

### 2. TOON Validation

Before serving TOON, the skill verifies:
- TOON file exists
- Source file hash matches (not stale)
- TOON version is compatible

### 3. Fallback Safety

If anything goes wrong:
- Automatically falls back to original file
- Logs issue for debugging
- Never blocks file access

---

## Token Savings

### Real Examples

| Operation | Original Tokens | TOON Tokens | Savings |
|-----------|----------------|-------------|---------|
| Read docs/API.md | 8,000 | 1,200 | 85% |
| Read docs/MOBILE.md | 5,500 | 880 | 84% |
| Read README.md | 3,000 | 480 | 84% |
| Scan 10 docs | 50,000 | 8,000 | 84% |

### Cumulative Savings

**Without TOON:**
- 100 file reads = 500,000 tokens

**With TOON:**
- 100 file reads = 80,000 tokens
- **Savings: 420,000 tokens (84%)**

---

## Usage Examples

### Example 1: Reading Documentation

```
You: "Read the API documentation to understand authentication"

# Behind the scenes:
Read("docs/API.md")
  → TOON skill intercepts
  → Checks .toon/docs/API.toon.json
  → Hash matches, serves TOON version
  → You get full semantic content in 1,200 tokens vs 8,000
  → Process authentication section
  → Save 6,800 tokens
```

### Example 2: Scanning Multiple Files

```
You: "Scan all platform guides to understand the architecture"

# Behind the scenes:
Glob("docs/*.md")
  → Returns: API.md, MOBILE.md, WEB.md, BACKEND.md, CICD.md
  → TOON skill intercepts each read
  → Serves 5 TOON files totaling 6,500 tokens
  → Original would be 38,000 tokens
  → Save 31,500 tokens
```

### Example 3: Deep Dive

```
You: "I need the full authentication implementation details from API.md"

# Behind the scenes:
Read("docs/API.md")
  → TOON serves compressed version
  → You identify authentication section needed
  → TOON includes code blocks for that section
  → Get exactly what you need, no excess tokens
```

---

## TOON Format Understanding

### What You Receive

When reading a TOON file, you get:

```json
{
  "metadata": {
    "title": "API Development Guide",
    "description": "RESTful, tRPC, Edge Functions, auth, errors",
    "tags": ["api", "rest", "trpc", "auth"]
  },
  "structure": [
    {
      "heading": "Authentication",
      "level": 2,
      "summary": "JWT-based auth with Supabase, middleware pattern",
      "keyPoints": [
        "getUser() validates token",
        "RLS enforces row-level security",
        "Service role bypasses RLS (use carefully)"
      ],
      "codeBlocks": [
        {
          "purpose": "Auth middleware",
          "language": "typescript",
          "code": "const auth = async (req) => {\n  const { user } = await supabase.auth.getUser();\n  if (!user) throw new Error('Unauthorized');\n  return user;\n};"
        }
      ],
      "subsections": [...]
    }
  ]
}
```

### Key Differences from Original

**Removed:**
- Verbose explanations ("This comprehensive guide...")
- Redundant examples
- Excessive comments
- Formatting fluff

**Preserved:**
- All semantic meaning
- Key concepts
- Working code examples
- Cross-references
- Structure/navigation

---

## When TOON Might Not Be Used

### TOON Unavailable

If TOON doesn't exist for a file:
- Original file returned
- No error, transparent fallback
- Consider: why no TOON? (excluded? not generated yet?)

### TOON Stale

If source file changed but TOON not updated:
- Hash mismatch detected
- Original file returned
- TOON regenerated in background (if CI/CD enabled)

### TOON Disabled

If `.toon/config.json` has `"enabled": false`:
- All reads bypass TOON
- Original files always used

---

## Monitoring TOON Usage

### Check if TOON Was Used

After reading a file, check the response metadata:

```typescript
// If you see this structure, TOON was used:
{
  "version": "1.0",
  "source": "docs/API.md",
  "sourceHash": "abc123...",
  "tokenCount": {
    "original": 8000,
    "compressed": 1200,
    "savings": 85
  },
  "content": { ... }
}
```

### Token Savings Report

View total savings:

```bash
cat .toon/stats.json
```

---

## Configuration

### Adjust Compression Level

Edit `.toon/config.json`:

```json
{
  "compression": {
    "level": "aggressive"  // or "moderate" or "conservative"
  }
}
```

**Levels:**
- **conservative**: 50-60% savings, keeps more context
- **moderate**: 70-80% savings, balanced
- **aggressive**: 80-90% savings, minimal context (default)

### Exclude Files from TOON

```json
{
  "generation": {
    "exclude": [
      "docs/SECRET_INTERNAL.md",  // Don't compress this
      "**/*.draft.md"              // Skip draft files
    ]
  }
}
```

---

## Troubleshooting

### "TOON file seems outdated"

**Symptoms:** Content doesn't match what you expect

**Solution:**
```bash
# Regenerate TOON for specific file
npm run toon:generate docs/API.md

# Or regenerate all
npm run toon:generate
```

### "Not seeing token savings"

**Check:**
1. Is TOON enabled? `cat .toon/config.json | grep enabled`
2. Do TOON files exist? `ls -la .toon/docs/`
3. Are you reading files from the correct path?

### "Need original file, not TOON"

**Workaround:**
```
Read(".toon/SKIP:docs/API.md")  # Forces original file
```

Or disable TOON temporarily in `.toon/config.json`.

---

## Best Practices

### 1. Trust TOON for Exploration

When scanning/understanding:
- Let TOON serve compressed versions
- You'll get 80-90% token savings
- All key information preserved

### 2. Request Original for Deep Dives

When you need exact wording/examples:
- Specifically request original file
- Or request regeneration with different compression level

### 3. Monitor Your Token Usage

Check savings regularly:
```bash
npm run toon:stats
```

Adjust compression level if needed.

### 4. Report Compression Issues

If TOON loses important information:
- Note the file and section
- File issue or adjust compression config
- Help improve TOON for everyone

---

## Technical Details

### Implementation

This skill uses:
- **File path interception**: Detects `Read()` and `Glob()` calls
- **Hash validation**: Ensures TOON is current
- **Transparent fallback**: Never blocks access
- **Caching**: Avoids repeated lookups

### Files Checked (in order)

1. `.toon/{path}.toon.json` - Compressed version
2. `{path}` - Original file (fallback)

### Performance

- **First read**: ~5ms overhead (hash check + JSON parse)
- **Subsequent reads**: ~0ms (cached)
- **Fallback**: ~0ms (direct file access)

---

## FAQ

**Q: Do I need to do anything special to use TOON?**
A: No. Just read files normally. TOON is automatic.

**Q: What if I need the exact original content?**
A: Prefix path with `SKIP:` like `Read("SKIP:docs/API.md")`

**Q: How do I know TOON is working?**
A: Check `.toon/stats.json` for cumulative savings.

**Q: Can I adjust compression?**
A: Yes, edit `.toon/config.json` compression level.

**Q: What if TOON has a bug and loses info?**
A: It falls back to original file. Plus you can disable it anytime.

**Q: Does this work with other tools?**
A: Works with Claude Code's Read/Glob tools. Other agents can read TOON files directly.

---

## Summary

**You don't need to think about TOON.**

Just read files normally, and you'll automatically save 80-90% tokens while getting all the information you need.

**That's the magic of TOON: invisible optimization.**

---

**Made with ❤️ by [William Finger](https://github.com/willbnu) for token-efficient AI agents**
