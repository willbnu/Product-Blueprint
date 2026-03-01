# Claude Code Configuration

This directory contains Claude Code configuration for the Product-Blueprint project.

## Structure

```
.claude/
├── agents/              # Specialized agents
│   └── docs-expert.md   # Documentation update agent
└── README.md            # This file
```

## Agents

### docs-expert

Automatically updates documentation when code changes are detected.

**Trigger:** GitHub Actions workflow (`.github/workflows/auto-docs.yml`)

**Capabilities:**
- Analyzes code changes
- Updates relevant documentation
- Creates PRs with documentation updates

**Usage:**
```bash
# Manual trigger via GitHub CLI
gh workflow run auto-docs.yml

# Trigger with specific target
gh workflow run auto-docs.yml -f target=docs/WEB.md
```

## Setup Requirements

To enable the automated documentation workflow, add these secrets to your repository:

1. Go to Repository Settings → Secrets and variables → Actions
2. Add `ANTHROPIC_API_KEY` with your Claude API key

The `GITHUB_TOKEN` is automatically provided by GitHub Actions.

## Related Documentation

- [Auto-Docs Workflow](../.github/workflows/auto-docs.yml)
- [Contributing Guide](../CONTRIBUTING.md)
