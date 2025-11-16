# TOON Quick Start Guide

> **Get started with TOON in 2 minutes**

---

## What You Just Got

Your repository now has an **agent-optimized layer** that automatically saves 60-80% tokens when AI agents read your documentation.

**Current Savings:** 68% (17,455 tokens saved from 9 files)

---

## How to Use (For Humans)

### View Token Savings

```bash
cat .toon/stats.json
```

**Output:**
```json
{
  "files": 9,
  "successful": 9,
  "tokens": {
    "original": 25743,
    "compressed": 8288,
    "saved": 17455,
    "savingsPercent": 68
  }
}
```

### Regenerate TOON Files

```bash
# Generate all TOON files
npm run toon:generate

# Generate specific file
npm run toon:convert docs/API.md .toon/docs/API.toon.json
```

### View TOON Files

```bash
# List all TOON files
find .toon -name "*.toon.json"

# View specific TOON file
cat .toon/README.toon.json | json_pp
```

---

## How It Works (For Agents)

### Automatic Usage

Agents using Claude Code will **automatically use TOON files** via the `.claude/skills/toon-reader/` skill.

**Before TOON:**
```
Agent: Read("docs/API.md")
→ Gets full file: 8,000 tokens
```

**With TOON:**
```
Agent: Read("docs/API.md")
→ Skill intercepts
→ Checks .toon/docs/API.toon.json
→ Returns compressed: 1,200 tokens
→ Saves 6,800 tokens (85%)
```

### Manual TOON Access

Agents can also read TOON files directly:

```javascript
// Read TOON file
const toon = JSON.parse(await Read(".toon/docs/API.toon.json"));

// Access structured content
toon.content.metadata.title  // "API Development Guide"
toon.content.structure[0]    // First section
toon.tokenCount.savings      // 85
```

---

## Automatic Updates

TOON files update automatically when you push changes:

1. **You edit:** `docs/API.md`
2. **Git push:** Changes go to GitHub
3. **GitHub Action:** Detects markdown change
4. **Auto-generate:** `.toon/docs/API.toon.json` updated
5. **Auto-commit:** TOON files committed with `[skip ci]`

**You don't do anything.** It just works.

---

## Configuration

### Adjust Compression

Edit `.toon/config.json`:

```json
{
  "compression": {
    "level": "aggressive"  // or "moderate" or "conservative"
  }
}
```

- **aggressive**: 80-90% savings (current)
- **moderate**: 70-80% savings
- **conservative**: 50-60% savings

### Exclude Files

```json
{
  "generation": {
    "exclude": [
      "docs/INTERNAL.md",
      "**/*.draft.md"
    ]
  }
}
```

---

## Real Examples

### Example 1: README Compression

**Original:** 4,017 tokens
```markdown
# 🚀 Full-Stack App Template Blueprint

> **v0.1.0 - Documentation-Only Blueprint**
>
> Comprehensive architectural documentation and best practices for building production-ready, full-stack monorepo applications with Expo (mobile) and React (web), powered by Nx and Supabase.
>
> ⚠️ **Important:** This is currently a **documentation-only blueprint** (v0.1.0)...
```

**TOON:** 1,021 tokens (75% savings)
```json
{
  "metadata": {
    "title": "🚀 Full-Stack App Template Blueprint",
    "description": "**v0.1.0 - Documentation-Only Blueprint**",
    "tags": ["expo", "react", "supabase", "rls"]
  },
  "structure": [
    {
      "heading": "What is This?",
      "summary": "Architectural blueprint for production-ready apps",
      "keyPoints": [
        "Complete docs for mobile (iOS & Android) + web",
        "Security patterns (RLS, audit logging)",
        "PRD templates and design system"
      ]
    }
  ]
}
```

---

## Troubleshooting

### "Stats show 0 files"

Run generation:
```bash
npm run toon:generate
```

### "Getting original file, not TOON"

Check:
1. TOON file exists: `ls .toon/docs/API.toon.json`
2. Skill is active: `cat .claude/skills/toon-reader/skill.md`
3. Config enabled: `cat .toon/config.json | grep enabled`

### "Need to update specific file"

```bash
npm run toon:convert docs/API.md .toon/docs/API.toon.json
```

---

## Next Steps

1. **✅ TOON is installed and working** (9 files, 68% savings)
2. **⏰ Waiting for GitHub push** - Auto-update will activate
3. **🤖 Agents will use TOON automatically** - No action needed
4. **📊 Monitor savings** - Check `.toon/stats.json`

---

## Need Help?

- **Documentation:** `.toon/README.md`
- **Skill details:** `.claude/skills/toon-reader/skill.md`
- **Config:** `.toon/config.json`

---

**Made with ❤️ by [William Finger](https://github.com/willbnu)**
