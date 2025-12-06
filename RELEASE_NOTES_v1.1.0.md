# Release v1.1.0 - Enhanced Developer Experience

## 🎯 Overview
This release focuses on developer productivity and automation, adding essential tooling while maintaining the "zero bloat" philosophy.

## ✨ What's New

### Automated Dependency Updates (Renovate)
- **Configuration**: `.github/renovate.json` with smart defaults
- **Auto-merge**: Patch and minor updates merge automatically after CI passes
- **Grouping**: Related packages (Nx, React) updated together
- **Schedule**: Runs Monday mornings to avoid weekend noise

### Nx Generators for Common Patterns
- **PRD Generator**: `tools/generators/prd/` creates complete PRD structure
- **Usage**: Integrated with Nx CLI for consistent developer experience
- **Registered**: Configured in `nx.json` for discoverability

### TypeScript Path Aliases
- **Clean Imports**: Use `@app/shared` instead of `../../../libs/shared`
- **Configuration**: `tsconfig.base.json` with predefined paths
- **Paths**: `@app/shared`, `@app/ui`, `@app/api`, `@app/utils`

### Interactive Setup Wizard
- **Tool**: `tools/setup-wizard.js` guides new project setup
- **Prompts**: Project name, platforms (mobile/web/both), auth provider
- **Output**: Generates `.env.example` with project-specific configuration

## 📊 Developer Experience Improvements
- **4 new tools** added for common workflows
- **Zero dependencies** added (all tools use Node.js built-ins)
- **Consistent CLI** interface via `bin/pb.js`

## 🚀 Quick Start
```bash
# Run setup wizard
node tools/setup-wizard.js

# Scaffold a PRD
node bin/pb.js prd new my-project

# Check documentation links
node bin/pb.js docs check
```

## 🔗 Related
- Builds on v0.1.2 documentation integrity improvements
- Completes 4 of 7 planned v1.1 features from ROADMAP.md

---
**Full Changelog**: Compare v0.1.2...v1.1.0
